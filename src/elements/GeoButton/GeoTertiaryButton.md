[GeoButton](./#/Elements/GeoButton/GeoButton) using predefined `tertiary` variant.

Tertiary buttons are normally used to trigger an alternative action to the main
one like dismissing a form without saving changes.

See [GeoButton](./#/Elements/GeoButton/GeoButton) for a complete list of
supported properties and features.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Complete flow</h3>
    <div class="element-demo__block">
      <geo-tertiary-button
        :disabled="isDisabled"
        :loading="isLoading"
        @click="startLoading()"
      >
        Full flow
      </geo-tertiary-button>
    </div>
    <h3 class="element-demo__header">Regular</h3>
    <div class="element-demo__block">
      <geo-tertiary-button>Regular</geo-tertiary-button>
      <geo-tertiary-button hover>Hover / Focus</geo-tertiary-button>
    </div>
    <h3 class="element-demo__header">Disabled</h3>
    <div class="element-demo__block">
      <geo-tertiary-button disabled>Disabled</geo-tertiary-button>
      <geo-tertiary-button disabled hover>Disabled &amp; Hover / Focus</geo-tertiary-button>
    </div>
    <h3 class="element-demo__header">Loading</h3>
    <div class="element-demo__block">
      <geo-tertiary-button loading>Loading</geo-tertiary-button>
      <geo-tertiary-button loading hover>Loading &amp; Hover / Focus</geo-tertiary-button>
    </div>
    <h3 class="element-demo__header">Loading &amp; Disabled</h3>
    <div class="element-demo__block">
      <geo-tertiary-button loading disabled>Loading &amp; Disabled</geo-tertiary-button>
      <geo-tertiary-button loading disabled hover>Loading &amp; Disabled</geo-tertiary-button>
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
