### Avoid hardcoding literals using exported constants.

[Geoblink Design System](./) exports a collection of constants under named export
`constants`. You can import them using CommonJS or ES6 modules:

```markdown
// CommonJS
const { constants } = require('@geoblink/design-system')

// ES6
import { constants } from '@geoblink/design-system'
```

`constants` is an object where keys correspond to the names of the components
and values hold the constants exposed by each component.

> **Note:** Not all the components export constants so not all of them are
> present in `constants` object.

For instance, to get the proper value for a primary [GeoButton](./#/GeoButton)
you could use:

```markdown
import { constants } from '@geoblink/design-system'
const primary = constants.GeoButton.TYPES.primary // "primary"
```
