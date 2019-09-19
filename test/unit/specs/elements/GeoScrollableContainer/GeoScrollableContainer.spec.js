import { createLocalVue, mount } from '@vue/test-utils'
import GeoScrollableContainer from '@/elements/GeoScrollableContainer/GeoScrollableContainer.vue'
import GeoListFooterButton from '@/elements/GeoList/GeoListFooterButton.vue'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-scrollable-container', GeoScrollableContainer)

describe('GeoScrollableContainer', () => {
  it('Should render GeoScrollableContainer component', function () {
    const wrapper = mount(GeoScrollableContainer)
    expect(wrapper.find('.geo-scrollable-container').exists()).toBe(true)
  })

  it('Should display default slot', function () {
    const wrapper = mount(GeoScrollableContainer, {
      slots: {
        default: 'test'
      }
    })
    expect(wrapper.find('.geo-scrollable-container__body').text()).toBe('test')
  })

  it('Should display ShowMoreResults button', function () {
    const wrapper = mount(GeoScrollableContainer, {
      propsData: {
        showMoreResultsButton: true
      },
      stubs: {
        'geo-list-footer-button': GeoListFooterButton
      }
    })
    expect(wrapper.find('.geo-list-footer-button').exists()).toBe(true)
  })

  it('Should customize ShowMoreResults button', function () {
    const wrapper = mount(GeoScrollableContainer, {
      propsData: {
        showMoreResultsButton: true
      },
      stubs: {
        'geo-list-footer-button': GeoListFooterButton
      },
      slots: {
        moreResultsTextContent: '<span class="customized-class">Load more results</span>'
      }
    })
    expect(wrapper.find('.customized-class').exists()).toBe(true)
  })

  it('Should emit load-more-results event when clicking on ShowMoreResults button', function () {
    const wrapper = mount(GeoScrollableContainer, {
      propsData: {
        showMoreResultsButton: true
      },
      stubs: {
        'geo-list-footer-button': GeoListFooterButton
      }
    })
    wrapper.find(GeoListFooterButton).find('.geo-list-footer-button__button').trigger('click')
    expect(wrapper.emitted()['load-more-results']).toBeTruthy()
  })

  it('Should apply a CSS suffix when the modifier is provided', function () {
    const wrapper = mount(GeoScrollableContainer, {
      propsData: {
        cssModifier: 'test'
      }
    })
    expect(wrapper.find('.geo-scrollable-container--test').exists()).toBe(true)
  })
})
