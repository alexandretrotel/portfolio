import {
  caption,
  el,
  injectStyles,
  player,
  reducedMotion,
  setup,
  sync,
} from "./demo-kit";

import styles from "./pg-row.css?inline";

interface Column {
  name: string;
  type: string;
  len: number;
  align: number;
}

const INITIAL: Column[] = [
  { name: "id", type: "bigint", len: 8, align: 8 },
  { name: "active", type: "boolean", len: 1, align: 1 },
  { name: "created_at", type: "timestamptz", len: 8, align: 8 },
  { name: "score", type: "int4", len: 4, align: 4 },
];

const SORTED = INITIAL.toSorted((a, b) => b.align - a.align);

const CAPTIONS = [
  "created_at must start on a multiple of 8 bytes, so 7 empty bytes follow active.",
  "Put the biggest alignments first and every value already lands on its boundary: no padding.",
];

interface Placed {
  column: Column;
  pad: number;
  color: number;
}

const layout = (columns: Column[]) => {
  let offset = 0;
  const placed: Placed[] = [];
  for (const column of columns) {
    const pad = (column.align - (offset % column.align)) % column.align;
    offset += pad + column.len;
    placed.push({
      column,
      pad,
      color: INITIAL.findIndex((c) => c.name === column.name),
    });
  }
  return { placed, size: offset };
};

const flip = (list: HTMLElement, mutate: () => void) => {
  const items = [...list.querySelectorAll<HTMLElement>(":scope > li")];
  const before = new Map(items.map((n) => [n, n.getBoundingClientRect().top]));
  mutate();
  if (reducedMotion()) {
    return;
  }
  for (const [node, top] of before) {
    const delta = top - node.getBoundingClientRect().top;
    if (delta !== 0) {
      node.animate(
        [{ transform: `translateY(${delta}px)` }, { transform: "none" }],
        { duration: 400, easing: "cubic-bezier(0.77, 0, 0.175, 1)" }
      );
    }
  }
};

export default function mount(root: HTMLElement) {
  injectStyles("pg-row", styles);
  setup(root, "pg-row");

  let sorted = false;

  const list = el("ol", "pg-row-columns");
  list.setAttribute("aria-label", "Columns, in table order");
  const grid = el("div", "pg-row-grid");
  grid.setAttribute("aria-hidden", "true");
  const summary = el("p", "pg-row-summary demo-mono");
  const live = caption("");

  const render = () => {
    const { placed, size } = layout(sorted ? SORTED : INITIAL);
    const padding = placed.reduce((sum, p) => sum + p.pad, 0);

    flip(list, () => {
      sync(
        list,
        placed,
        (p) => p.column.name,
        (p) => {
          const item = el("li", "pg-row-column");
          item.append(
            el("span", `pg-row-swatch is-c${p.color}`),
            el("span", "pg-row-name", p.column.name),
            el("span", "demo-label", `${p.column.len} B`)
          );
          return item;
        }
      );
    });

    const cells: { kind: string; text: string }[] = [];
    for (const p of placed) {
      for (let b = 0; b < p.pad; b += 1) {
        cells.push({ kind: "is-pad", text: "" });
      }
      for (let b = 0; b < p.column.len; b += 1) {
        cells.push({ kind: `is-c${p.color}`, text: "" });
      }
    }
    while (cells.length % 8 !== 0) {
      cells.push({ kind: "is-empty", text: "" });
    }
    sync(
      grid,
      cells.map((cell, i) => ({ ...cell, i })),
      (cell) => String(cell.i),
      () => el("span", "pg-row-cell"),
      (node, cell) => {
        node.className = `pg-row-cell ${cell.kind}`;
      }
    );

    summary.textContent = `${size} B of data · ${padding} B of padding`;
    live.textContent = CAPTIONS[sorted ? 1 : 0] ?? "";
  };

  const { controls } = player({
    step: () => {
      sorted = true;
      render();
      return false;
    },
    reset: () => {
      sorted = false;
      render();
    },
    total: () => 1,
  });

  const top = el("div", "pg-row-top");
  top.append(list, grid);

  root.append(top, summary, controls, live);
  render();
}
