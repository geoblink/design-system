`GeoDropdownHeader` is component designed to fit nicely as header of a
[GeoDropdown](./#/Elements/GeoDropdown?id=geodropdown-1)..

It supports displaying a special *close* button and allows setting an optional
clickable icon in the leading edge of the header.

```jsx
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-dropdown-header>
      A header
    </geo-dropdown-header>

    <geo-dropdown-header :icon="['fas', 'chevron-left']">
      Results based on
    </geo-dropdown-header>

    <geo-dropdown-header :icon="['fas', 'chevron-left']" :close-icon="['fas', 'times']" @close="">
      Closable
    </geo-dropdown-header>
  </div>
</div>
```
