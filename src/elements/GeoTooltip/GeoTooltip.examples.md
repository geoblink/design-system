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

**Note**: We use `document.querySelector` in demos for simplicity's sake.
In production we recommend using [refs](https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements).
We do not use them here because they are not reactive by default.
To make them reactive we recommend [ReactiveRefs](https://github.com/posva/vue-reactive-refs).
To not use non-default behaviours in the demos and keep them simple, we do not load that plugin and hence we are forced to use a different approach.

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Tooltips on GeoButton</h3>
    <div class="element-demo__block">
      <geo-primary-button data-tooltip-id="demo1">
        <geo-tooltip :forced-trigger-target="primaryButtonElement">
          Primary Button Tooltip
        </geo-tooltip>
        Primary Button
      </geo-primary-button>

      <geo-primary-button
        data-tooltip-id="demo2"
        disabled
      >
        <geo-tooltip :forced-trigger-target="primaryButtonDisabledElement">
          Primary Button Disabled Tooltip
        </geo-tooltip>
        Primary Button Disabled
      </geo-primary-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      primaryButtonElement: null,
      primaryButtonDisabledElement: null
    }
  },
  mounted () {
    this.primaryButtonElement = document.querySelector('[data-tooltip-id="demo1"]')
    this.primaryButtonDisabledElement = document.querySelector('[data-tooltip-id="demo2"]')
  }
}
</script>
```

``` vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Tooltips on FontAwesomeIcon</h3>
    <div class="element-demo__block">
      <font-awesome-icon
        data-tooltip-id="demo3"
        :icon="['fas', 'bell']"
      />
      <geo-tooltip :forced-trigger-target="fontAwesomeElement">
        FontAwesomeIcon Tooltip
      </geo-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fontAwesomeElement: null
    }
  },
  mounted () {
    this.fontAwesomeElement = document.querySelector('[data-tooltip-id="demo3"]')
  }
}
</script>
```

``` vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Tooltips on input</h3>
    <div class="element-demo__block">
      <input
        data-tooltip-id="demo4"
        placeholder="A simple input"
      />
      <geo-tooltip :forced-trigger-target="inputElement">
        Input Tooltip
      </geo-tooltip>

      <geo-input
        data-tooltip-id="demo5"
        placeholder="A simple GeoInput"
      />
      <geo-tooltip :forced-trigger-target="geoInputElement">
        GeoInput Tooltip
      </geo-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputElement: null,
      geoInputElement: null
    }
  },
  mounted () {
    this.inputElement = document.querySelector('[data-tooltip-id="demo4"]')
    this.geoInputElement = document.querySelector('[data-tooltip-id="demo5"]')
  }
}
</script>
```

``` vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Tooltips on GeoDropdownCompactButton</h3>
    <div class="element-demo__block">
      <geo-dropdown
        :opened="isOpened"
        @click-outside="closeMenu()"
      >
        <geo-dropdown-compact-button
          slot="toggleButton"
          data-tooltip-id="demo6"
          @click="toggleMenu()"/>
        <geo-tooltip
          slot="toggleButton"
          :forced-trigger-target="geoDropdownCompactButtonElement"
        >
          GeoDropdownCompactButton Tooltip
        </geo-tooltip>
        <geo-bordered-box slot="popupContent">
          Hello
        </geo-bordered-box>
      </geo-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      geoDropdownCompactButtonElement: null,
      isOpened: false
    }
  },
  mounted () {
    this.geoDropdownCompactButtonElement = document.querySelector('[data-tooltip-id="demo6"]')
  },
  methods: {
    closeMenu () {
      this.isOpened = false
    },
    toggleMenu () {
      this.isOpened = !this.isOpened
    },
  }
}
</script>
```

``` vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Tooltips with changing TriggerTarget</h3>
    <div
      class="element-demo__block"
      @mouseover="isToggleablePrimaryButtonTooltipVisible = true"
      @mouseleave="isToggleablePrimaryButtonTooltipVisible = false"
    >
      <input type="checkbox" v-model="isToggleablePrimaryButtonVisible">
      <geo-primary-button v-if="isToggleablePrimaryButtonVisible">
        <geo-tooltip :visible="isToggleablePrimaryButtonTooltipVisible">
          Checkbox Primary Button Tooltip
        </geo-tooltip>
        Primary Button
      </geo-primary-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isToggleablePrimaryButtonVisible: true,
      isToggleablePrimaryButtonTooltipVisible: false
    }
  }
}
</script>
```

``` vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Static tooltip</h3>
    <div class="element-demo__block" >
      <input type="checkbox" v-model="testIntersection" style="margin-right: 40px;">
      <geo-secondary-button
        :disabled="isVisibleTooltip"
        @click="showTooltip()"
      >
        <geo-tooltip
          :visible="isVisibleTooltip"
          :static="true"  
        >
          The tooltip appears until you click on the icon
          <font-awesome-icon
            :icon="['fal', 'times']"
            style="color: red; margin-left: 5px; cursor: pointer;"
            @click="hideTooltip()"
          />
        </geo-tooltip>
        {{ buttonWithStaticTooltipText }}
      </geo-secondary-button>
      <geo-secondary-button
        data-tooltip-id="demo8"
        :class="{
          'margin-left-second-button': !testIntersection
        }"
      >
        <geo-tooltip :forced-trigger-target="secondaryButtonElement">
          The tooltip appears only on hover, but is very long so might
          go under the other one when the checkbox is checked
        </geo-tooltip>
        A button with a regular tooltip
      </geo-secondary-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isVisibleTooltip: true,
      buttonWithStaticTooltipText: 'A button with a static tooltip',
      secondaryButtonElement: null,
      testIntersection: false
    }
  },
  mounted () {
    this.secondaryButtonElement = document.querySelector('[data-tooltip-id="demo8"]')
  },
  methods: {
    hideTooltip () {
      this.isVisibleTooltip = false
      this.buttonWithStaticTooltipText = 'Click to show the static tooltip'
    },
    showTooltip () {
      this.isVisibleTooltip = true
      this.buttonWithStaticTooltipText = 'A button with a static tooltip'
    }
  }
}
</script>

