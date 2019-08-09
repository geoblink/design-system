[GeoButton](./#/Elements/GeoButton) using predefined `primary` variant.

Primary buttons are normally used to trigger main actions like saving changes.

See [GeoButton](./#/Elements/GeoButton) for a complete list of
supported properties and features.

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Complete flow</h3>
    <div class="element-demo__block">
      <geo-primary-button
        :disabled="isDisabled"
        :loading="isLoading"
        @click="startLoading()"
      >
        Full flow
      </geo-primary-button>
    </div>
    <h3 class="element-demo__header">Regular</h3>
    <div class="element-demo__block">
      <geo-primary-button>Regular</geo-primary-button>
      <geo-primary-button hover>Hover / Focus</geo-primary-button>
    </div>
    <h3 class="element-demo__header">Disabled</h3>
    <div class="element-demo__block">
      <geo-primary-button disabled>Disabled</geo-primary-button>
      <geo-primary-button disabled hover>Disabled &amp; Hover / Focus</geo-primary-button>
    </div>
    <h3 class="element-demo__header">Loading</h3>
    <div class="element-demo__block">
      <geo-primary-button loading>Loading</geo-primary-button>
      <geo-primary-button loading hover>Loading &amp; Hover / Focus</geo-primary-button>
    </div>
    <h3 class="element-demo__header">Loading &amp; Disabled</h3>
    <div class="element-demo__block">
      <geo-primary-button loading disabled>Loading &amp; Disabled</geo-primary-button>
      <geo-primary-button loading disabled hover>Loading &amp; Disabled</geo-primary-button>
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
