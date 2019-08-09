[GeoButton](./#/Elements/GeoButton) using predefined `dangerLink`
variant.

DangerLink buttons are normally used to trigger dangerous actions that cannot
be reverted like deleting data.

See [GeoButton](./#/Elements/GeoButton) for a complete list of
supported properties and features.

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Complete flow</h3>
    <div class="element-demo__block">
      <geo-danger-link-button
        :disabled="isDisabled"
        :loading="isLoading"
        @click="startLoading()"
      >
        Full flow
      </geo-danger-link-button>
    </div>
    <h3 class="element-demo__header">Regular</h3>
    <div class="element-demo__block">
      <geo-danger-link-button>Regular</geo-danger-link-button>
      <geo-danger-link-button hover>Hover / Focus</geo-danger-link-button>
    </div>
    <h3 class="element-demo__header">Disabled</h3>
    <div class="element-demo__block">
      <geo-danger-link-button disabled>Disabled</geo-danger-link-button>
      <geo-danger-link-button disabled hover>Disabled &amp; Hover / Focus</geo-danger-link-button>
    </div>
    <h3 class="element-demo__header">Loading</h3>
    <div class="element-demo__block">
      <geo-danger-link-button loading>Loading</geo-danger-link-button>
      <geo-danger-link-button loading hover>Loading &amp; Hover / Focus</geo-danger-link-button>
    </div>
    <h3 class="element-demo__header">Loading &amp; Disabled</h3>
    <div class="element-demo__block">
      <geo-danger-link-button loading disabled>Loading &amp; Disabled</geo-danger-link-button>
      <geo-danger-link-button loading disabled hover>Loading &amp; Disabled</geo-danger-link-button>
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
