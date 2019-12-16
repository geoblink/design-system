---
prev: ./getting-started
next: ./developing
---

# Using constants

::: danger
Avoid hardcoding literals for variants and types: their values might change at any time.

**Use exported constants instead**.
:::

The library exports a collection of constants under `constants` named export.
You can import them using CommonJS or ES6 modules:

```js
// CommonJS
const { constants } = require('@geoblink/design-system')

// ES6
import { constants } from '@geoblink/design-system'
```

`constants` is an object where keys correspond to the names of the components and values hold the constants exposed by each one.

::: warning
**Not all the components export constants** so not all of them are present in `constants` object.
:::

::: tip EXAMPLE
For instance, to get the proper value for a primary [GeoButton](/components/GeoButton/GeoButton.html)
you could use:

```js
import { constants } from '@geoblink/design-system'
const primary = constants.GeoButton.TYPES.primary // "primary"
```
:::

A complete list of exported constants appear in each component's documentation page.
