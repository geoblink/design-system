<template>
  <a
    v-if="eventMatch"
    :title="title"
    class="geo-markdown-content-node-link__link"
    @click="handleClick()"
  >
    <geo-markdown-content-node
      v-for="(childNode, index) in childNodes"
      :key="index"
      :node="childNode"
      @handle-click="handleClick($event)"
    />
  </a>
  <a
    v-else
    :href="href"
    :title="title"
    target="_blank"
  >
    <geo-markdown-content-node
      v-for="(childNode, index) in childNodes"
      :key="index"
      :node="childNode"
    />
  </a>
</template>

<script>
import _ from 'lodash'

const eventRegExp = /^@(.*)$/

export default {
  name: 'GeoMarkdownContentNodeLink',
  status: 'ready',
  release: '25.2.0',
  props: {
    node: {
      type: Object,
      required: true
    },
    childNodes: {
      type: Array,
      required: true
    }
  },
  computed: {
    href () {
      return _.get(this.node, 'href')
    },

    title () {
      return _.get(this.node, 'title')
    },

    eventMatch () {
      return this.href
        ? this.href.match(eventRegExp)
        : null
    }
  },
  methods: {
    handleClick () {
      const eventName = this.eventMatch[1]
      this.$emit('handle-click', eventName)
    }
  }
}
</script>
