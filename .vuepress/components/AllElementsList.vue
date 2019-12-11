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
          :key="element.name"
          :component-path="element.path"
          :component="element"
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
    componentsWithStatus () {
      return _.filter(components, 'status')
    },

    orderedElements () {
      return _.sortBy(this.componentsWithStatus, 'name')
    }
  }
}
</script>