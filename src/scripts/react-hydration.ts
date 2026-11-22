import {
  caption,
  el,
  flash,
  injectStyles,
  pop,
  player,
  setup,
} from "./demo-kit";

import styles from "./react-hydration.css?inline";

type State = "dehydrated" | "hydrating" | "hydrated";

interface Boundary {
  name: string;
  action: string;
  result: string;
}

const BOUNDARIES: Boundary[] = [
  { name: "Header", action: "Menu", result: "the menu opens" },
  { name: "Sidebar", action: "Filter", result: "the filter applies" },
  { name: "Comments", action: "Like", result: "the like counts" },
  { name: "Footer", action: "Subscribe", result: "the form opens" },
];

const TICKS_PER_BOUNDARY = 2;

export default function mount(root: HTMLElement) {
  injectStyles("react-hydration", styles);
  setup(root, "react-hydration");

  let states: State[] = [];
  let progress = 0;

  const list = el("div", "react-hydration-page");
  const live = caption("");

  const views = BOUNDARIES.map((b) => {
    const box = el("div", "react-hydration-boundary");
    const label = el("span", "demo-label");
    const action = el("span", "react-hydration-action", b.action);
    box.append(el("strong", undefined, b.name), label, action);
    list.append(box);
    return { box, label, action };
  });

  const render = () => {
    for (const [i, view] of views.entries()) {
      const state = states[i] ?? "dehydrated";
      view.box.className = `react-hydration-boundary is-${state}`;
      view.label.textContent = state === "hydrating" ? "hydrating…" : state;
    }
  };

  const current = () => states.findIndex((s) => s !== "hydrated");

  const click = (i: number) => {
    const b = BOUNDARIES[i];
    if (!b) {
      return;
    }
    if (states[i] === "hydrated") {
      live.textContent = `${b.name} is hydrated, so its onClick runs right away: ${b.result}.`;
      flash(views[i]?.box);
      return;
    }
    const was = current();
    states[i] = "hydrated";
    if (was === i) {
      progress = 0;
    }
    render();
    flash(views[i]?.box);
    live.textContent = `The user taps ${b.action}: React hydrates ${b.name} right away, then replays the tap.`;
  };

  const reset = () => {
    states = BOUNDARIES.map(() => "dehydrated");
    progress = 0;
    render();
    live.textContent = "The page is visible, but nothing responds yet.";
  };

  const tick = () => {
    const i = current();
    const b = BOUNDARIES[i];
    if (i === -1 || !b) {
      live.textContent =
        "Done: Comments jumped the queue because the user touched it.";
      return false;
    }
    states[i] = "hydrating";
    progress += 1;
    if (progress >= TICKS_PER_BOUNDARY) {
      states[i] = "hydrated";
      progress = 0;
      live.textContent = `${b.name} is hydrated, and React moves to the next boundary.`;
    } else {
      live.textContent = `React hydrates ${b.name}.`;
    }
    render();
    return true;
  };

  const SCRIPT = [
    "tick",
    "tick",
    "tick",
    "click",
    "tick",
    "tick",
    "tick",
    "tick",
  ];
  let action = 0;

  const step = () => {
    const next = SCRIPT[action];
    action += 1;
    if (next === "click") {
      click(2);
      pop(views[2]?.action);
      return true;
    }
    return tick() && action < SCRIPT.length;
  };

  const { controls } = player({
    step,
    reset: () => {
      action = 0;
      reset();
    },
    total: () => SCRIPT.length,
  });

  root.append(list, controls, live);
  reset();
}
