
```vue live
<!--<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-datum></geo-datum>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoDatumDemo',
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {

  }
}
</script>-->
```

### Primary value

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-datum
      value="27th of 73"
      :isPrimaryValue="true"
      unit=""
      description="Es mayor que la media de tiendas"
      descriptionTooltip="Es mayor que la media de tiendas"
      colorHighlight="green"
    />
  </div>
</div>
```

### Secondary value
```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-datum
      value="32892"
      :isPrimaryValue="false"
      unit="€"
      description="Es mayor que la media de tiendas"
      descriptionTooltip="Es mayor que la media de tiendas"
      colorHighlight=""
    />
  </div>
</div>
```