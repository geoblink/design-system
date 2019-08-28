<template>
  <div class="c-design-tokens-list__section c-design-tokens-list-all-tokens">
    <table>
      <thead>
        <tr>
          <th>Elements</th>
          <th>Released in</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <all-elements-list-item
          v-for="element in orderedElements"
          :key="element.documentation.displayName"
          :component-path="element.path"
          :component="allComponents[element.documentation.displayName]"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import _ from 'lodash'

import { components } from '../../src/system'

export default {
  name: 'AllElementsList',
  computed: {
    allElements () {
      return _.map(this.$site.themeConfig.componentsDocumentations)
    },

    allComponents () {
      return components
    },

    publicElements () {
      return _.filter(this.allElements, (singleComponent) => !components[singleComponent.documentation.displayName].internal)
    },

    orderedElements () {
      return _.sortBy(this.publicElements, 'documentation.displayName')
    }
  }
}
</script>