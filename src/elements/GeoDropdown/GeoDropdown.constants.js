import _ from 'lodash'

export const X_AXIS_POSITION = {
  right: 'right',
  left: 'left'
}

export const Y_AXIS_POSITION = {
  top: 'top',
  bottom: 'bottom'
}

export function geoDropdownMixinFactory (idDropdown) {
  const camelCaseIdDropdown = _.camelCase(idDropdown)
  const pascalCasedIdDropdown = `${camelCaseIdDropdown[0].toUpperCase()}${camelCaseIdDropdown.slice(1)}`
  const isDropdownOpenedKeyPath = `is${pascalCasedIdDropdown}DropdownOpened`

  return {
    data () {
      return {
        [isDropdownOpenedKeyPath]: false
      }
    },
    methods: {
      [`dismiss${pascalCasedIdDropdown}Dropdown`] () {
        (/** @type {any} */ (this))[isDropdownOpenedKeyPath] = false
      },

      [`toggle${pascalCasedIdDropdown}Dropdown`] () {
        (/** @type {any} */ (this))[isDropdownOpenedKeyPath] = !this[isDropdownOpenedKeyPath]
      }
    }
  }
}
