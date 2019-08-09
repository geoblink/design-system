`GeoInputMessage` is component designed to fit nicely as a help message for
`GeoInput`.
You can customize the color to change the intention of the message using
different variants like `success` or `error`.

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Default message</h3>
    <div class="element-demo__block">
      <geo-input-message>
        This is the default message
      </geo-input-message>
    </div>

    <h3 class="element-demo__header">Success message</h3>
    <div class="element-demo__block">
      <geo-input-message variant="success">
        This is a success message
      </geo-input-message>
    </div>

    <h3 class="element-demo__header">Error message</h3>
    <div class="element-demo__block">
      <geo-input-message variant="error">
        This is an error message
      </geo-input-message>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeoInputMessageDemo',
}
</script>
```
