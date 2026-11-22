import {
  caption,
  el,
  injectStyles,
  chapterPlayer,
  pop,
  setup,
  sync,
} from "./demo-kit";

import styles from "./executor-pull.css?inline";

type NodeId = "limit" | "join" | "orders" | "hash" | "users";

interface Frame {
  active: NodeId[];
  carry?: string;
  hash: string[];
  usersRead: number;
  ordersRead: number;
  out: string[];
  say: string;
}

const USERS = [
  { id: 1, email: "ann" },
  { id: 2, email: "bob" },
  { id: 3, email: "eve" },
];

const ORDERS = [
  { userId: 2, total: 30 },
  { userId: 1, total: 12 },
  { userId: 3, total: 80 },
  { userId: 2, total: 5 },
];

const buildFrames = (limit: number | undefined): Frame[] => {
  const frames: Frame[] = [];
  const state = {
    hash: [] as string[],
    usersRead: 0,
    ordersRead: 0,
    out: [] as string[],
  };
  const push = (active: NodeId[], say: string, carry?: string) => {
    frames.push({
      ...state,
      hash: [...state.hash],
      out: [...state.out],
      active,
      say,
      ...(carry === undefined ? {} : { carry }),
    });
  };
  const top: NodeId = limit === undefined ? "join" : "limit";

  push(
    [top],
    limit === undefined
      ? "The client is waiting for rows. The executor asks the top node, Hash Join, for one."
      : "The client is waiting for rows. The executor asks Limit for one, and Limit asks Hash Join."
  );

  push(
    ["join", "hash"],
    "Before matching anything, Hash Join asks Hash to build a lookup table."
  );
  for (const user of USERS) {
    state.usersRead += 1;
    push(
      ["hash", "users"],
      `Hash pulls user ${user.id} from Seq Scan on users and stores it.`,
      `${user.id} ${user.email}`
    );
    state.hash.push(`${user.id} → ${user.email}`);
  }
  push(["users"], "No more users: the hash table is ready.");

  for (const order of ORDERS) {
    state.ordersRead += 1;
    push(
      ["join", "orders"],
      `Hash Join pulls one order: $${order.total} for user ${order.userId}.`,
      `user ${order.userId}, $${order.total}`
    );
    const user = USERS.find((u) => u.id === order.userId);
    const row = `${user?.email ?? "?"}, $${order.total}`;
    state.out.push(row);
    push(
      [top],
      `It looks up user ${order.userId} in the hash table, finds ${user?.email ?? "?"}, and passes (${row}) up. It goes out as a DataRow.`,
      row
    );
    if (limit !== undefined && state.out.length === limit) {
      push(
        ["limit"],
        `Limit has its ${limit} rows and stops asking, so the other orders are never read.`
      );
      return frames;
    }
  }
  push(["orders"], `No more orders, so the query is done.`);
  return frames;
};

export default function mount(root: HTMLElement) {
  injectStyles("executor-pull", styles);
  setup(root, "executor-pull");

  let limit: number | undefined;
  let frames = buildFrames(limit);
  let index = -1;

  const tree = el("div", "executor-pull-tree");
  const output = el("ol", "executor-pull-out demo-mono");
  output.setAttribute("aria-label", "Rows sent to the client");
  const live = caption("");

  const nodes = new Map<
    NodeId,
    { box: HTMLElement; carry: HTMLElement; extra: HTMLElement }
  >();
  const node = (id: NodeId, label: string, depth: number) => {
    const box = el("div", "executor-pull-node");
    box.style.setProperty("--depth", String(depth));
    const name = el("span", "executor-pull-name", label);
    const carry = el("span", "executor-pull-carry demo-mono");
    const extra = el("div", "executor-pull-extra demo-mono");
    box.append(name, carry, extra);
    nodes.set(id, { box, carry, extra });
    return box;
  };

  const build = () => {
    nodes.clear();
    const offset = limit === undefined ? 0 : 1;
    const parts = [
      ...(limit === undefined ? [] : [node("limit", `Limit ${limit}`, 0)]),
      node("join", "Hash Join on o.user_id = u.id", offset),
      node("orders", "Seq Scan on orders o", offset + 1),
      node("hash", "Hash", offset + 1),
      node("users", "Seq Scan on users u", offset + 2),
    ];
    tree.replaceChildren(...parts);
    nodes.get("hash")?.extra.classList.add("is-hash");
  };

  const renderLists = (frame: Frame | undefined) => {
    const hash = nodes.get("hash");
    if (hash) {
      sync(
        hash.extra,
        frame?.hash ?? [],
        (entry) => entry,
        (entry) => el("span", "executor-pull-entry", entry)
      );
    }
    sync(
      output,
      frame?.out ?? [],
      (row) => row,
      (row) => el("li", undefined, `DataRow (${row})`)
    );
  };

  const render = () => {
    const frame = frames[index];
    for (const [id, view] of nodes) {
      view.box.classList.toggle(
        "is-active",
        frame?.active.includes(id) ?? false
      );
      const carry = frame?.active.at(-1) === id ? (frame.carry ?? "") : "";
      if (view.carry.textContent !== carry) {
        view.carry.textContent = carry;
        pop(view.carry);
      }
    }
    const users = nodes.get("users");
    const orders = nodes.get("orders");
    if (users) {
      users.extra.textContent = `read ${frame?.usersRead ?? 0} of ${USERS.length}`;
    }
    if (orders) {
      orders.extra.textContent = `read ${frame?.ordersRead ?? 0} of ${ORDERS.length}`;
    }
    renderLists(frame);
    live.textContent =
      frame?.say ??
      (limit === undefined
        ? "Press Start to pull the first row."
        : "The same query, with a Limit node on top.");
  };

  const begin = (chapter: "all" | "limit") => {
    limit = chapter === "limit" ? 2 : undefined;
    frames = buildFrames(limit);
    index = -1;
    build();
    render();
  };

  const step = () => {
    index += 1;
    render();
    return index < frames.length - 1;
  };

  const { controls, label } = chapterPlayer({
    chapters: [
      ["all", "SELECT … (no LIMIT)"],
      ["limit", "Same query with LIMIT 2"],
    ] as const,
    begin,
    step,
    length: (chapter) =>
      buildFrames(chapter === "limit" ? 2 : undefined).length,
  });

  const outWrap = el("div", "executor-pull-client");
  outWrap.append(el("span", "demo-label", "sent to the client"), output);

  root.append(label, tree, outWrap, controls, live);
}
