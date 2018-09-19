## What browsers are supported?

We aim to cover all modern browsers, the exact browsers supported can be checked
in `package.json` and it's:

| BROWSER            | VERSION          |
| ------------------ | ---------------- | ----
| Google Chrome      | Last 2 versions  | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />
| Microsoft Edge     | Last 2 versions  | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />
| Internet Explorer  | 11               | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />
| Mozilla Firefox    | Last 2 versions  | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />
| Safari             | Last 2 versions  | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />

This leads to a global coverage of 83.98% of users.

[See details on our browser support](http://browserl.ist/?q=%3E+1%25%2C+last+2+versions%2C+not+Explorer+%3E+0%2C+IE+11%2C+not+ExplorerMobile+%3E+0%2C+not+OperaMini+all%2C+not+OperaMobile+%3E+0).


The development environment supports the following browsers. To tweak browsers
supported in production you will want to edit the [browsers list in package.json](https://github.com/viljamis/vue-design-system/blob/master/package.json#L172-L180). To see what browsers are selected by the browser list, run `npx browserslist --config="package.json"` in the root directory of this project.

## How do I get started?

Add `design-system` as a dependency:

```bash
yarn add @geoblink/design-system
// or
npm i @geoblink/design-system --save
```

Then you can import it and install it as any other [Vue plugin](https://vuejs.org/v2/guide/plugins.html).

```html
<script>
import Vue from 'vue'
import geoblinkDesignSystem from '@geoblink/design-system'
Vue.use(geoblinkDesignSystem)
</script>
```

## Is this tool only for Vue.js based applications?

Projects that have more than just Vue.js based applications can benefit from
[Geoblink Design System](/) as well. Brand style and tokens which store visual
design attributes are universal and can be used on any platform.

## Can I convert YAML tokens to more than just SCSS and JSON?

Definitely. See [Theo’s docs](https://github.com/salesforce-ux/theo). It allows
you to convert the tokens to almost any format you can think of. The formats
used are being configured in `package.json`.

## How do I change the default typeface/font?

[Geoblink Design System](/) uses Typekit’s
[Web Font Loader](https://github.com/typekit/webfontloader) which is easy to
configure. To load your own font files, see
[Getting Started with WebFontLoader](https://github.com/typekit/webfontloader#get-started).
Currently, the app is loading _Lato_ and _Montserrat_ in a few different weights
from Google Fonts. See `src/utils/webFontLoader.js` for an example.

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
  <a-thing :style="{color: tokens.color_red_darker.value}" />
</template>
```

## What are CSS Modifiers?

See [Customizing Components](./#/Customizing%20Components) page.

## How to disable browser from auto opening a new window?

Change the `autoOpenBrowser` setting in config (`config/index.js#L69`) to `false`.

## How do I use static image assets?

You can put your assets under `src/assets`. It’s ok to create new directories
under that directory as well. Since Webpack is used to include all static assets
on the Vue app side, you’ll have to define the path like this in order for it to
work on both the app and the styleguide: `<img src="@/assets/img/example.jpg" />`.

For component’s `<docs>` section things work a bit differently. Using
`<img src="img/example.jpg" />` without `@/assets/` works there. This is because
[Styleguidist](https://github.com/vue-styleguidist/vue-styleguidist) handles the
assets directory a bit differently.
