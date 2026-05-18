import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

function parseColumns(str) {
  const cols = (str ?? '1 2 2 3')
    .trim()
    .split(/\s+/)
    .map(Number)
    .filter((n) => !isNaN(n) && n >= 1 && n <= 12);
  return cols.length ? cols : [1, 2, 2, 3];
}

/** @type {import('myst-common').DirectiveSpec} */
const teamGridDirective = {
  name: 'team-grid',
  doc: 'Display a team member grid from a JSON file.',
  options: {
    file: {
      type: String,
      required: true,
      doc: 'Path to the JSON data file, relative to the page file.',
    },
    columns: {
      type: String,
      doc: 'Column counts for xs/sm/md/lg breakpoints, e.g. "2 3 4 5".',
    },
  },
  run(data, vfile) {
    const pageDir = dirname(vfile.path);
    const filePath = resolve(pageDir, data.options.file);
    const members = JSON.parse(readFileSync(filePath, 'utf-8'));

    const cards = members.map((member) => ({
      type: 'card',
      url: member.url,
      children: [
        {
          type: 'image',
          url: member.avatarUrl,
          alt: `Avatar of ${member.name}`,
        },
        {
          type: 'paragraph',
          children: [{ type: 'text', value: member.name }],
        },
      ],
    }));

    return [
      {
        type: 'grid',
        columns: parseColumns(data.options?.columns),
        children: cards,
      },
    ];
  },
};

/** @type {import('myst-common').MystPlugin} */
const plugin = {
  name: 'Team Grid',
  directives: [teamGridDirective],
};

export default plugin;
