[GeoButton](./#/Elements/GeoButton/GeoButton) using predefined `destructive`
variant.

Destructive buttons are normally used to trigger dangerous actions that cannot
be reverted like deleting data.

See [GeoButton](./#/Elements/GeoButton/GeoButton) for a complete list of
supported properties and features.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Complete flow</h3>
    <div class="element-demo__block">
      <geo-destructive-button
        :disabled="isDisabled"
        :loading="isLoading"
        @click="startLoading()"
      >
        Full flow
      </geo-destructive-button>
    </div>
    <h3 class="element-demo__header">Regular</h3>
    <div class="element-demo__block">
      <geo-destructive-button>Regular</geo-destructive-button>
      <geo-destructive-button hover>Hover / Focus</geo-destructive-button>
    </div>
    <h3 class="element-demo__header">Disabled</h3>
    <div class="element-demo__block">
      <geo-destructive-button disabled>Disabled</geo-destructive-button>
      <geo-destructive-button disabled hover>Disabled &amp; Hover / Focus</geo-destructive-button>
    </div>
    <h3 class="element-demo__header">Loading</h3>
    <div class="element-demo__block">
      <geo-destructive-button loading>Loading</geo-destructive-button>
      <geo-destructive-button loading hover>Loading &amp; Hover / Focus</geo-destructive-button>
    </div>
    <h3 class="element-demo__header">Loading &amp; Disabled</h3>
    <div class="element-demo__block">
      <geo-destructive-button loading disabled>Loading &amp; Disabled</geo-destructive-button>
      <geo-destructive-button loading disabled hover>Loading &amp; Disabled</geo-destructive-button>
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
