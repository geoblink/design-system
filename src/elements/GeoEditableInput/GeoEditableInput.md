Use `GeoEditableInput` component when you need confirmation feedback from the user on individual input and not in a global form.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Input table</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <div class="input-demo__container">
        <geo-editable-input
          v-model="inputValue[0]"
          :cancel-icon="['fas', 'times']"
          :save-icon="['fas', 'check']"
          :showButtons="showButtons[0]"
          :loading="isLoading"
          placeholder="Placeholder"
          @save="saveData(0)"
          @cancel="cancel(0)"
          @click="enterEditMode(0)"
          @click-outside="hideButtons(0)"
        />
      </div>
    </div>
    <div class="element-demo__block" style="justify-content: space-around;">
      <p>Input value: {{ inputValue[0] }}</p>
    </div>
    <h3 class="element-demo__header">Input normal</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <div class="input-demo__container">
        <geo-editable-input
          v-model="inputValue[1]"
          :cancel-icon="['fas', 'times']"
          :save-icon="['fas', 'check']"
          :showButtons="showButtons[1]"
          :loading="isLoading"
          input-type="normal"
          placeholder="Placeholder"
          @save="saveData(1)"
          @cancel="cancel(1)"
          @click="enterEditMode(1)"
          @click-outside="hideButtons(1)"
        />
      </div>
    </div>
    <div class="element-demo__block" style="justify-content: space-around;">
      <p>Input value: {{ inputValue[1] }}</p>
    </div>
    <h3 class="element-demo__header">Input disabled</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <div class="input-demo__container">
        <geo-editable-input
          :cancel-icon="['fas', 'times']"
          :save-icon="['fas', 'check']"
          :showButtons="showButtons[2]"
          :disabled="true"
          placeholder="Placeholder"
          @click="enterEditMode(2)"
          @click-outside="hideButtons(2)"
        />
      </div>
    </div>
    <h3 class="element-demo__header">Input with embeded icon</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <div class="input-demo__container">
        <geo-editable-input
          :cancel-icon="['fas', 'times']"
          :save-icon="['fas', 'check']"
          :showButtons="showButtons[3]"
          placeholder="Placeholder"
          @click="enterEditMode(3)"
          @click-outside="hideButtons(3)"
        >
          <font-awesome-icon
            class="u-typestyle-body-disclaimer-small u-margin-right-small"
            slot="trailingAccessoryItem"
            :icon="['fas', 'exclamation-triangle']"
            aria-hidden
            fixed-width
          />
        </geo-editable-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showButtons: [false, false, false, false],
      isLoading: false,
      inputValue: ['', '']
    }
  },
  methods: {
    enterEditMode (index) {
      this.$set(this.showButtons, index, true)
    },
    hideButtons (index) {
      this.$set(this.showButtons, index, false)
    },
    cancel (index) {
      this.hideButtons(index)
    },
    saveData (index) {
      this.isLoading = true
      setTimeout(() => this.isLoading = false, 2000)
    }
  }
}
</script>

<style>
.input-demo__container {
  width: 200px;
}
</style>
```