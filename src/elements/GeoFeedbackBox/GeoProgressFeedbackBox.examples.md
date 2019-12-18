### Simple

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-progress-feedback-box :icon="['fas', 'circle-notch']">
      <template slot="content">A simple feedback box</template>
    </geo-progress-feedback-box>
  </div>
</div>
```

### With custom icon

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-progress-feedback-box :icon="['far', 'image']">
      <template slot="content">A simple feedback box with an icon</template>
    </geo-progress-feedback-box>
  </div>
</div>
```

### With actions

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-progress-feedback-box :icon="['fas', 'circle-notch']">
      <template slot="content">Feedback boxes can have actions</template>
      <a slot="actions">Run action</a>
    </geo-progress-feedback-box>
  </div>
</div>
```

### With custom icon & actions

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-progress-feedback-box :icon="['far', 'image']">
      <template slot="content">Feedback boxes can have icons & actions</template>
      <a slot="actions">Do something</a>
    </geo-progress-feedback-box>
  </div>
</div>
```

### With close button

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-progress-feedback-box
      :icon="['fas', 'circle-notch']"
      :close-icon="['fas', 'times']"
      @close=""
    >
      <template slot="content">This feedback box can be closed</template>
    </geo-progress-feedback-box>
  </div>
</div>
```

### Long content

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-progress-feedback-box
      :icon="['fas', 'circle-notch']"
      :close-icon="['fas', 'times']"
      @close=""
    >
      <template slot="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet ornare libero. In ullamcorper euismod nulla quis hendrerit. Maecenas ullamcorper lorem nec augue dapibus, sed pellentesque orci mollis. Pellentesque turpis elit, commodo et fermentum sed, luctus eu mi. Mauris sagittis et urna in pulvinar. Pellentesque vitae mauris lacinia, convallis sapien id, gravida lacus. Suspendisse potenti. Phasellus molestie ex id urna rutrum hendrerit. Vivamus ut ultricies sem, eget vulputate ligula. Nullam quis cursus urna, nec efficitur neque. Sed ornare porttitor dui rhoncus dictum. Pellentesque est lacus, euismod non aliquet eu, iaculis in nisl. In ullamcorper nunc mauris, non tristique sapien convallis ut. Proin feugiat odio turpis, sed dapibus lacus vestibulum at.</template>
    </geo-progress-feedback-box>
  </div>
</div>
```

### Floating

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <geo-secondary-button @click="showFloatingAlert">Show floating feedback box</geo-secondary-button>
      <geo-progress-feedback-box
        v-if="isShowingFloatingFeedbackBox"
        :icon="['fas', 'exclamation-triangle']"
        :close-icon="['fas', 'times']"
        floating
        @close="hideFloatingAlert()"
      >
        <font-awesome-icon
          :icon="['far', 'lightbulb']"
          slot="icon"
          aria-hidden
          fixed-width
        />
        <template slot="content">This is a floating feedback box</template>
      </geo-progress-feedback-box>
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
