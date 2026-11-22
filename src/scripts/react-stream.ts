import {
  caption,
  el,
  enter,
  injectStyles,
  player,
  pop,
  setup,
  sync,
} from "./demo-kit";

import styles from "./react-stream.css?inline";

type State = "pending" | "queued" | "done";

interface Boundary {
  title: string;
  fallback: string;
  content: string;
}

const BOUNDARIES: Boundary[] = [
  {
    title: "Reviews",
    fallback: "Loading reviews...",
    content: "★★★★★ Great product",
  },
  {
    title: "Related",
    fallback: "Loading related...",
    content: "Blue socks · Red laces",
  },
  {
    title: "Questions",
    fallback: "Loading questions...",
    content: "Do they run small? No.",
  },
];

const COMMENT: Record<State, string> = {
  pending: "<!--$?-->",
  queued: "<!--$~-->",
  done: "<!--$-->",
};

interface Frame {
  t: number;
  chunk?: string;
  set: [number, State][];
  say: string;
}

const FRAMES: Frame[] = [
  {
    t: 0,
    chunk: '<main><h1>My shop</h1> ×3: <!--$?--><template id="B:n"> + fallback',
    set: [],
    say: "The shell arrives first, with a fallback in each boundary, and the response stays open.",
  },
  {
    t: 1200,
    chunk: '<div hidden id="S:0">…</div><script>$RC("B:0","S:0")</script>',
    set: [[0, "queued"]],
    say: "Reviews are ready: $RC queues them and marks the boundary $~.",
  },
  {
    t: 1216,
    set: [[0, "done"]],
    say: "On the next frame, $RV swaps the fallback for the reviews.",
  },
  {
    t: 1250,
    chunk: '<div hidden id="S:1">…</div><script>$RC("B:1","S:1")</script>',
    set: [[1, "queued"]],
    say: "Related arrives right after, so it waits in the batch instead of making the page jump again.",
  },
  {
    t: 1300,
    chunk: '<div hidden id="S:2">…</div><script>$RC("B:2","S:2")</script>',
    set: [[2, "queued"]],
    say: "Questions join the same batch.",
  },
  {
    t: 1516,
    set: [
      [1, "done"],
      [2, "done"],
    ],
    say: "300ms later, $RV reveals both at once: one jump instead of two.",
  },
];

export default function mount(root: HTMLElement) {
  injectStyles("react-stream", styles);
  setup(root, "react-stream");

  let index = -1;
  let states: State[] = [];

  const clock = el("p", "react-stream-clock demo-mono");
  const panes = el("div", "react-stream-panes");

  const page = el("div", "react-stream-page demo-box");
  const response = el("ol", "react-stream-response demo-mono");
  response.setAttribute("aria-label", "Response chunks");

  const pageWrap = el("div");
  pageWrap.append(el("span", "demo-label", "what the user sees"), page);
  const responseWrap = el("div");
  responseWrap.append(
    el("span", "demo-label", "HTTP response so far"),
    response
  );
  panes.append(pageWrap, responseWrap);

  const live = caption("");

  const renderPage = (changed: number[]) => {
    const shown =
      index < 0 ? [] : ["title", ...BOUNDARIES.map((_, i) => String(i))];
    sync(
      page,
      shown,
      (id) => id,
      (id) => {
        if (id === "title") {
          return el("strong", undefined, "My shop");
        }
        const row = el("div", "react-stream-boundary");
        row.append(
          el("span", "demo-mono react-stream-comment"),
          el("span", "react-stream-text")
        );
        return row;
      },
      (node, id) => {
        const i = Number(id);
        const b = BOUNDARIES[i];
        if (id === "title" || !b) {
          return;
        }
        const state = states[i] ?? "pending";
        node.className = `react-stream-boundary is-${state}`;
        const comment = node.querySelector<HTMLElement>(
          ".react-stream-comment"
        );
        const text = node.querySelector<HTMLElement>(".react-stream-text");
        const content = state === "done" ? b.content : b.fallback;
        if (comment && comment.textContent !== COMMENT[state]) {
          comment.textContent = COMMENT[state];
          if (changed.includes(i)) {
            pop(comment);
          }
        }
        if (text && text.textContent !== content) {
          text.textContent = content;
          if (changed.includes(i)) {
            pop(text);
          }
        }
      }
    );
  };

  const reset = () => {
    index = -1;
    states = BOUNDARIES.map(() => "pending");
    response.replaceChildren();
    clock.textContent = "t = 0 ms";
    renderPage([]);
    step();
  };

  const step = () => {
    index += 1;
    const frame = FRAMES[index];
    if (!frame) {
      return false;
    }
    for (const [i, state] of frame.set) {
      states[i] = state;
    }
    if (frame.chunk !== undefined) {
      const item = el("li", undefined, frame.chunk);
      response.append(enter(item));
    }
    clock.textContent = `t = ${frame.t} ms`;
    live.textContent = frame.say;
    renderPage(frame.set.map(([i]) => i));
    return index < FRAMES.length - 1;
  };

  const { controls } = player({ step, reset, total: () => FRAMES.length - 1 });

  root.append(clock, panes, controls, live);
  reset();
}
