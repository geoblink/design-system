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

### Input states

``` vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-input v-model="model" type="text" placeholder="Placeholder">
        <geo-input-label slot="label">Base</geo-input-label>
        <geo-input-message slot="message">This is the legend</geo-input-message>
      </geo-input>

      <geo-input v-model="model" type="text" focus>
        <geo-input-label slot="label">Base (focused)</geo-input-label>
        <geo-input-message slot="message">This is the legend</geo-input-message>
      </geo-input>

      <geo-input v-model="model" type="text" disabled>
        <geo-input-label slot="label">Base (disabled)</geo-input-label>
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
      model: null
    }
  }
}
</script>
```

``` vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-input v-model="model" type="text" success>
        <geo-input-label slot="label">Success</geo-input-label>
        <geo-input-message slot="message" variant="success">Success message</geo-input-message>
      </geo-input>

      <geo-input v-model="model" type="text" success focus>
        <geo-input-label slot="label">Success (focused)</geo-input-label>
        <geo-input-message slot="message" variant="success">Success message</geo-input-message>
      </geo-input>

      <geo-input v-model="model" type="text" success disabled>
        <geo-input-label slot="label">Success (disabled)</geo-input-label>
        <geo-input-message slot="message" variant="success">Success message</geo-input-message>
      </geo-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoInputDemo',
  data () {
    return {
      model: null
    }
  }
}
</script>
```

``` vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-input v-model="model" type="text" error>
        <geo-input-label slot="label">Error</geo-input-label>
        <geo-input-message slot="message" variant="error">Error message</geo-input-message>
      </geo-input>

      <geo-input v-model="model" type="text" error focus>
        <geo-input-label slot="label">Error (focused)</geo-input-label>
        <geo-input-message slot="message" variant="error">Error message</geo-input-message>
      </geo-input>

      <geo-input v-model="model" type="text" error disabled>
        <geo-input-label slot="label">Error (disabled)</geo-input-label>
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
      model: null
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

### Read only input

``` vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-input v-model="value" type="text" :read-only="true" :disabled-icon="['fas', 'lock']">
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

### Input with leading accessory item

``` vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-input v-model="value" type="text">
        <geo-input-label slot="label">Search input</geo-input-label>
        <font-awesome-icon
          slot="leadingAccessoryItem"
          :icon="['fas', 'search']"
          fixed-with
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
      value: ''
    }
  }
}
</script>
```

### Input with trailing accessory item

``` vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-input v-model="model[0]" type="text" placeholder="Placeholder">
        <geo-primary-button slot="trailingAccessoryItem">Action!</geo-primary-button>
      </geo-input>

      <geo-input v-model="model[1]" type="text" placeholder="Disabled" disabled>
        <geo-primary-button slot="trailingAccessoryItem">Action!</geo-primary-button>
      </geo-input>

      <geo-input v-model="model[2]" type="text" @delete-value="resetValue">
        <geo-primary-button slot="trailingAccessoryItem">Action!</geo-primary-button>
      </geo-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoInputDemo',
  data () {
    return {
      model: [null, null, 'Some value']
    }
  },
  methods: {
    resetValue () {
      this.model[2] = ''
    }
  }
}
</script>
```

### Prefixed input

``` vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-input v-model="value">
        <geo-input-prefix slot="leadingAccessoryItem">
          <font-awesome-icon
            :icon="['fas', 'euro-sign']"
            fixed-width
          />
        </geo-input-prefix>
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

### Suffixed input with delete event

``` vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-input v-model="value" @delete-value="resetValue">
        <geo-input-suffix slot="trailingAccessoryItem">
          euros
        </geo-input-suffix>
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
  },
  methods: {
    resetValue () {
      this.value = ''
    }
  }
}
</script>
```

### Disabled input with suffix

``` vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-input
        v-model="value"
        disabled
      >
        <geo-input-suffix slot="trailingAccessoryItem">
          euros
        </geo-input-suffix>
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

### Input with suffix and trailing accessory item

``` vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-input
        v-model="value"
      >
        <geo-primary-button
          slot="trailingAccessoryItem"
          class="geo-input-several-accessory-items--not-last"
        >
          Action
        </geo-primary-button>
        <geo-input-suffix slot="trailingAccessoryItem">euros</geo-input-suffix>
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

<style scoped>
.geo-input-several-accessory-items--not-last {
  margin-right: 10px;
}
</style>
```

### Input number with suffix and delete event

``` vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-input v-model="value" type="number" @delete-value="resetValue">
        <geo-input-suffix slot="trailingAccessoryItem">
          euros
        </geo-input-suffix>
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
  },
  methods: {
    resetValue () {
      this.value = ''
    }
  }
}
</script>
```

### Input with select suffix

``` vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-input v-model="value">
        <geo-select
          slot="trailingAccessoryItem"
          :options="distanceMeasures"
          :dropdown-icon="['fas', 'chevron-down']"
          :search-icon="['fas', 'search']"
          :fixed-width="false"
          variant="inputAccessorySuffix"
          v-model="selectedDistanceMeasure"
        />
      </geo-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoInputDemo',
  data () {
    const distanceMeasures = [{label: 'meters'}, {label:'miles'}]
    return {
      value: '',
      distanceMeasures,
      selectedDistanceMeasure: distanceMeasures[0]
    }
  }
}
</script>
```

### Prefixed and suffixed input with delete event

``` vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-input v-model="value" @delete-value="resetValue">
        <geo-input-prefix slot="leadingAccessoryItem">
          <font-awesome-icon
            :icon="['fas', 'bell']"
            fixed-width
          />
        </geo-input-prefix>
        <geo-input-suffix slot="trailingAccessoryItem">
          <font-awesome-icon
            :icon="['fas', 'bell']"
            fixed-width
          />
        </geo-input-suffix>
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
  },
  methods: {
    resetValue () {
      this.value = ''
    }
  }
}
</script>
```
