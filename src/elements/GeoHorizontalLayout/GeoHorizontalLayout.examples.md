`GeoHorizontalLayout` is a component designed to organise elements it contains in a row direction. 

```jsx live
<template>
  <div class="element-demo">
  <h3 class="element-demo__header">Elements with an horizontal layout</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-horizontal-layout>
        <geo-secondary-button>Element 1</geo-secondary-button>
        <geo-secondary-button>Element 2</geo-secondary-button>
        <geo-secondary-button>Element 3</geo-secondary-button>
      </geo-horizontal-layout>
    </div>
  <h3 class="element-demo__header">Elements without an horizontal layout</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-secondary-button>Element 1</geo-secondary-button>
      <geo-secondary-button>Element 2</geo-secondary-button>
      <geo-secondary-button>Element 3</geo-secondary-button>
    </div>
  </div>
</template>
```
