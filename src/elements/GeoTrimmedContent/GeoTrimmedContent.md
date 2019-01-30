`GeoTrimmedContent` is a component used to trim long strings which don't fit in a
single line, and displaying a tooltip to read the whole content.

```jsx
<div class="element-demo">
  <h3 class="element-demo__header">Long content</h3>
  <div class="element-demo__block">
    <div class="element-demo__bordered-box" style="width: 120px;">
      <geo-trimmed-content>
        Some text that should be trimmed
      </geo-trimmed-content>
    </div>

    <div class="element-demo__bordered-box" style="width: 120px;">
      <geo-trimmed-content>
        <template>Some text that should be trimmed</template>
        <template>and using multiple slotted content</template>
      </geo-trimmed-content>
    </div>

    <div class="element-demo__bordered-box" style="width: 120px;">
      <geo-trimmed-content>
        Some text that should be trimmed and has <strong>strong</strong> content
      </geo-trimmed-content>
    </div>

    <div class="element-demo__bordered-box" style="resize: both;">
      <geo-trimmed-content>
        Some text that should be trimmed and parent can be resized
      </geo-trimmed-content>
    </div>
  </div>
  <h3 class="element-demo__header">Short content</h3>
  <div class="element-demo__block">
    <div class="element-demo__bordered-box" style="width: 120px;">
      <geo-trimmed-content>
        Some text
      </geo-trimmed-content>
    </div>
  </div>
</div>
```