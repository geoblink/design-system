`GeoSuccessSegmentedControlItem` is a component designed to nicely fit as one of
the options of a [`GeoSegmentedControl`](./#/Elements/GeoSegmentedControl?id=geosegmentedcontrol-1).

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Regular style</h3>
    <div class="element-demo__block" style="width: 120px;">
      <geo-success-segmented-control-item
        :active="isFirstButtonActive"
        @click="isFirstButtonActive = !isFirstButtonActive"
      >
        Option one
      </geo-success-segmented-control-item>

      <geo-success-segmented-control-item active>
        Active option
      </geo-success-segmented-control-item>

      <geo-success-segmented-control-item
        :active="isThirdButtonActive"
        @click="isThirdButtonActive = !isThirdButtonActive"
      >
        <font-awesome-icon :icon="['fas', 'cat']" fixed-width />
        <span>With icon</span>
      </geo-success-segmented-control-item>

      <geo-success-segmented-control-item active>
        <font-awesome-icon :icon="['fas', 'spider']" fixed-width />
        <span>Active with icon</span>
      </geo-success-segmented-control-item>

      <geo-success-segmented-control-item disabled>
        Disabled option
      </geo-success-segmented-control-item>

      <geo-success-segmented-control-item disabled active>
        Active disabled option
      </geo-success-segmented-control-item>
    </div>

    <h3 class="element-demo__header">Outline style</h3>
    <div class="element-demo__block" style="width: 120px;">
      <geo-success-segmented-control-item
        outline
        :active="isFirstButtonActive"
        @click="isFirstButtonActive = !isFirstButtonActive"
      >
        Option one
      </geo-success-segmented-control-item>

      <geo-success-segmented-control-item outline active>
        Active option
      </geo-success-segmented-control-item>

      <geo-success-segmented-control-item
        outline
        :active="isThirdButtonActive"
        @click="isThirdButtonActive = !isThirdButtonActive"
      >
        <font-awesome-icon :icon="['fas', 'cat']" fixed-width />
        <span>With icon</span>
      </geo-success-segmented-control-item>

      <geo-success-segmented-control-item outline active>
        <font-awesome-icon :icon="['fas', 'spider']" fixed-width />
        <span>Active with icon</span>
      </geo-success-segmented-control-item>

      <geo-success-segmented-control-item outline disabled>
        Disabled option
      </geo-success-segmented-control-item>

      <geo-success-segmented-control-item outline disabled active>
        Active disabled option
      </geo-success-segmented-control-item>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isFirstButtonActive: false,
      isThirdButtonActive: false
    }
  }
}
</script>
```