import _ from 'lodash'

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

/**
 * @param {object} params
 * @param {string} params.path
 * @param {string} params.name
 * @param {ComponentDefinition} params.definition
 * @param {ComponentDocumentation} params.documentation
 */
export function getVuepressPageSettingsForComponent (params) {
  const hasConstants = !!getComponentConstants(params.definition).length
  const hasProperties = !!getComponentProperties(params.documentation).length
  const hasEvents = !!getComponentEvents(params.documentation).length
  const hasSlots = !!getComponentSlots(params.documentation).length

  const headers = [{
    level: 1,
    slug: params.name,
    title: params.name
  }]

  if (hasConstants) {
    headers.push({
      level: 2,
      slug: 'constants',
      title: 'Constants'
    })
  }

  if (hasProperties) {
    headers.push({
      level: 2,
      slug: 'properties',
      title: 'Properties'
    })
  }

  if (hasEvents) {
    headers.push({
      level: 2,
      slug: 'events',
      title: 'Events'
    })
  }

  if (hasSlots) {
    headers.push({
      level: 2,
      slug: 'slots',
      title: 'Slots'
    })
  }

  return {
    frontmatter: {
      title: params.name
    },
    headers,
    path: `/components/${params.path}.html`,
    regularPath: `/components/${params.path}.html`,
    relativePath: `components/${params.path}`,
    title: `${params.name} (Documentation)`
  }
}

/**
 * @param {ComponentDefinition} componentDefinition
 * @returns {Array<{name: string, definition: any}>}
 */
export function getComponentConstants (componentDefinition) {
  return _.map(componentDefinition.constants, function (definition, name) {
    return { name, definition }
  })
}

/**
 * @param {ComponentDocumentation} componentDefinition
 * @returns {Array<{name: string, type: string}>}
 */
export function getComponentProperties (componentDefinition) {
  return _.map(componentDefinition.props, function (prop) {
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

/**
 * @param {ComponentDocumentation} componentDefinition
 * @returns {Array<{name: string, types: Array<string>, description: string}>}
 */
export function getComponentEvents (componentDefinition) {
  return _.map(componentDefinition.events, function (eventMetadata, eventName) {
    return {
      name: eventName,
      types: _.get(eventMetadata.type, 'names'),
      description: eventMetadata.description
    }
  })
}

/**
 * @param {ComponentDocumentation} componentDefinition
 * @returns {Array<{name: string, description: string}>}
 */
export function getComponentSlots (componentDefinition) {
  return _.map(componentDefinition.slots, function (slotMetadata, slotName) {
    return {
      name: slotName,
      description: slotMetadata.description
    }
  })
}

/**
 * @param {object} originalPage
 * @param {string} originalPage.key
 * @param {Array<object>} originalPage.headers
 * @param {string} originalPage.title
 * @param {object} originalPage.frontmatter
 * @param {object} customPage
 * @param {string} customPage.originalRegularPath
 * @param {string} customPage.customRegularPath
 * @param {string} customPage.originalRelativePath
 * @param {string} customPage.internalPath
 */
export function getVuepressPageSettingsForExample (originalPage, customPage) {
  return {
    key: originalPage.key,
    headers: originalPage.headers,
    frontmatter: originalPage.frontmatter,
    title: `${originalPage.title} (Example)`,
    path: customPage.customRegularPath,
    regularPath: customPage.customRegularPath,
    relativePath: customPage.originalRelativePath
  }
}

/**
 * @param {string} examplePagePath Path to example page, with or without leading slash
 * @returns {string}
 */
export function getComponentInternalPathForExample (examplePagePath) {
  if (!examplePagePath) return null

  const componentInternalPath = examplePagePath
    .replace('/src/elements/', '')
    .replace(/\.[^/]*$/, '')
  return componentInternalPath
}
