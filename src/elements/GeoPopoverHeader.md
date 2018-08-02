`GeoPopoverHeader` is convenient helper to build popup headers.

It supports displaying a special _close_ button and allows setting an optional
clickable icon in the leading edge of the header.

```jsx
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-popover-header>
      A header
    </geo-popover-header>

    <geo-popover-header :icon="['fas', 'chevron-left']">
      Results based on
    </geo-popover-header>

    <geo-popover-header :icon="['fas', 'chevron-left']" @close="">
      Closable
    </geo-popover-header>
  </div>
</div>
```
