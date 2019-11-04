[GeoCompactButton](./#/Elements/GeoCompactButton) using predefined `inputAccessory` variant.

`inputAccessory` buttons are normally used as accessory items in inputs to
trigger help actions like picking a predefined value or a shortcut.

See [GeoCompactButton](./#/Elements/GeoCompactButton) for a complete list of
supported properties and features.

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Complete flow</h3>
    <div class="element-demo__block">
      <geo-input-accessory-compact-button
        :icon="['fas', 'calculator']"
        :disabled="isDisabled"
        :loading="isLoading"
        @click="startLoading()"
      />
    </div>
    <h3 class="element-demo__header">Regular</h3>
    <div class="element-demo__block">
      <geo-input-accessory-compact-button
        :icon="['fas', 'calculator']"
      />
    </div>
    <h3 class="element-demo__header">Disabled</h3>
    <div class="element-demo__block">
      <geo-input-accessory-compact-button disabled
        :icon="['fas', 'calculator']"
      />
    </div>
    <h3 class="element-demo__header">Loading</h3>
    <div class="element-demo__block">
      <geo-input-accessory-compact-button loading
        :icon="['fas', 'calculator']"
      />
    </div>
    <h3 class="element-demo__header">Loading &amp; Disabled</h3>
    <div class="element-demo__block">
      <geo-input-accessory-compact-button loading disabled
        :icon="['fas', 'calculator']"
      />
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
