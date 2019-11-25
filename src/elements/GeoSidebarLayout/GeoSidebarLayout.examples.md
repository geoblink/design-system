`GeoSidebarLayout` is a component designed to be displayed together with a step component inside a wizard
```jsx live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Sidebar example</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-sidebar-layout>
        <template slot="header">
          <h6> Sidebar header </h6>
          <geo-primary-button> Sidebar header button </geo-primary-button>
        </template>
        <template>
          <p>Sidebar step 1</p>
          <p>Sidebar step 2</p>
          <p>Sidebar step 3</p>
          <p>SIdebar step 4</p>
        </template>
        <template slot="footer">
          <geo-tertiary-button> Sidebar's footer </geo-tertiary-button>
        </template>
      </geo-sidebar-layout>
    </div>
  </div>
</template>
```
