import { mount } from '@vue/test-utils'
import GeoListFooterButton from '@/elements/GeoList/GeoListFooterButton.vue'

describe('GeoListFooterButton', () => {
  it('Should render GeoListFooterButton component', () => {
    const wrapper = mount(GeoListFooterButton, {
      stubs: {
        'geo-tertiary-button': true
      }
    })
    expect(wrapper.find('.geo-list-footer-button').exists()).toBe(true)
  })

  it('Should render default slot', () => {
    const wrapper = mount(GeoListFooterButton, {
      slots: {
        default: [`<span class="more-results-footer-button-content">Load more results demo content</span>`]
      },
      stubs: {
        'geo-tertiary-button': true
      }
    })
    expect(wrapper.find('.more-results-footer-button-content').exists()).toBe(true)
    expect(wrapper.find('.more-results-footer-button-content').element.innerHTML).toBe('Load more results demo content')
  })

  it('Should emit an event when clicking on load more results button', () => {
    const wrapper = mount(GeoListFooterButton, {
      slots: {
        default: [`<span class="more-results-footer-button-content">Load more results demo content</span>`]
      },
      stubs: {
        'geo-tertiary-button': true
      }
    })
    wrapper.find('.geo-list-footer-button__button').trigger('click')
    expect(wrapper.emitted()['click']).toBeTruthy()
  })

  it('Should render a tertiary button inside it', () => {
    const wrapper = mount(GeoListFooterButton, {
      stubs: {
        'geo-tertiary-button': true
      }
    })
    expect(wrapper.find('geo-tertiary-button-stub').exists()).toBe(true)
  })
})
