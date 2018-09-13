Use `GeoButton` to add button like elements to your app with a single tag,
being able to customize the color scheme to show the user the intention of said
button.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Full flow</h3>
    <div class="element-demo__block">
      <geo-button
        :disabled="isDisabled"
        :loading="isLoading"
        type="primary"
        @click="startLoading()"
      >
        Primary
      </geo-button>
      <geo-button
        :disabled="isDisabled"
        :loading="isLoading"
        type="secondary"
        @click="startLoading()"
      >
        Secondary
      </geo-button>
      <geo-button
        :disabled="isDisabled"
        :loading="isLoading"
        type="tertiary"
        @click="startLoading()"
      >
        Tertiary
      </geo-button>
      <geo-button
        :disabled="isDisabled"
        :loading="isLoading"
        type="destructive"
        @click="startLoading()"
      >
        Destructive
      </geo-button>
    </div>
    <h3 class="element-demo__header">Regular</h3>
    <div class="element-demo__block">
      <geo-button type="primary">Primary</geo-button>
      <geo-button type="secondary">Secondary</geo-button>
      <geo-button type="tertiary">Tertiary</geo-button>
      <geo-button type="destructive">Destructive</geo-button>
    </div>
    <h3 class="element-demo__header">Hover / Focus</h3>
    <div class="element-demo__block">
      <geo-button hover type="primary">Primary</geo-button>
      <geo-button hover type="secondary">Secondary</geo-button>
      <geo-button hover type="tertiary">Tertiary</geo-button>
      <geo-button hover type="destructive">Destructive</geo-button>
    </div>
    <h3 class="element-demo__header">Disabled</h3>
    <div class="element-demo__block">
      <geo-button disabled type="primary">Primary</geo-button>
      <geo-button disabled type="secondary">Secondary</geo-button>
      <geo-button disabled type="tertiary">Tertiary</geo-button>
      <geo-button disabled type="destructive">Destructive</geo-button>
    </div>
    <h3 class="element-demo__header">Disabled &amp; Hover / Focus</h3>
    <div class="element-demo__block">
      <geo-button disabled hover type="primary">Primary</geo-button>
      <geo-button disabled hover type="secondary">Secondary</geo-button>
      <geo-button disabled hover type="tertiary">Tertiary</geo-button>
      <geo-button disabled hover type="destructive">Destructive</geo-button>
    </div>
    <h3 class="element-demo__header">Loading</h3>
    <div class="element-demo__block">
      <geo-button loading type="primary">Primary</geo-button>
      <geo-button loading type="secondary">Secondary</geo-button>
      <geo-button loading type="tertiary">Tertiary</geo-button>
      <geo-button loading type="destructive">Destructive</geo-button>
    </div>
    <h3 class="element-demo__header">Loading &amp; Hover / Focus</h3>
    <div class="element-demo__block">
      <geo-button loading hover type="primary">Primary</geo-button>
      <geo-button loading hover type="secondary">Secondary</geo-button>
      <geo-button loading hover type="tertiary">Tertiary</geo-button>
      <geo-button loading hover type="destructive">Destructive</geo-button>
    </div>
    <h3 class="element-demo__header">Loading &amp; Disabled</h3>
    <div class="element-demo__block">
      <geo-button loading disabled type="primary">Primary</geo-button>
      <geo-button loading disabled type="secondary">Secondary</geo-button>
      <geo-button loading disabled type="tertiary">Tertiary</geo-button>
      <geo-button loading disabled type="destructive">Destructive</geo-button>
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
