[GeoButton](./#/Elements/GeoButton) using predefined `link` variant.

Link buttons are normally used to trigger an alternative action to the main
one like dismissing a form without saving changes.

See [GeoButton](./#/Elements/GeoButton) for a complete list of
supported properties and features.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Complete flow</h3>
    <div class="element-demo__block">
      <geo-link-button
        :disabled="isDisabled"
        :loading="isLoading"
        @click="startLoading()"
      >
        Full flow
      </geo-link-button>
    </div>
    <h3 class="element-demo__header">Regular</h3>
    <div class="element-demo__block">
      <geo-link-button>Regular</geo-link-button>
      <geo-link-button hover>Hover / Focus</geo-link-button>
    </div>
    <h3 class="element-demo__header">Disabled</h3>
    <div class="element-demo__block">
      <geo-link-button disabled>Disabled</geo-link-button>
      <geo-link-button disabled hover>Disabled &amp; Hover / Focus</geo-link-button>
    </div>
    <h3 class="element-demo__header">Loading</h3>
    <div class="element-demo__block">
      <geo-link-button loading>Loading</geo-link-button>
      <geo-link-button loading hover>Loading &amp; Hover / Focus</geo-link-button>
    </div>
    <h3 class="element-demo__header">Loading &amp; Disabled</h3>
    <div class="element-demo__block">
      <geo-link-button loading disabled>Loading &amp; Disabled</geo-link-button>
      <geo-link-button loading disabled hover>Loading &amp; Disabled</geo-link-button>
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
