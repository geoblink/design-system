```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-vertical-layout>
        <geo-value
          v-bind="valueData"
        />
        <geo-value
          v-bind="valueData2"
        />
      </geo-vertical-layout>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoVerticalLayoutDemo',
  data () {
    return {
      valueData: {
        value: "27th of 73",
        isPrimary: true,
        unit: "",
        description:"Es mayor que la media de tiendas",
        descriptionTooltip:"Es mayor que la media de tiendas",
        colorHighlight:"green"
      },
      valueData2: {
        value: "27th of 73",
        isPrimary: false,
        unit: "",
        description:"Es mayor que la media de tiendas",
        descriptionTooltip:"Es mayor que la media de tiendas",
        colorHighlight:"green"
      }
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>
```

### Simple vertical layout

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-vertical-layout>
      <geo-secondary-button>Element 1</geo-secondary-button>
      <geo-secondary-button>Element 2</geo-secondary-button>
      <geo-secondary-button>Element 3</geo-secondary-button>
    </geo-vertical-layout>
  </div>
</div>
```

### Vertical with header and footer

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-vertical-layout>
      <template #header>
        <h5>Header</h5>
      </template>
      <geo-secondary-button>Element 1</geo-secondary-button>
      <geo-secondary-button>Element 2</geo-secondary-button>
      <geo-secondary-button>Element 3</geo-secondary-button>
      <template #footer>
        <geo-primary-button>Footer button</geo-primary-button>
      </template>
    </geo-vertical-layout>
  </div>
</div>
```
