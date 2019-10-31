<template>
  <geo-select-base
    ref="selectBase"
    :opened="isOpened"
    :css-modifier="`geo-select${cssSuffix}`"
    :has-more-results="hasMoreResultsToLoad"
    :fixed-width="fixedWidth"
    @click-outside="closeSelect"
    @load-more-results="loadNextPage"
  >
    <!-- @slot _Optional_. Use this slot to customize toggle button. -->
    <slot
      slot="toggleButton"
      name="toggleButton"
      :dropdown-icon="dropdownIcon"
      :delete-icon="deleteIcon"
      :css-modifier="`geo-select${cssSuffix}`"
      :is-empty="!value"
      :is-value-deletable="isValueDeletable"
      :disabled="disabled"
      :toggle-select="toggleSelect"
      :delete-value="deleteValue"
      :label="toggleButtonLabel"
    >
      <geo-select-toggle-button
        :dropdown-icon="dropdownIcon"
        :delete-icon="deleteIcon"
        :css-modifier="`geo-select${cssSuffix}`"
        :is-empty="!value"
        :is-value-deletable="isValueDeletable"
        :disabled="disabled"
        :variant="variant"
        @click="toggleSelect"
        @delete-value="deleteValue"
      >
        <geo-trimmed-content :css-modifier="`geo-select${cssSuffix}`">
          {{ toggleButtonLabel }}
        </geo-trimmed-content>
      </geo-select-toggle-button>
    </slot>

    <!-- @slot _Optional_. Use this slot to customize search form. -->
    <slot
      v-if="searchable"
      name="search-header"
    >
      <geo-bordered-box-header-search-form
        v-if="searchable"
        slot="header"
        v-model="searchPattern"
        :search-icon="searchIcon"
        :css-modifier="`geo-select${cssSuffix}`"
        :placeholder="searchInputPlaceholder"
      />
    </slot>

    <template v-if="visibleOptions.length">
      <template v-if="isGroupedSelect">
        <template v-for="(option, index) in visibleOptions">
          <!--
            @slot _Optional_. Use this slot to customize how groups are displayed
            in grouped `GeoSelect`s
          -->
          <slot
            name="group"
            :option="option"
            :index="index"
            :suggested-key="`${option[keyForLabel]}--${index}`"
            :css-modifier="`geo-select${cssSuffix}`"
          >
            <geo-list-group :css-modifier="`geo-select${cssSuffix}`">
              <slot
                v-if="option.isOptGroupHeader"
                slot="title"
                name="group-title"
              >
                <geo-marquee :css-modifier="`geo-select${cssSuffix}`">
                  <geo-highlighted-string
                    slot-scope="{}"
                    :css-modifier="`geo-select${cssSuffix}`"
                    :highlighted-chars="option.matches"
                    :reference-string="option[keyForLabel]"
                  />
                </geo-marquee>
              </slot>

              <slot
                v-for="(item, itemIndex) in option.items"
                slot="item"
                name="group-item"
                :suggested-key="`${item[keyForLabel]}--${itemIndex}`"
                :item-index="itemIndex"
                :item="item"
                :css-modifier="`geo-select${cssSuffix}`"
                :change-current-selection="changeCurrentSelection"
              >
                <geo-list-item
                  :key="`${item[keyForLabel]}--${itemIndex}`"
                  :css-modifier="`geo-select${cssSuffix}`"
                  @click="changeCurrentSelection(item)"
                >
                  <geo-marquee :css-modifier="`geo-select${cssSuffix}`">
                    <geo-highlighted-string
                      slot-scope="{}"
                      :css-modifier="`geo-select${cssSuffix}`"
                      :highlighted-chars="item.matches"
                      :reference-string="item[keyForLabel]"
                    />
                  </geo-marquee>
                </geo-list-item>
              </slot>
            </geo-list-group>
          </slot>
        </template>
      </template>
      <template v-else>
        <template v-for="(option, optionIndex) in visibleOptions">
          <!--
            @slot _Optional_. Use this slot to customize how options are displayed
            in non-grouped `GeoSelect`s
          -->
          <slot
            :item="option"
            :item-index="optionIndex"
            :suggested-key="`${option[keyForLabel]}--${optionIndex}`"
            :css-modifier="`geo-select${cssSuffix}`"
            :change-current-selection="changeCurrentSelection"
          >
            <geo-list-item
              :key="`${option[keyForLabel]}--${optionIndex}`"
              :css-modifier="`geo-select${cssSuffix}`"
              @click="changeCurrentSelection(option)"
            >
              <geo-marquee :css-modifier="`geo-select${cssSuffix}`">
                <geo-highlighted-string
                  slot-scope="{}"
                  :css-modifier="`geo-select${cssSuffix}`"
                  :highlighted-chars="option.matches"
                  :reference-string="option[keyForLabel]"
                />
              </geo-marquee>
            </geo-list-item>
          </slot>
        </template>
      </template>
    </template>
    <geo-list-clear-item
      v-else
      :css-modifier="`geo-select${cssSuffix}`"
    >
      <!--
        @slot Use this slot to customize the label that will be displayed when
        no results are found after searching for an option
      -->
      <slot name="noResults" />
    </geo-list-clear-item>
    <!--
      @slot Use this slot to customize the label of the button allowing to
      display additional options when there are too many to be displayed at once
    -->
    <slot
      slot="moreResultsTextContent"
      name="moreResultsTextContent"
    />
  </geo-select-base>
</template>

<script>
import _ from 'lodash'
import geoSelectMixin from './GeoSelect.mixin'

export default {
  name: 'GeoSelect',
  status: 'ready',
  release: '4.1.0',
  mixins: [geoSelectMixin],
  props: {
    /**
     * @model
     * Currently selected option. It is displayed as the select placeholder.
     */
    value: {
      type: Object,
      required: false
    }
  },
  computed: {
    toggleButtonLabel () {
      return _.get(this.value, this.keyForLabel, this.placeholder)
    }
  },
  methods: {
    changeCurrentSelection (option) {
      /**
       * Change GeoSelect selection event
       * @event input
       * @type {object}
       */
      this.$emit('input', option.item)
      this.closeSelect()
    }
  }
}
</script>
