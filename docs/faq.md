## What is Geoblink Design System?

**TODO:** Write this

Vue Design System is an open source tool for building UI Design Systems with [Vue.js](https://vuejs.org). It provides you and your team a set of organized tools, patterns & practices that work as the foundation for your application development. [Read more about it](https://viljamis.com/2018/vue-design-system/).

## What browsers are supported?

**TODO:** Write this

The development environment supports the following browsers. To tweak browsers supported in production you will want to edit the [browsers list in package.json](https://github.com/viljamis/vue-design-system/blob/master/package.json#L172-L180). To see what browsers are selected by the browser list, run `npx browserslist --config="package.json"` in the root directory of this project.

| BROWSER         | VERSION |
| --------------- | ------- |
| Google Chrome   | Latest  |
| Microsoft Edge  | Latest  |
| Mozilla Firefox | Latest  |
| Opera           | Latest  |
| Safari          | Latest  |

## How do I get started?

**TODO:** Write this

See the [Getting Started guide](https://github.com/viljamis/vue-design-system/wiki/getting-started) on GitHub.

## I want to use this in existing Vue project, is that possible?

**TODO:** Write this

Definitely possible, see instructions in [Getting Started guide](https://github.com/viljamis/vue-design-system/wiki/getting-started#using-vue-design-system-in-an-existing-project).

## Where are molecules and pages from Atomic Design?

**TODO:** Write this

Compared to Atomic Design, this setup doesn’t include molecule/page levels. They’re omitted to help reduce the complexity of the system for its end-users.

## Is this tool only for Vue.js based applications?

**TODO:** Write this

Organizations that have more than just Vue.js based applications can benefit from Vue Design System as well. Tokens which store visual design attributes are universal and can be used on any platform.

## Why aren’t there more components by default?

**TODO:** Write this

Vue Design System is not a front-end component library and never will be. Instead it tries to provide you and your team a set of organized tools, patterns & practices to build upon, so that you can get started with the actual design system faster.

## Can I convert YAML tokens to more than just SCSS and JSON?

**TODO:** Write this

Definitely. See [Theo’s docs](https://github.com/salesforce-ux/theo). It allows you to convert the tokens to almost any format you can think of. The formats used are being configured in [package.json](https://github.com/viljamis/vue-design-system/blob/master/package.json#L25).

## How do I change the default typeface/font?

**TODO:** Write this

Vue Design System uses Typekit’s [Web Font Loader](https://github.com/typekit/webfontloader) which is easy to configure. To load your own font files, see [Getting Started with WebFontLoader](https://github.com/typekit/webfontloader#get-started). Currently, the app is loading _Fira Sans_ and a few different weights from Google Fonts. See `src/utils/webFontLoader.js` for an example.

If you want to bundle your fonts into the project itself, that’s possible as well. I’ve created a separate branch with an example of this. See the needed changes in [this commit](https://github.com/viljamis/vue-design-system/commit/a7b3badb618fb5e0e1c999940b8ea82e86aea190).

## How to use design tokens in JavaScript?

First, import tokens inside the component you want to use them in:

```html
<script>
  import designTokens from "@/assets/tokens/tokens.raw.json";
</script>
```

Then, pass the data:

```html
<script>
export default {
  data() {
    return {
      tokens: designTokens.props
    };
  }
};
</script>
```

Once done, you can utilize tokens inside `<template>` like this:

```html
<template>
  <a-thing :style="{color: tokens.color_vermilion.value}" />
</template>
```

## How do you use media queries defined in tokens?

**TODO:** Write this

```scss
.wrapper {
  padding: $space-large;
  @media #{$media-query-large} {
    padding: $space-x-large;
  }
}
```

## How do CSS Modifiers work?

**TODO:** Write this

## How to disable browser from auto opening a new window?

Change the `autoOpenBrowser` [setting in config](https://github.com/geoblink/geoblink-design-system/blob/master/config/index.js#L69) to `false`.

## How do I use static image assets?

You can put your assets under `src/assets`. It’s ok to create new directories under that directory as well. Since Webpack is used to include all static assets on the Vue app side, you’ll have to define the path like this in order for it to work on both the app and the styleguide: `<img src="@/assets/img/example.jpg" />`.

For component’s `<docs>` section things work a bit differently. Using `<img src="img/example.jpg" />` without `@/assets/` works there. This is because [Styleguidist](https://github.com/vue-styleguidist/vue-styleguidist) handles the assets directory a bit differently.
