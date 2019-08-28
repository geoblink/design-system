```jsx live
<div class="element-demo">
  <element-demo name="Simple">
    <element-demo-horizontal-layout>
      <element-demo-box>
        <geo-activity-indicator />
      </element-demo-box>

      <element-demo-box class="u-background--primary">
        <geo-activity-indicator variant="primary" />
      </element-demo-box>

      <element-demo-box class="u-background--info">
        <geo-activity-indicator variant="info" />
      </element-demo-box>

      <element-demo-box class="u-background--success">
        <geo-activity-indicator variant="success" />
      </element-demo-box>

      <element-demo-box class="u-background--error">
        <geo-activity-indicator variant="error" />
      </element-demo-box>

      <element-demo-box class="u-background--warn">
        <geo-activity-indicator variant="warn" />
      </element-demo-box>

      <element-demo-box class="u-background--progress">
        <geo-activity-indicator variant="progress" />
      </element-demo-box>

      <element-demo-box class="u-background--dark-transparent">
        <geo-activity-indicator variant="dark-transparent" />
      </element-demo-box>
    </element-demo-horizontal-layout>
  </element-demo>
</div>
```

```jsx live
<div>
  <element-demo name="With icon">
    <element-demo-horizontal-layout>
      <element-demo-box>
        <geo-activity-indicator>
          <font-awesome-icon
            :icon="['far', 'lightbulb']"
            class="u-color--primary"
            aria-hidden
            fixed-width
          />
        </geo-activity-indicator>
      </element-demo-box>

      <element-demo-box class="u-background--primary">
        <geo-activity-indicator variant="primary">
          <font-awesome-icon
            :icon="['far', 'lightbulb']"
            class="u-color--info"
            aria-hidden
            fixed-width
          />
        </geo-activity-indicator>
      </element-demo-box>

      <element-demo-box class="u-background--info">
        <geo-activity-indicator variant="info">
          <font-awesome-icon
            :icon="['far', 'lightbulb']"
            class="u-color--primary"
            aria-hidden
            fixed-width
          />
        </geo-activity-indicator>
      </element-demo-box>

      <element-demo-box class="u-background--success">
        <geo-activity-indicator variant="success">
          <font-awesome-icon
            :icon="['far', 'lightbulb']"
            aria-hidden
            fixed-width
          />
        </geo-activity-indicator>
      </element-demo-box>

      <element-demo-box class="u-background--error">
        <geo-activity-indicator variant="error">
          <font-awesome-icon
            :icon="['far', 'lightbulb']"
            aria-hidden
            fixed-width
          />
        </geo-activity-indicator>
      </element-demo-box>

      <element-demo-box class="u-background--warn">
        <geo-activity-indicator variant="warn">
          <font-awesome-icon
            :icon="['far', 'lightbulb']"
            class="u-color--white"
            aria-hidden
            fixed-width
          />
        </geo-activity-indicator>
      </element-demo-box>

      <element-demo-box class="u-background--progress">
        <geo-activity-indicator variant="progress">
          <font-awesome-icon
            :icon="['far', 'lightbulb']"
            class="u-color--info"
            aria-hidden
            fixed-width
          />
        </geo-activity-indicator>
      </element-demo-box>

      <element-demo-box class="u-background--dark-transparent">
        <geo-activity-indicator variant="dark-transparent">
          <font-awesome-icon
            :icon="['far', 'lightbulb']"
            class="u-color--white"
            aria-hidden
            fixed-width
          />
        </geo-activity-indicator>
      </element-demo-box>
    </element-demo-horizontal-layout>
  </element-demo>
</div>
```

```vue live
<template>
  <element-demo name="Customizable">
    <element-demo-actions>
      <label>
        Variant: <select
          v-model="variant"
        >
          <option value="default">Default</option>
          <option value="primary">Primary</option>
          <option value="info">Info</option>
          <option value="success">Success</option>
          <option value="error">Error</option>
          <option value="warn">Warn</option>
          <option value="progress">Progress</option>
          <option value="dark-transparent">Dark + Transparent</option>
        </select>
      </label>

      <label>
        Height: <input
          :style="{
            width: '40px'
          }"
          type="number"
          v-model="customSize"
        >
      </label>

      <label>
        Inner radius: <input
          :style="{
            'width': '40px'
          }"
          type="number"
          min="0"
          max="50"
          step="1"
          v-model.number="innerRadius"
        >
      </label>

      <label>
        Completed percentage: <input
          :style="{
            'width': '40px'
          }"
          type="number"
          min="0"
          max="1"
          step="0.01"
          v-model.number="completedPercentage"
        >
      </label>

      <label>
        Animated: <input
          type="checkbox"
          v-model="animated"
        >
      </label>
    </element-demo-actions>

    <element-demo-box
      :style="{
        height: customSizePxString,
        width: customSizePxString
      }"
    >
      <geo-activity-indicator
        :percentage="completedPercentage"
        :inner-radius="innerRadius"
        :animated="animated"
        :variant="variant"
      />
    </element-demo-box>

  </element-demo>
</template>

<script>
export default {
  data () {
    return {
      variant: 'default',
      customSize: 30,
      completedPercentage: 0.33,
      animated: true,
      innerRadius: 40
    }
  },
  computed: {
    customSizePxString () {
      return this.customSize + 'px'
    },

    cssModifierForVariant () {
      return this.variant ? '--' + this.variant : ''
    },

    demoBoxVariantClass () {
      return 'geo-activity-indicator-demo-box' + this.cssModifierForVariant
    }
  }
}
</script>
```
