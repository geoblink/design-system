<template>
  <geo-markdown-content-node-link
    v-if="isLink"
    :node="node"
    :child-nodes="childNodes"
    @handle-click="handleClick($event)"
  />
  <img
    v-else-if="isImage"
    :src="src"
    :title="title"
    :alt="alt"
  >
  <pre v-else-if="isCodeBlock"><code>{{ text }}</code></pre>
  <code v-else-if="isInlineCode">{{ text }}</code>
  <component
    :is="htmlTag"
    v-else-if="isBlock"
  >
    <geo-markdown-content-node
      v-for="(childNode, index) in childNodes"
      :key="index"
      :node="childNode"
      @handle-click="handleClick($event)"
    />
  </component>
  <span v-else>{{ text }}</span>
</template>

<script>
import _ from 'lodash'
import { MarkdownNodeType } from './GeoMarkdownParser'
import GeoMarkdownContentNodeLink from './GeoMarkdownContentNodeLink.vue'

export default {
  name: 'GeoMarkdownContentNode',
  status: 'ready',
  release: '8.3.0',
  components: {
    GeoMarkdownContentNodeLink
  },
  props: {
    /**
     * [`markdown-it`](https://www.npmjs.com/package/markdown-it) node to be
     * rendered.
     */
    node: {
      type: Object,
      required: true
    }
  },
  computed: {
    isPlainText () {
      return _.get(this.node, 'type') === MarkdownNodeType.plainText
    },

    isBlock () {
      return !this.isPlainText
    },

    isLink () {
      return _.get(this.node, 'type') === MarkdownNodeType.link
    },

    isImage () {
      return _.get(this.node, 'type') === MarkdownNodeType.image
    },

    isCodeBlock () {
      return _.get(this.node, 'type') === MarkdownNodeType.codeBlock
    },

    isInlineCode () {
      return _.get(this.node, 'type') === MarkdownNodeType.inlineCode
    },

    text () {
      const plainTextNodeTypes = {
        [MarkdownNodeType.plainText]: true,
        [MarkdownNodeType.codeBlock]: true,
        [MarkdownNodeType.inlineCode]: true
      }
      return _.get(this.node, 'type') in plainTextNodeTypes
        ? _.get(this.node, 'content')
        : null
    },

    childNodes () {
      return this.isBlock
        ? _.get(this.node, 'childNodes')
        : null
    },

    htmlTag () {
      return this.isBlock
        ? _.get(this.node, 'tag')
        : null
    },

    title () {
      return this.isImage
        ? _.get(this.node, 'title')
        : null
    },

    src () {
      return this.isImage
        ? _.get(this.node, 'src')
        : null
    },

    alt () {
      return this.isImage
        ? _.get(this.node, 'alt')
        : null
    }
  },
  methods: {
    handleClick ($event) {
      this.$emit('handle-click', $event)
    }
  }
}
</script>
