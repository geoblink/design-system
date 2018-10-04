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
  it('should render input component', function () {
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

    expect(wrapper.find('.geo-input__container-input').exists()).toBe(true)
  })

  it('should emit an event on click', function (done) {
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

    wrapper.find('.geo-input__container-input').trigger('click')
    setTimeout(function () {
      try {
        expect(wrapper.emitted()['click']).toBeTruthy()
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('should emit an event on click save button', function (done) {
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

    wrapper.find('.geo-input__container-buttons__button--save').trigger('click')
    setTimeout(function () {
      try {
        expect(wrapper.emitted()['save']).toBeTruthy()
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('should emit an event on click cancel button', function (done) {
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

    wrapper.find('.geo-input__container-buttons__button--cancel').trigger('click')
    setTimeout(function () {
      try {
        expect(wrapper.emitted()['cancel']).toBeTruthy()
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('should show GeoActivityIndicator when is loading', function (done) {
    const wrapper = mount(GeoInput, {
      propsData: {
        showButtons: false,
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
})
