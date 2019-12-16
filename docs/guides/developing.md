---
prev: ./using-constants
---

# Developing

## Generating documentation

There are 3 commands involved in generating the live documentation site:

### `docs:build:markdown`

```sh
yarn docs:build:markdown
```

Will generate a static Markdown file for each component.
This file will include the component's documentation as well as its examples.

A _constants_ component will be created in `.vuepress/components/constants` folder.
This special component will render a table displaying all constants exported by the component.

### `docs:watch:markdown`

```sh
yarn docs:watch:markdown
```

Generates static Markdown files when any component changes.
It generates the _constants_ component automatically, too.

You'll probably want to run `docs:build:markdown` before since `docs:watch:markdown` **won't generate the initial documentation**: it will generate files only after some component or example file is modified.

### `docs:dev`

```sh
yarn docs:dev
```

Start [Vuepress](https://vuepress.vuejs.org/) and serves generated documentation.

Pages will reload after any static Markdown file or _constants_ component is modified but not after any component or example is modified so you'll probably want to run `docs:watch:markdown` while you are running `docs:dev`.

### `start`

```sh
yarn start
```

Equivalent to running:

1. `yarn docs:build:markdown`
1. In parallel:
    - `docs:watch:markdown`
    - `docs:dev`

::: tip
This is the script you probably want to run to see the live documentation page.
:::