import styles from "./mermaid.css?inline";

const injectStyles = () => {
  const style = document.createElement("style");
  style.textContent = styles;
  document.head.append(style);
};

export const renderMermaid = () => {
  const blocks = [
    ...document.querySelectorAll<HTMLElement>(
      "article pre > code.language-mermaid"
    ),
  ];

  if (blocks.length === 0) {
    return;
  }

  injectStyles();

  const containers = blocks.map((code) => {
    const container = document.createElement("div");
    container.className = "mermaid";
    container.dataset.source = code.textContent ?? "";
    code.parentElement?.replaceWith(container);
    return container;
  });

  const dark = matchMedia("(prefers-color-scheme: dark)");

  const draw = async () => {
    const { default: mermaid } = await import("mermaid");
    mermaid.initialize({
      startOnLoad: false,
      theme: dark.matches ? "dark" : "neutral",
      fontFamily: "inherit",
    });
    for (const container of containers) {
      delete container.dataset.processed;
      container.textContent = container.dataset.source ?? "";
    }
    await mermaid.run({ nodes: containers });
  };

  void draw();
  dark.addEventListener("change", () => {
    void draw();
  });
};
