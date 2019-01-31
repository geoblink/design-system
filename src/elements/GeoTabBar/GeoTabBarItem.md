`GeoTabBarItem` is a component suited to be displayed inside a
[GeoTabBar](/#/Elements/GeoTabBar?id=geotabbar-1), to display a a single tab.

```jsx
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-tab-bar-item>
      A tab
    </geo-tab-bar-item>

    <geo-tab-bar-item active>
      Active tab
    </geo-tab-bar-item>

    <geo-tab-bar-item hover>
      Hovered tab
    </geo-tab-bar-item>
  </div>

  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-tab-bar-item variant="modal">
      A tab
    </geo-tab-bar-item>

    <geo-tab-bar-item variant="modal" active>
      Active tab
    </geo-tab-bar-item>

    <geo-tab-bar-item variant="modal" hover>
      Hovered tab
    </geo-tab-bar-item>
  </div>
</div>
```