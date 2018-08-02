`GeoPopoverCompactButton` is a button designed to display a single icon which
is surrounded by a bordered box on hover or when the linked popup is displayed.

It's suitable to display additional actions in lists that show evident changes
in other parts of the UI, as this kind of button is not designed to reflect
state changes other than linked popup being displayed or not.

```jsx
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-popover-compact-button :icon="['fas', 'ellipsis-v']" />
    <geo-popover-compact-button :icon="['far', 'bell']" />
  </div>
</div>
```
