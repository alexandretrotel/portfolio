import { el, injectStyles, modes, setup } from "./demo-kit";

import styles from "./switch-bar.css?inline";

const BIAS = 3;
const MAX = 20;

const CHOICES = [
  ["3", "3×"],
  ["9", "9×"],
  ["15", "15×"],
] as const;

type Choice = (typeof CHOICES)[number][0];

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

const verdictFor = (think: number, feels: number) => {
  if (feels > 1) {
    return `It feels ${fmt(feels)}× better to the customer. Enough for them to switch.`;
  }
  if (think === 9) {
    return "Exactly 9×, and it feels like a tie. The customer keeps what they have.";
  }
  return `It feels ${fmt(feels)}× as good as their spreadsheet. They keep the spreadsheet.`;
};

export default function mount(root: HTMLElement) {
  injectStyles("switch-bar", styles);
  setup(root, "switch-bar");

  const field = el("div", "demo-field");
  field.append(
    el("span", "demo-label", "How much better do you think your product is?")
  );

  const chart = el("div", "switch-bar-chart");
  const line = el("div", "switch-bar-line");
  line.append(el("span", "demo-label", "1×, as good as what they have"));
  line.style.setProperty("--x", String(1 / MAX));

  const bar = (text: string) => {
    const row = el("div", "switch-bar-row");
    const name = el("span", "demo-label", text);
    const track = el("div", "switch-bar-track");
    const fill = el("div", "switch-bar-fill");
    const value = el("span", "demo-mono switch-bar-value");
    track.append(fill);
    row.append(name, track, value);
    chart.append(row);
    return { row, fill, value };
  };

  const you = bar("what you think");
  const real = bar("what it really is");
  const felt = bar("what the customer feels");
  chart.append(line);

  const verdict = el("p", "demo-caption");
  verdict.setAttribute("aria-live", "polite");

  const render = (think: number) => {
    const actual = think / BIAS;
    const feels = actual / BIAS;
    for (const [view, n] of [
      [you, think],
      [real, actual],
      [felt, feels],
    ] as const) {
      view.fill.style.setProperty("--x", String(Math.min(n, MAX) / MAX));
      view.value.textContent = `${fmt(n)}×`;
    }
    felt.row.classList.toggle("is-enough", feels > 1);
    verdict.textContent = verdictFor(think, feels);
  };

  field.append(
    modes<Choice>("Your estimate", CHOICES, "3", (value) => {
      render(Number(value));
    })
  );

  root.append(field, chart, verdict);
  render(3);
}
