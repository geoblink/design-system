```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Simple</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <div class="element-demo__bordered-box geo-activity-indicator-demo-box">
        <geo-activity-indicator />
      </div>
      <div class="element-demo__bordered-box geo-activity-indicator-demo-box geo-activity-indicator-demo-box--primary">
        <geo-activity-indicator css-modifier="primary" />
      </div>
      <div class="element-demo__bordered-box geo-activity-indicator-demo-box geo-activity-indicator-demo-box--info">
        <geo-activity-indicator css-modifier="info" />
      </div>
      <div class="element-demo__bordered-box geo-activity-indicator-demo-box geo-activity-indicator-demo-box--success">
        <geo-activity-indicator css-modifier="success" />
      </div>
      <div class="element-demo__bordered-box geo-activity-indicator-demo-box geo-activity-indicator-demo-box--error">
        <geo-activity-indicator css-modifier="error" />
      </div>
      <div class="element-demo__bordered-box geo-activity-indicator-demo-box geo-activity-indicator-demo-box--warn">
        <geo-activity-indicator css-modifier="warn" />
      </div>
      <div class="element-demo__bordered-box geo-activity-indicator-demo-box geo-activity-indicator-demo-box--progress">
        <geo-activity-indicator css-modifier="progress" />
      </div>
    </div>
    <h3 class="element-demo__header">
      Customizable
      <div class="element-demo__inline-input-group">
        <label class="element-demo__inline-input-group__field">
          Variant: <select
            v-model="variant"
          >
            <option :value="undefined">None</option>
            <option value="primary">Primary</option>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="error">Error</option>
            <option value="warn">Warn</option>
            <option value="progress">Progress</option>
          </select>
        </label>
        <label class="element-demo__inline-input-group__field">
          Height: <input
            :style="{
              width: '40px'
            }"
            type="number"
            v-model="customSize"
          >
        </label>
        <label class="element-demo__inline-input-group__field" style="margin-left: 8px">
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
        <label class="element-demo__inline-input-group__field" style="margin-left: 8px">
          Animated: <input
            type="checkbox"
            v-model="animated"
          >
        </label>
      </div>
    </h3>
    <div class="element-demo__block">
      <div
        :class="demoBoxVariantClass"
        :style="{
          height: customSizePxString,
          width: customSizePxString
        }"
        class="geo-activity-indicator-demo-box"
      >
        <geo-activity-indicator
          :percentage="completedPercentage"
          :animated="animated"
          :css-modifier="variant"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      variant: undefined,
      customSize: 30,
      completedPercentage: 0.33,
      animated: true
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

<style>
.geo-activity-indicator-demo-box {
  display: block;
  height: 100px;
  width: 100px;
}

.geo-activity-indicator-demo-box--primary {
  background: #1464A5;
}

.geo-activity-indicator-demo-box--info {
  background: #6FA1D4;
}

.geo-activity-indicator-demo-box--success {
  background: #3FAD4D;
}

.geo-activity-indicator-demo-box--error {
  background: #FF594F;
}

.geo-activity-indicator-demo-box--warn {
  background: #EFAE00;
}

.geo-activity-indicator-demo-box--progress {
  background: #17293D;
}
</style>
```
