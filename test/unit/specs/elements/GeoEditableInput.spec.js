import _ from 'lodash'
import { mount } from '@vue/test-utils'
import GeoActivityIndicator from '@/elements/GeoActivityIndicator/GeoActivityIndicator.vue'
import GeoDropdown from '@/elements/GeoDropdown/GeoDropdown.vue'
import GeoEditableInput from '@/elements/GeoEditableInput/GeoEditableInput.vue'
import GeoCompactButton from 'src/elements/GeoCompactButton/GeoCompactButton.vue'
import GeoPrimaryCompactButton from 'src/elements/GeoCompactButton/GeoPrimaryCompactButton.vue'
import GeoSecondaryCompactButton from 'src/elements/GeoCompactButton/GeoSecondaryCompactButton.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock'

const iconsToMock = [
  'faTimes',
  'faCheck',
  'faBell'
]
const mockedFalIcons = _.mapValues(_.pick(fas, iconsToMock), (original) => {
  return _.assign({}, original, {
    prefix: 'fal'
  })
})
library.add(mockedFalIcons)

// Helper function to create wrapper with registered components
function createWrapper (component, options = {}) {
  return mount(component, Object.assign({
    global: {
      components: {
        'geo-activity-indicator': GeoActivityIndicator,
        'geo-dropdown': GeoDropdown,
        'geo-editable-input': GeoEditableInput,
        'geo-secondary-compact-button': GeoSecondaryCompactButton,
        'geo-primary-compact-button': GeoPrimaryCompactButton,
        'geo-compact-button': GeoCompactButton,
        'font-awesome-icon': FontAwesomeIconMock
      },
      stubs: {
        GeoDropdown
      }
    }
  }, options))
}

describe('GeoEditableInput', () => {
  it('Should render input component', function () {
    const wrapper = createWrapper(GeoEditableInput, {
      props: {
        showButtons: false
      }
    })

    expect(wrapper.find('.geo-editable-input-form__input').exists()).toBe(true)
  })

  it('Should emit an event on click', function () {
    const wrapper = createWrapper(GeoEditableInput, {
      props: {
        showButtons: false
      }
    })

    wrapper.find('.geo-editable-input-form__input').trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })

  it('Should render correct icon for saveIcon when provided', function () {
    const wrapper = createWrapper(GeoEditableInput, {
      props: {
        showButtons: true,
        saveIcon: ['fas', 'thumbs-up']
      },
      global: {
        stubs: {
          GeoDropdown,
          GeoCompactButton,
          GeoPrimaryCompactButton,
          GeoSecondaryCompactButton,
          'font-awesome-icon': FontAwesomeIconMock,
          teleport: true
        }
      }
    })
    const fontAwesomeIconElem = wrapper.find('.geo-compact-button--primary').findComponent(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'thumbs-up'])
  })

  it('Should render correct icon for cancelIcon when provided', function () {
    const wrapper = createWrapper(GeoEditableInput, {
      props: {
        showButtons: true,
        cancelIcon: ['fas', 'thumbs-up']
      },
      global: {
        stubs: {
          GeoDropdown,
          GeoCompactButton,
          GeoPrimaryCompactButton,
          GeoSecondaryCompactButton,
          'font-awesome-icon': FontAwesomeIconMock,
          teleport: true
        }
      }
    })
    const fontAwesomeIconElem = wrapper.find('.geo-compact-button--secondary').findComponent(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'thumbs-up'])
  })

  it('Should not emit the event on click when disabled', async function () {
    const wrapper = createWrapper(GeoEditableInput, {
      props: {
        showButtons: false,
        disabled: true
      }
    })

    await wrapper.find('.geo-editable-input-form__input').trigger('click')
    expect(wrapper.emitted().click).toBeFalsy()
  })

  it('Should not render buttons if they are hidden', function () {
    const wrapper = createWrapper(GeoEditableInput, {
      props: {
        showButtons: false
      },
      global: {
        stubs: {
          GeoDropdown,
          GeoPrimaryCompactButton,
          GeoSecondaryCompactButton
        }
      }
    })

    expect(wrapper.find('geo-primary-compact-button').exists()).toBe(false)
    expect(wrapper.find('geo-secondary-compact-button').exists()).toBe(false)
  })

  it('Should render with popup class', function () {
    const wrapper = createWrapper(GeoEditableInput, {
      props: {
        showButtons: true,
        popupClass: 'popup-class'
      },
      global: {
        stubs: {
          GeoDropdown,
          GeoCompactButton,
          GeoPrimaryCompactButton,
          GeoSecondaryCompactButton,
          teleport: true
        }
      }
    })

    expect(wrapper.find('.popup-class').exists()).toBe(true)
  })

  it('Should emit an event on click save button', async function () {
    const wrapper = createWrapper(GeoEditableInput, {
      props: {
        showButtons: true
      },
      global: {
        stubs: {
          GeoDropdown,
          'font-awesome-icon': FontAwesomeIconMock,
          GeoCompactButton,
          GeoPrimaryCompactButton,
          GeoSecondaryCompactButton
        }
      }
    })

    await wrapper.findComponent(GeoPrimaryCompactButton).trigger('click')
    expect(wrapper.emitted().save).toBeTruthy()
  })

  it('Should emit an event on click cancel button', async function () {
    const wrapper = createWrapper(GeoEditableInput, {
      props: {
        showButtons: true
      },
      global: {
        stubs: {
          GeoDropdown,
          'font-awesome-icon': FontAwesomeIconMock,
          GeoCompactButton,
          GeoPrimaryCompactButton,
          GeoSecondaryCompactButton
        }
      }
    })

    await wrapper.findComponent(GeoSecondaryCompactButton).trigger('click')
    expect(wrapper.emitted().cancel).toBeTruthy()
  })

  it('Should emit input event when added a value', async function () {
    const wrapper = createWrapper(GeoEditableInput, {
      props: {
        showButtons: false
      },
      global: {
        stubs: {
          GeoDropdown,
          GeoPrimaryCompactButton,
          GeoSecondaryCompactButton
        }
      }
    })

    const textInput = wrapper.find('input[type="text"]')
    await textInput.setValue('some value')

    expect(wrapper.emitted().input).toBeTruthy()
  })

  it('Should create input type number when prop passed', function () {
    const wrapper = createWrapper(GeoEditableInput, {
      props: {
        showButtons: false,
        type: 'number'
      },
      global: {
        stubs: {
          GeoDropdown,
          GeoPrimaryCompactButton,
          GeoSecondaryCompactButton
        }
      }
    })

    expect(wrapper.find('input[type="number"]').exists()).toBe(true)
  })
})
