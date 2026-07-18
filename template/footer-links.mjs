import { readFileSync } from 'node:fs';

/** @type {import('myst-common').DirectiveSpec} */
const footerLinksDirective = {
  name: 'footer-links',
  doc: 'Display footer links from a JSON file.',
  options: {
    file: {
      type: String,
      required: true,
      doc: 'Path to the JSON file, relative to the project root.',
    },
  },
  run(data) {
    const footerLinks = JSON.parse(readFileSync(data.options.file, 'utf-8'));
    const footerArray = new Array(...Object.entries(footerLinks));
    const linksGrid = footerArray.map(([text, url]) => ({
          type: 'mystDirective',
          name: 'grid-item',
          children: [
            {
              type: 'link',
              url: url,
              children: [
                 {
                   type: 'text',
                   value: text
                 }
              ]
            }
          ]
        }
    ));
    const links = footerArray.map(([text, url]) => ({
      type: 'listItem',
      spread: true,
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'link',
              url: url,
              children: [
                 {
                   type: 'text',
                   value: text
                 }
              ]
            }
          ]
        }
      ]
    }));
    return linksGrid;
  },
};


/** @type {import('myst-common').MystPlugin} */
const plugin = {
    name: 'Footer Links',
    directives: [footerLinksDirective],
};

export default plugin;

/*
- type: mystDirective
    name: grid
    args: 1 1 3 3
    value: |-
      :::{grid-item}
      foo
      :::

      :::{grid-item}
      bar
      :::
    children:
      - type: grid
        columns:
          - 1
          - 1
          - 3
          - 3
        children:
          - type: mystDirective
            name: grid-item
            value: foo
          - type: mystDirective
            name: grid-item
            value: bar
*/
