---
to: src/elements/<%= name %>/<%= name %>.vue
---
<template>
  <div class="<%= h.changeCase.param(name) %>">

  </div>
</template>

<script>
export default {
  name: '<%= name %>',
  status: 'missing-tests',
  release: 'CHANGE ME',
  props: {

  },
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
