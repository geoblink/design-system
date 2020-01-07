[![NPM](https://img.shields.io/npm/v/@geoblink/design-system)](https://www.npmjs.com/package/@geoblink/design-system)
[![Build Status](https://travis-ci.com/geoblink/design-system.svg?branch=master)](https://travis-ci.com/geoblink/design-system)
[![Codecov](https://img.shields.io/codecov/c/gh/geoblink/design-system)](https://codecov.io/gh/geoblink/design-system)
[![Greenkeeper badge](https://badges.greenkeeper.io/geoblink/design-system.svg)](https://greenkeeper.io/)

## Getting started

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

Finally you'll be able use any component from the Design System like they are
used in the demos:

```vue
<template>
  <geo-primary-button @click="doSomething()">
    Do something!
  </geo-primary-button>
</template>

<script>
export default {
  methods: {
    doSomething () {
      alert('Do something!')
    }
  }
}
</script>
```

![Button example](https://raw.githubusercontent.com/geoblink/design-system/master/.github/button-example.png)

## Documentation

Documentation for latest stable version is available at [https://design-system.geoblink.com/](https://design-system.geoblink.com/).
