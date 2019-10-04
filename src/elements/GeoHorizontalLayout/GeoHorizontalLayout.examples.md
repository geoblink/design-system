`GeoHorizontalLayout` is a component designed to organise elements it contains in a row direction. 

```vue live
<template>
  <div class="element-demo">
  <h3 class="element-demo__header">Elements with an horizontal layout</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-horizontal-layout>
        <geo-bordered-box>Element 1</geo-bordered-box>
        <geo-bordered-box>Element 2</geo-bordered-box>
        <geo-bordered-box>Element 3</geo-bordered-box>
      </geo-horizontal-layout>
    </div>
  <h3 class="element-demo__header">Elements without an horizontal layout</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-bordered-box>Element 1</geo-bordered-box>
      <geo-bordered-box>Element 2</geo-bordered-box>
      <geo-bordered-box>Element 3</geo-bordered-box>
    </div>
  </div>
</template>

<script>
export default {}
</script>
```
