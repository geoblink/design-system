import { mount } from '@vue/test-utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import GeoSelectBase from '@/elements/GeoSelect/GeoSelectBase.vue'
import GeoSelectToggleButton from '@/elements/GeoSelect/GeoSelectToggleButton.vue'
import GeoListFooterButton from '@/elements/GeoList/GeoListFooterButton.vue'
import GeoDropdown from '@/elements/GeoDropdown/GeoDropdown.vue'
import GeoBorderedBox from '@/elements/GeoBorderedBox/GeoBorderedBox.vue'
import GeoScrollableContainer from '@/elements/GeoScrollableContainer/GeoScrollableContainer.vue'
import { Y_AXIS_POSITION } from '@/elements/GeoDropdown/GeoDropdown.constants'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

describe('GeoSelectBase', () => {
  it('Should render element toggle button', () => {
    const wrapper = mount(GeoSelectBase, {
      stubs: {
        GeoDropdown,
        GeoBorderedBox,
        GeoScrollableContainer,
        GeoSelectToggleButton,
        GeoListFooterButton,
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        opened: false,
        hasMoreResults: true,
        forceYAxisPosition: Y_AXIS_POSITION.top
      },
      slots: {
        toggleButton:
          `<geo-select-toggle-button
            :is-empty="true"
            :dropdown-icon="['fas', 'chevron-down']">
            Choose an option
          </geo-select-toggle-button>`
      }
    })
    expect(wrapper.find('.geo-select-toggle-button').exists()).toBe(true)
  })

  it('Should not render element popup if not opened', () => {
    const wrapper = mount(GeoSelectBase, {
      stubs: {
        GeoDropdown,
        GeoBorderedBox,
        GeoScrollableContainer,
        GeoSelectToggleButton,
        GeoListFooterButton,
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        opened: false,
        hasMoreResults: true,
        forceYAxisPosition: Y_AXIS_POSITION.top
      },
      slots: {
        toggleButton:
          `<geo-select-toggle-button
            :is-empty="true"
            :dropdown-icon="['fas', 'chevron-down']">
            Choose an option
          </geo-select-toggle-button>`
      }
    })
    expect(wrapper.find('.geo-select__options-container').exists()).toBe(false)
    // expect(wrapper.find('.geo-list-footer-button').exists()).toBe(false)
  })

  it('Should render element popup if opened', () => {
    const wrapper = mount(GeoSelectBase, {
      stubs: {
        GeoDropdown,
        GeoBorderedBox,
        GeoScrollableContainer,
        GeoSelectToggleButton,
        GeoListFooterButton,
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        opened: true,
        hasMoreResults: true,
        forceYAxisPosition: Y_AXIS_POSITION.top
      },
      slots: {
        toggleButton:
          `<geo-select-toggle-button
            :is-empty="true"
            :dropdown-icon="['fas', 'chevron-down']">
            Choose an option
          </geo-select-toggle-button>`
      }
    })
    expect(wrapper.find('.geo-select__options-container').exists()).toBe(true)
    // expect(wrapper.find('.geo-list-footer-button').exists()).toBe(true)
  })

  it.skip('Should emit load more results event', () => {
    const wrapper = mount(GeoSelectBase, {
      stubs: {
        GeoDropdown,
        GeoBorderedBox,
        GeoScrollableContainer,
        GeoSelectToggleButton,
        GeoListFooterButton,
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        opened: true,
        hasMoreResults: true
      },
      slots: {
        toggleButton:
          `<geo-select-toggle-button
            :is-empty="true"
            :dropdown-icon="['fas', 'chevron-down']">
            Choose an option
          </geo-select-toggle-button>`
      }
    })
    wrapper.find('.geo-list-footer-button__button').trigger('click')
    expect(wrapper.emitted()['load-more-results']).toBeTruthy()
    expect(wrapper.emitted()['load-more-results'][0][0].scrollToLastEntry).toBeInstanceOf(Function)
  })

  it('Should emit click outside event', () => {
    const wrapper = mount(GeoSelectBase, {
      stubs: {
        GeoDropdown,
        GeoBorderedBox,
        GeoScrollableContainer,
        GeoSelectToggleButton,
        GeoListFooterButton,
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        opened: true,
        hasMoreResults: true
      },
      slots: {
        toggleButton:
          `<geo-select-toggle-button
            :is-empty="true"
            :dropdown-icon="['fas', 'chevron-down']">
            Choose an option
          </geo-select-toggle-button>`
      }
    })
    wrapper.vm.$refs.dropdown.$emit('click-outside')
    expect(wrapper.emitted()['click-outside']).toBeTruthy()
  })
})
