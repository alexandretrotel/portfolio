interface HastNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

const HEADING = /^h[23]$/u;

const visit = (node: HastNode): void => {
  if (
    node.type === "element" &&
    node.tagName !== undefined &&
    HEADING.test(node.tagName) &&
    node.properties?.id !== undefined
  ) {
    node.properties.tabIndex = -1;
  }
  for (const child of node.children ?? []) {
    visit(child);
  }
};

export const rehypeFocusableHeadings = () => visit;
