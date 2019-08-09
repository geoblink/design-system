`GeoSegmentedControl` is an horizontal control made of multiple segments, each
of them functioning as a discrete button.

It's designed to work nicely with [`GeoSegmentedControlItem`](./#/Elements/GeoSegmentedControl?id=geosegmentedcontrolitem) out of the box.

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Regular style</h3>
    <div class="element-demo__block" style="width: 750px;">
      <geo-segmented-control>
        <geo-segmented-control-item
          v-for="(control, index) in availableControls"
          :key="control"
          :disabled="isDisabled[index]"
          :active="activeControls[control]"
          @click="toggleControl(control)"
        >
          <font-awesome-icon :icon="availableIcons[index]" fixed-width />
          <span>Option {{ control }}</span>
        </geo-segmented-control-item>
      </geo-segmented-control>
    </div>
    <h3 class="element-demo__header">Regular style (short)</h3>
    <div class="element-demo__block" >
      <geo-segmented-control style="width: 250px;">
        <geo-segmented-control-item
          v-for="(control, index) in [availableControls[0], availableControls[1]]"
          :key="control"
          :disabled="isDisabled[index]"
          :active="activeControls[control]"
          @click="toggleControl(control)"
        >
          <font-awesome-icon :icon="availableIcons[index]" fixed-width />
          <span>Option {{ control }}</span>
        </geo-segmented-control-item>
      </geo-segmented-control>
      <geo-segmented-control style="width: 150px;">
        <geo-segmented-control-item
          v-for="(control, index) in [availableControls[0]]"
          :key="control"
          :disabled="isDisabled[index]"
          :active="activeControls[control]"
          @click="toggleControl(control)"
        >
          <font-awesome-icon :icon="availableIcons[index]" fixed-width />
          <span>Option {{ control }}</span>
        </geo-segmented-control-item>
      </geo-segmented-control>
    </div>
    <h3 class="element-demo__header">Outline style</h3>
    <div class="element-demo__block" style="width: 750px;">
      <geo-segmented-control outline>
        <geo-segmented-control-item
          v-for="(control, index) in availableControls"
          :key="control"
          :disabled="isDisabled[index]"
          :active="activeControls[control]"
          @click="toggleControl(control)"
        >
          <font-awesome-icon :icon="availableIcons[index]" fixed-width />
          <span>Option {{ control }}</span>
        </geo-segmented-control-item>
      </geo-segmented-control>
    </div>
    <h3 class="element-demo__header">Outline style (short)</h3>
    <div class="element-demo__block" >
      <geo-segmented-control outline style="width: 250px;">
        <geo-segmented-control-item
          v-for="(control, index) in [availableControls[0], availableControls[1]]"
          :key="control"
          :disabled="isDisabled[index]"
          :active="activeControls[control]"
          @click="toggleControl(control)"
        >
          <font-awesome-icon :icon="availableIcons[index]" fixed-width />
          <span>Option {{ control }}</span>
        </geo-segmented-control-item>
      </geo-segmented-control>
      <geo-segmented-control outline style="width: 150px;">
        <geo-segmented-control-item
          v-for="(control, index) in [availableControls[0]]"
          :key="control"
          :disabled="isDisabled[index]"
          :active="activeControls[control]"
          @click="toggleControl(control)"
        >
          <font-awesome-icon :icon="availableIcons[index]" fixed-width />
          <span>Option {{ control }}</span>
        </geo-segmented-control-item>
      </geo-segmented-control>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeControls: {
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: true
      }
    }
  },
  computed: {
    availableIcons () {
      return [
        'cat', 'crow', 'spider', 'ghost', 'broom', 'toilet-paper'
      ].map(icon => {
        return ['fas', icon]
      })
    },

    availableControls () {
      return Object.keys(this.activeControls)
    },

    isDisabled () {
      return [false, false, false, true, false, false]
    }
  },
  methods: {
    toggleControl (name) {
      this.activeControls[name] = !this.activeControls[name]
    }
  }
}
</script>
```