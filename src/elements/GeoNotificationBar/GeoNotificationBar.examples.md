### Simple

```jsx live
<div class="element-demo">
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
</div>
```

### With action

```jsx live
<div class="element-demo">
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
