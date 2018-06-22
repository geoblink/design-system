### Elements are the smallest basic structures of an user interface. They cannot be broken down any further. Buttons, links, and inputs are good examples. Elements utilize decisions made on the design token level.

To add a new <code>Element</code>, create a new [Single File Component](https://vuejs.org/v2/guide/single-file-components.html) in [src/elements](https://github.com/geoblink/geoblink-design-system/blob/master/src/elements).

You might want to use [SASS mixinss](https://sass-lang.com/guide) to create an easily restylable <code>Element</code> by means of a [CSS Modifier](/#!/FAQ).
To do so you should add a <code>SCSS</code> file in [/src/styles/elements](https://github.com/geoblink/geoblink-design-system/blob/master/src/styles/elements) matching your component's name.
That file will be automatically exported when building the design system so those mixins will be available later on.
Finally you should import that file in [src/styles/styles.scss](https://github.com/geoblink/geoblink-design-system/blob/master/src/styles/styles.scss) so it's available in the component.

You can edit this page at [/docs/elements.md](https://github.com/geoblink/geoblink-design-system/blob/master/docs/elements.md).