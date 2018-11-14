`GeoMarkdownContent` is a component designed to render Markdown strings in a
safe way, ensuring each DOM element generated is part of Vue virtual DOM tree
and that no raw HTML can be injected into the application.

> **Note:** This component requires installing
[`markdown-it`](https://www.npmjs.com/package/markdown-it) NPM package.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Default features</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <div class="element-demo__item">
        <geo-markdown-content
          markdown="This is a **bold** string with _italics_ and [a nice link](https://geoblink.com)"
        />
      </div>
    </div>
    <h3 class="element-demo__header">Without links</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <div class="element-demo__item">
        <geo-markdown-content
          :features="{
            linkify: false,
            link: false
          }"
          markdown="This is a **bold** string with _italics_ and [a nice link](https://geoblink.com)"
        />
      </div>
    </div>
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
      <div class="element-demo__item">
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
