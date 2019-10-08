[GeoCompactButton](./#/Elements/GeoCompactButton) using predefined `secondary` variant.

Secondary buttons are normally used to show additional menus or hidden options.

See [GeoCompactButton](./#/Elements/GeoCompactButton) for a complete list of
supported properties and features.

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Complete flow</h3>
    <div class="element-demo__block">
      <geo-secondary-compact-button
        :disabled="isDisabled"
        :loading="isLoading"
        @click="startLoading()"
      >
        Full flow
      </geo-secondary-compact-button>
    </div>
    <h3 class="element-demo__header">Regular</h3>
    <div class="element-demo__block">
      <geo-secondary-compact-button>Regular</geo-secondary-compact-button>
    </div>
    <h3 class="element-demo__header">Disabled</h3>
    <div class="element-demo__block">
      <geo-secondary-compact-button disabled>Disabled</geo-secondary-compact-button>
    </div>
    <h3 class="element-demo__header">Loading</h3>
    <div class="element-demo__block">
      <geo-secondary-compact-button loading>Loading</geo-secondary-compact-button>
    </div>
    <h3 class="element-demo__header">Loading &amp; Disabled</h3>
    <div class="element-demo__block">
      <geo-secondary-compact-button loading disabled>Loading &amp; Disabled</geo-secondary-compact-button>
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
