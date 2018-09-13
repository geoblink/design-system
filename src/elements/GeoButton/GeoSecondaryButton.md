[GeoButton](./#/Elements/GeoButton/GeoButton) using predefined `secondary` variant.

Secondary buttons are normally used to show additional menus or hidden options.

See [GeoButton](./#/Elements/GeoButton/GeoButton) for a complete list of
supported properties and features.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Complete flow</h3>
    <div class="element-demo__block">
      <geo-secondary-button
        :disabled="isDisabled"
        :loading="isLoading"
        @click="startLoading()"
      >
        Full flow
      </geo-secondary-button>
    </div>
    <h3 class="element-demo__header">Regular</h3>
    <div class="element-demo__block">
      <geo-secondary-button>Regular</geo-secondary-button>
      <geo-secondary-button hover>Hover / Focus</geo-secondary-button>
    </div>
    <h3 class="element-demo__header">Disabled</h3>
    <div class="element-demo__block">
      <geo-secondary-button disabled>Disabled</geo-secondary-button>
      <geo-secondary-button disabled hover>Disabled &amp; Hover / Focus</geo-secondary-button>
    </div>
    <h3 class="element-demo__header">Loading</h3>
    <div class="element-demo__block">
      <geo-secondary-button loading>Loading</geo-secondary-button>
      <geo-secondary-button loading hover>Loading &amp; Hover / Focus</geo-secondary-button>
    </div>
    <h3 class="element-demo__header">Loading &amp; Disabled</h3>
    <div class="element-demo__block">
      <geo-secondary-button loading disabled>Loading &amp; Disabled</geo-secondary-button>
      <geo-secondary-button loading disabled hover>Loading &amp; Disabled</geo-secondary-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isDisabled: false,
      isLoading: false
    }
  },
  methods: {
    startLoading () {
      this.isLoading = true
      this.isDisabled = true
      setTimeout(() => this.isLoading = false, 2000)
      setTimeout(() => this.isDisabled = false, 4000)
    }
  }
}
</script>
```
