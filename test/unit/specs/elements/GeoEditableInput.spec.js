import _ from 'lodash'
import { createLocalVue, mount } from '@vue/test-utils'
import GeoActivityIndicator from '@/elements/GeoActivityIndicator/GeoActivityIndicator.vue'
import GeoDropdown from '@/elements/GeoDropdown/GeoDropdown.vue'
import GeoEditableInput from '@/elements/GeoEditableInput/GeoEditableInput.vue'
import GeoCompactButton from 'src/elements/GeoCompactButton/GeoCompactButton.vue'
import GeoPrimaryCompactButton from 'src/elements/GeoCompactButton/GeoPrimaryCompactButton.vue'
import GeoSecondaryCompactButton from 'src/elements/GeoCompactButton/GeoSecondaryCompactButton.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
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

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-activity-indicator', GeoActivityIndicator)
localVue.component('geo-dropdown', GeoDropdown)
localVue.component('geo-editable-input', GeoEditableInput)

describe('GeoEditableInput', () => {
  it('Should render input component', function () {
    const wrapper = mount(GeoEditableInput, {
      propsData: {
        showButtons: false
      },
      stubs: {
        GeoDropdown
      }
    })

    expect(wrapper.find('.geo-editable-input__form__input').exists()).toBe(true)
  })

  it('Should emit an event on click', function (done) {
    const wrapper = mount(GeoEditableInput, {
      propsData: {
        showButtons: false
      },
      stubs: {
        GeoDropdown
      }
    })

    wrapper.find('.geo-editable-input__form__input').trigger('click')
    setTimeout(function () {
      try {
        expect(wrapper.emitted()['click']).toBeTruthy()
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('Should render correct icon for saveIcon when provided', function () {
    const wrapper = mount(GeoEditableInput, {
      propsData: {
        showButtons: true,
        saveIcon: ['fas', 'thumbs-up']
      },
      stubs: {
        GeoDropdown,
        GeoCompactButton,
        GeoPrimaryCompactButton,
        GeoSecondaryCompactButton,
        'font-awesome-icon': FontAwesomeIconMock
      }
    })
    const fontAwesomeIconElem = wrapper.find('.geo-compact-button--primary').find(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'thumbs-up'])
  })

  it('Should render correct icon for cancelIcon when provided', function () {
    const wrapper = mount(GeoEditableInput, {
      propsData: {
        showButtons: true,
        cancelIcon: ['fas', 'thumbs-up']
      },
      stubs: {
        GeoDropdown,
        GeoCompactButton,
        GeoPrimaryCompactButton,
        GeoSecondaryCompactButton,
        'font-awesome-icon': FontAwesomeIconMock
      }
    })
    const fontAwesomeIconElem = wrapper.find('.geo-compact-button--secondary').find(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'thumbs-up'])
  })

  it('Should not emit the event on click when disabled', function (done) {
    const wrapper = mount(GeoEditableInput, {
      propsData: {
        showButtons: false,
        disabled: true
      },
      stubs: {
        GeoDropdown
      }
    })

    wrapper.find('.geo-editable-input__form__input').trigger('click')
    setTimeout(function () {
      try {
        expect(wrapper.emitted()['click']).toBeFalsy()
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('Should not render buttons if they are hidden', function () {
    const wrapper = mount(GeoEditableInput, {
      propsData: {
        showButtons: false
      },
      stubs: {
        GeoDropdown,
        GeoPrimaryCompactButton,
        GeoSecondaryCompactButton
      }
    })

    expect(wrapper.find('geo-primary-compact-button').exists()).toBe(false)
    expect(wrapper.find('geo-secondary-compact-button').exists()).toBe(false)
  })

  it('Should emit an event on click save button', function (done) {
    const wrapper = mount(GeoEditableInput, {
      propsData: {
        showButtons: true
      },
      stubs: {
        GeoDropdown,
        'font-awesome-icon': FontAwesomeIcon,
        GeoCompactButton,
        GeoPrimaryCompactButton,
        GeoSecondaryCompactButton
      }
    })

    wrapper.find(GeoPrimaryCompactButton).trigger('click')
    setTimeout(function () {
      try {
        expect(wrapper.emitted()['save']).toBeTruthy()
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('Should emit an event on click cancel button', function (done) {
    const wrapper = mount(GeoEditableInput, {
      propsData: {
        showButtons: true
      },
      stubs: {
        GeoDropdown,
        'font-awesome-icon': FontAwesomeIcon,
        GeoCompactButton,
        GeoPrimaryCompactButton,
        GeoSecondaryCompactButton
      }
    })

    wrapper.find(GeoSecondaryCompactButton).trigger('click')
    setTimeout(function () {
      try {
        expect(wrapper.emitted()['cancel']).toBeTruthy()
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('Should emit input event when added a value', function (done) {
    const wrapper = mount(GeoEditableInput, {
      propsData: {
        showButtons: false
      },
      stubs: {
        GeoDropdown,
        GeoPrimaryCompactButton,
        GeoSecondaryCompactButton
      }
    })

    const textInput = wrapper.find('input[type="text"]')
    textInput.setValue('some value')

    setTimeout(function () {
      try {
        expect(wrapper.emitted()['input']).toBeTruthy()
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('Should create input type number when prop passed', function () {
    const wrapper = mount(GeoEditableInput, {
      propsData: {
        showButtons: false,
        type: 'number'
      },
      stubs: {
        GeoDropdown,
        GeoPrimaryCompactButton,
        GeoSecondaryCompactButton
      }
    })

    expect(wrapper.find('input[type="number"]').exists()).toBe(true)
  })
})
