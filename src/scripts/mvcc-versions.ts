import {
  caption,
  el,
  flash,
  injectStyles,
  player,
  setup,
  sync,
} from "./demo-kit";

import styles from "./mvcc-versions.css?inline";

interface Version {
  ctid: string;
  xmin: string;
  xmax: string;
  name: string;
  seenBy: string[];
  dead?: boolean;
}

interface Txn {
  name: string;
  label: string;
  state: "running" | "done";
}

interface Frame {
  txns: Txn[];
  versions: Version[];
  text: string;
}

const FRAMES: Frame[] = [
  {
    txns: [{ name: "A", label: "A · repeatable read", state: "running" }],
    versions: [
      { ctid: "(0,1)", xmin: "790", xmax: "", name: "Ann", seenBy: ["A"] },
    ],
    text: "A starts and takes its snapshot. The row has one version, and A sees it.",
  },
  {
    txns: [
      { name: "A", label: "A · repeatable read", state: "running" },
      { name: "B", label: "B · xid 813", state: "running" },
    ],
    versions: [
      { ctid: "(0,1)", xmin: "790", xmax: "813", name: "Ann", seenBy: ["A"] },
      { ctid: "(0,2)", xmin: "813", xmax: "", name: "Anna", seenBy: ["B"] },
    ],
    text: "B updates the row. The old version gets xmax 813 and a new one appears. Only B sees it, since 813 hasn't committed.",
  },
  {
    txns: [
      { name: "A", label: "A · repeatable read", state: "running" },
      { name: "B", label: "B · committed", state: "done" },
      { name: "C", label: "C · new", state: "running" },
    ],
    versions: [
      { ctid: "(0,1)", xmin: "790", xmax: "813", name: "Ann", seenBy: ["A"] },
      { ctid: "(0,2)", xmin: "813", xmax: "", name: "Anna", seenBy: ["C"] },
    ],
    text: "B commits. In A's snapshot, 813 was still running, so A keeps seeing Ann. A new transaction C sees Anna.",
  },
  {
    txns: [
      { name: "A", label: "A · done", state: "done" },
      { name: "C", label: "C · new", state: "running" },
    ],
    versions: [
      {
        ctid: "(0,1)",
        xmin: "790",
        xmax: "813",
        name: "Ann",
        seenBy: [],
        dead: true,
      },
      { ctid: "(0,2)", xmin: "813", xmax: "", name: "Anna", seenBy: ["C"] },
    ],
    text: "A ends. No snapshot can see (0,1) anymore. It's a dead version.",
  },
  {
    txns: [{ name: "C", label: "C · new", state: "running" }],
    versions: [
      { ctid: "(0,2)", xmin: "813", xmax: "", name: "Anna", seenBy: ["C"] },
    ],
    text: "Vacuum removes it, and its space on the page can be reused.",
  },
];

const COLUMNS = ["ctid", "xmin", "xmax", "name", "seen by"] as const;

const cellsOf = (v: Version) => [
  v.ctid,
  v.xmin,
  v.xmax === "" ? "0" : v.xmax,
  v.name,
  v.seenBy.length > 0 ? v.seenBy.join(", ") : "nobody",
];

export default function mount(root: HTMLElement) {
  injectStyles("mvcc-versions", styles);
  setup(root, "mvcc-versions");

  let at = 0;

  const txns = el("ol", "mvcc-versions-txns");
  txns.setAttribute("aria-label", "Transactions");

  const table = el("div", "mvcc-versions-table demo-box");
  table.setAttribute("role", "table");
  table.setAttribute("aria-label", "Row versions in the users table");
  const head = el("div", "mvcc-versions-row is-head");
  head.setAttribute("role", "row");
  for (const name of COLUMNS) {
    const cell = el("span", "mvcc-versions-cell", name);
    cell.setAttribute("role", "columnheader");
    head.append(cell);
  }
  const body = el("div", "mvcc-versions-body");
  body.setAttribute("role", "rowgroup");
  table.append(head, body);

  const live = caption("");

  const render = () => {
    const frame = FRAMES[at];
    if (!frame) {
      return;
    }
    sync(
      txns,
      frame.txns,
      (t) => t.name,
      () => el("li", "mvcc-versions-txn"),
      (node, t) => {
        if (node.textContent !== t.label) {
          node.textContent = t.label;
        }
        node.className = `mvcc-versions-txn is-${t.state}`;
      }
    );
    sync(
      body,
      frame.versions,
      (v) => v.ctid,
      () => {
        const row = el("div", "mvcc-versions-row");
        row.setAttribute("role", "row");
        for (const _ of COLUMNS) {
          const cell = el("span", "mvcc-versions-cell");
          cell.setAttribute("role", "cell");
          row.append(cell);
        }
        return row;
      },
      (node, v) => {
        node.classList.toggle("is-dead", v.dead === true);
        for (const [i, text] of cellsOf(v).entries()) {
          const cell = node.children[i];
          if (cell instanceof HTMLElement && cell.textContent !== text) {
            const changed = cell.textContent !== "";
            cell.textContent = text;
            if (changed) {
              flash(cell);
            }
          }
        }
      }
    );
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

  const scroll = el("div", "demo-scroll");
  scroll.append(table);
  root.append(txns, scroll, controls, live);
  render();
}
