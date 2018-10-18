`GeoSegmentedControl` is an horizontal control made of multiple segments, each
of them functioning as a discrete button.

It's designed to work nicely with [`GeoSegmentedControlItem`](./#/Elements/GeoSegmentedControl?id=geosegmentedcontrolitem) out of the box.

```vue
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="width: 750px;">
      <geo-segmented-control>
        <geo-segmented-control-item
          v-for="control in availableControls"
          :key="control"
          :active="activeControls[control]"
          @click="toggleControl(control)"
        >
          Option {{ control }}
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
        five: true
      }
    }
  },
  computed: {
    availableControls () {
      return Object.keys(this.activeControls)
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