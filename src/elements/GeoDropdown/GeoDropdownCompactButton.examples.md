`GeoDropdownCompactButton` is a button designed to display a single icon which
is surrounded by a bordered box on hover or when the linked popup is displayed.

It's suitable to display additional actions in lists or contexts where displaying
a long button would overcrow the interface. This kind of button is not designed
to reflect state changes other than linked popup being displayed.

See [GeoDropdownRegularButton](./#/Elements/GeoDropdown?id=geodropdownregularbutton)
for a button designed to display more info.

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-dropdown-compact-button :icon="['fas', 'ellipsis-v']" />
    <geo-dropdown-compact-button :icon="['far', 'bell']" />
  </div>
</div>
```
