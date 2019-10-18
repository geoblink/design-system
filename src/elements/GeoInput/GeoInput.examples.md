`GeoInput` component works like a native input but can be customisable with a label
and a message as well as different color schemes to give feedback to the user.

### Simple input

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-input v-model="value" autofocus/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoInputDemo',
  data () {
    return {
      value: null
    }
  }
}
</script>
```

### Simple input with delete event

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-input v-model="value" @delete-value="resetValue"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoInputDemo',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    resetValue () {
      this.value = ''
    }
  }
}
</script>
```

### Composed input

``` vue live
<template>
  <div class="element-demo">
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
  </div>
</template>

<script>
export default {
  name: 'GeoInputDemo',
  data () {
    return {
      model: [null, null, null, null]
    }
  }
}
</script>
```

### Disabled input

``` vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-input v-model="value" type="text" :disabled="true" :disabled-icon="['fas', 'lock']">
        <geo-input-label slot="label">Input disabled</geo-input-label>
        <geo-input-message slot="message">This is the legend</geo-input-message>
      </geo-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoInputDemo',
  data () {
    return {
      value: ''
    }
  }
}
</script>
```

### Input with leading icon

``` vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-input v-model="value" type="text" :leading-accessory-icon="['fas', 'search']">
        <geo-input-label slot="label">Search input</geo-input-label>
      </geo-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoInputDemo',
  data () {
    return {
      value: ''
    }
  }
}
</script>
```

### Input text with events

``` vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-input
        v-model="value"
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
    <span>Focused: {{ isFocused }}, Model: {{ value }}</span>
  </div>
</template>

<script>
export default {
  name: 'GeoInputDemo',
  data () {
    return {
      value: '',
      isFocused: false
    }
  },
  computed: {

  },
  methods: {
    setFocusOnInput () {
      this.$refs.input.$el.focus()
    }
  }
}
</script>
```

### Input number with validation and delete event

``` vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-input
        v-model="value"
        type="number"
        max="5"
        @input="checkNumberInput(value)"
        @delete-value="resetValue"
      >
        <geo-input-message v-if="hasError" slot="message" variant="error">Max number is 5</geo-input-message>
      </geo-input>
    </div>
    <span>Show error: {{ hasError }}, Model: {{ value }}</span>
  </div>
</template>

<script>
export default {
  name: 'GeoInputDemo',
  data () {
    return {
      value: '',
      hasError: false
    }
  },
  methods: {
    checkNumberInput (value) {
      if (parseFloat(value) > 5) {
        this.hasError = true
      } else {
        this.hasError = false
      }
    },
    resetValue () {
      this.value = ''
    }
  }
}
</script>
```

### Prefixed and suffixed inputs

``` vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Prefixed input</h3>
    <div class="element-demo__block">
      <geo-input v-model="model[0]">
        <font-awesome-icon slot="prefix"
          :icon="['fas', 'euro-sign']"
          fixed-width
        />
      </geo-input>
    </div>

    <h3 class="element-demo__header">Suffixed input with delete event</h3>
    <div class="element-demo__block">
      <geo-input v-model="model[1]" @delete-value="resetValue">
        <div slot="suffix">
          euros
        </div>
      </geo-input>
    </div>

    <h3 class="element-demo__header">Disable input with suffix</h3>
    <div class="element-demo__block">
      <geo-input
        v-model="model[2]"
        :disabled="true"
        :disabled-icon="['fas', 'lock']"
      >
        <div slot="suffix">
          euros
        </div>
      </geo-input>
    </div>

    <h3 class="element-demo__header">Input number with suffix and delete event</h3>
    <div class="element-demo__block">
      <geo-input v-model="model[3]" type="number" @delete-value="resetValue2">
        <div slot="suffix">
          euros
        </div>
      </geo-input>
    </div>

    <h3 class="element-demo__header">Prefixed and suffixed input with delete event</h3>
    <div class="element-demo__block">
      <geo-input v-model="model[4]" @delete-value="resetValue3">
        <font-awesome-icon slot="prefix"
          :icon="['fas', 'bell']"
          fixed-width
        />
        <font-awesome-icon slot="suffix"
          :icon="['fas', 'bell']"
          fixed-width
        />
      </geo-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoInputDemo',
  data () {
    return {
      model: [null, '', null, '', '']
    }
  },
  methods: {
    resetValue () {
      this.model.splice(1, 1, '')
    },
    resetValue2 () {
      this.model.splice(3, 1, '')
    },
    resetValue3 () {
      this.model.splice(4, 1, '')
    }
  }
}
</script>
```
