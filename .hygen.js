const _ = require('lodash')
const path = require('path')
const fs = require('fs')

/**
 * @typedef {Object} ComponentProperty
 * @property {string} name
 * @property {string} description
 * @property {object} type
 * @property {string} type.name
 * @property {boolean} required
 * @property {object} defaultValue
 * @property {boolean} defaultValue.func
 * @property {string} defaultValue.value
 */

/**
 * @typedef {Object} ComponentEvent
 * @property {string} description
 * @property {object} type
 * @property {Array<string>} type.names
 */

/**
 * @typedef {Object} ComponentSlot
 * @property {string} description
 */

/**
 * @typedef {Object} ComponentDefinition
 * @property {object} [constants]
 */

/**
 * @typedef {Object} ComponentDocumentation
 * @property {Object<string, ComponentProperty>} [props]
 * @property {Object<string, ComponentEvent>} [events]
 * @property {Object<string, ComponentSlot>} [slots]
 */

module.exports = {
  helpers: {
    /**
     * @param {string} s
     * @returns {string}
     */
    withoutExtension: s => s.replace(/(.*)\.[^.]*/gi, '$1'),

    /**
     * @param {string} s
     * @returns {string}
     */
    slashesAsDashes: s => s.replace(/\//gi, '-'),

    /**
     * @param {string} s
     * @returns {string}
     */
    basename: s => path.basename(s),

    /**
     * @param {string} s
     * @returns {string}
     */
    escapeString (s) {
      return s
        .replace(/'/gi, '&#39;')
        .replace(/`/gi, '&#96;')
        .replace(/>/gi, '&#62;')
        .replace(/\\n/gi, '\\\\n')
    },

    /**
     * @param {string} s
     * @returns {string}
     */
    unescapeString (s) {
      return s
        .replace(/&#39;/gi, `'`)
        .replace(/&#96;/gi, '`')
        .replace(/&#62;/gi, '>')
        .replace(/\\n/gi, '\\\\n')
    },

    /**
     * @param {ComponentDocumentation} componentDefinition
     * @returns {string}
     */
    getComponentName: jsonDocumentation => JSON.parse(jsonDocumentation).displayName,

    /**
     * @param {ComponentDocumentation} componentDefinition
     * @returns {string}
     */
    getComponentDescription: jsonDocumentation => JSON.parse(jsonDocumentation).description,

    /**
     * @param {ComponentDocumentation} componentDefinition
     * @returns {string}
     */
    getComponentStatusBadgeText (jsonDocumentation) {
      const documentation = JSON.parse(jsonDocumentation)
      const badgeTextByStatus = {
        ready: 'Ready',
        'missing-tests': 'Missing tests',
        'deprecated': 'Deprecated'
      }

      if (documentation.status in badgeTextByStatus) return badgeTextByStatus[documentation.status]

      throw new Error(`Unknown component status for component ${documentation.name}: ${documentation.status}`)
    },

    /**
     * @param {ComponentDocumentation} componentDefinition
     * @returns {string}
     */
    getComponentStatusBadgeType (jsonDocumentation) {
      const documentation = JSON.parse(jsonDocumentation)
      const badgeTypeByStatus = {
        ready: 'tip',
        'missing-tests': 'warn',
        'deprecated': 'error'
      }

      if (documentation.status in badgeTypeByStatus) return badgeTypeByStatus[documentation.status]

      throw new Error(`Unknown component status for component ${documentation.name}: ${documentation.status}`)
    },

    /**
     * @param {ComponentDocumentation} componentDefinition
     * @returns {string}
     */
    getComponentReleaseBadgeText (jsonDocumentation) {
      const documentation = JSON.parse(jsonDocumentation)
      if (documentation.status === 'deprecated') return null

      return documentation.release
        ? `${documentation.release}+`
        : 'Unreleased'
    },

    /**
     * @param {ComponentDocumentation} componentDefinition
     * @returns {string}
     */
    getComponentPropertiesJSON (jsonDocumentation) {
      const documentation = JSON.parse(jsonDocumentation)

      const json = _.map(documentation.props, function (prop) {
        const defaultValueMetadata = getPropertyDefaultValueMetadata(prop.defaultValue)

        return {
          name: prop.name,
          type: prop.type.name,
          isDefaultValueAFunction: _.get(defaultValueMetadata, 'isFunction'),
          defaultValue: _.get(defaultValueMetadata, 'value'),
          required: !!prop.required,
          description: prop.description
        }
      })

      return JSON.stringify(json)
    },

    /**
     * @param {ComponentDocumentation} componentDefinition
     * @returns {string}
     */
    getComponentEventsJSON (jsonDocumentation) {
      const documentation = JSON.parse(jsonDocumentation)

      const json = _.map(documentation.events, function (eventMetadata, eventName) {
        return {
          name: eventName,
          types: _.get(eventMetadata.type, 'names'),
          description: eventMetadata.description
        }
      })

      return JSON.stringify(json)
    },

    /**
     * @param {ComponentDocumentation} componentDefinition
     * @returns {string}
     */
    getComponentSlotsJSON (jsonDocumentation) {
      const documentation = JSON.parse(jsonDocumentation)

      const json = _.map(documentation.slots, function (slotMetadata, slotName) {
        return {
          name: slotName,
          description: slotMetadata.description
        }
      })

      return JSON.stringify(json)
    },

    /**
     * @param {string} filePath
     * @returns {string}
     */
    renderFileContent (filePath) {
      return fs.readFileSync(filePath).toString()
    }
  }
}

/**
 * @template T
 * @param {object} [property]
 * @param {boolean} property.func
 * @param {T} property.value
 * @returns {{value: T | string, isFunction: boolean}}
 */
function getPropertyDefaultValueMetadata (property) {
  if (!property) return null
  if (property.func) {
    return {
      isFunction: true,
      value: property.value.toString()
    }
  }

  return {
    isFunction: false,
    value: property.value
  }
}
