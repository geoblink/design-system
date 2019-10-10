[GeoCompactButton](./#/Elements/GeoCompactButton) using predefined `primary` variant.

Primary buttons are normally used to trigger main actions like saving changes.

See [GeoCompactButton](./#/Elements/GeoCompactButton) for a complete list of
supported properties and features.

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Complete flow</h3>
    <div class="element-demo__block">
      <geo-primary-compact-button
        :disabled="isDisabled"
        :loading="isLoading"
        @click="startLoading()"
      />
    </div>
    <h3 class="element-demo__header">Regular</h3>
    <div class="element-demo__block">
      <geo-primary-compact-button />
    </div>
    <h3 class="element-demo__header">Disabled</h3>
    <div class="element-demo__block">
      <geo-primary-compact-button disabled />
    </div>
    <h3 class="element-demo__header">Loading</h3>
    <div class="element-demo__block">
      <geo-primary-compact-button loading />
    </div>
    <h3 class="element-demo__header">Loading &amp; Disabled</h3>
    <div class="element-demo__block">
      <geo-primary-compact-button loading disabled />
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
