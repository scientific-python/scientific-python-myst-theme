# scientific-python-myst-theme

Scientific Python Myst Theme template. This is a
[copier](https://copier.readthedocs.io/en/stable/) template you can
use to create your own myst website, styled with the Scientific Python
theme.

## Dependencies

Install copier:

`pip install copier` or `uv tool install copier`

## Generating your site

1. Clone this repo

```
git clone https://github.com/scientific-python/scientific-python-myst-theme
```

2. Use the template to generate your own site:

```
copier copy ./scientific-python-myst-theme my-test-site
```

You can re-run this command when the theme gets updated.

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
