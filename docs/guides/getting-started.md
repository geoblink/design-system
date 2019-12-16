---
next: ./using-constants
---

# Getting started

To install this library first you have to add it to your dependencies:

```sh
yarn add @geoblink/design-system
```

```sh
npm i -P @geoblink/design-system
```

After that, you must install it in your Vue instance:

```js{2,6}
import Vue from 'vue'
import GeoblinkDesignSystem from '@geoblink/design-system'

// ...

Vue.use(GeoblinkDesignSystem)

// ...
```

Finally you have to import the styles.
You can import the built CSS styles or the raw SCSS file (which include the design tokens as variables):

```css
@import '~@geoblink/design-system/dist/system.css';
```

```scss
@import '~@geoblink/design-system/dist/system.utils.scss';
```

Depending on your bundler settings you can import it in your JavaScript bundle, too:

```js
import '@geoblink/design-system/dist/system.css'
```

```js
import '@geoblink/design-system/dist/system.utils.scss'
```

## Advanced import

It's possible to import only part of the library.

You can import components on a individual basis by importing them directly:

```vue{6}
<template>
  <geo-primary-button>My button!</geo-primary-button>
</template>

<script>
import GeoPrimaryButton from '@geoblink/design-system/dist/components/GeoPrimaryButton'

export default {
  name: 'My component',
  components: {
    GeoPrimaryButton
  }
}
</script>
```

Styles can be imported individually, too:

```vue{2}
<style>
import '~@geoblink/design-system/dist/styles/geo-primary-button'
</style>
```

And you can also import them in your component's JavaScript code:

```vue{7}
<template>
  <geo-primary-button>My button!</geo-primary-button>
</template>

<script>
import GeoPrimaryButton from '@geoblink/design-system/dist/components/GeoPrimaryButton'
import '@geoblink/design-system/dist/styles/geo-primary-button'

export default {
  name: 'My component',
  components: {
    GeoPrimaryButton
  }
}
</script>
```