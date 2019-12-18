### Two columns

```jsx live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-bordered-box>
        <geo-horizontal-layout>
          <geo-bordered-box-column>This is the first column</geo-bordered-box-column>
          <geo-bordered-box-column>This is the second column</geo-bordered-box-column>
        </geo-horizontal-layout>
      </geo-bordered-box>
    </div>
  </div>
</template>
```

### Four columns

```jsx live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Bordered box with four columns</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-bordered-box>
        <geo-horizontal-layout>
          <geo-bordered-box-column>Column 1</geo-bordered-box-column>
          <geo-bordered-box-column>Column 2</geo-bordered-box-column>
          <geo-bordered-box-column>Column 3</geo-bordered-box-column>
          <geo-bordered-box-column>Column 4</geo-bordered-box-column>
        </geo-horizontal-layout>
      </geo-bordered-box>
    </div>
  </div>
</template>
```

### With header and footer

```jsx live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-bordered-box>
        <geo-bordered-box-header>My header</geo-bordered-box-header>
        <geo-horizontal-layout>
          <geo-bordered-box-column>This is the first column</geo-bordered-box-column>
          <geo-bordered-box-column>This is the second column</geo-bordered-box-column>
        </geo-horizontal-layout>
        <geo-bordered-box-footer>
          <div style="display:flex; justify-content: center;">
            <geo-primary-button>Save changes</geo-primary-button>
          </div>
        </geo-bordered-box-footer>
      </geo-bordered-box>
    </div>
  </div>
</template>
```
