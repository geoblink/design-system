import { mount } from '@vue/test-utils'
import GeoSelectMoreResultsFooterButton from '@/elements/GeoSelect/GeoSelectMoreResultsFooterButton.vue'

describe('GeoSelectMoreResultsFooterButton', () => {
  it('Should render default slot', () => {
    const wrapper = mount(GeoSelectMoreResultsFooterButton, {
      slots: {
        moreResultsContent: [`<span class="more-results-footer-button-content">Load more results demo content</span>`]
      }
    })
    expect(wrapper.find('.more-results-footer-button-content').exists()).toBe(true)
    expect(wrapper.find('.more-results-footer-button-content').element.innerHTML).toBe('Load more results demo content')
  })

  it('Should emit an event when clicking on load more results button', () => {
    const wrapper = mount(GeoSelectMoreResultsFooterButton, {
      slots: {
        moreResultsContent: [`<span class="more-results-footer-button-content">Load more results demo content</span>`]
      }
    })
    wrapper.find('.geo-select-more-results__text-content').trigger('click')
    expect(wrapper.emitted()['load-more-results']).toBeTruthy()
  })
})
