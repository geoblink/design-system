`GeoInput` component works like a native input but can be customisable with a label
and a message as well as different color schemes to give feedback to the user.

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Simple input</h3>
    <div class="element-demo__block">
      <geo-input />
    </div>
    <h3 class="element-demo__header">Composed input</h3>
    <div class="element-demo__block">
      <geo-input v-model="model[0]" type="text" placeholder="Placeholder">
        <geo-input-label slot="label">Label</geo-input-label>
        <geo-input-message slot="message">This is the legend</geo-input-message>
      </geo-input>

      <geo-input v-model="model[1]" type="text" focus>
        <geo-input-label slot="label">Input focused</geo-input-label>
        <geo-input-message slot="message">This is the legend</geo-input-message>
      </geo-input>

      <geo-input v-model="model[2]" type="text" :success="true" :disabled-icon="['fas', 'lock']">
        <geo-input-label slot="label">Input success</geo-input-label>
        <geo-input-message slot="message" variant="success">Success message</geo-input-message>
      </geo-input>

      <geo-input v-model="model[3]" type="text" :error="true" :disabled-icon="['fas', 'lock']">
        <geo-input-label slot="label">Input error</geo-input-label>
        <geo-input-message slot="message" variant="error">Error message</geo-input-message>
      </geo-input>
    </div>

    <h3 class="element-demo__header">Disabled input</h3>
    <div class="element-demo__block">
      <geo-input v-model="model[4]" type="text" :disabled="true" :disabled-icon="['fas', 'lock']">
        <geo-input-label slot="label">Input disabled</geo-input-label>
        <geo-input-message slot="message">This is the legend</geo-input-message>
      </geo-input>
    </div>

    <h3 class="element-demo__header">Input text with events</h3>
    <div class="element-demo__block">
      <geo-input
        v-model="model[5]"
        type="text"
        placeholder="Placeholder"
        ref="input"
        :valid="false"
        @blur="isFocused = false"
        @focus="isFocused = true"
      >
      </geo-input>
    </div>
    <button @click="setFocusOnInput()">Focus input</button>
    <span>Focused: {{ isFocused }}, Model: {{ model[5] }}</span>

    <h3 class="element-demo__header">Input number with validation max 5</h3>
    <div class="element-demo__block">
      <geo-input v-model="model[6]" type="number" max="5" @input="checkNumberInput(model[6])">
        <geo-input-message v-if="hasError" slot="message" variant="error">Max number is 5</geo-input-message>
      </geo-input>
    </div>
    <span>Show error: {{ hasError }}, Model: {{ model[6] }}</span>
  </div>
</template>

<script>
export default {
  name: 'GeoInputDemo',
  data () {
    return {
      model: [null, null, null, null, null, null, null],
      isFocused: false,
      hasError: false
    }
  },
  computed: {

  },
  methods: {
    setFocusOnInput () {
      this.$refs.input.$el.focus()
    },

    checkNumberInput (value) {
      if (parseFloat(value) > 5) {
        this.hasError = true
      } else {
        this.hasError = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.element-demo__model {
  margin-left: 10px;
}
</style>
```