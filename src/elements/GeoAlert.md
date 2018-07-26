```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Simple</h3>
    <div class="element-demo__block">
      <geo-alert variant="info">
        <template slot="content">A simple info alert</template>
      </geo-alert>
      <geo-alert variant="success">
        <template slot="content">A simple success alert</template>
      </geo-alert>
      <geo-alert variant="error">
        <template slot="content">A simple error alert</template>
      </geo-alert>
      <geo-alert variant="warn">
        <template slot="content">A simple warn alert</template>
      </geo-alert>
      <geo-alert variant="progress">
        <template slot="content">A simple progress alert</template>
      </geo-alert>
    </div>
    <h3 class="element-demo__header">With icon</h3>
    <div class="element-demo__block">
      <geo-alert variant="info">
        <font-awesome-icon
          :icon="['far', 'lightbulb']"
          slot="icon"
          aria-hidden
          fixed-width
        />
        <template slot="content">A simple info alert with an icon</template>
      </geo-alert>
      <geo-alert variant="success">
        <font-awesome-icon
          :icon="['far', 'thumbs-up']"
          slot="icon"
          aria-hidden
          fixed-width
        />
        <template slot="content">A simple success alert with an icon</template>
      </geo-alert>
      <geo-alert variant="error">
        <font-awesome-icon
          :icon="['fas', 'exclamation-triangle']"
          slot="icon"
          aria-hidden
          fixed-width
        />
        <template slot="content">A simple error alert with an icon</template>
      </geo-alert>
      <geo-alert variant="warn">
        <font-awesome-icon
          :icon="['fas', 'exclamation-triangle']"
          slot="icon"
          aria-hidden
          fixed-width
        />
        <template slot="content">A simple warn alert with an icon</template>
      </geo-alert>
      <geo-alert variant="progress">
        <font-awesome-icon
          :icon="['fas', 'circle-notch']"
          slot="icon"
          aria-hidden
          fixed-width
          spin
        />
        <template slot="content">A simple progress alert with an icon</template>
      </geo-alert>
    </div>
    <h3 class="element-demo__header">With actions</h3>
    <div class="element-demo__block">
      <geo-alert variant="info">
        <template slot="content">Alerts can have actions</template>
        <a slot="actions">Run action</a>
      </geo-alert>
      <geo-alert variant="success">
        <template slot="content">Alerts can have actions</template>
        <a slot="actions">Run action</a>
      </geo-alert>
      <geo-alert variant="error">
        <template slot="content">Alerts can have actions</template>
        <a slot="actions">Run action</a>
      </geo-alert>
      <geo-alert variant="warn">
        <template slot="content">Alerts can have actions</template>
        <a slot="actions">Run action</a>
      </geo-alert>
      <geo-alert variant="progress">
        <template slot="content">Alerts can have actions</template>
        <a slot="actions">Run action</a>
      </geo-alert>
    </div>
    <h3 class="element-demo__header">With icons & actions</h3>
    <div class="element-demo__block">
      <geo-alert variant="info">
        <font-awesome-icon
          :icon="['far', 'lightbulb']"
          slot="icon"
          aria-hidden
          fixed-width
        />
        <template slot="content">Alerts can have icons & actions</template>
        <a slot="actions">Do something</a>
      </geo-alert>
      <geo-alert variant="success">
        <font-awesome-icon
          :icon="['far', 'thumbs-up']"
          slot="icon"
          aria-hidden
          fixed-width
        />
        <template slot="content">Alerts can have icons & actions</template>
        <a slot="actions">Do something</a>
      </geo-alert>
      <geo-alert variant="error">
        <font-awesome-icon
          :icon="['fas', 'exclamation-triangle']"
          slot="icon"
          aria-hidden
          fixed-width
        />
        <template slot="content">Alerts can have icons & actions</template>
        <a slot="actions">Do something</a>
      </geo-alert>
      <geo-alert variant="warn">
        <font-awesome-icon
          :icon="['fas', 'exclamation-triangle']"
          slot="icon"
          aria-hidden
          fixed-width
        />
        <template slot="content">Alerts can have icons & actions</template>
        <a slot="actions">Do something</a>
      </geo-alert>
      <geo-alert variant="progress">
        <font-awesome-icon
          :icon="['fas', 'circle-notch']"
          slot="icon"
          aria-hidden
          fixed-width
          spin
        />
        <template slot="content">Alerts can have icons & actions</template>
        <a slot="actions">Do something</a>
      </geo-alert>
    </div>
    <h3 class="element-demo__header">Alerts with close button</h3>
    <div class="element-demo__block">
      <geo-alert
        :close-icon="['fas', 'times']"
        variant="info"
        @close="close()"
      >
        <template slot="content">This alert can be closed</template>
      </geo-alert>
      <geo-alert
        :close-icon="['fas', 'times']"
        variant="success"
        @close="close()"
      >
        <template slot="content">This alert can be closed</template>
      </geo-alert>
      <geo-alert
        :close-icon="['fas', 'times']"
        variant="error"
        @close="close()"
      >
        <template slot="content">This alert can be closed</template>
      </geo-alert>
      <geo-alert
        :close-icon="['fas', 'times']"
        variant="warn"
        @close="close()"
      >
        <template slot="content">This alert can be closed</template>
      </geo-alert>
      <geo-alert
        :close-icon="['fas', 'times']"
        variant="progress"
        @close="close()"
      >
        <template slot="content">This alert can be closed</template>
      </geo-alert>
    </div>
    <h3 class="element-demo__header">Long alert</h3>
    <div class="element-demo__block">
      <geo-alert
        :icon="['far', 'lightbulb']"
        :close-icon="['fas', 'times']"
        variant="info"
        @close="close()"
      >
        <template slot="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet ornare libero. In ullamcorper euismod nulla quis hendrerit. Maecenas ullamcorper lorem nec augue dapibus, sed pellentesque orci mollis. Pellentesque turpis elit, commodo et fermentum sed, luctus eu mi. Mauris sagittis et urna in pulvinar. Pellentesque vitae mauris lacinia, convallis sapien id, gravida lacus. Suspendisse potenti. Phasellus molestie ex id urna rutrum hendrerit. Vivamus ut ultricies sem, eget vulputate ligula. Nullam quis cursus urna, nec efficitur neque. Sed ornare porttitor dui rhoncus dictum. Pellentesque est lacus, euismod non aliquet eu, iaculis in nisl. In ullamcorper nunc mauris, non tristique sapien convallis ut. Proin feugiat odio turpis, sed dapibus lacus vestibulum at.</template>
      </geo-alert>
    </div>
    <h3 class="element-demo__header">Floating alert</h3>
    <div class="element-demo__block">
      <button @click="showFloatingAlert">Show floating alert</button>
      <geo-alert
        v-if="isShowingFloatingAlert"
        :close-icon="['fas', 'times']"
        variant="info"
        floating
        @close="hideFloatingAlert()"
      >
        <font-awesome-icon
          :icon="['far', 'lightbulb']"
          slot="icon"
          aria-hidden
          fixed-width
        />
        <template slot="content">This is a floating alert</template>
      </geo-alert>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowingFloatingAlert: false
    }
  },
  methods: {
    showFloatingAlert () {
      this.isShowingFloatingAlert = true
    },

    hideFloatingAlert () {
      this.isShowingFloatingAlert = false
    }
  }
}
</script>
```
