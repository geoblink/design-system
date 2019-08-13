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
    />
  </component>
  <span v-else>{{ text }}</span>
</template>

<script>
import _ from 'lodash'
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

    href () {
      return this.isLink
        ? _.get(this.node, 'href')
        : null
    },

    title () {
      return this.isLink || this.isImage
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
  }
}
</script>
