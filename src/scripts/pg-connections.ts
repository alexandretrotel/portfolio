import {
  caption,
  el,
  injectStyles,
  chapterPlayer,
  pop,
  setup,
  sync,
} from "./demo-kit";

import styles from "./pg-connections.css?inline";

type Mode = "direct" | "pooler";

const MAX_CONNECTIONS = 8;
const POOL_SIZE = 3;
const POOL_CLIENTS = 10;
const QUERY_TICKS = 2;

interface Client {
  id: number;
  state: "idle" | "waiting" | "running" | "done" | "refused";
  backend?: number;
  left: number;
}

const section = (label: string, node: HTMLElement) => {
  const wrap = el("div", "pg-connections-section");
  wrap.append(el("span", "demo-label", label), node);
  return wrap;
};

export default function mount(root: HTMLElement) {
  injectStyles("pg-connections", styles);
  setup(root, "pg-connections");

  let mode: Mode = "direct";
  let clients: Client[] = [];
  let backends: (number | undefined)[] = [];
  let tick = 0;

  const clientRow = el("ol", "pg-connections-row");
  clientRow.setAttribute("aria-label", "Clients");
  const middle = el("div", "pg-connections-middle demo-box");
  const backendRow = el("ol", "pg-connections-row is-backends");
  backendRow.setAttribute("aria-label", "Backend processes");
  const live = caption("");

  const render = () => {
    middle.textContent = mode === "direct" ? "postmaster" : "PgBouncer";
    sync(
      clientRow,
      clients,
      (client) => String(client.id),
      (client) => el("li", "pg-connections-chip", `C${client.id}`),
      (node, client) => {
        node.className = `pg-connections-chip is-${client.state}`;
        node.title = client.state;
      }
    );
    sync(
      backendRow,
      backends.map((owner, index) => ({ owner, index })),
      ({ index }) => String(index),
      () => {
        const slot = el("li", "pg-connections-slot");
        slot.append(el("span", "pg-connections-owner"));
        return slot;
      },
      (node, { owner }) => {
        node.classList.toggle("is-busy", owner !== undefined);
        const label = node.querySelector<HTMLElement>(".pg-connections-owner");
        const text = owner === undefined ? "free" : `C${owner}`;
        if (label && label.textContent !== text) {
          label.textContent = text;
          if (owner !== undefined) {
            pop(label);
          }
        }
      }
    );
  };

  const begin = (chapter: Mode) => {
    mode = chapter;
    tick = 0;
    if (mode === "direct") {
      clients = [];
      backends = [];
      for (let i = 0; i < 3; i += 1) {
        stepDirect();
      }
      live.textContent = `Three clients, three processes: each connection gets its own.`;
    } else {
      clients = Array.from({ length: POOL_CLIENTS }, (_, i) => ({
        id: i + 1,
        state: "idle",
        left: 0,
      }));
      backends = Array.from<number | undefined>({ length: POOL_SIZE });
      live.textContent = `${POOL_CLIENTS} clients talk to the pooler, which keeps only ${POOL_SIZE} processes open.`;
    }
    render();
  };

  const stepDirect = () => {
    const id = clients.length + 1;
    if (backends.length >= MAX_CONNECTIONS) {
      clients.push({ id, state: "refused", left: 0 });
      render();
      live.textContent = `C${id} is refused: every slot holds a whole process, even an idle one.`;
      return false;
    }
    clients.push({ id, state: "running", backend: backends.length, left: 0 });
    backends.push(id);
    render();
    live.textContent = `C${id} connects, and the postmaster forks a new process for it (${backends.length} of ${MAX_CONNECTIONS}).`;
    return true;
  };

  const stepPooler = () => {
    tick += 1;

    for (const client of clients) {
      if (client.state === "running") {
        client.left -= 1;
        if (client.left === 0 && client.backend !== undefined) {
          backends[client.backend] = undefined;
          client.state = "done";
          delete client.backend;
        }
      }
    }

    for (const client of clients
      .filter((c) => c.state === "idle")
      .slice(0, 2)) {
      client.state = "waiting";
    }

    for (const client of clients.filter((c) => c.state === "waiting")) {
      const free = backends.indexOf(undefined);
      if (free === -1) {
        break;
      }
      backends[free] = client.id;
      client.state = "running";
      client.backend = free;
      client.left = QUERY_TICKS;
    }

    const waiting = clients.filter((c) => c.state === "waiting").length;
    const finished = clients.every((c) => c.state === "done");
    render();

    if (finished) {
      live.textContent = `All ${POOL_CLIENTS} clients were served by just ${POOL_SIZE} processes.`;
      return false;
    }
    live.textContent =
      waiting > 0
        ? `${waiting} waiting: a process only frees up when a transaction ends.`
        : "Each finished transaction hands its process to the next client.";
    return true;
  };

  const step = () => (mode === "direct" ? stepDirect() : stepPooler());

  const { controls, label } = chapterPlayer({
    chapters: [
      ["direct", "One process per client"],
      ["pooler", "With a pooler"],
    ] as const,
    begin,
    step,
    length: (chapter) =>
      chapter === "direct" ? MAX_CONNECTIONS - 2 : undefined,
  });

  root.append(
    label,
    section("clients", clientRow),
    middle,
    section("backends", backendRow),
    controls,
    live
  );
}
