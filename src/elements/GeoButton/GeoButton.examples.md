```vue live
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
        type="danger"
        @click="startLoading()"
      >
        Danger
      </geo-button>
      <geo-button
        :disabled="isDisabled"
        :loading="isLoading"
        type="link"
        @click="startLoading()"
      >
        Link
      </geo-button>
      <geo-button
        :disabled="isDisabled"
        :loading="isLoading"
        type="dangerLink"
        @click="startLoading()"
      >
        Danger link
      </geo-button>
    </div>
    <h3 class="element-demo__header">Regular</h3>
    <div class="element-demo__block">
      <geo-button type="primary">Primary</geo-button>
      <geo-button type="secondary">Secondary</geo-button>
      <geo-button type="tertiary">Tertiary</geo-button>
      <geo-button type="danger">Danger</geo-button>
      <geo-button type="link">Link</geo-button>
      <geo-button type="dangerLink">Danger link</geo-button>
    </div>
    <h3 class="element-demo__header">Hover / Focus</h3>
    <div class="element-demo__block">
      <geo-button hover type="primary">Primary</geo-button>
      <geo-button hover type="secondary">Secondary</geo-button>
      <geo-button hover type="tertiary">Tertiary</geo-button>
      <geo-button hover type="danger">Danger</geo-button>
      <geo-button hover type="link">Link</geo-button>
      <geo-button hover type="dangerLink">Danger link</geo-button>
    </div>
    <h3 class="element-demo__header">Disabled</h3>
    <div class="element-demo__block">
      <geo-button disabled type="primary">Primary</geo-button>
      <geo-button disabled type="secondary">Secondary</geo-button>
      <geo-button disabled type="tertiary">Tertiary</geo-button>
      <geo-button disabled type="danger">Danger</geo-button>
      <geo-button disabled type="link">Link</geo-button>
      <geo-button disabled type="dangerLink">Danger link</geo-button>
    </div>
    <h3 class="element-demo__header">Disabled &amp; Hover / Focus</h3>
    <div class="element-demo__block">
      <geo-button disabled hover type="primary">Primary</geo-button>
      <geo-button disabled hover type="secondary">Secondary</geo-button>
      <geo-button disabled hover type="tertiary">Tertiary</geo-button>
      <geo-button disabled hover type="danger">Danger</geo-button>
      <geo-button disabled hover type="link">Link</geo-button>
      <geo-button disabled hover type="dangerLink">Danger link</geo-button>
    </div>
    <h3 class="element-demo__header">Loading</h3>
    <div class="element-demo__block">
      <geo-button loading type="primary">Primary</geo-button>
      <geo-button loading type="secondary">Secondary</geo-button>
      <geo-button loading type="tertiary">Tertiary</geo-button>
      <geo-button loading type="danger">Danger</geo-button>
      <geo-button loading type="link">Link</geo-button>
      <geo-button loading type="dangerLink">Danger link</geo-button>
    </div>
    <h3 class="element-demo__header">Loading &amp; Hover / Focus</h3>
    <div class="element-demo__block">
      <geo-button loading hover type="primary">Primary</geo-button>
      <geo-button loading hover type="secondary">Secondary</geo-button>
      <geo-button loading hover type="tertiary">Tertiary</geo-button>
      <geo-button loading hover type="danger">Danger</geo-button>
      <geo-button loading hover type="link">Link</geo-button>
      <geo-button loading error type="dangerLink">Danger link</geo-button>
    </div>
    <h3 class="element-demo__header">Loading &amp; Disabled</h3>
    <div class="element-demo__block">
      <geo-button loading disabled type="primary">Primary</geo-button>
      <geo-button loading disabled type="secondary">Secondary</geo-button>
      <geo-button loading disabled type="tertiary">Tertiary</geo-button>
      <geo-button loading disabled type="danger">Danger</geo-button>
      <geo-button loading disabled type="link">Link</geo-button>
      <geo-button loading disabled type="dangerLink">Danger link</geo-button>
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
