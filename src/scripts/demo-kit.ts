import styles from "./demo-kit.css?inline";

const injected = new Set<string>();

export const injectStyles = (id: string, css: string) => {
  if (injected.has(id)) {
    return;
  }
  injected.add(id);
  const style = document.createElement("style");
  style.dataset.demo = id;
  style.textContent = css;
  document.head.append(style);
};

export const el = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string
): HTMLElementTagNameMap[K] => {
  const node = document.createElement(tag);
  if (className !== undefined) {
    node.className = className;
  }
  if (text !== undefined) {
    node.textContent = text;
  }
  return node;
};

export const button = (label: string, onClick: () => void) => {
  const node = el("button", undefined, label);
  node.type = "button";
  node.addEventListener("click", onClick);
  return node;
};

export const reducedMotion = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches;

const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

export const flash = (node: HTMLElement | undefined, className = "is-new") => {
  if (!node) {
    return;
  }
  node.classList.remove(className);
  void node.offsetWidth;
  node.classList.add(className);
};

export const pop = (node: HTMLElement | undefined) => {
  if (!node || reducedMotion()) {
    return;
  }
  node.animate(
    [
      { transform: "scale(0.94)", opacity: 0.5 },
      { transform: "none", opacity: 1 },
    ],
    { duration: 220, easing: EASE_OUT }
  );
};

export const enter = <T extends HTMLElement>(node: T): T => {
  node.classList.add("demo-enter");
  node.addEventListener(
    "animationend",
    () => {
      node.classList.remove("demo-enter");
    },
    { once: true }
  );
  return node;
};

export const sync = <T>(
  parent: HTMLElement,
  items: readonly T[],
  key: (item: T) => string,
  create: (item: T) => HTMLElement,
  update?: (node: HTMLElement, item: T) => void
) => {
  const existing = new Map<string, HTMLElement>();
  for (const child of parent.children) {
    if (child instanceof HTMLElement && child.dataset.key !== undefined) {
      existing.set(child.dataset.key, child);
    }
  }
  const wanted = new Set<string>();
  for (const [index, item] of items.entries()) {
    const id = key(item);
    wanted.add(id);
    let node = existing.get(id);
    if (!node) {
      node = enter(create(item));
      node.dataset.key = id;
    }
    update?.(node, item);
    const at = parent.children[index];
    if (at === undefined) {
      parent.append(node);
    } else if (at !== node) {
      at.before(node);
    }
  }
  for (const [id, node] of existing) {
    if (!wanted.has(id)) {
      node.remove();
    }
  }
};

export const setup = (root: HTMLElement, name: string) => {
  injectStyles("demo-kit", styles);
  root.classList.add("demo", name);
  root.replaceChildren();
};

export const caption = (initial: string) => {
  const node = el("p", "demo-caption", initial);
  node.setAttribute("aria-live", "polite");
  let last = initial;
  new MutationObserver(() => {
    if (node.textContent === last) {
      return;
    }
    last = node.textContent;
    node.animate(
      reducedMotion()
        ? [{ opacity: 0.4 }, { opacity: 1 }]
        : [
            { opacity: 0.35, filter: "blur(2px)" },
            { opacity: 1, filter: "blur(0)" },
          ],
      { duration: 240, easing: EASE_OUT }
    );
  }).observe(node, { childList: true, characterData: true, subtree: true });
  return node;
};

export const modes = <T extends string>(
  label: string,
  options: readonly (readonly [T, string])[],
  initial: T,
  onChange: (value: T) => void
) => {
  const group = el("div", "demo-modes");
  group.setAttribute("role", "group");
  group.setAttribute("aria-label", label);
  const buttons = options.map(([value, text]) => {
    const node = button(text, () => {
      select(value);
      onChange(value);
    });
    node.dataset.value = value;
    group.append(node);
    return node;
  });
  const select = (value: T) => {
    for (const node of buttons) {
      node.setAttribute("aria-pressed", String(node.dataset.value === value));
    }
  };
  select(initial);
  return group;
};

interface PlayerOptions {
  step: () => boolean;
  reset: () => void;
  total?: () => number | undefined;
}

export const player = ({ step, reset, total }: PlayerOptions) => {
  let count = 0;
  let done = false;

  const controls = el("div", "demo-controls");
  const progress = el("span", "demo-progress demo-mono");
  progress.setAttribute("aria-hidden", "true");

  const render = () => {
    nextBtn.disabled = done;
    let label = "Next step";
    if (count === 0) {
      label = "Start";
    } else if (done) {
      label = "Done";
    }
    nextBtn.textContent = label;
    const of = total?.();
    let text = of === undefined ? `step ${count}` : `${count} / ${of}`;
    if (of === undefined && count === 0) {
      text = "";
    }
    progress.textContent = text;
  };

  const restart = () => {
    count = 0;
    done = false;
    reset();
    render();
  };

  const nextBtn = button("Start", () => {
    if (done) {
      return;
    }
    count += 1;
    if (!step()) {
      done = true;
    }
    render();
    if (done) {
      restartBtn.focus();
    }
  });
  nextBtn.classList.add("demo-primary");
  const restartBtn = button("Restart", restart);
  controls.append(nextBtn, restartBtn, progress);
  render();

  return { controls, restart };
};

interface ChapterOptions<T extends string> {
  chapters: readonly (readonly [T, string])[];
  begin: (chapter: T) => void;
  step: (chapter: T) => boolean;
  length: (chapter: T) => number | undefined;
}

export const chapterPlayer = <T extends string>({
  chapters,
  begin,
  step,
  length,
}: ChapterOptions<T>) => {
  let at = 0;
  let between = false;
  const label = el("p", "demo-chapter");

  const current = (): T | undefined => chapters[at]?.[0];

  const show = () => {
    const name = chapters[at]?.[1] ?? "";
    label.textContent =
      chapters.length > 1 ? `${at + 1} of ${chapters.length} · ${name}` : name;
  };

  const open = () => {
    const chapter = current();
    if (chapter !== undefined) {
      begin(chapter);
    }
    show();
  };

  const reset = () => {
    at = 0;
    between = false;
    open();
  };

  const advance = () => {
    if (between) {
      at += 1;
      between = false;
      open();
      pop(label);
      return true;
    }
    const chapter = current();
    if (chapter === undefined) {
      return false;
    }
    if (step(chapter)) {
      return true;
    }
    if (at === chapters.length - 1) {
      return false;
    }
    between = true;
    return true;
  };

  const total = () => {
    const steps = chapters.map(([chapter]) => length(chapter));
    return steps.every((n): n is number => n !== undefined)
      ? steps.reduce((sum, n) => sum + n, chapters.length - 1)
      : undefined;
  };

  const { controls } = player({ step: advance, reset, total });
  reset();
  return { controls, label };
};
