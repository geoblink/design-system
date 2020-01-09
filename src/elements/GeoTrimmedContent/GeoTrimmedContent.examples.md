### Long content

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <div class="element-demo__bordered-box" style="width: 120px;">
      <geo-trimmed-content>
        Some text that should be trimmed
      </geo-trimmed-content>
    </div>

    <div class="element-demo__bordered-box" style="width: 120px;">
      <geo-trimmed-content
        tooltip-position='bottom'
        tooltip-alignment='end'
      >
        Some text that should be trimmed and shown in the bottom left
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
</div>
```

### Short content

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <div class="element-demo__bordered-box" style="width: 120px;">
      <geo-trimmed-content>
        Some text
      </geo-trimmed-content>
    </div>
  </div>
</div>
```