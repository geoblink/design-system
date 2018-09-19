### Components can be customized not only by changing their behaviour with props but by using completely different CSS classes to style them up in a truly unique way which properly suits your use case.

[Geoblink Design System](/) has been built using the
[Block Element Modifier](http://getbem.com/) methodology. This makes each
component independent from each other and by using `geo` prefix it is easy to
avoid overriding classes by mistake.

There's, however, other use case not covered just by using this methodology:
allowing **easy customization**.

This has been traditionally done by overriding CSS classes or taking advantage of
CSS [specifity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) and
priority rules. But this is hard to maintain and error-prone.

[Geoblink Design System](/) uses a different approach which be named `cssModifier`.
Each component has an optional property `cssModifier`. When provided, all the
classes used by the component will have an additional BEM modifier of your choice.

Each component also has a SCSS mixin which will generate the proper CSS classes
for a given `cssModifier` so you can start customizing a component without
affecting any other component or just build the styling up from scratch if you
prefer to do so. These mixins are named following this pattern:
`geo-COMPONENT-make(CSSMODIFIER)`.

To avoid writing unnecessary boilerplate all the CSS classes for empty
`cssModifier` are already available so if you like the default styling as it is
you don't have to follow any additional step.
