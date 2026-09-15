# scientific-python-myst-theme

Scientific Python MyST Theme template. This is a
[copier](https://copier.readthedocs.io/en/stable/) template you can
use to create your own MyST website, styled with the Scientific Python
theme.

## Dependencies

Install copier:

`pip install copier` or `uv tool install copier`

## Generating your site

```bash
copier copy gh:scientific-python/scientific-python-myst-theme <your-site>
```

Copier fetches the template from GitHub. No clone is needed.

## Updating your site

`copier copy` writes `.copier-answers.yml` into your site. It records the
template commit and your answers, and `copier update` uses it to replay
template changes on top of your own edits.

1. Commit or stash your changes. Copier refuses to update a dirty git tree.

2. From the directory that holds `.copier-answers.yml`, run:

   ```bash
   copier update --defaults
   ```

   `--defaults` reuses your previous answers and takes the default for any
   new question. Copier updates to the latest release tag, or to the latest
   commit while the template has no tags. Add `--vcs-ref HEAD` to take the
   latest commit regardless.

3. Review the result with `git diff`. Where your edits and the template
   change overlap, copier leaves inline conflict markers
   (`<<<<<<< before updating`). Resolve them by hand.

4. Commit.

To change one answer, pass it on the command line instead of editing the
answers file:

```bash
copier update --defaults --data footer_items_json=assets/json/links.json
```

Never edit `.copier-answers.yml` by hand. Copier trusts it as the record of
what produced the site, and edits break the update diff.

## Features

### Team gallery

You need to set a `GH_TOKEN` with team read permissions. Then download the team data from GitHub to JSON:

```
python tools/team_query.py --org scikit-image --team core -o team-skimage.json
```

This can be rendered as a gallery from inside a page as:

````
```{team-grid}
:file: team-skimage.json
:columns: 2 2 2 4
```
````
