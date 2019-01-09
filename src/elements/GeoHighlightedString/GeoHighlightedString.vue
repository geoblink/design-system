<template>
  <div :class="`highlighted-string__container${cssSuffix}`">
    <template v-for="(entry, index) in groups">
      <div
        v-if="entry.isHighlighted"
        :class="`highlighted-string--highlighted${cssSuffix}`"
        :key="index"
      >{{ entry.substring }}</div><div
        v-else
        :class="`highlighted-string--normal${cssSuffix}`"
        :key="index"
      >{{ entry.substring }}</div>
    </template>
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoHighlightedString',
  status: 'ready',
  release: '4.0.0',
  mixins: [cssSuffix],
  props: {
    /**
     * Array with the position of each of the characters that should be
     * highlighted.
     */
    highlightedChars: {
      type: Array,
      required: true,
      validator (values) {
        if (values.length < 2) return true

        for (let i = 1; i < values.length; i++) {
          if (values[i - 1] > values[i]) {
            console.warn(`GeoHighlightedString [component] :: Values of highlightedChars must be sorted ascendently but value at index ${i - 1} (${values[i - 1]}) was greater than value at index ${i} (${values[i]})`)
            return false
          } else if (values[i - 1] === values[i]) {
            console.warn(`GeoHighlightedString [component] :: Values of highlightedChars can't be repeated but value at index ${i - 1} (${values[i - 1]}) was equal to value at index ${i} (${values[i]})`)
            return false
          }
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
    }
  },
  computed: {
    groups () {
      const self = this
      const groups = []
      const matchedChars = [].concat(self.highlightedChars)

      let groupEnd
      let isHighlighted
      for (let i = 0; i < self.referenceString.length;) {
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

        groups.push({
          isHighlighted: isHighlighted,
          substring: self.referenceString.substring(i, groupEnd)
        })

        i = groupEnd
      }

      return groups
    }
  }
}
</script>
