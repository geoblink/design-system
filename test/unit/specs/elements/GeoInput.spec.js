import { createLocalVue, mount } from '@vue/test-utils'
import GeoActivityIndicator from '@/elements/GeoActivityIndicator/GeoActivityIndicator.vue'
import GeoDropdown from '@/elements/GeoDropdown/GeoDropdown.vue'
import GeoInput from '@/elements/GeoInput/GeoInput.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)
// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-activity-indicator', GeoActivityIndicator)
localVue.component('geo-dropdown', GeoDropdown)
localVue.component('geo-input', GeoInput)

describe('GeoInput', () => {
  it('Should render input component', function () {
    const wrapper = mount(GeoInput, {
      propsData: {
        showButtons: false,
        cancelIcon: ['fas', 'times'],
        saveIcon: ['fas', 'check']
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon,
        GeoDropdown
      }
    })

    expect(wrapper.find('.geo-input__form__input').exists()).toBe(true)
  })

  it('Should emit an event on click', function (done) {
    const wrapper = mount(GeoInput, {
      propsData: {
        showButtons: false,
        cancelIcon: ['fas', 'times'],
        saveIcon: ['fas', 'check']
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon,
        GeoDropdown
      }
    })

    wrapper.find('.geo-input__form__input').trigger('click')
    setTimeout(function () {
      try {
        expect(wrapper.emitted()['click']).toBeTruthy()
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('Should not emit the event on click when disabled', function (done) {
    const wrapper = mount(GeoInput, {
      propsData: {
        showButtons: false,
        cancelIcon: ['fas', 'times'],
        saveIcon: ['fas', 'check'],
        disabled: true
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon,
        GeoDropdown
      }
    })

    wrapper.find('.geo-input__form__input').trigger('click')
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
    const wrapper = mount(GeoInput, {
      propsData: {
        showButtons: false,
        cancelIcon: ['fas', 'times'],
        saveIcon: ['fas', 'check']
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon,
        GeoDropdown
      }
    })

    expect(wrapper.find('.geo-input__container__buttons__button--save').exists()).toBe(false)
    expect(wrapper.find('.geo-input__container__buttons__button--cancel').exists()).toBe(false)
  })

  it('Should emit an event on click save button', function (done) {
    const wrapper = mount(GeoInput, {
      propsData: {
        showButtons: true,
        cancelIcon: ['fas', 'times'],
        saveIcon: ['fas', 'check']
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon,
        GeoDropdown
      }
    })

    wrapper.find('.geo-input__container__buttons__button--save').trigger('click')
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
    const wrapper = mount(GeoInput, {
      propsData: {
        showButtons: true,
        cancelIcon: ['fas', 'times'],
        saveIcon: ['fas', 'check']
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon,
        GeoDropdown
      }
    })

    wrapper.find('.geo-input__container__buttons__button--cancel').trigger('click')
    setTimeout(function () {
      try {
        expect(wrapper.emitted()['cancel']).toBeTruthy()
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('Should show GeoActivityIndicator when it is loading', function (done) {
    const wrapper = mount(GeoInput, {
      propsData: {
        showButtons: true,
        cancelIcon: ['fas', 'times'],
        saveIcon: ['fas', 'check'],
        loading: true
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon,
        GeoActivityIndicator,
        GeoDropdown
      }
    })
    setTimeout(function () {
      try {
        expect(wrapper.contains(GeoActivityIndicator)).toBe(true)
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('Should emit input event when added a value', function (done) {
    const wrapper = mount(GeoInput, {
      propsData: {
        showButtons: false,
        cancelIcon: ['fas', 'times'],
        saveIcon: ['fas', 'check']
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon,
        GeoDropdown
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
})
