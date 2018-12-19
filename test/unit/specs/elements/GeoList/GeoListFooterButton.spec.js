import { mount } from '@vue/test-utils'
import GeoListFooterButton from '@/elements/GeoList/GeoListFooterButton.vue'

describe('GeoListFooterButton', () => {
  it('Should render default slot', () => {
    const wrapper = mount(GeoListFooterButton, {
      slots: {
        default: [`<span class="more-results-footer-button-content">Load more results demo content</span>`]
      }
    })
    expect(wrapper.find('.more-results-footer-button-content').exists()).toBe(true)
    expect(wrapper.find('.more-results-footer-button-content').element.innerHTML).toBe('Load more results demo content')
  })

  it('Should emit an event when clicking on load more results button', () => {
    const wrapper = mount(GeoListFooterButton, {
      slots: {
        default: [`<span class="more-results-footer-button-content">Load more results demo content</span>`]
      }
    })
    wrapper.find('.geo-list-footer-button__button').trigger('click')
    expect(wrapper.emitted()['click']).toBeTruthy()
  })
})
