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
    const footerArray = new Array(...Object.entries(footerLinks["links"]));
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
    return linksGrid;
  },
};

/** @type {import('myst-common').DirectiveSpec} */
const footerIconsDirective = {
  name: 'footer-icons',
  doc: 'Display footer icons from a JSON file.',
  options: {
    file: {
      type: String,
      required: true,
      doc: 'Path to the JSON file, relative to the project root.',
    },
  },
  run(data) {
    const footerIcons = JSON.parse(readFileSync(data.options.file, 'utf-8'));
    const footerArray = new Array(...Object.entries(footerIcons["icons"]));
    const IconsGrid = footerArray.map(([text, url]) => ({
          type: 'mystDirective',
          name: 'grid-item',
          children: [
            {
              type: 'link',
              url: url,
              children: [
                 {
                   type: 'image',
                   url: `/assets/icons/${text}.svg`,
                   alt: text
                 }
              ]
            }
          ]
        }
    ));
    return IconsGrid;
  },
};


/**

  - type: link
    url: https://github.com
    children:
      - type: image
        url: https://picsum.photos/id/640/400/200
        alt: foo

*/


/** @type {import('myst-common').MystPlugin} */
const plugin = {
    name: 'Footer Items',
    directives: [footerLinksDirective, footerIconsDirective],
};

export default plugin;
