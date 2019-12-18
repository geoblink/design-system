---
to: src/elements/<%= name %>/<%= name %>.examples.md
---
<% dashedName = h.changeCase.param(name) -%>

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
