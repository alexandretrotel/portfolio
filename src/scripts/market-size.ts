import { caption, el, injectStyles, player, setup, sync } from "./demo-kit";

import styles from "./market-size.css?inline";

interface Lake {
  name: string;
  value: number;
  math: string;
}

const LAKES: Lake[] = [
  { name: "TAM", value: 1e9, math: "500,000 restaurants × $2,000" },
  { name: "SAM", value: 1e8, math: "French only: 50,000 × $2,000" },
  { name: "realistic", value: 5e7, math: "half of them buy" },
];

const STEPS = [
  "500,000 restaurants × $2,000 a year = $1B. Looks great.",
  "Your app only works in French: 50,000 restaurants, $100M.",
  "Even if half of them buy, which never happens, that's $50M a year.",
  "$50M is the real size of your lake: too small.",
];

const money = (n: number) =>
  n >= 1e9 ? `$${n / 1e9}B` : `$${Math.round(n / 1e6)}M`;

export default function mount(root: HTMLElement) {
  injectStyles("market-size", styles);
  setup(root, "market-size");

  let shown = 0;

  const lakes = el("div", "market-size-lakes");
  lakes.setAttribute("aria-hidden", "true");
  const legend = el("ul", "market-size-legend");
  const live = caption("");

  const render = () => {
    const visible = LAKES.slice(0, Math.min(shown, LAKES.length));
    sync(
      lakes,
      visible,
      (lake) => lake.name,
      (lake) => {
        const node = el("div", "market-size-lake");
        node.dataset.name = lake.name;
        node.style.setProperty("--size", String(Math.sqrt(lake.value / 1e9)));
        return node;
      }
    );
    sync(
      legend,
      visible,
      (lake) => lake.name,
      (lake) => {
        const row = el("li");
        row.dataset.name = lake.name;
        row.append(
          el("span", "market-size-swatch"),
          el("span", "demo-mono", `${lake.name} ${money(lake.value)}`),
          el("span", "demo-label", lake.math)
        );
        return row;
      }
    );
    root.classList.toggle("is-verdict", shown > LAKES.length);
  };

  const reset = () => {
    shown = 1;
    render();
    live.textContent = STEPS[0] ?? "";
  };

  const step = () => {
    shown += 1;
    render();
    live.textContent = STEPS[shown - 1] ?? "";
    return shown < STEPS.length;
  };

  const { controls } = player({ step, reset, total: () => STEPS.length - 1 });

  root.append(lakes, legend, controls, live);
  reset();
}
