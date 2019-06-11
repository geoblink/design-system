`GeoSegmentedControlItem` is a component designed to nicely fit as one of the
options of a [`GeoSegmentedControl`](./#/Elements/GeoSegmentedControl?id=geosegmentedcontrol-1).

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Regular style (default - info)</h3>
    <div class="element-demo__block" style="width: 120px;">
      <geo-segmented-control-item
        :active="isFirstButtonActive"
        @click="isFirstButtonActive = !isFirstButtonActive"
      >
        Option one
      </geo-segmented-control-item>

      <geo-segmented-control-item active>
        Active option
      </geo-segmented-control-item>

      <geo-segmented-control-item
        :active="isThirdButtonActive"
        @click="isThirdButtonActive = !isThirdButtonActive"
      >
        <font-awesome-icon :icon="['fas', 'cat']" fixed-width />
        <span>With icon</span>
      </geo-segmented-control-item>

      <geo-segmented-control-item active>
        <font-awesome-icon :icon="['fas', 'spider']" fixed-width />
        <span>Active with icon</span>
      </geo-segmented-control-item>

      <geo-segmented-control-item disabled>
        Disabled option
      </geo-segmented-control-item>

      <geo-segmented-control-item disabled active>
        Active disabled option
      </geo-segmented-control-item>
    </div>

    <h3 class="element-demo__header">Regular style (info)</h3>
    <div class="element-demo__block" style="width: 120px;">
      <geo-segmented-control-item
        :active="isFirstButtonActive"
        variant="info"
        @click="isFirstButtonActive = !isFirstButtonActive"
      >
        Option one
      </geo-segmented-control-item>

      <geo-segmented-control-item
        variant="info"
        active
      >
        Active option
      </geo-segmented-control-item>

      <geo-segmented-control-item
        :active="isThirdButtonActive"
        variant="info"
        @click="isThirdButtonActive = !isThirdButtonActive"
      >
        <font-awesome-icon :icon="['fas', 'cat']" fixed-width />
        <span>With icon</span>
      </geo-segmented-control-item>

      <geo-segmented-control-item
        variant="info"
        active
      >
        <font-awesome-icon :icon="['fas', 'spider']" fixed-width />
        <span>Active with icon</span>
      </geo-segmented-control-item>

      <geo-segmented-control-item
        variant="info"
        disabled
      >
        Disabled option
      </geo-segmented-control-item>

      <geo-segmented-control-item disabled
        variant="info"
        active
      >
        Active disabled option
      </geo-segmented-control-item>
    </div>

    <h3 class="element-demo__header">Regular style (success)</h3>
    <div class="element-demo__block" style="width: 120px;">
      <geo-segmented-control-item
        :active="isFirstButtonActive"
        variant="success"
        @click="isFirstButtonActive = !isFirstButtonActive"
      >
        Option one
      </geo-segmented-control-item>

      <geo-segmented-control-item
        variant="success"
        active
      >
        Active option
      </geo-segmented-control-item>

      <geo-segmented-control-item
        :active="isThirdButtonActive"
        variant="success"
        @click="isThirdButtonActive = !isThirdButtonActive"
      >
        <font-awesome-icon :icon="['fas', 'cat']" fixed-width />
        <span>With icon</span>
      </geo-segmented-control-item>

      <geo-segmented-control-item
        variant="success"
        active
      >
        <font-awesome-icon :icon="['fas', 'spider']" fixed-width />
        <span>Active with icon</span>
      </geo-segmented-control-item>

      <geo-segmented-control-item
        variant="success"
        disabled
      >
        Disabled option
      </geo-segmented-control-item>

      <geo-segmented-control-item disabled
        variant="success"
        active
      >
        Active disabled option
      </geo-segmented-control-item>
    </div>

    <h3 class="element-demo__header">Regular style (warning)</h3>
    <div class="element-demo__block" style="width: 120px;">
      <geo-segmented-control-item
        :active="isFirstButtonActive"
        variant="warning"
        @click="isFirstButtonActive = !isFirstButtonActive"
      >
        Option one
      </geo-segmented-control-item>

      <geo-segmented-control-item
        variant="warning"
        active
      >
        Active option
      </geo-segmented-control-item>

      <geo-segmented-control-item
        :active="isThirdButtonActive"
        variant="warning"
        @click="isThirdButtonActive = !isThirdButtonActive"
      >
        <font-awesome-icon :icon="['fas', 'cat']" fixed-width />
        <span>With icon</span>
      </geo-segmented-control-item>

      <geo-segmented-control-item
        variant="warning"
        active
      >
        <font-awesome-icon :icon="['fas', 'spider']" fixed-width />
        <span>Active with icon</span>
      </geo-segmented-control-item>

      <geo-segmented-control-item
        variant="warning"
        disabled
      >
        Disabled option
      </geo-segmented-control-item>

      <geo-segmented-control-item disabled
        variant="warning"
        active
      >
        Active disabled option
      </geo-segmented-control-item>
    </div>

    <h3 class="element-demo__header">Regular style (danger)</h3>
    <div class="element-demo__block" style="width: 120px;">
      <geo-segmented-control-item
        :active="isFirstButtonActive"
        variant="danger"
        @click="isFirstButtonActive = !isFirstButtonActive"
      >
        Option one
      </geo-segmented-control-item>

      <geo-segmented-control-item
        variant="danger"
        active
      >
        Active option
      </geo-segmented-control-item>

      <geo-segmented-control-item
        :active="isThirdButtonActive"
        variant="danger"
        @click="isThirdButtonActive = !isThirdButtonActive"
      >
        <font-awesome-icon :icon="['fas', 'cat']" fixed-width />
        <span>With icon</span>
      </geo-segmented-control-item>

      <geo-segmented-control-item
        variant="danger"
        active
      >
        <font-awesome-icon :icon="['fas', 'spider']" fixed-width />
        <span>Active with icon</span>
      </geo-segmented-control-item>

      <geo-segmented-control-item
        variant="danger"
        disabled
      >
        Disabled option
      </geo-segmented-control-item>

      <geo-segmented-control-item disabled
        variant="danger"
        active
      >
        Active disabled option
      </geo-segmented-control-item>
    </div>

    <h3 class="element-demo__header">Outline style (default - info)</h3>
    <div class="element-demo__block" style="width: 120px;">
      <geo-segmented-control-item
        outline
        :active="isFirstButtonActive"
        @click="isFirstButtonActive = !isFirstButtonActive"
      >
        Option one
      </geo-segmented-control-item>

      <geo-segmented-control-item outline active>
        Active option
      </geo-segmented-control-item>

      <geo-segmented-control-item
        outline
        :active="isThirdButtonActive"
        @click="isThirdButtonActive = !isThirdButtonActive"
      >
        <font-awesome-icon :icon="['fas', 'cat']" fixed-width />
        <span>With icon</span>
      </geo-segmented-control-item>

      <geo-segmented-control-item outline active>
        <font-awesome-icon :icon="['fas', 'spider']" fixed-width />
        <span>Active with icon</span>
      </geo-segmented-control-item>

      <geo-segmented-control-item outline disabled>
        Disabled option
      </geo-segmented-control-item>

      <geo-segmented-control-item outline disabled active>
        Active disabled option
      </geo-segmented-control-item>
    </div>

    <h3 class="element-demo__header">Outline style (info)</h3>
    <div class="element-demo__block" style="width: 120px;">
      <geo-segmented-control-item
        outline
        variant="info"
        :active="isFirstButtonActive"
        @click="isFirstButtonActive = !isFirstButtonActive"
      >
        Option one
      </geo-segmented-control-item>

      <geo-segmented-control-item outline
        variant="info"
        active
      >
        Active option
      </geo-segmented-control-item>

      <geo-segmented-control-item
        outline
        variant="info"
        :active="isThirdButtonActive"
        @click="isThirdButtonActive = !isThirdButtonActive"
      >
        <font-awesome-icon :icon="['fas', 'cat']" fixed-width />
        <span>With icon</span>
      </geo-segmented-control-item>

      <geo-segmented-control-item outline
        variant="info"
        active
      >
        <font-awesome-icon :icon="['fas', 'spider']" fixed-width />
        <span>Active with icon</span>
      </geo-segmented-control-item>

      <geo-segmented-control-item
        variant="info"
        outline
        disabled
      >
        Disabled option
      </geo-segmented-control-item>

      <geo-segmented-control-item
        variant="info"
        outline
        disabled
        active
      >
        Active disabled option
      </geo-segmented-control-item>
    </div>

    <h3 class="element-demo__header">Outline style (success)</h3>
    <div class="element-demo__block" style="width: 120px;">
      <geo-segmented-control-item
        outline
        variant="success"
        :active="isFirstButtonActive"
        @click="isFirstButtonActive = !isFirstButtonActive"
      >
        Option one
      </geo-segmented-control-item>

      <geo-segmented-control-item outline
        variant="success"
        active
      >
        Active option
      </geo-segmented-control-item>

      <geo-segmented-control-item
        outline
        variant="success"
        :active="isThirdButtonActive"
        @click="isThirdButtonActive = !isThirdButtonActive"
      >
        <font-awesome-icon :icon="['fas', 'cat']" fixed-width />
        <span>With icon</span>
      </geo-segmented-control-item>

      <geo-segmented-control-item outline
        variant="success"
        active
      >
        <font-awesome-icon :icon="['fas', 'spider']" fixed-width />
        <span>Active with icon</span>
      </geo-segmented-control-item>

      <geo-segmented-control-item
        variant="success"
        outline
        disabled
      >
        Disabled option
      </geo-segmented-control-item>

      <geo-segmented-control-item
        variant="success"
        outline
        disabled
        active
      >
        Active disabled option
      </geo-segmented-control-item>
    </div>

    <h3 class="element-demo__header">Outline style (warning)</h3>
    <div class="element-demo__block" style="width: 120px;">
      <geo-segmented-control-item
        outline
        variant="warning"
        :active="isFirstButtonActive"
        @click="isFirstButtonActive = !isFirstButtonActive"
      >
        Option one
      </geo-segmented-control-item>

      <geo-segmented-control-item outline
        variant="warning"
        active
      >
        Active option
      </geo-segmented-control-item>

      <geo-segmented-control-item
        outline
        variant="warning"
        :active="isThirdButtonActive"
        @click="isThirdButtonActive = !isThirdButtonActive"
      >
        <font-awesome-icon :icon="['fas', 'cat']" fixed-width />
        <span>With icon</span>
      </geo-segmented-control-item>

      <geo-segmented-control-item outline
        variant="warning"
        active
      >
        <font-awesome-icon :icon="['fas', 'spider']" fixed-width />
        <span>Active with icon</span>
      </geo-segmented-control-item>

      <geo-segmented-control-item
        variant="warning"
        outline
        disabled
      >
        Disabled option
      </geo-segmented-control-item>

      <geo-segmented-control-item
        variant="warning"
        outline
        disabled
        active
      >
        Active disabled option
      </geo-segmented-control-item>
    </div>

    <h3 class="element-demo__header">Outline style (danger)</h3>
    <div class="element-demo__block" style="width: 120px;">
      <geo-segmented-control-item
        outline
        variant="danger"
        :active="isFirstButtonActive"
        @click="isFirstButtonActive = !isFirstButtonActive"
      >
        Option one
      </geo-segmented-control-item>

      <geo-segmented-control-item outline
        variant="danger"
        active
      >
        Active option
      </geo-segmented-control-item>

      <geo-segmented-control-item
        outline
        variant="danger"
        :active="isThirdButtonActive"
        @click="isThirdButtonActive = !isThirdButtonActive"
      >
        <font-awesome-icon :icon="['fas', 'cat']" fixed-width />
        <span>With icon</span>
      </geo-segmented-control-item>

      <geo-segmented-control-item outline
        variant="danger"
        active
      >
        <font-awesome-icon :icon="['fas', 'spider']" fixed-width />
        <span>Active with icon</span>
      </geo-segmented-control-item>

      <geo-segmented-control-item
        variant="danger"
        outline
        disabled
      >
        Disabled option
      </geo-segmented-control-item>

      <geo-segmented-control-item
        variant="danger"
        outline
        disabled
        active
      >
        Active disabled option
      </geo-segmented-control-item>
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