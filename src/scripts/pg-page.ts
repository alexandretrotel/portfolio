import {
  caption,
  el,
  enter,
  injectStyles,
  player,
  reducedMotion,
  setup,
  sync,
} from "./demo-kit";

import styles from "./pg-page.css?inline";

const PAGE = 8192;
const HEADER = 24;
const LP = 4;

interface Tuple {
  offset: number;
  len: number;
  email: string;
  dead: boolean;
}

interface Slot {
  tuple?: Tuple;
}

const NAMES = [
  "bob",
  "joe",
  "ann",
  "kim",
  "eve",
  "fay",
  "max",
  "liz",
  "sam",
  "zoe",
  "tom",
  "ida",
];
const SIZES = [1180, 900, 1050, 1320, 980, 1240, 860, 1100];

const leave = async (node: HTMLElement) => {
  node.classList.add("is-leaving");
  if (reducedMotion()) {
    node.remove();
    return;
  }
  const fade = node.animate([{ opacity: 1 }, { opacity: 0, scale: "0.98" }], {
    duration: 160,
    easing: "ease-out",
  });
  await fade.finished;
  node.remove();
};

export default function mount(root: HTMLElement) {
  injectStyles("pg-page", styles);
  setup(root, "pg-page");

  let slots: Slot[] = [];
  let inserted = 0;
  let action = 0;
  const say = (text: string) => {
    live.textContent = text;
  };

  const page = el("div", "pg-page-page");
  const header = el("div", "pg-page-header", "header · 24 B");
  const pointers = el("ol", "pg-page-pointers");
  pointers.setAttribute("aria-label", "Line pointers");
  const free = el("div", "pg-page-free demo-label");
  const tuples = el("div", "pg-page-tuples");
  page.append(header, pointers, free, tuples);

  const index = el("p", "pg-page-index demo-mono");
  const live = caption("");

  const upper = () =>
    Math.min(PAGE, ...slots.flatMap((s) => (s.tuple ? [s.tuple.offset] : [])));
  const lower = () => HEADER + LP * slots.length;

  const ctid = (email: string) => {
    const at = slots.findIndex(
      (s) => s.tuple?.email === email && !s.tuple.dead
    );
    return at === -1 ? undefined : `(0,${at + 1})`;
  };

  const render = () => {
    sync(
      pointers,
      slots.map((slot, i) => ({ slot, i })),
      ({ i }) => String(i),
      ({ i }) => el("li", "pg-page-lp", String(i + 1)),
      (node, { slot }) => {
        node.classList.toggle("is-unused", !slot.tuple);
        node.classList.toggle("is-dead", slot.tuple?.dead === true);
        node.title = slot.tuple
          ? `points to byte ${slot.tuple.offset}`
          : "unused";
      }
    );

    const area = PAGE - HEADER;
    const existing = new Map(
      [
        ...tuples.querySelectorAll<HTMLElement>(
          ".pg-page-tuple:not(.is-leaving)"
        ),
      ].map((node) => [node.dataset.email ?? "", node])
    );
    const keep = new Set<string>();
    for (const [i, slot] of slots.entries()) {
      const { tuple } = slot;
      if (!tuple) {
        continue;
      }
      keep.add(tuple.email);
      let node = existing.get(tuple.email);
      if (!node) {
        node = el("div", "pg-page-tuple");
        node.dataset.email = tuple.email;
        tuples.append(enter(node));
      }
      node.style.setProperty(
        "--bottom",
        String((PAGE - tuple.offset - tuple.len) / area)
      );
      node.style.setProperty("--height", String(tuple.len / area));
      node.classList.toggle("is-dead", tuple.dead);
      node.textContent = `(0,${i + 1}) ${tuple.email}@mail.com · ${tuple.len} B${tuple.dead ? " · dead" : ""}`;
      node.setAttribute(
        "aria-label",
        `${tuple.email}, line pointer ${i + 1}, starts at byte ${tuple.offset}${tuple.dead ? ", dead" : ""}`
      );
    }
    for (const [email, node] of existing) {
      if (!keep.has(email) && !node.classList.contains("is-leaving")) {
        void leave(node);
      }
    }

    free.textContent = `free space · ${upper() - lower()} B`;
    const annCtid = ctid("ann");
    index.textContent =
      annCtid === undefined
        ? "users_email_idx: ann@mail.com → gone"
        : `users_email_idx: ann@mail.com → ${annCtid}`;
  };

  const insert = () => {
    const len = SIZES[inserted % SIZES.length] ?? 1000;
    const email = NAMES[inserted % NAMES.length] ?? "row";
    const reuse = slots.findIndex((s) => !s.tuple);
    const needed = len + (reuse === -1 ? LP : 0);
    if (upper() - lower() < needed) {
      live.textContent = `The pointers and the rows have met: the page is full.`;
      return false;
    }
    inserted += 1;
    const tuple: Tuple = { offset: upper() - len, len, email, dead: false };
    const at = reuse === -1 ? slots.length : reuse;
    slots[at] = { tuple };
    render();
    say(
      `${email} is written at the end of the free space, at byte ${tuple.offset}. ${reuse === -1 ? `A new line pointer, ${at + 1}, takes 4 bytes at the top.` : `It reuses the free line pointer ${at + 1}.`}`
    );
    return true;
  };

  const remove = (email: string) => {
    const at = slots.findIndex((s) => s.tuple?.email === email);
    const tuple = slots[at]?.tuple;
    if (!tuple) {
      return;
    }
    tuple.dead = true;
    render();
    live.textContent = `DELETE ${email}: the row stays on the page, marked dead, because others may still see it.`;
  };

  const vacuum = () => {
    const dead = slots.filter((s) => s.tuple?.dead === true).length;
    const before = ctid("ann");
    for (const slot of slots) {
      if (slot.tuple?.dead === true) {
        delete slot.tuple;
      }
    }
    let offset = PAGE;
    const live_ = slots
      .flatMap((s) => (s.tuple ? [s.tuple] : []))
      .toSorted((a, b) => b.offset - a.offset);
    for (const tuple of live_) {
      offset -= tuple.len;
      tuple.offset = offset;
    }
    render();
    live.textContent = `Vacuum removes ${dead} dead row${dead === 1 ? "" : "s"} and slides the others down to close the gaps. Their line pointers keep their numbers${before === undefined ? "" : `, so the index entry for ann still says ${before}`}.`;
  };

  const reset = () => {
    slots = [];
    inserted = 0;
    action = 0;
    insert();
    insert();
    live.textContent =
      "Rows fill the page from the bottom, line pointers from the top.";
  };

  const ACTIONS = [
    insert,
    insert,
    () => {
      remove("joe");
      return true;
    },
    () => {
      vacuum();
      return true;
    },
    insert,
    insert,
    insert,
    insert,
    insert,
  ];

  const step = () => {
    const run = ACTIONS[action];
    action += 1;
    return run !== undefined && run() && action < ACTIONS.length;
  };

  const { controls } = player({ step, reset, total: () => ACTIONS.length });

  root.append(page, index, controls, live);
  reset();
}
