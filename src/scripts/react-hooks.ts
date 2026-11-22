import {
  caption,
  el,
  enter,
  injectStyles,
  chapterPlayer,
  pop,
  setup,
  sync,
} from "./demo-kit";

import styles from "./react-hooks.css?inline";

type Mode = "order" | "value" | "updater";

interface Slot {
  hook: string;
  value: string;
}

interface Frame {
  code: string[];
  line?: number;
  slots: Slot[];
  cursor?: number;
  wrong?: boolean;
  queue?: string[];
  queueAt?: number;
  state?: string;
  error?: string;
  say: string;
}

const PROFILE = (editing: boolean) => [
  `function Profile({ editing }) {   // editing = ${editing}`,
  "  if (editing) {",
  '    const [name, setName] = useState("ann");',
  "  }",
  "  const inputRef = useRef(null);",
  "  const upper = useMemo(() => …, [name]);",
  "}",
];

const SLOTS: Slot[] = [
  { hook: "useState", value: '"ann"' },
  { hook: "useRef", value: "{ current: null }" },
  { hook: "useMemo", value: '"ANN"' },
];

const ORDER: Frame[] = [
  {
    code: PROFILE(true),
    line: 2,
    slots: SLOTS.slice(0, 1),
    cursor: 0,
    say: "First render: useState creates slot 1.",
  },
  {
    code: PROFILE(true),
    line: 4,
    slots: SLOTS.slice(0, 2),
    cursor: 1,
    say: "useRef creates slot 2.",
  },
  {
    code: PROFILE(true),
    line: 5,
    slots: SLOTS,
    cursor: 2,
    say: "useMemo creates slot 3: three hooks, known only by position.",
  },
  {
    code: PROFILE(false),
    slots: SLOTS,
    say: "Next render, editing is false, so useState is never called.",
  },
  {
    code: PROFILE(false),
    line: 4,
    slots: SLOTS,
    cursor: 0,
    wrong: true,
    say: "useRef is called first, so it gets slot 1: the useState hook.",
  },
  {
    code: PROFILE(false),
    line: 5,
    slots: SLOTS,
    cursor: 1,
    wrong: true,
    say: "useMemo gets slot 2, the ref object: every hook is now off by one.",
  },
  {
    code: PROFILE(false),
    slots: SLOTS,
    cursor: 2,
    error:
      "Rendered fewer hooks than expected. This may be caused by an accidental early return statement.",
    say: "Slot 3 is never read, so React throws.",
  },
];

const CLICK = (call: string) => [
  "function onClick() {   // count is 0",
  `  setCount(${call});`,
  `  setCount(${call});`,
  `  setCount(${call});`,
  "}",
];

const queueFrames = (updater: boolean): Frame[] => {
  const call = updater ? "c => c + 1" : "count + 1";
  const item = updater ? "c => c + 1" : "1";
  const code = CLICK(call);
  const slots = [{ hook: "useState", value: "0" }];
  const frames: Frame[] = [];
  const first = updater
    ? "Each setCount(c => c + 1) queues the function itself."
    : "count is 0, so each setCount(count + 1) queues the value 1.";
  for (let i = 0; i < 3; i += 1) {
    frames.push({
      code,
      line: i + 1,
      slots,
      queue: Array.from({ length: i + 1 }, () => item),
      state: "0",
      say:
        i === 0
          ? first
          : "Another update joins the queue, and nothing renders yet.",
    });
  }
  const queue = Array.from({ length: 3 }, () => item);
  let state = 0;
  for (let i = 0; i < 3; i += 1) {
    const next = updater ? state + 1 : 1;
    frames.push({
      code,
      slots: [{ hook: "useState", value: String(next) }],
      queue,
      queueAt: i,
      state: String(next),
      say: updater
        ? `The render runs the queue in order: ${state} → ${next}.`
        : `The render runs the queue in order: ${state} → ${next}.`,
    });
    state = next;
  }
  frames.push({
    code,
    slots: [{ hook: "useState", value: String(state) }],
    queue,
    queueAt: 3,
    state: String(state),
    say: updater
      ? "count is 3: each function got the previous result."
      : 'count is 1, not 3: every update said "set to 1".',
  });
  return frames;
};

