import _ from 'lodash'

/**
 * @typedef {Object} VuePressHeader
 * @property {number} level
 * @property {string} title
 * @property {string} slug
 * @property {string} [type]
 * @property {Array<VuePressHeader>} [children]
 */

/**
 * @typedef {Object} VuePressPage
 * @property {object} frontmatter
 * @property {string} [frontmatter.layout]
 * @property {string} [title]
 * @property {Array<VuePressHeader>} headers
 * @property {string} key
 * @property {string} lastUpdated
 * @property {string} path
 * @property {string} regularPath
 * @property {string} relativePath
 */

/**
 * @typedef {Object} ComponentExample
 * @property {string} internalPath
 * @property {string} originalRegularPath
 * @property {string} originalRelativePath
 */

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
 * @param {Array<ComponentExample>} params.examples
 * @param {any} params.$site
 */
export function getVuepressPageSettingsForComponent (params) {
  const hasProperties = !!getComponentProperties(params.documentation).length
  const hasEvents = !!getComponentEvents(params.documentation).length
  const hasSlots = !!getComponentSlots(params.documentation).length
  const hasConstants = !!getComponentConstants(params.definition).length
  const examples = getComponentExamples(params.examples, params.$site.themeConfig.componentExamplesByPath)

  const headers = [{
    level: 1,
    slug: params.name,
    title: params.name
  }]

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

  if (hasConstants) {
    headers.push({
      level: 2,
      slug: 'constants',
      title: 'Constants'
    })
  }

  if (examples.length) {
    const examplesGroupHeader = {
      level: 2,
      slug: 'examples',
      title: 'Examples',
      children: [],
      type: 'link'
    }

    if (examples.length > 1) {
      const examplePagesWithTitle = _.filter(examples, 'title')

      for (const examplePage of examplePagesWithTitle) {
        const parentHeader = {
          level: examplesGroupHeader.level + 1,
          slug: `example-${examplePage.key}`,
          title: examplePage.title,
          children: getPageHeaderChildrenHierarchy(examplePage.headers || [], 1)
        }

        examplesGroupHeader.type = 'group'
        examplesGroupHeader.children.push(parentHeader)
      }

    }

    headers.push(examplesGroupHeader)
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

/**
 * @param {Array<ComponentExample>} examples
 * @param {Object<string, VuePressPage>} componentExamplesByPath
 * @returns {Array<VuePressPage>}
 */
export function getComponentExamples (examples, componentExamplesByPath) {
  return _.map(examples, (singleExample) => componentExamplesByPath[singleExample.originalRegularPath])
}

/**
 * @param {Array<VuePressHeader>} headers
 * @param {number} parentHeaderLevel
 * @return {Array<VuePressHeader>}
 */
function getPageHeaderChildrenHierarchy (headers, parentHeaderLevel) {
  const collectedHeaders = /** @type {Array<VuePressHeader>} */ ([])

  for (let index = 0; index < headers.length; index++) {
    const singleHeader = headers[index]

    // If we find a header that is upper than current parent, finish since this
    // current parent header is a child of that header
    if (singleHeader.level <= parentHeaderLevel) break
    // If we find a header that is not immediate child of current parent,
    // ignore it since it will be included as child of one of the immediate ones
    if (singleHeader.level > parentHeaderLevel + 1) continue

    const newEntry = {
      title: singleHeader.title,
      slug: singleHeader.slug,
      type: singleHeader.type,
      children: singleHeader.children,
      level: singleHeader.level
    }

    if (!newEntry.children) {
      newEntry.children = getPageHeaderChildrenHierarchy(headers.slice(index + 1), newEntry.level)
    }

    newEntry.type = newEntry.children.length
      ? 'group'
      : 'link'

    collectedHeaders.push(newEntry)
  }

  return collectedHeaders
}
