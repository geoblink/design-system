---
to: src/elements/<%= name %>/<%= name %>.vue
---
<template>
  <div :class="`<%= h.changeCase.param(name) %>${cssSuffix}`">

  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: '<%= name %>',
  status: 'missing-tests',
  release: 'CHANGE ME',
  mixins: [cssSuffix],
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
