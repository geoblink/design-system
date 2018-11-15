<template>
  <a
    v-if="isLink"
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
  <img
    v-else-if="isImage"
    :src="src"
    :title="title"
    :alt="alt"
  >
  <code v-else-if="isCodeBlock">
    {{ text }}
  </code>
  <component
    v-else-if="isBlock"
    :is="htmlTag"
  >
    <geo-markdown-content-node
      v-for="(childNode, index) in childNodes"
      :key="index"
      :node="childNode"
    />
  </component>
  <span v-else>{{ text }}</span>
</template>

<script>
import { MarkdownNodeType } from './GeoMarkdownParser'

export default {
  name: 'GeoMarkdownContentNode',
  status: 'ready',
  release: '8.3.0',
  props: {
    node: {
      type: Object,
      required: true
    }
  },
  computed: {
    isPlainText () {
      return this.node.type === MarkdownNodeType.plainText
    },

    isBlock () {
      return !this.isPlainText
    },

    isLink () {
      return this.node.type === MarkdownNodeType.link
    },

    isImage () {
      return this.node.type === MarkdownNodeType.image
    },

    isCodeBlock () {
      return this.node.type === MarkdownNodeType.code
    },

    text () {
      const plainTextNodeTypes = {
        [MarkdownNodeType.plainText]: true,
        [MarkdownNodeType.code]: true
      }
      return this.node.type in plainTextNodeTypes
        ? this.node.content
        : null
    },

    childNodes () {
      return this.isBlock
        ? this.node.childNodes
        : null
    },

    htmlTag () {
      return this.isBlock
        ? this.node.tag
        : null
    },

    href () {
      return this.isLink
        ? this.node.href
        : null
    },

    title () {
      return this.isLink || this.isImage
        ? this.node.title
        : null
    },

    src () {
      return this.isImage
        ? this.node.src
        : null
    },

    alt () {
      return this.isImage
        ? this.node.alt
        : null
    }
  }
}
</script>
