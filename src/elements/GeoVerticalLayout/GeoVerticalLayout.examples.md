`GeoVerticalLayout` is a component designed to organise elements it contains in a column direction, having an optional header and footer, and the main content with a scrollable container.
```jsx live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Elements with a vertical layout</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-vertical-layout>
        <geo-secondary-button>Element 1</geo-secondary-button>
        <geo-secondary-button>Element 2</geo-secondary-button>
        <geo-secondary-button>Element 3</geo-secondary-button>
      </geo-vertical-layout>
    </div>
    <h3 class="element-demo__header">Elements without a vertical layout</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-secondary-button>Element 1</geo-secondary-button>
      <geo-secondary-button>Element 2</geo-secondary-button>
      <geo-secondary-button>Element 3</geo-secondary-button>
    </div>
    <h3 class="element-demo__header">Vertical layout with header and footer</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
     <geo-vertical-layout>
        <h5 slot="header">Header</h5>
        <geo-secondary-button>Element 1</geo-secondary-button>
        <geo-secondary-button>Element 2</geo-secondary-button>
        <geo-secondary-button>Element 3</geo-secondary-button>
        <geo-primary-button slot="footer">Footer button</geo-primary-button>
      </geo-vertical-layout>
    </div>
  </div>
</template>
```
