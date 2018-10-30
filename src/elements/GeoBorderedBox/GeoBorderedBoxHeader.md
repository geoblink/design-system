`GeoBorderedBoxHeader` is component designed to fit nicely as header of a
[GeoBorderedBox](./#/Elements/GeoBorderedBox?id=geoborderedbox-1).

It supports displaying a special *close* button and allows setting an optional
clickable icon in the leading edge of the header.

```jsx
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-bordered-box-header>
      A header
    </geo-bordered-box-header>

    <geo-bordered-box-header :icon="['fas', 'chevron-left']">
      Results based on
    </geo-bordered-box-header>

    <geo-bordered-box-header :icon="['fas', 'chevron-left']" :close-icon="['fas', 'times']" @close="">
      Closable
    </geo-bordered-box-header>
  </div>
</div>
```
