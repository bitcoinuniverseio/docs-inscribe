// Wrap every table in a focusable scroll container so a wide table scrolls
// inside its own frame instead of pushing the page sideways at 320px.
import { visit } from 'unist-util-visit';

export default function rehypeTableScroll() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'table' || !parent || index === null) return;
      if (parent.type === 'element' && parent.properties?.className?.includes?.('u-table-scroll')) {
        return;
      }
      parent.children[index] = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['u-table-scroll'],
          tabIndex: 0,
          role: 'region',
          'aria-label': 'Table, scrollable',
        },
        children: [node],
      };
    });
  };
}
