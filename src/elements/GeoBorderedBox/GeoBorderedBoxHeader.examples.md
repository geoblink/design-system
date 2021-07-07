### Simple header

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-bordered-box-header>
      A header
    </geo-bordered-box-header>
  </div>
</div>
```

### With leading icon

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-bordered-box-header :icon="['fas', 'chevron-left']">
      Results based on
    </geo-bordered-box-header>
  </div>
</div>
```

### With trailing icon

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-bordered-box-header @click-trailing-icon="">
      Closable
    </geo-bordered-box-header>

    <geo-bordered-box-header
      :trailing-icon="['fas', 'chevron-right']"
      @click-trailing-icon=""
    >
      Custom close icon
    </geo-bordered-box-header>
  </div>
</div>
```

### With leading & trailing icon

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-bordered-box-header
      :icon="['fas', 'chevron-left']"
      @click-trailing-icon=""
    >
      Closable
    </geo-bordered-box-header>
  </div>
</div>
```
