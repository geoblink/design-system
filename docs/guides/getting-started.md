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

Finally you'll be able use any component from the Design System like they are
used in the demos:

```vue live
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

## Using icons

We use icons from [FontAwesome](https://fontawesome.com/) library in some
components but we want neither to force a specific version of the package nor
to use it at all! So we make this an opt-in behaviour.

To enable icons you have to install [`@fortawesome/vue-fontawesome`](https://www.npmjs.com/package/@fortawesome/vue-fontawesome)
package and register `font-awesome-icon` globally:

```sh
yarn add @fortawesome/fontawesome-svg-core
yarn add @fortawesome/vue-fontawesome
yarn add @fortawesome/free-solid-svg-icons
```

```sh
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/vue-fontawesome
npm i --save @fortawesome/free-solid-svg-icons
```

Afterwards in your main JavaScript entrypoint:

```js
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons' // Or any icon you want to use
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret) // Or any icon you want to use

Vue.component('font-awesome-icon', FontAwesomeIcon)

// ...
```

### Using free icons

By default we use icons from [FontAwesome Pro](https://fontawesome.com/pro).
Even though we encourage you to consider upgrading to pro, it's possible to use
[Geoblink Design System](/) without using any paid resource.

To do so, you have to run `mockFontAwesomeProIcons` once in your main JavaScript
entrypoint:

```js{3,8}
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { mockFontAwesomeProIcons } from '@geoblink/design-system'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon)

mockFontAwesomeProIcons(library)

// ...
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