`GeoHighlightedString` is a component used to highlight multiple characters in
a string. It's designed to play nicely with
[fuzzaldrin-plus](https://www.npmjs.com/package/fuzzaldrin-plus) package to offer
a fuzzy-search with results higlighting out-of-the-box.

```jsx
<div class="element-demo">
  <h3 class="element-demo__header">String with some letters highlighted</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-highlighted-string :higlighted-chars="[0,1,3,6]" reference-string="Hello World!"/>
  </div>
</div>
```
