<template>
  <div class="component-status">
    <ul class="status-list">
      <li>
        <font-awesome-icon
          :icon="['fas', 'check-circle']"
          :style="{
            color: '#7cb518',
            fontSize: '16px'
          }"
        />
        <p>Ready</p>
      </li>
      <li>
        <font-awesome-icon
          :style="{
            color: tokens.color_yellow.value,
            fontSize: '16px'
          }"
          :icon="['fas', 'exclamation-triangle']"
        />
        <p>Under review</p>
      </li>
      <li>
        <font-awesome-icon
          :style="{
            color: tokens.color_red_darker.value,
            fontSize: '16px'
          }"
          :icon="['fas', 'times-circle']"
        />
        <p>Deprecated</p>
      </li>
      <li>
        <font-awesome-icon
          :style="{
            color: tokens.color_blue_dark.value,
            fontSize: '16px'
          }"
          :icon="['fas', 'pen-square']"
        />
        <p>Prototype</p>
      </li>
      <li>
        <span>—</span>
        <p>Not applicable</p>
      </li>
    </ul>
    <table>
      <thead>
        <tr>
          <th>Component Name</th>
          <th>Released in</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(component, index) in components"
          :key="index"
          class="component">
          <td v-if="component.name">
            <code class="name">
              {{ component.name }}
            </code>
          </td>
          <td v-else>N/A</td>
          <td v-if="component.release">
            {{ component.release }}
          </td>
          <td v-else>N/A</td>
          <td v-if="component.status">
            <font-awesome-icon
              v-if="component.status === 'ready'"
              :style="{
                color: '#7cb518',
                fontSize: '16px'
              }"
              :icon="['fas', 'check-circle']"
            />
            <font-awesome-icon
              v-if="component.status === 'under-review' || component.status === 'review'"
              :style="{
                color: tokens.color_ucla_gold.value,
                fontSize: '16px'
              }"
              :icon="['fas', 'exclamation-triangle']"
            />
            <font-awesome-icon
              v-if="component.status === 'prototype'"
              :style="{
                color: tokens.color_bleu_de_france.value,
                fontSize: '16px'
              }"
              :icon="['fas', 'pen-square']"
            />
            <font-awesome-icon
              v-if="component.status === 'deprecated'"
              :style="{
                color: tokens.color_vermilion.value,
                fontSize: '16px'
              }"
              :icon="['fas', 'times-circle']"
            />
          </td>
          <td v-else>—</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import designTokens from '@/assets/tokens/tokens.raw.json'
import orderBy from 'lodash/orderBy'

export default {
  name: 'Components',
  data () {
    return {
      components: this.orderData(this.getComponents()),
      tokens: designTokens.props
    }
  },
  methods: {
    getComponents: function () {
      const contexts = [
        require.context('@/elements/', true, /\.vue$/),
        require.context('@/patterns/', true, /\.vue$/),
        require.context('@/templates/', true, /\.vue$/)
      ]

      const components = []
      contexts.forEach(context => {
        context.keys().forEach(key => components.push(context(key).default))
      })

      return components
    },
    orderData: function (data) {
      return orderBy(data, 'name', 'asc')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../docs.tokens.scss";

/* STYLES
--------------------------------------------- */

.component-status {
  @include reset;
  font-family: $font-family-heading;
  font-weight: $font-weight-regular;
  line-height: $line-height-heading;
  color: $color-rich-black;
  margin-bottom: $space-small;
  font-style: normal;
  @media (max-width: 1000px) {
    overflow-x: auto;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
  }
  thead th {
    padding: $space-small;
    background: $color-cloud;
    font-size: $font-size-small;
    font-weight: $font-weight-bold;
    color: $color-oxford-blue;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: $font-weight-semi-bold;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    // Chrome has a bug related to thead, this only works on th:
    position: sticky;
    top: -1px;
    &:first-child {
      border-top-left-radius: $border-radius-default;
      border-bottom-left-radius: $border-radius-default;
    }
    &:last-child {
      border-top-right-radius: $border-radius-default;
      border-bottom-right-radius: $border-radius-default;
    }
  }
  tr {
    border-bottom: 1px solid #dfe3e6;
    &:last-child {
      border: 0;
    }
  }
  td {
    font-size: $font-size-small;
    padding: $space-small;
    &:first-child {
      font-weight: $font-weight-bold;
      white-space: nowrap;
    }
  }
  .status-list {
    margin: 0 0 $space-small;
    overflow: hidden;
    padding: 0;
    list-style: none;
    flex-direction: row;
    align-items: center;
    display: flex;
    @media (max-width: 1000px) {
      display: block;
    }
    li {
      margin: 0 $space-base 0 0;
      color: $color-silver;
      font-size: $font-size-small;
      align-items: center;
      display: flex;
      @media (max-width: 1000px) {
        width: 50%;
        float: left;
        margin: 0;
      }
      svg,
      span {
        margin: -2px calc(#{$space-small} / 2) 0 0;
      }
      p {
        @media (max-width: 1000px) {
          margin: $space-x-small;
        }
      }
    }
  }
}
</style>

<docs>
  ```jsx
  <components />
  ```
</docs>
