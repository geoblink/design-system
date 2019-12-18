### Default Markdown features

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Default features</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-markdown-content
        markdown="This is a **bold** string with _italics_, [a nice link](https://geoblink.com) and [a link that triggers a custom event](@custom-event)"
        @custom-event="myEvent()"
      />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    myEvent () {
      window.alert('Custom event clicked')
    }
  }
}
</script>

```

### Markdown without links

```jsx live
<div class="element-demo">
  <h3 class="element-demo__header">Without links</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-markdown-content
      :features="{
        linkify: false,
        link: false
      }"
      markdown="This is a **bold** string with _italics_ and [a nice link](https://geoblink.com)"
    />
  </div>
</div>
```

### Markdown with interpolated variables

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      With interpolated variables
      <div class="element-demo__inline-input-group">
        <label class="element-demo__inline-input-group__field">
          Variable value: <input
            type="text"
            v-model="variableValue"
          >
        </label>
      </div>
    </h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-markdown-content
        :features="{
          linkify: false,
          link: false
        }"
        :values="{
          myVariable: variableValue
        }"
        markdown="My variable is: :myVariable"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      variableValue: 'a **non bold** text'
    }
  }
}
</script>

```
