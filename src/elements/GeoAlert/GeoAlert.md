Use the `GeoAlert` component to give visual feedback to your users about the result of a given action.
You can customize the color to change the intention of the feedback and add icons or buttons to
allow the user to perform actions on the alerts.

```
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
    <geo-alert variant="warning">
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
        slot="leadingAccessoryItem"
        aria-hidden
        fixed-width
      />
      <template slot="content">A simple info alert with an icon</template>
    </geo-alert>
    <geo-alert variant="success">
      <font-awesome-icon
        :icon="['far', 'thumbs-up']"
        slot="leadingAccessoryItem"
        aria-hidden
        fixed-width
      />
      <template slot="content">A simple success alert with an icon</template>
    </geo-alert>
    <geo-alert variant="error">
      <font-awesome-icon
        :icon="['fas', 'exclamation-triangle']"
        slot="leadingAccessoryItem"
        aria-hidden
        fixed-width
      />
      <template slot="content">A simple error alert with an icon</template>
    </geo-alert>
    <geo-alert variant="warning">
      <font-awesome-icon
        :icon="['fas', 'exclamation-triangle']"
        slot="leadingAccessoryItem"
        aria-hidden
        fixed-width
      />
      <template slot="content">A simple warn alert with an icon</template>
    </geo-alert>
    <geo-alert variant="progress">
      <font-awesome-icon
        :icon="['fas', 'circle-notch']"
        slot="leadingAccessoryItem"
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
    <geo-alert variant="warning">
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
        slot="leadingAccessoryItem"
        aria-hidden
        fixed-width
      />
      <template slot="content">Alerts with icon & action</template>
      <a slot="actions">Run</a>
    </geo-alert>
    <geo-alert variant="success">
      <font-awesome-icon
        :icon="['far', 'thumbs-up']"
        slot="leadingAccessoryItem"
        aria-hidden
        fixed-width
      />
      <template slot="content">Alerts with icon & action</template>
      <a slot="actions">Run</a>
    </geo-alert>
    <geo-alert variant="error">
      <font-awesome-icon
        :icon="['fas', 'exclamation-triangle']"
        slot="leadingAccessoryItem"
        aria-hidden
        fixed-width
      />
      <template slot="content">Alerts with icon & action</template>
      <a slot="actions">Run</a>
    </geo-alert>
    <geo-alert variant="warning">
      <font-awesome-icon
        :icon="['fas', 'exclamation-triangle']"
        slot="leadingAccessoryItem"
        aria-hidden
        fixed-width
      />
      <template slot="content">Alerts with icon & action</template>
      <a slot="actions">Run</a>
    </geo-alert>
    <geo-alert variant="progress">
      <font-awesome-icon
        :icon="['fas', 'circle-notch']"
        slot="leadingAccessoryItem"
        aria-hidden
        fixed-width
        spin
      />
      <template slot="content">Alerts with icon & action</template>
      <a slot="actions">Run</a>
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
      variant="warning"
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
</div>
```
