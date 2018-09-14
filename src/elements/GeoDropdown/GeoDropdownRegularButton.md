`GeoDropdownRegularButton` is a button designed to display an optional icon and
any complex single-line text surrounded by a bordered box linked to a popup.

It's suitable in isolated places where this button won't be associated with any
single element of a collection but with a specific feature or an entire collection.
As it can display single-line text it can be used to toggle popups which manage
complex state changes which are not directly evident like multi-select options.

```jsx
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-dropdown-regular-button>
      My button
    </geo-dropdown-regular-button>

    <geo-dropdown-regular-button :icon="['far', 'bell']">
      My button with an icon
    </geo-dropdown-regular-button>

    <geo-dropdown-regular-button :icon="['far', 'bell']" />

    <geo-dropdown-regular-button>
      My button with <strong>bold text</strong> and <em>italic text</em> too
    </geo-dropdown-regular-button>
  </div>
</div>
```
