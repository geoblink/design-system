### Simple

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-feedback-box variant="info">
      <template #content>A simple info feedback box</template>
    </geo-feedback-box>
    <geo-feedback-box variant="success">
      <template #content>A simple success feedback box</template>
    </geo-feedback-box>
    <geo-feedback-box variant="error">
      <template #content>A simple error feedback box</template>
    </geo-feedback-box>
    <geo-feedback-box variant="warning">
      <template #content>A simple warn feedback box</template>
    </geo-feedback-box>
    <geo-feedback-box variant="progress">
      <template #content>A simple progress feedback box</template>
    </geo-feedback-box>
  </div>
</div>
```

### With icon

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-feedback-box variant="info">
      <template #leadingAccessoryItem>
        <font-awesome-icon
          :icon="['far', 'lightbulb']"
          aria-hidden
          fixed-width
        />
      </template>
      <template #content>An info box with an icon</template>
    </geo-feedback-box>
    <geo-feedback-box variant="success">
      <template #leadingAccessoryItem>
        <font-awesome-icon
          :icon="['far', 'thumbs-up']"
          aria-hidden
          fixed-width
        />
      </template>
      <template #content>An success box with an icon</template>
    </geo-feedback-box>
    <geo-feedback-box variant="error">
      <template #leadingAccessoryItem>
        <font-awesome-icon
          :icon="['fas', 'exclamation-triangle']"
          aria-hidden
          fixed-width
        />
      </template>
      <template #content>An error box with an icon</template>
    </geo-feedback-box>
    <geo-feedback-box variant="warning">
      <template #leadingAccessoryItem>
        <font-awesome-icon
          :icon="['fas', 'exclamation-triangle']"
          aria-hidden
          fixed-width
        />
      </template>
      <template #content>An warn box with an icon</template>
    </geo-feedback-box>
    <geo-feedback-box variant="progress">
      <template #leadingAccessoryItem>
        <font-awesome-icon
          :icon="['fas', 'circle-notch']"
          aria-hidden
          fixed-width
          spin
        />
      </template>
      <template #content>A progress box with an icon</template>
    </geo-feedback-box>
  </div>
</div>
```

### With actions

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-feedback-box variant="info">
      <template #content>Box can have actions</template>
      <template #actions>
        <a>Ok</a>
      </template>
    </geo-feedback-box>
    <geo-feedback-box variant="success">
      <template #content>Box can have actions</template>
      <template #actions>
        <a>Ok</a>
      </template>
    </geo-feedback-box>
    <geo-feedback-box variant="error">
      <template #content>Box can have actions</template>
      <template #actions>
        <a>Ok</a>
      </template>
    </geo-feedback-box>
    <geo-feedback-box variant="warning">
      <template #content>Box can have actions</template>
      <template #actions>
        <a>Ok</a>
      </template>
    </geo-feedback-box>
    <geo-feedback-box variant="progress">
      <template #content>Box can have actions</template>
      <template #actions>
        <a>Ok</a>
      </template>
    </geo-feedback-box>
  </div>
</div>
```

### With icon & actions

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-feedback-box variant="info">
      <template #leadingAccessoryItem>
        <font-awesome-icon
          :icon="['far', 'lightbulb']"
          aria-hidden
          fixed-width
        />
      </template>
      <template #content>Box with icon & action</template>
      <template #actions>
        <a>Run</a>
      </template>
    </geo-feedback-box>
    <geo-feedback-box variant="success">
      <template #leadingAccessoryItem>
        <font-awesome-icon
          :icon="['far', 'thumbs-up']"
          aria-hidden
          fixed-width
        />
      </template>
      <template #content>With icon & action</template>
      <template #actions>
        <a>Run</a>
      </template>
    </geo-feedback-box>
    <geo-feedback-box variant="error">
      <template #leadingAccessoryItem>
        <font-awesome-icon
          :icon="['fas', 'exclamation-triangle']"
          aria-hidden
          fixed-width
        />
      </template>
      <template #content>With icon & action</template>
      <template #actions>
        <a>Run</a>
      </template>
    </geo-feedback-box>
    <geo-feedback-box variant="warning">
      <template #leadingAccessoryItem>
        <font-awesome-icon
          :icon="['fas', 'exclamation-triangle']"
          aria-hidden
          fixed-width
        />
      </template>
      <template #content>With icon & action</template>
      <template #actions>
        <a>Run</a>
      </template>
    </geo-feedback-box>
    <geo-feedback-box variant="progress">
      <template #leadingAccessoryItem>
        <font-awesome-icon
          :icon="['fas', 'circle-notch']"
          aria-hidden
          fixed-width
          spin
        />
      </template>
      <template #content>With icon & action</template>
      <template #actions>
        <a>Run</a>
      </template>
    </geo-feedback-box>
  </div>
</div>
```

### Feedback boxes with close button

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-feedback-box
      :close-icon="['fas', 'times']"
      variant="info"
      @close=""
    >
      <template #content>This box can be closed</template>
    </geo-feedback-box>
    <geo-feedback-box
      :close-icon="['fas', 'times']"
      variant="success"
      @close=""
    >
      <template #content>This box can be closed</template>
    </geo-feedback-box>
    <geo-feedback-box
      :close-icon="['fas', 'times']"
      variant="error"
      @close=""
    >
      <template #content>This box can be closed</template>
    </geo-feedback-box>
    <geo-feedback-box
      :close-icon="['fas', 'times']"
      variant="warning"
      @close=""
    >
      <template #content>This box can be closed</template>
    </geo-feedback-box>
    <geo-feedback-box
      :close-icon="['fas', 'times']"
      variant="progress"
      @close=""
    >
      <template #content>This box can be closed</template>
    </geo-feedback-box>
  </div>
</div>
```
