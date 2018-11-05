`GeoListClearItem` is a component designed to be used as a non-interactible,
read only row-like item next to [GeoListItem](http://localhost:6060/#/Elements/GeoList?id=geolistitem).

It's specially designed to be used to display special messages like
*No results found*.

```jsx
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-list-clear-item>
      No results found
    </geo-list-clear-item>

    <geo-bordered-box>
      <geo-list-clear-item>Nothing more here</geo-list-clear-item>
    </geo-bordered-box>

    <geo-bordered-box>
      <geo-list-item>First item</geo-list-item>
      <geo-list-item>Second item</geo-list-item>
      <geo-list-item>Third item</geo-list-item>
      <geo-list-clear-item>Nothing more here</geo-list-clear-item>
    </geo-bordered-box>
  </div>
</div>
```
