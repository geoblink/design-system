[GeoButton](./#/Elements/GeoButton) using predefined `tooltip` variant.

Tooltip buttons are normally used to trigger an action inside a tooltip, usually accepting some terms or closing it.

See [GeoButton](./#/Elements/GeoButton) for a complete list of
supported properties and features.

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Complete flow</h3>
    <div class="element-demo__block">
      <geo-tooltip-button
        :disabled="isDisabled"
        :loading="isLoading"
        @click="startLoading()"
      >
        Full flow
      </geo-tooltip-button>
    </div>
    <h3 class="element-demo__header">Regular</h3>
    <div class="element-demo__block">
      <geo-tooltip-button>Regular</geo-tooltip-button>
      <geo-tooltip-button hover>Hover / Focus</geo-tooltip-button>
    </div>
    <h3 class="element-demo__header">Disabled</h3>
    <div class="element-demo__block">
      <geo-tooltip-button disabled>Disabled</geo-tooltip-button>
      <geo-tooltip-button disabled hover>Disabled &amp; Hover / Focus</geo-tooltip-button>
    </div>
    <h3 class="element-demo__header">Loading</h3>
    <div class="element-demo__block">
      <geo-tooltip-button loading>Loading</geo-tooltip-button>
      <geo-tooltip-button loading hover>Loading &amp; Hover / Focus</geo-tooltip-button>
    </div>
    <h3 class="element-demo__header">Loading &amp; Disabled</h3>
    <div class="element-demo__block">
      <geo-tooltip-button loading disabled>Loading &amp; Disabled</geo-tooltip-button>
      <geo-tooltip-button loading disabled hover>Loading &amp; Disabled</geo-tooltip-button>
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
