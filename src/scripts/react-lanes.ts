import { caption, el, injectStyles, player, pop, setup } from "./demo-kit";

import styles from "./react-lanes.css?inline";

const BITS = 31;

const NAMES: Record<number, string> = {
  0: "SyncHydration",
  1: "Sync",
  2: "InputContinuousHydration",
  3: "InputContinuous",
  4: "DefaultHydration",
  5: "Default",
  6: "Gesture",
  7: "TransitionHydration",
  22: "Retry 1",
  23: "Retry 2",
  24: "Retry 3",
  25: "Retry 4",
  26: "SelectiveHydration",
  27: "IdleHydration",
  28: "Idle",
  29: "Offscreen",
  30: "Deferred",
};
for (let i = 1; i <= 14; i += 1) {
  NAMES[7 + i] = `Transition ${i}`;
}

const nameOf = (bit: number) => NAMES[bit] ?? `bit ${bit}`;

export default function mount(root: HTMLElement) {
  injectStyles("react-lanes", styles);
  setup(root, "react-lanes");

  let pending = 0;

  const row = el("ol", "react-lanes-row");
  row.setAttribute("aria-hidden", "true");
  const cells = Array.from({ length: BITS }, (_, i) => {
    const bit = BITS - 1 - i;
    const cell = el("li", "react-lanes-bit");
    cell.title = nameOf(bit);
    row.append(cell);
    return { bit, cell };
  });

  const names = el("p", "react-lanes-names demo-mono");
  const live = caption("");

  const render = (added?: number) => {
    const highest = pending & -pending;
    for (const { bit, cell } of cells) {
      const mask = 2 ** bit;
      cell.classList.toggle("is-on", (pending & mask) !== 0);
      cell.classList.toggle("is-highest", highest === mask);
      if (added === mask) {
        pop(cell);
      }
    }
    const pendingBits = cells
      .map(({ bit }) => bit)
      .filter((bit) => (pending & (2 ** bit)) !== 0)
      .toSorted((a, b) => a - b);
    names.textContent =
      pendingBits.length === 0
        ? "nothing pending"
        : pendingBits.map((bit) => nameOf(bit)).join(" · ");
  };

  const add = (lane: number, why: string) => {
    const before = pending;
    pending |= lane;
    render(lane);
    const bit = Math.log2(lane);
    live.textContent =
      before === pending
        ? `${why}: the ${nameOf(bit)} bit is already set, so nothing changes.`
        : `${why} sets the ${nameOf(bit)} bit.`;
  };

  const renderNext = () => {
    if (pending === 0) {
      live.textContent = "Nothing pending. Add an update first.";
      return;
    }
    const lane = pending & -pending;
    pending &= ~lane;
    render();
    live.textContent = `React renders the rightmost bit first: ${nameOf(Math.log2(lane))}.`;
  };

  const ACTIONS: (() => void)[] = [
    () => {
      add(2 ** 8, "startTransition");
    },
    () => {
      add(2 ** 5, "A fetch result");
    },
    () => {
      add(2 ** 1, "A click");
    },
    () => {
      add(2 ** 3, "A mouse move");
    },
    () => {
      add(2 ** 1, "Another click");
    },
    renderNext,
    renderNext,
    renderNext,
    renderNext,
  ];
  let action = 0;

  const { controls } = player({
    step: () => {
      ACTIONS[action]?.();
      action += 1;
      return action < ACTIONS.length;
    },
    reset: () => {
      pending = 0;
      action = 0;
      render();
      live.textContent =
        "Each update sets one bit. The further right, the more urgent.";
    },
    total: () => ACTIONS.length,
  });

  const legend = el("div", "react-lanes-legend demo-label");
  legend.append(
    el("span", undefined, "bit 30 · less urgent"),
    el("span", undefined, "more urgent · bit 0")
  );
  const scroll = el("div", "demo-scroll");
  scroll.append(row, legend, names);

  root.append(scroll, controls, live);
  render();
  live.textContent =
    "Each update sets one bit. The further right, the more urgent.";
}
