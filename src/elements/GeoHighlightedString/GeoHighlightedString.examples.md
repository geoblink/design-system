### Short string

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-highlighted-string
      :highlighted-chars="[0,1,3,6]"
      reference-string="Hello World!"
    />
  </div>
</div>
```

### Long string

```jsx live
<div class="element-demo">
  <div class="element-demo__block element-demo__block--long-highlighted-string" style="justify-content: space-around;">
    <geo-highlighted-string
      :highlighted-chars="[0,1,3,6,14,15,23]"
      reference-string="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet tempor urna. Aenean posuere.!"
    />
  </div>
</div>
```
