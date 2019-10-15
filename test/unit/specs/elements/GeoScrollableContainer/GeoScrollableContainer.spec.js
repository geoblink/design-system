import { createLocalVue, mount } from '@vue/test-utils'
import GeoScrollableContainer from '@/elements/GeoScrollableContainer/GeoScrollableContainer.vue'
import GeoTertiaryButton from '@/elements/GeoButton/GeoTertiaryButton.vue'
import GeoButton from '@/elements/GeoButton/GeoButton.vue'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-scrollable-container', GeoScrollableContainer)

describe('GeoScrollableContainer', () => {
  it('Should render GeoScrollableContainer component', () => {
    const wrapper = mount(GeoScrollableContainer)
    expect(wrapper.find('.geo-scrollable-container').exists()).toBe(true)
  })

  it('Should display default slot', () => {
    const wrapper = mount(GeoScrollableContainer, {
      slots: {
        default: 'test'
      }
    })
    expect(wrapper.find('.geo-scrollable-container__body').text()).toBe('test')
  })

  it('Should display ShowMoreResults button when is set to true', () => {
    const wrapper = mount(GeoScrollableContainer, {
      propsData: {
        showMoreResultsButton: true
      },
      stubs: {
        'geo-tertiary-button': GeoTertiaryButton,
        GeoButton
      }
    })
    expect(wrapper.find(GeoTertiaryButton).exists()).toBe(true)
  })

  it('Should not display ShowMoreResults button when is set to false', () => {
    const wrapper = mount(GeoScrollableContainer, {
      propsData: {
        showMoreResultsButton: false
      },
      stubs: {
        'geo-tertiary-button': GeoTertiaryButton,
        GeoButton
      }
    })
    expect(wrapper.find(GeoTertiaryButton).exists()).toBe(false)
  })

  it('Should customize ShowMoreResults button', () => {
    const wrapper = mount(GeoScrollableContainer, {
      propsData: {
        showMoreResultsButton: true
      },
      stubs: {
        'geo-tertiary-button': GeoTertiaryButton,
        GeoButton
      },
      slots: {
        moreResultsTextContent: '<span class="customized-class">Load more results</span>'
      }
    })
    expect(wrapper.find('.customized-class').exists()).toBe(true)
  })

  it('Should emit load-more-results event when clicking on ShowMoreResults button', () => {
    const wrapper = mount(GeoScrollableContainer, {
      propsData: {
        showMoreResultsButton: true
      },
      stubs: {
        'geo-tertiary-button': true,
        GeoButton
      }
    })
    wrapper.find('geo-tertiary-button-stub').vm.$emit('click')
    expect(wrapper.emitted()['load-more-results']).toBeTruthy()
  })

  it('Should scroll after calling callback from load-more-results event ', () => {
    const wrapper = mount(GeoScrollableContainer, {
      propsData: {
        showMoreResultsButton: true
      },
      stubs: {
        'geo-tertiary-button': true,
        GeoButton
      }
    })

    const scrollableContainerMock = {
      scrollTop: 2,
      scrollHeight: 3
    }

    wrapper.vm.$refs.scrollableContainer = scrollableContainerMock
    wrapper.find('geo-tertiary-button-stub').vm.$emit('click')
    const scrollToLastEntry = wrapper.emitted()['load-more-results'][0][0].scrollToLastEntry
    expect(scrollableContainerMock.scrollTop).toBe(2)
    scrollToLastEntry()
    expect(scrollableContainerMock.scrollTop).toBe(5)
  })

  it('Should apply a CSS suffix when the modifier is provided', () => {
    const wrapper = mount(GeoScrollableContainer, {
      propsData: {
        cssModifier: 'test'
      }
    })
    expect(wrapper.find('.geo-scrollable-container--test').exists()).toBe(true)
  })
})
