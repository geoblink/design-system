### Normal state

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-dropdown-regular-button>
      My button
    </geo-dropdown-regular-button>

    <geo-dropdown-regular-button :icon="['far', 'bell']">
      My button with an icon
    </geo-dropdown-regular-button>

    <geo-dropdown-regular-button :icon="['far', 'bell']" />

    <geo-dropdown-regular-button :icon="['far', 'bell']">
      My button with: <strong>bold text</strong>
    </geo-dropdown-regular-button>

    <geo-dropdown-regular-button :icon="['far', 'bell']">
      My button with: <em>italic text</em>
    </geo-dropdown-regular-button>
  </div>
</div>
```

### Hover state

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-dropdown-regular-button hover>
        My button
      </geo-dropdown-regular-button>

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        hover
      >
        My button with an icon
      </geo-dropdown-regular-button>

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        hover
      />

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        hover
      >
        My button with: <strong>bold text</strong>
      </geo-dropdown-regular-button>

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        hover
      >
        My button with: <em>italic text</em>
      </geo-dropdown-regular-button>
    </div>
  </div>
</template>
```

### Disabled state

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-dropdown-regular-button disabled>
        My button
      </geo-dropdown-regular-button>

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        disabled
      >
        My button with an icon
      </geo-dropdown-regular-button>

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        disabled
      />

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        disabled
      >
        My button with: <strong>bold text</strong>
      </geo-dropdown-regular-button>

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        disabled
      >
        My button with: <em>italic text</em>
      </geo-dropdown-regular-button>
    </div>
  </div>
</template>
```

### Active state

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-dropdown-regular-button active>
        My button
      </geo-dropdown-regular-button>

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        active
      >
        My button with an icon
      </geo-dropdown-regular-button>

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        active
      />

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        active
      >
        My button with: <strong>bold text</strong>
      </geo-dropdown-regular-button>

      <geo-dropdown-regular-button
        :icon="['far', 'bell']"
        active
      >
        My button with: <em>italic text</em>
      </geo-dropdown-regular-button>
    </div>
  </div>
</template>
```
