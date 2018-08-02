`GeoDropdownHeader` is convenient helper to build popup headers.

It supports displaying a special _close_ button and allows setting an optional
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

    <geo-dropdown-header :icon="['fas', 'chevron-left']" @close="">
      Closable
    </geo-dropdown-header>
  </div>
</div>
```
