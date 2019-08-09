---
to: src/elements/<%= name %>/<%= name %>.examples.md
---
<% dashedName = h.changeCase.param(name) -%>
`<%= name %>` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua.

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block">
      <<%= dashedName %>></<%= dashedName %>>
    </div>
  </div>
</template>

<script>
export default {
  name: '<%= name %>Demo',
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {

  }
}
</script>
```
