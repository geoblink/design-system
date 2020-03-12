#### Regular

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-collapsable-box>
      <template slot="header">The header</template>

      This content can be toggled in and out.
    </geo-collapsable-box>
  </div>
</div>
```

#### Initially collapsed

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-collapsable-box initially-collapsed>
        <template slot="header">{{ headerText }}</template>

        <font-awesome-icon
          slot="trailingItems"
          :icon="['fas', 'pencil-alt']"
          style="margin-right: 5px;"
          @click="changeHeader()"
        />
        This content can be toggled in and out.
      </geo-collapsable-box>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      headerText: "The header",
    }
  },
  methods: {
    changeHeader () {
      this.headerText = this.headerText === "The header"
        ? "A new header"
        : "The header"
    }
  }
}

</script>
```
