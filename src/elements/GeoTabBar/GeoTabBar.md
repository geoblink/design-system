`GeoTabBar` is a component designed to display a collection of tabs horizontally,
specially aimed for pages where there are multiple independent modules.

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-tab-bar>
        <geo-tab-bar-item
          v-for="tab in tabs"
          :key="tab"
          :active="activeTab === tab"
          @click="activeTab = tab"
        >
          <span>{{ tab }}</span>
          <font-awesome-icon :icon="['fas', 'info-circle']" />
        </geo-tab-bar-item>
      </geo-tab-bar>
    </div>
    <div class="element-demo__block">
      <geo-tab-bar variant="modal">
        <geo-tab-bar-item
          v-for="tab in tabs"
          variant="modal"
          :key="tab"
          :active="activeTab === tab"
          @click="activeTab = tab"
        >
          <span>{{ tab }}</span>
          <font-awesome-icon :icon="['fas', 'info-circle']" />
        </geo-tab-bar-item>
      </geo-tab-bar>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeTab: 'First'
    }
  },
  computed: {
    tabs () {
      return ['First', 'Second', 'Third']
    }
  }
}
</script>
```