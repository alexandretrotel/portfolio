import {
  caption,
  el,
  enter,
  pop,
  injectStyles,
  chapterPlayer,
  setup,
} from "./demo-kit";

import styles from "./wire-extended.css?inline";

type Mode = "ok" | "error";

interface Event {
  from: "client" | "server";
  name: string;
  detail?: string;
  skips?: string[];
  say: string;
}

const CLIENT = (value: string): Event[] => [
  {
    from: "client",
    name: "Parse",
    detail: "SELECT * FROM users WHERE id = $1",
    say: "Parse sends the SQL with a $1 placeholder, without waiting for an answer.",
  },
  {
    from: "client",
    name: "Bind",
    detail: `$1 = ${value}`,
    say: "Bind sends the value in its own message, never inside the SQL.",
  },
  {
    from: "client",
    name: "Describe",
    say: "Describe asks what the result will look like.",
  },
  { from: "client", name: "Execute", say: "Execute runs it." },
  {
    from: "client",
    name: "Sync",
    say: "Sync closes the batch: five messages sent, no round trip yet.",
  },
];

const SCRIPTS: Record<Mode, Event[]> = {
  ok: [
    ...CLIENT("42"),
    {
      from: "server",
      name: "ParseComplete",
      say: "The server works through the batch in order: the statement is prepared.",
    },
    { from: "server", name: "BindComplete", say: "The value is bound to $1." },
    {
      from: "server",
      name: "RowDescription",
      detail: "id int4, email text",
      say: "Describe answers with the columns.",
    },
    {
      from: "server",
      name: "DataRow",
      detail: "42, ann@mail.com",
      say: "Execute sends the row.",
    },
    {
      from: "server",
      name: "CommandComplete",
      detail: "SELECT 1",
      say: "Done, one row.",
    },
    {
      from: "server",
      name: "ReadyForQuery",
      detail: "I",
      say: "Sync gets its ReadyForQuery, and the server is idle again.",
    },
  ],
  error: [
    ...CLIENT("'abc'"),
    {
      from: "server",
      name: "ParseComplete",
      say: "The statement is prepared.",
    },
    {
      from: "server",
      name: "ErrorResponse",
      detail: "22P02 invalid input syntax for type integer",
      skips: ["Describe", "Execute"],
      say: "'abc' isn't an integer, so Bind fails with an ErrorResponse.",
    },
    {
      from: "server",
      name: "ReadyForQuery",
      detail: "I",
      say: "The server discards Describe and Execute until Sync, so both sides get back in step.",
    },
  ],
};

export default function mount(root: HTMLElement) {
  injectStyles("wire-extended", styles);
  setup(root, "wire-extended");

  let mode: Mode = "ok";
  let index = 0;

  const heads = el("div", "wire-extended-heads");
  heads.append(
    el("span", "demo-label", "client"),
    el("span", "demo-label", "server")
  );
  const list = el("ol", "wire-extended-list");
  list.setAttribute("aria-label", "Messages");
  const live = caption("Press Start to send the batch.");

  const begin = (chapter: Mode) => {
    mode = chapter;
    index = 0;
    list.replaceChildren(
      ...SCRIPTS[mode]
        .filter((event) => event.from === "client")
        .map((event) => {
          const item = el("li", "wire-extended-msg is-client is-ghost");
          item.dataset.name = event.name;
          item.append(el("span", "wire-extended-name", `→ ${event.name}`));
          if (event.detail !== undefined) {
            item.append(
              el("span", "demo-mono wire-extended-detail", event.detail)
            );
          }
          return item;
        })
    );
    live.textContent =
      mode === "ok"
        ? "The driver has five messages ready for a query with one parameter, $1 = 42."
        : "Same batch, but this time the value for $1 is 'abc'.";
  };

  const step = () => {
    const event = SCRIPTS[mode][index];
    if (!event) {
      return false;
    }
    index += 1;
    const queued = list.querySelector<HTMLElement>(
      `.is-ghost[data-name="${event.name}"]`
    );
    if (event.from === "client" && queued) {
      queued.classList.remove("is-ghost");
      pop(queued);
      live.textContent = event.say;
      return index < SCRIPTS[mode].length;
    }
    const item = el("li", `wire-extended-msg is-${event.from}`);
    item.dataset.name = event.name;
    if (event.name === "ErrorResponse") {
      item.classList.add("is-error");
    }
    item.append(
      el(
        "span",
        "wire-extended-name",
        `${event.from === "client" ? "→" : "←"} ${event.name}`
      )
    );
    if (event.detail !== undefined) {
      item.append(el("span", "demo-mono wire-extended-detail", event.detail));
    }
    list.append(enter(item));
    for (const name of event.skips ?? []) {
      list.querySelector(`[data-name="${name}"]`)?.classList.add("is-skipped");
    }
    live.textContent = event.say;
    return index < SCRIPTS[mode].length;
  };

  const { controls, label } = chapterPlayer({
    chapters: [
      ["ok", "Everything works"],
      ["error", "Bind fails"],
    ] as const,
    begin,
    step,
    length: (chapter) => SCRIPTS[chapter].length,
  });

  root.append(label, heads, list, controls, live);
}
