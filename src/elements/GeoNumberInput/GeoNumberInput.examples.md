### Simple input

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-number-input v-model="value"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoInputDemo',
  data () {
    return {
      value: 0
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
      <geo-number-input v-model="model" success>
        <geo-input-label slot="label">Success</geo-input-label>
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
      <geo-number-input v-model="model" error>
        <geo-input-label slot="label">Error</geo-input-label>
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
