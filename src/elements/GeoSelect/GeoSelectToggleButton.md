`GeoSelectToggleButton` is a component designed to look like a modern HTML
`<select>` input, displaying a placeholder when no value is chosen and featuring
a trailing chevron.

```jsx
<div class="element-demo">
  <h3 class="element-demo__header">Empty geo select toggle button</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-select-toggle-button
      :dropdown-icon="['fas', 'chevron-down']"
      is-empty
    >
      Choose an option
    </geo-select-toggle-button>
  </div>
  <h3 class="element-demo__header">Regular geo select toggle button</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-select-toggle-button
      :dropdown-icon="['fas', 'chevron-down']"
      :is-empty="false"
    >
      Item 1
    </geo-select-toggle-button>
  </div>
  <h3 class="element-demo__header">Disabled geo select toggle button</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-select-toggle-button
      :is-empty="false"
      disabled
    >
      Choose an option
    </geo-select-toggle-button>
  </div>
  <h3 class="element-demo__header">Disabled empty geo select toggle button</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-select-toggle-button
      is-empty
      disabled
    >
      Choose an option
    </geo-select-toggle-button>
  </div>
</div>
```
