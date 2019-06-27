Use `GeoFeedbackBox` component to give visual feedback to your users about the
result of an action or insights to help them properly finish a task. You can
customize the color to change the intention of the feedback and add icons or
buttons to allow the user to perform actions right on the Feedback boxes.

```
<div class="element-demo">
  <h3 class="element-demo__header">Simple</h3>
  <div class="element-demo__block">
    <geo-feedback-box variant="info">
      <template slot="content">A simple info feedback box</template>
    </geo-feedback-box>
    <geo-feedback-box variant="success">
      <template slot="content">A simple success feedback box</template>
    </geo-feedback-box>
    <geo-feedback-box variant="error">
      <template slot="content">A simple error feedback box</template>
    </geo-feedback-box>
    <geo-feedback-box variant="warning">
      <template slot="content">A simple warn feedback box</template>
    </geo-feedback-box>
    <geo-feedback-box variant="progress">
      <template slot="content">A simple progress feedback box</template>
    </geo-feedback-box>
  </div>
  <h3 class="element-demo__header">With icon</h3>
  <div class="element-demo__block">
    <geo-feedback-box variant="info">
      <font-awesome-icon
        :icon="['far', 'lightbulb']"
        slot="leadingAccessoryItem"
        aria-hidden
        fixed-width
      />
      <template slot="content">An info box with an icon</template>
    </geo-feedback-box>
    <geo-feedback-box variant="success">
      <font-awesome-icon
        :icon="['far', 'thumbs-up']"
        slot="leadingAccessoryItem"
        aria-hidden
        fixed-width
      />
      <template slot="content">An success box with an icon</template>
    </geo-feedback-box>
    <geo-feedback-box variant="error">
      <font-awesome-icon
        :icon="['fas', 'exclamation-triangle']"
        slot="leadingAccessoryItem"
        aria-hidden
        fixed-width
      />
      <template slot="content">An error box with an icon</template>
    </geo-feedback-box>
    <geo-feedback-box variant="warning">
      <font-awesome-icon
        :icon="['fas', 'exclamation-triangle']"
        slot="leadingAccessoryItem"
        aria-hidden
        fixed-width
      />
      <template slot="content">An warn box with an icon</template>
    </geo-feedback-box>
    <geo-feedback-box variant="progress">
      <font-awesome-icon
        :icon="['fas', 'circle-notch']"
        slot="leadingAccessoryItem"
        aria-hidden
        fixed-width
        spin
      />
      <template slot="content">A progress box with an icon</template>
    </geo-feedback-box>
  </div>
  <h3 class="element-demo__header">With actions</h3>
  <div class="element-demo__block">
    <geo-feedback-box variant="info">
      <template slot="content">Box can have actions</template>
      <a slot="actions">Ok</a>
    </geo-feedback-box>
    <geo-feedback-box variant="success">
      <template slot="content">Box can have actions</template>
      <a slot="actions">Ok</a>
    </geo-feedback-box>
    <geo-feedback-box variant="error">
      <template slot="content">Box can have actions</template>
      <a slot="actions">Ok</a>
    </geo-feedback-box>
    <geo-feedback-box variant="warning">
      <template slot="content">Box can have actions</template>
      <a slot="actions">Ok</a>
    </geo-feedback-box>
    <geo-feedback-box variant="progress">
      <template slot="content">Box can have actions</template>
      <a slot="actions">Ok</a>
    </geo-feedback-box>
  </div>
  <h3 class="element-demo__header">With icons & actions</h3>
  <div class="element-demo__block">
    <geo-feedback-box variant="info">
      <font-awesome-icon
        :icon="['far', 'lightbulb']"
        slot="leadingAccessoryItem"
        aria-hidden
        fixed-width
      />
      <template slot="content">Box with icon & action</template>
      <a slot="actions">Run</a>
    </geo-feedback-box>
    <geo-feedback-box variant="success">
      <font-awesome-icon
        :icon="['far', 'thumbs-up']"
        slot="leadingAccessoryItem"
        aria-hidden
        fixed-width
      />
      <template slot="content">With icon & action</template>
      <a slot="actions">Run</a>
    </geo-feedback-box>
    <geo-feedback-box variant="error">
      <font-awesome-icon
        :icon="['fas', 'exclamation-triangle']"
        slot="leadingAccessoryItem"
        aria-hidden
        fixed-width
      />
      <template slot="content">With icon & action</template>
      <a slot="actions">Run</a>
    </geo-feedback-box>
    <geo-feedback-box variant="warning">
      <font-awesome-icon
        :icon="['fas', 'exclamation-triangle']"
        slot="leadingAccessoryItem"
        aria-hidden
        fixed-width
      />
      <template slot="content">With icon & action</template>
      <a slot="actions">Run</a>
    </geo-feedback-box>
    <geo-feedback-box variant="progress">
      <font-awesome-icon
        :icon="['fas', 'circle-notch']"
        slot="leadingAccessoryItem"
        aria-hidden
        fixed-width
        spin
      />
      <template slot="content">With icon & action</template>
      <a slot="actions">Run</a>
    </geo-feedback-box>
  </div>
  <h3 class="element-demo__header">Feedback boxes with close button</h3>
  <div class="element-demo__block">
    <geo-feedback-box
      :close-icon="['fas', 'times']"
      variant="info"
      @close="close()"
    >
      <template slot="content">This box can be closed</template>
    </geo-feedback-box>
    <geo-feedback-box
      :close-icon="['fas', 'times']"
      variant="success"
      @close="close()"
    >
      <template slot="content">This box can be closed</template>
    </geo-feedback-box>
    <geo-feedback-box
      :close-icon="['fas', 'times']"
      variant="error"
      @close="close()"
    >
      <template slot="content">This box can be closed</template>
    </geo-feedback-box>
    <geo-feedback-box
      :close-icon="['fas', 'times']"
      variant="warning"
      @close="close()"
    >
      <template slot="content">This box can be closed</template>
    </geo-feedback-box>
    <geo-feedback-box
      :close-icon="['fas', 'times']"
      variant="progress"
      @close="close()"
    >
      <template slot="content">This box can be closed</template>
    </geo-feedback-box>
  </div>
</div>
```
