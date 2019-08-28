[GeoFeedbackBox](./#/Elements/GeoFeedbackBox) using predefined `success` variant.

`success` variant is normally used to tell the user an explicitly started action
has finished successfully.

See [GeoFeedbackBox](./#/Elements/GeoFeedbackBox) for a complete list of
supported properties and features.

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Simple</h3>
    <div class="element-demo__block">
      <geo-success-feedback-box :icon="['fas', 'thumbs-up']">
        <template slot="content">A simple feedback box</template>
      </geo-success-feedback-box>
    </div>
    <h3 class="element-demo__header">With custom icon</h3>
    <div class="element-demo__block">
      <geo-success-feedback-box :icon="['far', 'image']">
        <template slot="content">A simple feedback box with an icon</template>
      </geo-success-feedback-box>
    </div>
    <h3 class="element-demo__header">With action</h3>
    <div class="element-demo__block">
      <geo-success-feedback-box :icon="['fas', 'thumbs-up']">
        <template slot="content">Feedback boxes can have actions</template>
        <a slot="actions">Run action</a>
      </geo-success-feedback-box>
    </div>
    <h3 class="element-demo__header">With custom icon & action</h3>
    <div class="element-demo__block">
      <geo-success-feedback-box :icon="['far', 'image']">
        <template slot="content">Feedback boxes can have icons & actions</template>
        <a slot="actions">Do something</a>
      </geo-success-feedback-box>
    </div>
    <h3 class="element-demo__header">With close button</h3>
    <div class="element-demo__block">
      <geo-success-feedback-box
        :icon="['fas', 'thumbs-up']"
        :close-icon="['fas', 'times']"
        @close="close()"
      >
        <template slot="content">This feedback box can be closed</template>
      </geo-success-feedback-box>
    </div>
    <h3 class="element-demo__header">Long content</h3>
    <div class="element-demo__block">
      <geo-success-feedback-box
        :icon="['fas', 'thumbs-up']"
        :close-icon="['fas', 'times']"
        @close="close()"
      >
        <template slot="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet ornare libero. In ullamcorper euismod nulla quis hendrerit. Maecenas ullamcorper lorem nec augue dapibus, sed pellentesque orci mollis. Pellentesque turpis elit, commodo et fermentum sed, luctus eu mi. Mauris sagittis et urna in pulvinar. Pellentesque vitae mauris lacinia, convallis sapien id, gravida lacus. Suspendisse potenti. Phasellus molestie ex id urna rutrum hendrerit. Vivamus ut ultricies sem, eget vulputate ligula. Nullam quis cursus urna, nec efficitur neque. Sed ornare porttitor dui rhoncus dictum. Pellentesque est lacus, euismod non aliquet eu, iaculis in nisl. In ullamcorper nunc mauris, non tristique sapien convallis ut. Proin feugiat odio turpis, sed dapibus lacus vestibulum at.</template>
      </geo-success-feedback-box>
    </div>
    <h3 class="element-demo__header">Floating</h3>
    <div class="element-demo__block">
      <geo-secondary-button @click="showFloatingAlert">Show floating feedback box</geo-secondary-button>
      <geo-success-feedback-box
        v-if="isShowingFloatingFeedbackBox"
        :icon="['fas', 'thumbs-up']"
        :close-icon="['fas', 'times']"
        floating
        @close="hideFloatingAlert()"
      >
        <font-awesome-icon
          :icon="['far', 'thumbs-up']"
          slot="icon"
          aria-hidden
          fixed-width
        />
        <template slot="content">This is a floating feedback box</template>
      </geo-success-feedback-box>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowingFloatingFeedbackBox: false
    }
  },
  methods: {
    showFloatingAlert () {
      this.isShowingFloatingFeedbackBox = true
    },

    hideFloatingAlert () {
      this.isShowingFloatingFeedbackBox = false
    }
  }
}
</script>
```
