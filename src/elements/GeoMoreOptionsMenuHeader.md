```jsx
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-more-options-menu-header>
      A header
    </geo-more-options-menu-header>

    <geo-more-options-menu-header :icon="['fas', 'chevron-left']">
      Results based on
    </geo-more-options-menu-header>

    <geo-more-options-menu-header :icon="['fas', 'chevron-left']" @close="">
      Closable
    </geo-more-options-menu-header>
  </div>
</div>
```
