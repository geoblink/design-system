### Regular style

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-segmented-control>
        <geo-segmented-control-item
          v-for="(control, index) in availableControls"
          :key="control"
          :disabled="isDisabled[index]"
          :active="activeControls[control]"
          @click="toggleControl(control)"
        >
          <font-awesome-icon :icon="availableIcons[index]" fixed-width />
          <span>Option {{ control }}</span>
        </geo-segmented-control-item>
      </geo-segmented-control>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeControls: {
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: true
      }
    }
  },
  computed: {
    availableIcons () {
      return [
        'cat', 'crow', 'spider', 'ghost', 'broom', 'toilet-paper'
      ].map(icon => {
        return ['fas', icon]
      })
    },

    availableControls () {
      return Object.keys(this.activeControls)
    },

    isDisabled () {
      return [false, false, false, true, false, false]
    }
  },
  methods: {
    toggleControl (name) {
      this.activeControls[name] = !this.activeControls[name]
    }
  }
}
</script>
```

### Regular style (short)

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" >
      <geo-segmented-control>
        <geo-segmented-control-item
          v-for="(control, index) in availableControls"
          :key="control"
          :active="activeControls[control]"
          @click="toggleControl(control)"
        >
          <font-awesome-icon :icon="availableIcons[index]" fixed-width />
          <span>Option {{ control }}</span>
        </geo-segmented-control-item>
      </geo-segmented-control>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeControls: {
        one: false,
        two: false
      }
    }
  },
  computed: {
    availableIcons () {
      return [
        'cat', 'crow'
      ].map(icon => {
        return ['fas', icon]
      })
    },

    availableControls () {
      return Object.keys(this.activeControls)
    }
  },
  methods: {
    toggleControl (name) {
      this.activeControls[name] = !this.activeControls[name]
    }
  }
}
</script>
```

### Regular style (single item)

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-segmented-control>
        <geo-segmented-control-item
          v-for="(control, index) in availableControls"
          :key="control"
          :active="activeControls[control]"
          @click="toggleControl(control)"
        >
          <font-awesome-icon :icon="availableIcons[index]" fixed-width />
          <span>Option {{ control }}</span>
        </geo-segmented-control-item>
      </geo-segmented-control>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeControls: {
        one: false
      }
    }
  },
  computed: {
    availableIcons () {
      return [
        'cat'
      ].map(icon => {
        return ['fas', icon]
      })
    },

    availableControls () {
      return Object.keys(this.activeControls)
    }
  },
  methods: {
    toggleControl (name) {
      this.activeControls[name] = !this.activeControls[name]
    }
  }
}
</script>
```

### Outline style

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-segmented-control outline>
        <geo-segmented-control-item
          v-for="(control, index) in availableControls"
          :key="control"
          :disabled="isDisabled[index]"
          :active="activeControls[control]"
          @click="toggleControl(control)"
        >
          <font-awesome-icon :icon="availableIcons[index]" fixed-width />
          <span>Option {{ control }}</span>
        </geo-segmented-control-item>
      </geo-segmented-control>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeControls: {
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: true
      }
    }
  },
  computed: {
    availableIcons () {
      return [
        'cat', 'crow', 'spider', 'ghost', 'broom', 'toilet-paper'
      ].map(icon => {
        return ['fas', icon]
      })
    },

    availableControls () {
      return Object.keys(this.activeControls)
    },

    isDisabled () {
      return [false, false, false, true, false, false]
    }
  },
  methods: {
    toggleControl (name) {
      this.activeControls[name] = !this.activeControls[name]
    }
  }
}
</script>
```

### Outline style (short)

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" >
      <geo-segmented-control outline>
        <geo-segmented-control-item
          v-for="(control, index) in availableControls"
          :key="control"
          :active="activeControls[control]"
          @click="toggleControl(control)"
        >
          <font-awesome-icon :icon="availableIcons[index]" fixed-width />
          <span>Option {{ control }}</span>
        </geo-segmented-control-item>
      </geo-segmented-control>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeControls: {
        one: false,
        two: false
      }
    }
  },
  computed: {
    availableIcons () {
      return [
        'cat', 'crow'
      ].map(icon => {
        return ['fas', icon]
      })
    },

    availableControls () {
      return Object.keys(this.activeControls)
    }
  },
  methods: {
    toggleControl (name) {
      this.activeControls[name] = !this.activeControls[name]
    }
  }
}
</script>
```

### Outline style (single item)

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-segmented-control outline>
        <geo-segmented-control-item
          v-for="(control, index) in availableControls"
          :key="control"
          :active="activeControls[control]"
          @click="toggleControl(control)"
        >
          <font-awesome-icon :icon="availableIcons[index]" fixed-width />
          <span>Option {{ control }}</span>
        </geo-segmented-control-item>
      </geo-segmented-control>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeControls: {
        one: false
      }
    }
  },
  computed: {
    availableIcons () {
      return [
        'cat'
      ].map(icon => {
        return ['fas', icon]
      })
    },

    availableControls () {
      return Object.keys(this.activeControls)
    }
  },
  methods: {
    toggleControl (name) {
      this.activeControls[name] = !this.activeControls[name]
    }
  }
}
</script>
```
