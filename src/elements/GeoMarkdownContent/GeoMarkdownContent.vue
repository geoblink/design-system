<template>
  <div :class="`geo-markdown-content${cssSuffix}`">
    <geo-markdown-content-node
      v-for="(node, index) in markdownNodes"
      :key="index"
      :node="node"
    />
  </div>
</template>

<script>
import filter from 'lodash/filter'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import cssSuffix from '../../mixins/cssModifierMixin'

import GeoMarkdownContentNode from './GeoMarkdownContentNode.vue'

import { getMarkdownNodes, MarkdownParserFeatures } from './GeoMarkdownParser'

const MarkdownIt = (function () {
  try {
    return require('markdown-it')
  } catch (error) {
    return null
  }
})()

export default {
  name: 'GeoMarkdownContent',
  constants: {
    MarkdownParserFeatures
  },
  components: {
    GeoMarkdownContentNode
  },
  mixins: [cssSuffix],
  props: {
    /**
     * Markdown string to be rendered.
     */
    markdown: {
      type: String,
      required: true
    },

    /**
     * Dictionary of features (keys) and whether they should be enabled or not
     * (values). Use a `truthy` value to enable a feature and a `falsy` value to
     * disble one of the enabled-by-default features.
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
      default () {
        return {}
      }
    }
  },
  computed: {
    enabledParserFeatures () {
      const features = Object.assign({
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

      return getMarkdownNodes(this.markdown, this.parser)
    }
  }
}
</script>
