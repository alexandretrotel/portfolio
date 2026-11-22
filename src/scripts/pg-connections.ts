import {
  caption,
  el,
  injectStyles,
  player,
  pop,
  setup,
  sync,
} from "./demo-kit";

import styles from "./pg-connections.css?inline";

const MAX_CONNECTIONS = 4;
const POOL_SIZE = 3;
const CLIENTS = 5;

interface Client {
  id: number;
  state: "waiting" | "running" | "done" | "refused";
}

const CAPTIONS = [
  `max_connections is ${MAX_CONNECTIONS}, and ${MAX_CONNECTIONS} clients already hold a process each.`,
  `C${CLIENTS} is refused: Postgres has no free slot and doesn't queue it.`,
  `With PgBouncer, ${CLIENTS} clients share ${POOL_SIZE} processes, and the rest wait their turn.`,
  "C1's transaction ends, and C4 gets its process.",
];

const section = (label: string, node: HTMLElement) => {
  const wrap = el("div", "pg-connections-section");
  wrap.append(el("span", "demo-label", label), node);
  return wrap;
};

export default function mount(root: HTMLElement) {
  injectStyles("pg-connections", styles);
  setup(root, "pg-connections");

  let at = 0;
  let clients: Client[] = [];
  let backends: (number | undefined)[] = [];

  const clientRow = el("ol", "pg-connections-row");
  clientRow.setAttribute("aria-label", "Clients");
  const middle = el("div", "pg-connections-middle demo-box");
  const backendRow = el("ol", "pg-connections-row is-backends");
  backendRow.setAttribute("aria-label", "Backend processes");
  const live = caption("");

  const stateAt = (index: number) => {
    if (index === 0) {
      clients = Array.from({ length: MAX_CONNECTIONS }, (_, i) => ({
        id: i + 1,
        state: "running",
      }));
      backends = clients.map((c) => c.id);
    } else if (index === 1) {
      clients.push({ id: CLIENTS, state: "refused" });
    } else if (index === 2) {
      clients = Array.from({ length: CLIENTS }, (_, i) => ({
        id: i + 1,
        state: i < POOL_SIZE ? "running" : "waiting",
      }));
      backends = clients.slice(0, POOL_SIZE).map((c) => c.id);
    } else {
      clients = clients.map((c) => {
        if (c.id === 1) {
          return { ...c, state: "done" };
        }
        if (c.id === 4) {
          return { ...c, state: "running" };
        }
        return c;
      });
      backends[0] = 4;
    }
  };

  const render = () => {
    const text = at < 2 ? "postmaster" : "PgBouncer";
    if (middle.textContent !== text) {
      middle.textContent = text;
      if (at > 0) {
        pop(middle);
      }
    }
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
        const name = owner === undefined ? "free" : `C${owner}`;
        if (label && label.textContent !== name) {
          label.textContent = name;
          if (at > 0) {
            pop(label);
          }
        }
      }
    );
    live.textContent = CAPTIONS[at] ?? "";
  };

  const { controls } = player({
    step: () => {
      at += 1;
      stateAt(at);
      render();
      return at < CAPTIONS.length - 1;
    },
    reset: () => {
      at = 0;
      stateAt(0);
      render();
    },
    total: () => CAPTIONS.length - 1,
  });

  root.append(
    section("clients", clientRow),
    middle,
    section("backends", backendRow),
    controls,
    live
  );
  stateAt(0);
  render();
}
