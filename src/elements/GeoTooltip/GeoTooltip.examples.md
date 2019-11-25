`GeoTooltip` is a component used to display a tooltip.
Using this component you can render complex HTML tooltips in a safe and reactive way.

### Basic

```jsx live
<button>
  <geo-tooltip>This is button's tooltip content</geo-tooltip>

  This button has a tooltip
</button>
```

```jsx live
<p>This text has tooltips in <strong><geo-tooltip>Bold affirmation!</geo-tooltip>some words</strong>.</p>
<p>A <strong><geo-tooltip>W!</geo-tooltip>w</strong><strong><geo-tooltip>O!</geo-tooltip>o</strong><strong><geo-tooltip>R!</geo-tooltip>r</strong><strong><geo-tooltip>D!</geo-tooltip>d</strong> might have several tooltips.</p>
```

### Position

```jsx live
<p>Tooltips can be placed
  <button>
    <geo-tooltip
      :delay="0"
      position="top"
    >
      Tooltip on top!
    </geo-tooltip>

    on top
  </button>
  <button>
    <geo-tooltip
      :delay="0"
      position="bottom"
    >
      Tooltip on bottom!
    </geo-tooltip>

    on bottom
  </button>
  <button>
    <geo-tooltip
      :delay="0"
      position="leading"
    >
      Tooltip on leading!
    </geo-tooltip>

    on leading
  </button>
  <button>
    <geo-tooltip
      :delay="0"
      position="trailing"
    >
      Tooltip on trailing!
    </geo-tooltip>

    on trailing
  </button>
</p>
```

### Alignment

```jsx live
<p>Tooltips can be aligned. When top positioned:
  <button>
    <geo-tooltip
      :delay="0"
      alignment="start"
      position="top"
    >
      Tooltip start is aligned with button start!
    </geo-tooltip>

    on the start of the button
  </button>
  <button>
    <geo-tooltip
      :delay="0"
      alignment="end"
      position="top"
    >
      Tooltip start is aligned with button end!
    </geo-tooltip>

    on the end of the button
  </button>
  <button>
    <geo-tooltip
      :delay="0"
      alignment="middle"
      position="top"
    >
      Tooltip middle is aligned with button middle!
    </geo-tooltip>

    on the middle of the button
  </button>
</p>
```

```jsx live
<p>Tooltips can be aligned. When bottom positioned:
  <button>
    <geo-tooltip
      :delay="0"
      alignment="start"
      position="bottom"
    >
      Tooltip start is aligned with button start!
    </geo-tooltip>

    on the start of the button
  </button>
  <button>
    <geo-tooltip
      :delay="0"
      alignment="end"
      position="bottom"
    >
      Tooltip start is aligned with button end!
    </geo-tooltip>

    on the end of the button
  </button>
  <button>
    <geo-tooltip
      :delay="0"
      alignment="middle"
      position="bottom"
    >
      Tooltip middle is aligned with button middle!
    </geo-tooltip>

    on the middle of the button
  </button>
</p>
```

```jsx live
<p>Tooltips can be aligned. When leading positioned:
  <button>
    <geo-tooltip
      :delay="0"
      alignment="start"
      position="leading"
    >
      Tooltip start is aligned with button start!
    </geo-tooltip>

    on the start of the button
  </button>
  <button>
    <geo-tooltip
      :delay="0"
      alignment="end"
      position="leading"
    >
      Tooltip start is aligned with button end!
    </geo-tooltip>

    on the end of the button
  </button>
  <button>
    <geo-tooltip
      :delay="0"
      alignment="middle"
      position="leading"
    >
      Tooltip middle is aligned with button middle!
    </geo-tooltip>

    on the middle of the button
  </button>
</p>
```

```jsx live
<p>Tooltips can be aligned. When trailing positioned:
  <button>
    <geo-tooltip
      :delay="0"
      alignment="start"
      position="trailing"
    >
      Tooltip start is aligned with button start!
    </geo-tooltip>

    on the start of the button
  </button>
  <button>
    <geo-tooltip
      :delay="0"
      alignment="end"
      position="trailing"
    >
      Tooltip start is aligned with button end!
    </geo-tooltip>

    on the end of the button
  </button>
  <button>
    <geo-tooltip
      :delay="0"
      alignment="middle"
      position="trailing"
    >
      Tooltip middle is aligned with button middle!
    </geo-tooltip>

    on the middle of the button
  </button>
</p>
```

```vue live
<template>
  <div class="element-demo">
    <h4 class="element-demo__header">Tooltips on GeoButton</h4>
    <div class="element-demo__block">
      <geo-primary-button data-tooltip-id="demo1">
        <geo-tooltip
          v-if="primaryButtonElement"
          :forced-trigger-target="primaryButtonElement"
        >
          Primary Button Tooltip
        </geo-tooltip>
        Primary Button
      </geo-primary-button>

      <geo-primary-button
        data-tooltip-id="demo2"
        disabled
      >
        <geo-tooltip
          v-if="primaryButtonDisabledElement"
          :forced-trigger-target="primaryButtonDisabledElement"
        >
          Primary Button Disabled Tooltip
        </geo-tooltip>
        Primary Button Disabled
      </geo-primary-button>
    </div>

    <h4 class="element-demo__header">Tooltips on FontAwesomeIcon</h4>
    <div class="element-demo__block">
      <font-awesome-icon
        data-tooltip-id="demo3"
        :icon="['fas', 'bell']"
      />
      <geo-tooltip
        v-if="fontAwesomeElement"
        :forced-trigger-target="fontAwesomeElement"
      >
        FontAwesomeIcon Tooltip
      </geo-tooltip>
    </div>

    <h4 class="element-demo__header">Tooltips on input</h4>
    <div class="element-demo__block">
      <input
        data-tooltip-id="demo4"
        placeholder="A simple input"
      />
      <geo-tooltip
        v-if="inputElement"
        :forced-trigger-target="inputElement"
      >
        Input Tooltip
      </geo-tooltip>

      <geo-input
        data-tooltip-id="demo5"
        placeholder="A simple GeoInput"
      />
      <geo-tooltip
        v-if="geoInputElement"
        :forced-trigger-target="geoInputElement">
        GeoInput Tooltip
      </geo-tooltip>
    </div>

    <h4 class="element-demo__header">Tooltips on GeoDropdownCompactButton</h4>
    <div class="element-demo__block">
      <geo-dropdown-compact-button
        data-tooltip-id="demo6"
      />
      <geo-tooltip
        v-if="geoDropdownCompactButtonElement"
        :forced-trigger-target="geoDropdownCompactButtonElement"
      >
        GeoDropdownCompactButton Tooltip
      </geo-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      primaryButtonElement: null,
      primaryButtonDisabledElement: null,
      fontAwesomeElement: null,
      inputElement: null,
      geoInputElement: null,
      geoDropdownCompactButtonElement: null
    }
  },
  mounted () {
    this.primaryButtonElement = document.querySelector('[data-tooltip-id="demo1"]')
    this.primaryButtonDisabledElement = document.querySelector('[data-tooltip-id="demo2"]')
    this.fontAwesomeElement = document.querySelector('[data-tooltip-id="demo3"]')
    this.inputElement = document.querySelector('[data-tooltip-id="demo4"]')
    this.geoInputElement = document.querySelector('[data-tooltip-id="demo5"]')
    this.geoDropdownCompactButtonElement = document.querySelector('[data-tooltip-id="demo6"]')
  }
}
</script>
```
