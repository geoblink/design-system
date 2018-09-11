<template>
  <div :class="`highlighted-string__container${cssSuffix}`">
    <span
      v-for="(entry, index) in groupsFromMatches"
      :key="index"
    ><span
      v-if="entry.isHighlighted"
      :class="`highlighted-string--highlighted${cssSuffix}`"
    >{{ entry.substring }}</span><span
      v-else
      :class="`highlighted-string--normal${cssSuffix}`"
    >{{ entry.substring }}</span>
    </span>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'GeoHighlightedString',
  status: 'ready',
  version: '1.0.0',
  props: {
    /**
     * Array with the position of each of the chars that match
     * in the provided string and need to be highlighted
     */
    matchedCharsPosition: {
      type: Array,
      required: true,
      validator (matchedChars) {
        var copyMatchedChars = _.clone(matchedChars)
        var currentValue
        while (copyMatchedChars.length) {
          currentValue = copyMatchedChars.shift()
          if (currentValue > copyMatchedChars[0]) return false
        }
        return true
      }
    },
    /**
     * String that is being checked for matches
     */
    referenceString: {
      type: String,
      required: true
    },
    /**
     * An optional suffix to be appended as BEM modifier.
     *
     * Can be used to customize the look & feel of the component by changing all
     * the CSS classes by different ones so no CSS loaded by default affects
     * them.
     *
     * To generate default styles for a modifier named `modifier-name`, you just
     * have to add `@include geo-highlighted-string-make('modifier-name');` to
     * your SCSS styles.
     */
    cssModifier: {
      type: String,
      default: ''
    }
  },
  computed: {
    cssSuffix () {
      return this.cssModifier ? `--${this.cssModifier}` : ''
    },
    groupsFromMatches () {
      var matches = []
      var self = this
      var groupEnd
      var isHighlighted
      var matchedChars = [].concat(self.matchedCharsPosition)
      for (var i = 0; i < self.referenceString.length;) {
        if (matchedChars[0] === i) {
          matchedChars.shift()
          groupEnd = i + 1
          while (matchedChars[0] === groupEnd) {
            matchedChars.shift()
            groupEnd++
          }
          isHighlighted = true
        } else {
          groupEnd = matchedChars[0] || self.referenceString.length
          isHighlighted = false
        }
        matches.push({
          isHighlighted: isHighlighted,
          substring: self.referenceString.substring(i, groupEnd)
        })
        i = groupEnd
      }
      return matches
    }
  }
}
</script>
