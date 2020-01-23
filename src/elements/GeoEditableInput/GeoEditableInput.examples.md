### Table style input

```vue live
<template>
  <div class="element-demo">
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
      <div class="input-demo__container">
        <geo-editable-input
          v-model="inputValue[1]"
          :cancel-icon="['fas', 'times']"
          :save-icon="['fas', 'check']"
          :showButtons="showButtons[1]"
          :loading="isLoading"
          type="number"
          placeholder="Placeholder"
          @save="saveData(1)"
          @cancel="cancel(1)"
          @click="enterEditMode(1)"
          @click-outside="hideButtons(1)"
        />
      </div>
    </div>
    <div class="element-demo__block" style="justify-content: space-around;">
      <p>Input value text: {{ inputValue[0] }}</p>
      <p>Input value number: {{ inputValue[1] }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showButtons: [false, false],
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

### Normal input

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <div class="input-demo__container">
        <geo-editable-input
          v-model="inputValue"
          :cancel-icon="['fas', 'times']"
          :save-icon="['fas', 'check']"
          :showButtons="showButtons"
          :loading="isLoading"
          input-type="normal"
          placeholder="Placeholder"
          @save="saveData()"
          @cancel="cancel()"
          @click="enterEditMode()"
          @click-outside="hideButtons()"
        />
      </div>
    </div>
    <div class="element-demo__block" style="justify-content: space-around;">
      <p>Input value: {{ inputValue }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showButtons: false,
      isLoading: false,
      inputValue: ''
    }
  },
  methods: {
    enterEditMode () {
      this.showButtons = true
    },
    hideButtons () {
      this.showButtons = false
    },
    cancel () {
      this.hideButtons()
    },
    saveData () {
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

### Disabled input

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <div class="input-demo__container">
        <geo-editable-input
          :cancel-icon="['fas', 'times']"
          :save-icon="['fas', 'check']"
          :showButtons="showButtons"
          disabled
          placeholder="Placeholder"
          @click="enterEditMode()"
          @click-outside="hideButtons()"
        />
      </div>
    </div>
    <div class="element-demo__block" style="justify-content: space-around;">
      <p>Input value: {{ inputValue }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showButtons: false,
      isLoading: false,
      inputValue: ''
    }
  },
  methods: {
    enterEditMode () {
      this.showButtons = true
    },
    hideButtons () {
      this.showButtons = false
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

### Input with embeded icon

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <div class="input-demo__container">
        <geo-editable-input
          :cancel-icon="['fas', 'times']"
          :save-icon="['fas', 'check']"
          :showButtons="showButtons"
          placeholder="Placeholder"
          @click="enterEditMode()"
          @click-outside="hideButtons()"
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
      showButtons: false,
      isLoading: false,
      inputValue: ''
    }
  },
  methods: {
    enterEditMode () {
      this.showButtons = true
    },
    hideButtons () {
      this.showButtons = false
    },
    cancel () {
      this.hideButtons()
    },
    saveData () {
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

### Input with numerical type

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <div class="input-demo__container">
        <geo-editable-input
          v-model="inputNumericalValue"
          :cancel-icon="['fas', 'times']"
          :save-icon="['fas', 'check']"
          :showButtons="showButtons"
          :style="{
            width: inputNumericalValue && inputNumericalValue.length + 4 + 'ch'
          }"
          type="number"
          input-type="normal"
          placeholder="Placeholder"
          @click="enterEditMode()"
          @click-outside="hideButtons()"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showButtons: false,
      isLoading: false,
      inputNumericalValue: ''
    }
  },
  methods: {
    enterEditMode () {
      this.showButtons = true
    },
    hideButtons () {
      this.showButtons = false
    },
    cancel () {
      this.hideButtons()
    },
    saveData () {
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