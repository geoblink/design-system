`GeoHighlightedString` is a utility used to highlight words according to a search pattern

```jsx
<div class="element-demo">
  <h3 class="element-demo__header">String with some letters highlighted</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-highlighted-string
      :matched-chars-position="[0,1,3,5]"
      reference-string="Hola Mundo"/>
  </div>
</div>
```
