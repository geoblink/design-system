<template>
  <div class="geo-markdown-content">
    <geo-markdown-content-node
      v-for="(node, index) in markdownNodes"
      :key="index"
      :node="node"
      @handle-click="handleClick($event)"
    />
  </div>
</template>

<script>
import { filter, map, reduce, assign } from 'lodash'

import GeoMarkdownContentNode from './GeoMarkdownContentNode.vue'

import { getMarkdownNodes, MarkdownParserFeatures } from './GeoMarkdownParser'

const MarkdownIt = (function () {
  try {
    return require('markdown-it')
  } catch (error) {
    return null
  }
})()

/**
 * `GeoMarkdownContent` is a component designed to render Markdown strings in a
 * safe way, ensuring each DOM element generated is part of Vue virtual DOM tree
 * and that no raw HTML can be injected into the application.
 *
 * ::: warning NOTE
 * This component requires installing
 * [`markdown-it`](https://www.npmjs.com/package/markdown-it) NPM package.
 * :::
 */
export default {
  name: 'GeoMarkdownContent',
  status: 'ready',
  release: '8.3.0',
  constants: {
    MarkdownParserFeatures
  },
  components: {
    GeoMarkdownContentNode
  },
  props: {
    /**
     * Markdown string to be rendered.
     *
     * You can use `:variableName` special syntax to render values without
     * rendering them as Markdown. This is handy when dealing with user input.
     *
     * Variable names must start with a letter and can contain only letters,
     * digits and the `_` symbol. They must match the pattern:
     * `[a-zA-Z][a-zA-Z0-9_]*`
     */
    markdown: {
      type: String,
      required: true
    },

    /**
     * Values to replace variables found in Markdown text. Each key of this
     * object should match one variable appearing in `markdown` string.
     */
    values: {
      type: Object,
      required: false,
      default: function () {
        return {}
      }
    },

    /**
     * Dictionary of features (keys) and whether they should be enabled or not
     * (values). Use a `truthy` value to enable a feature and a `falsy` value to
     * disable one of the enabled-by-default features.
     *
     * See `MarkdownParserFeatures` named constant to see a list of available
     * features.
     *
     * By default these features are enabled:
     *
     * - `emphasis`
     * - `linkify`
     * - `link`
     */
    features: {
      type: Object,
      validator (value) {
        const features = Object.keys(value)

        return reduce(features, function (allValid, featureName) {
          if (!(featureName in MarkdownParserFeatures)) {
            console.warn(`GeoMarkdownContent [component] :: Received unknown feature «${featureName}»`)
            return false
          }

          return allValid
        }, true)
      },
      default: function () {
        return {}
      }
    }
  },
  computed: {
    enabledParserFeatures () {
      const features = assign({
        [MarkdownParserFeatures.emphasis]: true,
        [MarkdownParserFeatures.linkify]: true,
        [MarkdownParserFeatures.link]: true
      }, this.features)
      const enabledFeatures = filter(map(features, function (isEnabled, featureName) {
        return isEnabled ? featureName : null
      }))
      return enabledFeatures
    },

    parser () {
      if (!MarkdownIt) return null

      const parser = new MarkdownIt('zero', {
        html: false,
        xhtmlOut: false,
        breaks: false,
        langPrefix: 'language-',
        linkify: true,
        typographer: true,
        quotes: '“”‘’',
        highlight: undefined
      })

      parser.enable(this.enabledParserFeatures)

      return parser
    },

    markdownNodes () {
      if (!this.parser) {
        console.warn('GeoMarkdownContent [component] :: markdown-it NPM package is required to use this component')
        return []
      }

      return this.markdown
        ? getMarkdownNodes(this.markdown, this.values, this.parser)
        : []
    }
  },
  methods: {
    handleClick (eventName) {
      this.$emit(eventName)
    }
  }
}
</script>
