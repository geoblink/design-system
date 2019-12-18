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

### With close icon

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-bordered-box-header @close="">
      Closable
    </geo-bordered-box-header>

    <geo-bordered-box-header
      :close-icon="['fas', 'chevron-right']"
      @close=""
    >
      Custom close icon
    </geo-bordered-box-header>
  </div>
</div>
```

### With leading & close icon

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-bordered-box-header
      :icon="['fas', 'chevron-left']"
      @close=""
    >
      Closable
    </geo-bordered-box-header>
  </div>
</div>
```
