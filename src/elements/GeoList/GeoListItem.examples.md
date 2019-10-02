`GeoListItem` is a component designed to build vertical lists which fit
properly in a [GeoBorderedBox](./#/Elements/GeoBorderedBox).

It can be customized in several ways, adding icons to the leading edge of the
row or more complex elements (like form inputs) to the trailing edge.

## Interactive list item

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-list-item @click="handleclick($event)">
        My button
      </geo-list-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoListItemDemo',
  methods: {
    handleclick (event) {
      console.log('Triggered event when clicking on GeoListItem', event)
    }
  }
}
</script>
```

## Regular list items

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-list-item>
      My button
    </geo-list-item>

    <geo-list-item>
      Enable option
      <input slot="trailingAccessoryItem" type="checkbox">
    </geo-list-item>

    <geo-list-item :icon="['far', 'user']">
      My profile
    </geo-list-item>

    <geo-list-item :icon="['far', 'bell']">
      Notifications
      <font-awesome-icon
        slot="trailingAccessoryItem"
        :icon="['fas', 'chevron-right']"
        aria-hidden
        fixed-width
      />
    </geo-list-item>
  </div>
</div>
```

## Disabled list items

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-list-item disabled>
      My button
    </geo-list-item>

    <geo-list-item disabled>
      Enable option
      <input slot="trailingAccessoryItem" type="checkbox">
    </geo-list-item>

    <geo-list-item
      :icon="['far', 'user']"
      disabled
    >
      My profile
    </geo-list-item>

    <geo-list-item
      :icon="['far', 'bell']"
      disabled
    >
      Notifications
      <font-awesome-icon
        slot="trailingAccessoryItem"
        :icon="['fas', 'chevron-right']"
        aria-hidden
        fixed-width
      />
    </geo-list-item>
  </div>
</div>
```

## List items inside a bordered box

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-bordered-box>
      <geo-list-item>
        My button
        <template slot="description">
          My button description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
        </template>
      </geo-list-item>
      <geo-list-item>
        Enable option
        <input slot="trailingAccessoryItem" type="checkbox">
      </geo-list-item>
      <geo-list-item :icon="['far', 'user']">My profile</geo-list-item>
      <geo-list-item :icon="['far', 'bell']">
        Notifications
        <font-awesome-icon
          slot="trailingAccessoryItem"
          :icon="['fas', 'chevron-right']"
          aria-hidden
          fixed-width
        />
        <template slot="description">Item description</template>
      </geo-list-item>
    </geo-bordered-box>
  </div>
</div>
```
