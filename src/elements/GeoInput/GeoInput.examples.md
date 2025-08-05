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
        <template #label>
          <geo-input-label>Base</geo-input-label>
        </template>
        <template #message>
          <geo-input-message>This is the legend</geo-input-message>
        </template>
      </geo-input>

      <geo-input v-model="model" type="text" focus>
        <template #label>
          <geo-input-label>Base (focused)</geo-input-label>
        </template>
        <template #message>
          <geo-input-message>This is the legend</geo-input-message>
        </template>
      </geo-input>

      <geo-input v-model="model" type="text" disabled>
        <template #label>
          <geo-input-label>Base (disabled)</geo-input-label>
        </template>
        <template #message>
          <geo-input-message>This is the legend</geo-input-message>
        </template>
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
        <template #label>
          <geo-input-label>Success</geo-input-label>  
        </template>
        <template #message>
          <geo-input-message variant="success">Success message</geo-input-message>
        </template>
      </geo-input>

      <geo-input v-model="model" type="text" success focus>
        <template #label>
          <geo-input-label>Success (focused)</geo-input-label>
        </template>
        <template #message>
          <geo-input-message variant="success">Success message</geo-input-message>
        </template>
      </geo-input>

      <geo-input v-model="model" type="text" success disabled>
        <template #label>
          <geo-input-label>Success (disabled)</geo-input-label>
        </template>
        <template #message>
          <geo-input-message variant="success">Success message</geo-input-message>
        </template>
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
        <template #label>
          <geo-input-label>Error</geo-input-label>
        </template>
        <template #message>
          <geo-input-message variant="error">Error message</geo-input-message>
        </template>
      </geo-input>

      <geo-input v-model="model" type="text" error focus>
        <template #label>
          <geo-input-label>Error (focused)</geo-input-label>
        </template>
        <template #message>
          <geo-input-message variant="error">Error message</geo-input-message>
        </template>
      </geo-input>

      <geo-input v-model="model" type="text" error disabled>
        <template #label>
          <geo-input-label>Error (disabled)</geo-input-label>
        </template>
        <template #message>
          <geo-input-message variant="error">Error message</geo-input-message>
        </template>
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
        <template #label>
          <geo-input-label>Input disabled</geo-input-label>
        </template>
        <template #label>
          <geo-input-message>This is the legend</geo-input-message>
        </template>
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
        <template #label>
          <geo-input-label>Input disabled</geo-input-label>
        </template>
        <template #label>
          <geo-input-message>This is the legend</geo-input-message>
        </template>
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
        <template #message v-if="hasError">
          <geo-input-message variant="error">Max number is 5</geo-input-message>
        </template>
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
        <template #label>
          <geo-input-label>Search input</geo-input-label>
        </template>
        <template #leadingAccessoryItem>
          <font-awesome-icon
            :icon="['fas', 'search']"
            fixed-with
          />
        </template>
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
        <template #trailingAccessoryItem>
          <geo-primary-button>Action!</geo-primary-button>
        </template>
      </geo-input>

      <geo-input v-model="model[1]" type="text" placeholder="Disabled" disabled>
        <template #trailingAccessoryItem>
          <geo-primary-button>Action!</geo-primary-button>
        </template>
      </geo-input>

      <geo-input v-model="model[2]" type="text" @delete-value="resetValue">
        <template #trailingAccessoryItem>
          <geo-primary-button>Action!</geo-primary-button>
        </template>
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
        <template #leadingAccessoryItem>
          <geo-input-prefix>
            <font-awesome-icon
              :icon="['fas', 'euro-sign']"
              fixed-width
            />
          </geo-input-prefix>
        </template>
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
        <template #trailingAccessoryItem>
          <geo-input-suffix>
            euros
          </geo-input-suffix>
        </template>
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
        <template #trailingAccessoryItem>
          <geo-input-suffix>
            euros
          </geo-input-suffix>
        </template>
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
        <template #trailingAccessoryItem>
          <geo-primary-button
            class="geo-input-several-accessory-items--not-last"
          >
            Action
          </geo-primary-button>
          <geo-input-suffix>euros</geo-input-suffix>
        </template>
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
        <template #trailingAccessoryItem>
          <geo-input-suffix>
            euros
          </geo-input-suffix>
        </template>
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
        <template #trailingAccessoryItem>
          <geo-select
            :options="distanceMeasures"
            :dropdown-icon="['fas', 'chevron-down']"
            :search-icon="['fas', 'search']"
            :fixed-width="false"
            variant="inputAccessorySuffix"
            v-model="selectedDistanceMeasure"
          />
        </template>
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
        <template #leadingAccessoryItem>
          <geo-input-prefix>
            <font-awesome-icon
              :icon="['fas', 'bell']"
              fixed-width
            />
          </geo-input-prefix>
        </template>
        <template #trailingAccessoryItem>
          <geo-input-suffix>
            <font-awesome-icon
              :icon="['fas', 'bell']"
              fixed-width
            />
          </geo-input-suffix>
        </template>
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
