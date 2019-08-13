<template>
  <Layout>
    <template
      v-for="(section, sectionIndex) in sidebarSections"
      :slot="section.slot"
    >
      <ul
        v-if="section.items.length"
        :key="sectionIndex"
        class="sidebar-links"
      >
        <li
          v-for="(item, itemIndex) in section.items"
          :key="`${sectionIndex}-${itemIndex}`"
        >
          <router-link
            :to="item.to"
            class="sidebar-link"
          >
            {{ item.title }}
          </router-link>
        </li>
      </ul>
    </template>
  </Layout>
</template>

<script>
const _ = require('lodash')
const componentUtils = require('../componentUtils')

import { components } from '../../src/system'

export default {
  name: 'ComponentExampleLayout',
  computed: {
    internalPath () {
      return componentUtils.getComponentInternalPathForExample(this.$page.regularPath)
    },

    parentComponentDocumentationPage () {
      const internalPath = this.internalPath

      const {
        componentsDocumentations
      } = this.$site.themeConfig

      return componentsDocumentations[internalPath]
    },

    parentComponentDocumentation () {
      return this.parentComponentDocumentationPage.documentation
    },

    componentDocumentationItem () {
      if (!this.parentComponentDocumentationPage) return null

      const vuepressPageForParentComponent = componentUtils.getVuepressPageSettingsForComponent({
        path: this.parentComponentDocumentationPage.path,
        name: this.parentComponentDocumentation.displayName,
        definition: components[this.parentComponentDocumentation.displayName],
        documentation: this.parentComponentDocumentation
      })

      return {
        title: vuepressPageForParentComponent.title,
        to: vuepressPageForParentComponent.path
      }
    },

    componentExamplesItems () {
      if (!this.parentComponentDocumentationPage) return null

      const { componentExamplesByPath } = this.$site.themeConfig

      const otherExamples = _.reject(this.parentComponentDocumentationPage.examples, { originalRegularPath: this.$page.regularPath })

      const examplesLinkItems = _.map(otherExamples, function (example) {
        const examplePageInfo = componentExamplesByPath[example.originalRegularPath]

        return {
          title: examplePageInfo.title,
          to: example.originalRegularPath
        }
      })

      return _.partition(examplesLinkItems, (item) => item.title < this.$page.title)
    },

    sidebarSections () {
      if (!this.parentComponentDocumentationPage) return null

      return [{
        slot: 'sidebar-top',
        items: [this.componentDocumentationItem]
      }, {
        slot: 'sidebar-top',
        items:  this.componentExamplesItems[0]
      }, {
        slot: 'sidebar-bottom',
        items: this.componentExamplesItems[1]
      }]
    }
  }
}
</script>

