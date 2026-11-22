import { el, injectStyles, setup } from "./demo-kit";

import styles from "./wire-message.css?inline";

const hex = (byte: number) => byte.toString(16).padStart(2, "0");

const printable = (byte: number) =>
  byte >= 0x20 && byte < 0x7f ? String.fromCodePoint(byte) : "·";

const cell = (kind: string, top: string, bottom: string) => {
  const item = el("li", `wire-message-byte is-${kind}`);
  item.append(el("span", "demo-mono", top), el("span", "demo-label", bottom));
  return item;
};

export default function mount(root: HTMLElement) {
  injectStyles("wire-message", styles);
  setup(root, "wire-message");

  const field = el("label", "wire-message-field");
  field.append(el("span", "demo-label", "Query"));
  const input = el("input");
  input.type = "text";
  input.value = "SELECT 1";
  input.maxLength = 64;
  input.spellcheck = false;
  input.autocomplete = "off";
  field.append(input);

  const bytes = el("ol", "wire-message-bytes");
  bytes.setAttribute("aria-label", "Message bytes");
  const sum = el("p", "demo-caption");
  sum.setAttribute("aria-live", "polite");

  root.append(field, bytes, sum);

  const render = () => {
    const sql = new TextEncoder().encode(input.value);
    const length = 4 + sql.length + 1;
    const lengthBytes = [3, 2, 1, 0].map(
      (k) => Math.floor(length / 256 ** k) % 256
    );

    const cells = [
      cell("type", "51", "Q"),
      ...lengthBytes.map((byte) => cell("length", hex(byte), "len")),
      ...[...sql].map((byte) => cell("sql", hex(byte), printable(byte))),
      cell("zero", "00", "\\0"),
    ];
    bytes.replaceChildren(...cells);

    sum.textContent = `${1 + length} bytes: one type byte, then a length of ${length} that counts itself, the SQL and a zero byte.`;
  };

  input.addEventListener("input", render);
  render();
}
