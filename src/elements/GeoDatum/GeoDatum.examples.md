
```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-datum
        :data="datumData"
      />
      <geo-datum
        :data="datumData2"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoDatumDemo',
  data () {
    return {
      datumData: {
        value: "27th of 73",
        isPrimary: true,
        unit: "",
        description:"Es mayor que la media de tiendas",
        descriptionTooltip:"Es mayor que la media de tiendas",
        colorHighlight:"green",
        warningTooltip:"haha"
      },
      datumData2: {
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