import styles from "./clock-sweep.css?inline";

const injectStyles = () => {
  const style = document.createElement("style");
  style.textContent = styles;
  document.head.append(style);
};

interface Slot {
  page: string;
  usage: number;
  pinned: boolean;
}

const MAX_USAGE = 5;
const TICK_MS = 1100;

const INITIAL: Slot[] = [
  { page: "users p0", usage: 3, pinned: false },
  { page: "orders p2", usage: 0, pinned: false },
  { page: "users p3", usage: 2, pinned: true },
  { page: "orders p0", usage: 5, pinned: false },
  { page: "idx p1", usage: 1, pinned: false },
  { page: "users p5", usage: 0, pinned: false },
  { page: "orders p7", usage: 2, pinned: false },
  { page: "idx p0", usage: 4, pinned: false },
];

const INCOMING = [
  "orders p9",
  "users p8",
  "idx p4",
  "orders p12",
  "users p11",
  "idx p6",
];

const el = <K extends keyof HTMLElementTagNameMap>(
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

const mount = (root: HTMLElement) => {
  const slots = INITIAL.map((slot) => ({ ...slot }));
  let hand = 0;
  let turns = 0;
  let incoming = 0;
  let timer: number | undefined;

  root.classList.add("clock-sweep");

  const dial = el("div", "clock-sweep-dial");
  const handEl = el("div", "clock-sweep-hand");
  handEl.setAttribute("aria-hidden", "true");

  const list = el("ol", "clock-sweep-slots");
  list.setAttribute("role", "list");
  list.setAttribute("aria-label", "Buffer slots");

  const items = slots.map((_, index) => {
    const item = el("li", "clock-sweep-slot");
    item.style.setProperty("--i", String(index));
    const name = el("span", "clock-sweep-page");
    const dots = el("span", "clock-sweep-dots");
    dots.setAttribute("aria-hidden", "true");
    for (let d = 0; d < MAX_USAGE; d += 1) {
      dots.append(el("span", "clock-sweep-dot"));
    }
    const state = el("span", "visually-hidden");
    item.append(name, dots, state);
    list.append(item);
    return { item, name, dots, state };
  });

  dial.append(handEl, list);

  const caption = el(
    "p",
    "clock-sweep-caption",
    "The hand looks for a slot to reuse."
  );
  caption.setAttribute("aria-live", "polite");

  const controls = el("div", "clock-sweep-controls");
  const stepBtn = el("button", undefined, "Step");
  const playBtn = el("button", undefined, "Play");
  for (const button of [stepBtn, playBtn]) {
    button.type = "button";
    controls.append(button);
  }

  root.replaceChildren(dial, controls, caption);

  const render = () => {
    for (const [index, slot] of slots.entries()) {
      const view = items[index];
      if (!view) {
        continue;
      }
      view.name.textContent = slot.page;
      view.item.classList.toggle("is-current", index === hand);
      view.item.classList.toggle("is-pinned", slot.pinned);
      for (const [d, dot] of [...view.dots.children].entries()) {
        dot.classList.toggle("is-on", d < slot.usage);
      }
      view.state.textContent = `, usage count ${slot.usage}${slot.pinned ? ", pinned" : ""}${index === hand ? ", hand is here" : ""}`;
    }
    root.style.setProperty("--hand-turn", String(turns * slots.length + hand));
  };

  const say = (text: string) => {
    caption.textContent = text;
  };

  const advance = () => {
    hand += 1;
    if (hand === slots.length) {
      hand = 0;
      turns += 1;
    }
  };

  const flash = (index: number) => {
    const item = items[index]?.item;
    if (!item) {
      return;
    }
    item.classList.remove("is-evicted");
    void item.offsetWidth;
    item.classList.add("is-evicted");
  };

  const step = () => {
    const slot = slots[hand];
    if (!slot) {
      return;
    }
    if (slot.pinned) {
      say(`${slot.page} is pinned by a backend. Skip it.`);
    } else if (slot.usage > 0) {
      say(
        `${slot.page} was used recently. Count ${slot.usage} → ${slot.usage - 1}, move on.`
      );
      slot.usage -= 1;
    } else {
      const next = INCOMING[incoming % INCOMING.length] ?? "users p1";
      incoming += 1;
      say(
        `${slot.page} has count 0. Evict it and load ${next} into this slot.`
      );
      slot.page = next;
      slot.usage = 1;
      flash(hand);
    }
    advance();
    render();
  };

  const use = () => {
    const candidates = slots
      .map((slot, index) => ({ slot, index }))
      .filter(({ index }) => index !== hand);
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    if (!pick) {
      return;
    }
    const before = pick.slot.usage;
    pick.slot.usage = Math.min(MAX_USAGE, before + 1);
    say(
      before === MAX_USAGE
        ? `A query reads ${pick.slot.page}. Its count is already at the maximum, ${MAX_USAGE}.`
        : `A query reads ${pick.slot.page}. Count ${before} → ${pick.slot.usage}.`
    );
    render();
  };

  const stop = () => {
    window.clearInterval(timer);
    timer = undefined;
    playBtn.textContent = "Play";
    caption.setAttribute("aria-live", "polite");
  };

  const play = () => {
    caption.setAttribute("aria-live", "off");
    playBtn.textContent = "Pause";
    timer = window.setInterval(() => {
      if (Math.random() < 0.3) {
        use();
      } else {
        step();
      }
    }, TICK_MS);
  };

  stepBtn.addEventListener("click", () => {
    stop();
    step();
  });
  playBtn.addEventListener("click", () => {
    if (timer === undefined) {
      play();
    } else {
      stop();
    }
  });

  render();

  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        if (timer === undefined) {
          play();
        }
      }
    });
    observer.observe(root);
  }
};

export const mountClockSweeps = () => {
  injectStyles();
  for (const root of document.querySelectorAll<HTMLElement>(
    "[data-clock-sweep]"
  )) {
    mount(root);
  }
};
