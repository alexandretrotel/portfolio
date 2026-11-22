import {
  caption,
  el,
  enter,
  injectStyles,
  chapterPlayer,
  setup,
} from "./demo-kit";

import styles from "./react-work-loop.css?inline";

type Mode = "mount" | "update";

interface Fiber {
  id: string;
  name: string;
  depth: number;
  children: string[];
  parent?: string;
  flags?: string;
  begin: Record<Mode, string>;
}

const FIBERS: Fiber[] = [
  {
    id: "app",
    name: "App",
    depth: 0,
    children: ["header", "list"],
    begin: {
      mount: "React calls App() and moves to its first child.",
      update: "App has no update, so React reuses it and moves down.",
    },
  },
  {
    id: "header",
    name: "Header",
    depth: 1,
    parent: "app",
    children: [],
    begin: {
      mount: "React calls Header(). It has no child.",
      update: "Header has nothing to do, so React skips it.",
    },
  },
  {
    id: "list",
    name: "List",
    depth: 1,
    parent: "app",
    children: ["item1", "item2", "item3"],
    begin: {
      mount: "React calls List(). It returns two Items.",
      update:
        "The click updated List's state. React calls List() and compares the new children with the old ones by key: Item 3 is new.",
    },
  },
  {
    id: "item1",
    name: "Item 1",
    depth: 2,
    parent: "list",
    children: [],
    flags: "Update",
    begin: {
      mount: "React calls Item() and builds its DOM node in memory.",
      update:
        "Same type and key: React keeps the fiber and flags the new text as Update.",
    },
  },
  {
    id: "item2",
    name: "Item 2",
    depth: 2,
    parent: "list",
    children: [],
    begin: {
      mount: "React calls the second Item.",
      update:
        "List re-rendered, so React calls Item() again. Its output didn't change, so no flag.",
    },
  },
  {
    id: "item3",
    name: "Item 3",
    depth: 2,
    parent: "list",
    children: [],
    flags: "Placement",
    begin: {
      mount: "",
      update: "A new Item: it gets the Placement flag.",
    },
  },
];

const byId = new Map(FIBERS.map((f) => [f.id, f]));

interface Frame {
  id: string;
  phase: "begin" | "complete" | "commit";
  say: string;
}

const buildFrames = (mode: Mode): Frame[] => {
  const visible = (id: string) => mode === "update" || id !== "item3";
  const kids = (f: Fiber) => f.children.filter(visible);
  const frames: Frame[] = [];

  const walk = (f: Fiber) => {
    frames.push({
      id: f.id,
      phase: "begin",
      say: `beginWork(${f.name}): ${f.begin[mode]}`,
    });
    for (const child of kids(f)) {
      const next = byId.get(child);
      if (next) {
        walk(next);
      }
    }
    const siblings =
      f.parent === undefined ? [] : kids(byId.get(f.parent) ?? f);
    const after = siblings[siblings.indexOf(f.id) + 1];
    let move = "back at the top, the render is done.";
    if (after !== undefined) {
      move = `on to its sibling, ${byId.get(after)?.name}.`;
    } else if (f.parent !== undefined) {
      move = `back up to ${byId.get(f.parent)?.name}.`;
    }
    const bubble =
      mode === "update" && kids(f).length > 0
        ? ", collecting its children's flags"
        : "";
    frames.push({
      id: f.id,
      phase: "complete",
      say: `completeWork(${f.name})${bubble}, then ${move}`,
    });
  };

  const app = byId.get("app");
  if (app) {
    walk(app);
  }
  if (mode === "update") {
    frames.push(
      {
        id: "header",
        phase: "commit",
        say: "Commit: Header's branch has no flags, so React skips it.",
      },
      {
        id: "list",
        phase: "commit",
        say: "Two flags, two DOM calls, nothing else touched.",
      }
    );
  }
  return frames;
};

export default function mount(root: HTMLElement) {
  injectStyles("react-work-loop", styles);
  setup(root, "react-work-loop");

  let mode: Mode = "mount";
  let frames = buildFrames(mode);
  let index = -1;

  const tree = el("ol", "react-work-loop-tree");
  tree.setAttribute("aria-label", "Fiber tree");
  const log = el("ol", "react-work-loop-log demo-mono");
  log.setAttribute("aria-label", "Units of work");
  const live = caption("");

  const views = new Map<string, { item: HTMLElement; badge: HTMLElement }>();
  for (const f of FIBERS) {
    const item = el("li", "react-work-loop-fiber");
    item.style.setProperty("--depth", String(f.depth));
    const badge = el("span", "react-work-loop-badge demo-mono");
    item.append(el("span", undefined, f.name), badge);
    tree.append(item);
    views.set(f.id, { item, badge });
  }

  const logFrame = (frame: Frame) => {
    const fiber = byId.get(frame.id);
    const line = el(
      "li",
      undefined,
      `${frame.phase.padEnd(8)} ${fiber?.name ?? ""}`
    );
    line.style.setProperty("--depth", String(fiber?.depth ?? 0));
    log.append(enter(line));
    live.textContent = frame.say;
  };

  const render = () => {
    const seen = frames.slice(0, index + 1);
    const frame = frames[index];
    for (const f of FIBERS) {
      const view = views.get(f.id);
      if (!view) {
        continue;
      }
      const hidden = mode === "mount" && f.id === "item3";
      view.item.hidden = hidden;
      const begun = seen.some((s) => s.id === f.id && s.phase === "begin");
      const completed = seen.some(
        (s) => s.id === f.id && s.phase === "complete"
      );
      view.item.classList.toggle("is-begun", begun && !completed);
      view.item.classList.toggle("is-completed", completed);
      view.item.classList.toggle("is-current", frame?.id === f.id);
      view.item.classList.toggle(
        "is-skipped",
        frame?.phase === "commit" && frame.id === "header" && f.id === "header"
      );

      const parts: string[] = [];
      if (mode === "update" && begun && f.flags !== undefined) {
        parts.push(f.flags);
      }
      if (
        mode === "update" &&
        completed &&
        (f.id === "app" || f.id === "list")
      ) {
        parts.push("subtree: Update | Placement");
      }
      view.badge.textContent = parts.join(" · ");
    }
    if (frame) {
      logFrame(frame);
    }
  };

  const begin = (chapter: Mode) => {
    mode = chapter;
    frames = buildFrames(mode);
    index = -1;
    log.replaceChildren();
    render();
    live.textContent =
      mode === "mount"
        ? "First render. React walks the tree one fiber at a time, and can stop between any two steps."
        : "A click adds Item 3 and changes Item 1's text. Same walk, but now React records flags.";
  };

  const step = () => {
    index += 1;
    render();
    return index < frames.length - 1;
  };

  const { controls, label } = chapterPlayer({
    chapters: [
      ["mount", "First render"],
      ["update", "After a click"],
    ] as const,
    begin,
    step,
    length: (chapter) => buildFrames(chapter).length,
  });

  const body = el("div", "react-work-loop-body");
  body.append(tree, log);

  root.append(label, body, controls, live);
}
