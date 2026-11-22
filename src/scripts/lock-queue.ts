import { caption, el, injectStyles, player, setup, sync } from "./demo-kit";

import styles from "./lock-queue.css?inline";

interface Session {
  name: string;
  query: string;
  mode: string;
}

const SESSIONS: Record<string, Session> = {
  A: { name: "A", query: "long SELECT", mode: "ACCESS SHARE" },
  B: { name: "B", query: "ALTER TABLE", mode: "ACCESS EXCLUSIVE" },
  C: { name: "C", query: "SELECT", mode: "ACCESS SHARE" },
  D: { name: "D", query: "SELECT", mode: "ACCESS SHARE" },
  E: { name: "E", query: "UPDATE", mode: "ROW EXCLUSIVE" },
};

interface Frame {
  holding: string[];
  waiting: string[];
  text: string;
}

const FRAMES: Frame[] = [
  {
    holding: ["A"],
    waiting: [],
    text: "A runs a long report on users. It holds ACCESS SHARE until it's done.",
  },
  {
    holding: ["A"],
    waiting: ["B"],
    text: "B runs ALTER TABLE. ACCESS EXCLUSIVE conflicts with A's lock, so B waits.",
  },
  {
    holding: ["A"],
    waiting: ["B", "C"],
    text: "C runs a quick SELECT. It doesn't conflict with A, but it conflicts with B, which is waiting first. So C waits too.",
  },
  {
    holding: ["A"],
    waiting: ["B", "C", "D", "E"],
    text: "Every new query on users lines up behind B. The app stalls.",
  },
  {
    holding: ["B"],
    waiting: ["C", "D", "E"],
    text: "A finishes. B gets its lock, adds the column in a few milliseconds, and commits.",
  },
  {
    holding: ["C", "D", "E"],
    waiting: [],
    text: "C, D, and E get their locks at once, since they don't conflict with each other.",
  },
];

const chip = (session: Session) => {
  const item = el("li", "lock-queue-chip");
  item.append(
    el("span", "lock-queue-query", `${session.name} · ${session.query}`),
    el("span", "demo-label", session.mode)
  );
  return item;
};

const section = (label: string, list: HTMLElement) => {
  const wrap = el("div", "lock-queue-section");
  wrap.append(el("span", "demo-label", label), list);
  return wrap;
};

const fill = (list: HTMLElement, names: string[]) => {
  const sessions = names.flatMap((name) => {
    const session = SESSIONS[name];
    return session ? [session] : [];
  });
  sync(list, sessions, (s) => s.name, chip);
};

export default function mount(root: HTMLElement) {
  injectStyles("lock-queue", styles);
  setup(root, "lock-queue");

  let at = 0;

  const holding = el("ol", "lock-queue-list is-holding");
  holding.setAttribute("aria-label", "Holding a lock on users");
  const waiting = el("ol", "lock-queue-list is-waiting");
  waiting.setAttribute("aria-label", "Waiting, in queue order");
  const live = caption("");

  const render = () => {
    const frame = FRAMES[at];
    if (!frame) {
      return;
    }
    fill(holding, frame.holding);
    fill(waiting, frame.waiting);
    live.textContent = frame.text;
  };

  const { controls } = player({
    step: () => {
      at += 1;
      render();
      return at < FRAMES.length - 1;
    },
    reset: () => {
      at = 0;
      render();
    },
    total: () => FRAMES.length - 1,
  });

  const table = el("div", "lock-queue-table demo-box", "users");
  table.setAttribute("aria-hidden", "true");

  root.append(
    section("holding", holding),
    table,
    section("waiting", waiting),
    controls,
    live
  );
  render();
}