const FRAMES: Record<Mode, () => Frame[]> = {
  order: () => ORDER,
  value: () => queueFrames(false),
  updater: () => queueFrames(true),
};

export default function mount(root: HTMLElement) {
  injectStyles("react-hooks", styles);
  setup(root, "react-hooks");

  const slotsOnly = root.dataset.demo === "react-hook-slots";
  let mode: Mode = slotsOnly ? "order" : "value";
  let frames = FRAMES[mode]();
  let index = -1;

  const code = el("pre", "react-hooks-code");
  const side = el("div", "react-hooks-side");
  const live = caption("");

  const slotList = el("ol", "react-hooks-slots");
  slotList.setAttribute("aria-label", "fiber.memoizedState");
  const queueLabel = el("span", "demo-label", "update queue");
  const queueList = el("ol", "react-hooks-queue demo-mono");
  queueList.setAttribute("aria-label", "Update queue");
  const error = el("p", "react-hooks-error demo-mono");
  side.append(
    el("span", "demo-label", "fiber.memoizedState →"),
    slotList,
    queueLabel,
    queueList,
    error
  );

  const render = () => {
    const frame = frames[index] ?? frames[0];
    if (!frame) {
      return;
    }
    const started = index >= 0;

    sync(
      code,
      frame.code.map((text, i) => ({ text, i })),
      ({ i }) => String(i),
      () => el("span", "react-hooks-line"),
      (node, { text, i }) => {
        node.textContent = text;
        node.classList.toggle("is-current", started && frame.line === i);
      }
    );

    const slots = !started && mode === "order" ? [] : frame.slots;
    sync(
      slotList,
      slots.map((slot, i) => ({ slot, i })),
      ({ i }) => String(i),
      () => {
        const item = el("li", "react-hooks-slot");
        item.append(el("span", "demo-label"), el("span", "demo-mono"));
        return item;
      },
      (node, { slot, i }) => {
        const [label, value] = node.children;
        if (label) {
          label.textContent = `slot ${i + 1} · ${slot.hook}`;
        }
        if (value instanceof HTMLElement && value.textContent !== slot.value) {
          if (value.textContent !== "") {
            pop(value);
          }
          value.textContent = slot.value;
        }
        const current = started && frame.cursor === i;
        node.classList.toggle("is-current", current);
        node.classList.toggle("is-wrong", current && frame.wrong === true);
      }
    );

    const queue = started ? (frame.queue ?? []) : [];
    queueLabel.hidden = slotsOnly;
    queueList.hidden = slotsOnly;
    sync(
      queueList,
      queue.map((item, i) => ({ item, i })),
      ({ i }) => String(i),
      ({ item }) => el("li", undefined, item),
      (node, { i }) => {
        node.classList.toggle(
          "is-done",
          frame.queueAt !== undefined && i < frame.queueAt
        );
        node.classList.toggle("is-current", frame.queueAt === i);
      }
    );

    const message =
      started && frame.error !== undefined ? `Error: ${frame.error}` : "";
    if (error.textContent !== message) {
      error.textContent = message;
      if (message !== "") {
        enter(error);
      }
    }
    error.hidden = message === "";

    if (started) {
      live.textContent = frame.say;
    }
  };

  const begin = (chapter: Mode) => {
    mode = chapter;
    frames = FRAMES[mode]();
    index = -1;
    render();
    live.textContent =
      mode === "order"
        ? "A hook called inside an if."
        : "Three setCount calls in one click handler.";
  };

  const step = () => {
    index += 1;
    render();
    return index < frames.length - 1;
  };

  const { controls, label } = chapterPlayer({
    chapters: slotsOnly
      ? ([["order", "A hook inside an if"]] as const)
      : ([
          ["value", "setCount(count + 1) ×3"],
          ["updater", "setCount(c => c + 1) ×3"],
        ] as const),
    begin,
    step,
    length: (chapter) => FRAMES[chapter]().length,
  });

  const body = el("div", "react-hooks-body");
  const codeWrap = el("div", "demo-scroll");
  codeWrap.append(code);
  body.append(codeWrap, side);

  root.append(label, body, controls, live);
}
