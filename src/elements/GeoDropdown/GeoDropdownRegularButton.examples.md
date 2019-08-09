`GeoDropdownRegularButton` is a button designed to display an optional icon and
any complex single-line text surrounded by a bordered box linked to a popup.

It's suitable in isolated places where this button won't be associated with any
single element of a collection but with a specific feature or an entire collection.
As it can display single-line text it can be used to toggle popups which manage
complex state changes which are not directly evident like multi-select options.

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Normal state</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-dropdown-regular-button>
        My button
      </geo-dropdown-regular-button>

      <geo-dropdown-regular-button :icon="['far', 'bell']">
        My button with an icon
      </geo-dropdown-regular-button>

      <geo-dropdown-regular-button :icon="['far', 'bell']" />

      <geo-dropdown-regular-button :icon="['far', 'bell']">
        My button with: <strong>bold text</strong>
      </geo-dropdown-regular-button>

      <geo-dropdown-regular-button :icon="['far', 'bell']">
        My button with: <em>italic text</em>
      </geo-dropdown-regular-button>
    </div>

    <h3 class="element-demo__header">Hover state</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-dropdown-regular-button hover>
        My button
      </geo-dropdown-regular-button>

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        hover
      >
        My button with an icon
      </geo-dropdown-regular-button>

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        hover
      />

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        hover
      >
        My button with: <strong>bold text</strong>
      </geo-dropdown-regular-button>

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        hover
      >
        My button with: <em>italic text</em>
      </geo-dropdown-regular-button>
    </div>

    <h3 class="element-demo__header">Disabled state</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-dropdown-regular-button disabled>
        My button
      </geo-dropdown-regular-button>

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        disabled
      >
        My button with an icon
      </geo-dropdown-regular-button>

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        disabled
      />

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        disabled
      >
        My button with: <strong>bold text</strong>
      </geo-dropdown-regular-button>

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        disabled
      >
        My button with: <em>italic text</em>
      </geo-dropdown-regular-button>
    </div>

    <h3 class="element-demo__header">Active state</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-dropdown-regular-button active>
        My button
      </geo-dropdown-regular-button>

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        active
      >
        My button with an icon
      </geo-dropdown-regular-button>

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        active
      />

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        active
      >
        My button with: <strong>bold text</strong>
      </geo-dropdown-regular-button>

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        active
      >
        My button with: <em>italic text</em>
      </geo-dropdown-regular-button>
    </div>

    <h3 class="element-demo__header">
      Customizable
      <div class="element-demo__inline-input-group">
        <label class="element-demo__inline-input-group__field" style="margin-left: 8px">
          Active: <input
            type="checkbox"
            v-model="isActive"
          >
        </label>
        <label class="element-demo__inline-input-group__field" style="margin-left: 8px">
          Disabled: <input
            type="checkbox"
            v-model="isDisabled"
          >
        </label>
        <label class="element-demo__inline-input-group__field" style="margin-left: 8px">
          Hovered: <input
            type="checkbox"
            v-model="isHovered"
          >
        </label>
      </div>
    </h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-dropdown-regular-button
        :active="isActive"
        :hover="isHovered"
        :disabled="isDisabled"
      >
        My button
      </geo-dropdown-regular-button>

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        :active="isActive"
        :hover="isHovered"
        :disabled="isDisabled"
      >
        My button with an icon
      </geo-dropdown-regular-button>

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        :active="isActive"
        :hover="isHovered"
        :disabled="isDisabled"
      />

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        :active="isActive"
        :hover="isHovered"
        :disabled="isDisabled"
      >
        My button with: <strong>bold text</strong>
      </geo-dropdown-regular-button>

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        :active="isActive"
        :hover="isHovered"
        :disabled="isDisabled"
      >
        My button with: <em>italic text</em>
      </geo-dropdown-regular-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: true,
      isDisabled: true,
      isHovered: true
    }
  }
}
</script>
```
