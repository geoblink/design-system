```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-vertical-layout>
        <geo-value
          :data="datumData"
        />
        <geo-value
          :data="datumData2"
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
      <h5 slot="header">Header</h5>
      <geo-secondary-button>Element 1</geo-secondary-button>
      <geo-secondary-button>Element 2</geo-secondary-button>
      <geo-secondary-button>Element 3</geo-secondary-button>
      <geo-primary-button slot="footer">Footer button</geo-primary-button>
    </geo-vertical-layout>
  </div>
</div>
```
