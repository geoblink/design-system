`GeoNotificationBar` is a component designed to show a notification message
to the user. It can be customized with different icons, action buttons or close event.

```
<div class="element-demo">
  <h3 class="element-demo__header">Simple</h3>
  <div class="element-demo__block">
    <div class="element-demo__notification-box">
      <geo-notification-bar
        :icon="['fas', 'bell']"
        :close-icon="['fas', 'times']"
        @close=""
      >
        Notification message about something important.
      </geo-notification-bar>
    </div>
  </div>
  <h3 class="element-demo__header">With action</h3>
  <div class="element-demo__block">
    <div class="element-demo__notification-box">
      <geo-notification-bar
        :icon="['fas', 'bell']"
        :close-icon="['fas', 'times']"
        @close=""
      >
        Notification message about something important.
        <geo-primary-button slot="actions">Button</geo-primary-button>
      </geo-notification-bar>
    </div>
  </div>
</div>
```