<style scoped>
.margin-left-second-button {
  margin-left: 100px;
}
</style>
```

``` vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Two static tooltips</h3>
    <div class="element-demo__block" >
      <input type="checkbox" v-model="testIntersection" style="margin-right: 150px;">
      <geo-secondary-button
        :disabled="isVisibleTooltip1"
        style="width: 100px"
        @click="showTooltip1()"
      >
        <geo-tooltip
          :visible="isVisibleTooltip1"
          :static="true"  
        >
          Click on the icon to hide tooltip 1
          <font-awesome-icon
            :icon="['fal', 'times']"
            style="color: red; margin-left: 5px; cursor: pointer;"
            @click="hideTooltip1()"
          />
        </geo-tooltip>
        {{ buttonWithStaticTooltipText1 }}
      </geo-secondary-button>
      <geo-secondary-button
        :disabled="isVisibleTooltip2"
        :class="{
          'margin-left-second-button': !testIntersection
        }"
        style="width: 100px"
        @click="showTooltip2()"
      >
        <geo-tooltip
          :visible="isVisibleTooltip2"
          :static="true"  
        >
          Click on the icon to hide tooltip 2
          <font-awesome-icon
            :icon="['fal', 'times']"
            style="color: red; margin-left: 5px; cursor: pointer;"
            @click="hideTooltip2()"
          />
        </geo-tooltip>
        {{ buttonWithStaticTooltipText2 }}
      </geo-secondary-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isVisibleTooltip1: true,
      isVisibleTooltip2: true,
      testIntersection: false,
      buttonWithStaticTooltipText1: 'Button 1',
      buttonWithStaticTooltipText2: 'Button 2'
    }
  },
  methods: {
    hideTooltip1 () {
      this.isVisibleTooltip1 = false
      this.buttonWithStaticTooltipText1 = 'Click'
    },
    showTooltip1 () {
      this.isVisibleTooltip1 = true
      this.buttonWithStaticTooltipText1 = 'Button 1'
    },
    hideTooltip2 () {
      this.isVisibleTooltip2 = false
      this.buttonWithStaticTooltipText2 = 'Click'
    },
    showTooltip2 () {
      this.isVisibleTooltip2 = true
      this.buttonWithStaticTooltipText2 = 'Button 2'
    }
  }
}
</script>

<style scoped>
.margin-left-second-button {
  margin-left: 300px;
}
</style>
```

``` vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Tooltips on GeoSegmentedControlItem</h3>
    <div class="element-demo__block" style="justify-content: center">
      <geo-segmented-control style="width: auto">
        <geo-segmented-control-item
          :active="isLeftActive"
          @click="isLeft()"
        >
          <geo-tooltip :delay="200">
            Tooltip on left item
          </geo-tooltip>
          L
        </geo-segmented-control-item>

        <geo-segmented-control-item
          :active="isMiddleActive"
          @click="isMiddle()"
        >
          <geo-tooltip :delay="200">
            Tooltip on middle item
          </geo-tooltip>
          M
        </geo-segmented-control-item>

        <geo-segmented-control-item
          :active="isRightActive"
          @click="isRight()"
        >
          <geo-tooltip :delay="200">
            Tooltip on right item
          </geo-tooltip>
          R
        </geo-segmented-control-item>
      </geo-segmented-control>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLeftActive: true,
      isMiddleActive: false,
      isRightActive: false
    }
  },
  methods: {
    isRight () {
      this.isLeftActive = false
      this.isMiddleActive = false
      this.isRightActive = true
    },
    isMiddle () {
      this.isLeftActive = false
      this.isMiddleActive = true
      this.isRightActive = false
    },
    isLeft () {
      this.isLeftActive = true
      this.isMiddleActive = false
      this.isRightActive = false
    }
  }
}
</script>
```
