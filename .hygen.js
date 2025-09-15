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
        .replace(/&amp;/gi, '&')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
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
          description: (prop.description || '')
            .replace(/&#39;/gi, "'")
            .replace(/&#96;/gi, '`')
            .replace(/&#62;/gi, '>')
            .replace(/&amp;/gi, '&')
            .replace(/&lt;/gi, '<')
            .replace(/&gt;/gi, '>')
            .replace(/&quot;/gi, '"')
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

      const json = _.map(documentation.events, function (eventMetadata) {
        return {
          name: eventMetadata.name,
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
          name: slotMetadata.name,
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
    },

    /**
     * Generates example files and documentation with ?raw imports
     * @param {string} exampleMarkdownPath - Path to the examples markdown file
     * @param {string} componentName - Component name for folder structure
     * @param {string} existingContent - Existing content of the target file
     * @returns {string} - Generated documentation with example imports
     */
    generateExamplesFromFile (exampleMarkdownPath, componentName, existingContent = '') {
      const content = fs.readFileSync(exampleMarkdownPath).toString()
      const exampleNamePrefix = exampleMarkdownPath.split('/').pop().split('.').slice(0, -1).join('.')
      // Extract the actual component name from the path (e.g., "GeoSwitch" from "GeoSwitch/GeoSwitch.vue")
      const actualComponentName = componentName.split('/')[0]
      const examplesDir = `.vitepress/docs/components/${actualComponentName}/examples`
      
      // Create examples directory if it doesn't exist
      if (!fs.existsSync(examplesDir)) {
        fs.mkdirSync(examplesDir, { recursive: true })
      }
      
      let exampleCounter = 0
      let transformedContent = content
      const imports = []
      
      // Transform jsx live blocks
      transformedContent = transformedContent.replace(
        /```jsx live\n([\s\S]*?)```/g,
        (match, code) => {
          exampleCounter++
          const fileName = `${exampleNamePrefix}-${exampleCounter}.jsx`
          const filePath = `${examplesDir}/${fileName}`
          
          // Write the example code to a separate file
          fs.writeFileSync(filePath, code.trim())
          
          // Add to imports array
          imports.push(`import example${exampleCounter}Code from './examples/${fileName}?raw'`)
          
          return `<live-code :code="example${exampleCounter}Code" />`
        }
      )
      
      // Transform vue live blocks
      transformedContent = transformedContent.replace(
        /```vue live\n([\s\S]*?)```/g,
        (match, code) => {
          exampleCounter++
          const fileName = `${exampleNamePrefix}-${exampleCounter}.vue`
          const filePath = `${examplesDir}/${fileName}`
          
          // Write the example code to a separate file
          fs.writeFileSync(filePath, code.trim())
          
          // Add to imports array
          const importVariableName = fileName.replace(/[\.-]/g, '')
          imports.push(`import ${importVariableName}Code from './examples/${fileName}?raw'`)
          
          return `<live-code :code="${importVariableName}Code" />`
        }
      )
      
      // Generate the script setup section with imports
      if (imports.length > 0) {
        // Check if there's already a script setup tag in the existing content
        const existingScriptMatch = existingContent.match(/<script\s+setup[^>]*>([\s\S]*?)<\/script>/i)
        
        if (existingScriptMatch) {
          // Merge imports into existing script tag
          const existingScriptContent = existingScriptMatch[1].trim()
          const newScriptContent = existingScriptContent + '\n\n' + imports.join('\n')
          
          // Replace the script tag in the existing content
          const updatedExistingContent = existingContent.replace(
            /<script\s+setup[^>]*>[\s\S]*?<\/script>/i,
            `<script setup>\n${newScriptContent}\n</script>`
          )
          
          // Return the complete updated file content
          return updatedExistingContent + '\n\n' + transformedContent
        } else {
          // Add new script setup section to the transformed content
          const scriptSection = `
            <script setup>
            ${imports.join('\n')}
            </script>
          `
          transformedContent = scriptSection + transformedContent
          
          // Return the complete file content
          return existingContent + '\n\n' + transformedContent
        }
      }
      
      // If no imports, just append the transformed content to existing content
      return existingContent + '\n\n' + transformedContent
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
