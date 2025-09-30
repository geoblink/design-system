import { mount } from '@vue/test-utils'
import GeoScrollableContainer from '@/elements/GeoScrollableContainer/GeoScrollableContainer.vue'
import GeoListFooterButton from '@/elements/GeoList/GeoListFooterButton.vue'
import GeoTertiaryButton from '@/elements/GeoButton/GeoTertiaryButton.vue'

// Helper function to create wrapper with registered components
function createWrapper (component, options = {}) {
  return mount(component, Object.assign({
    global: {
      components: {
        'geo-scrollable-container': GeoScrollableContainer
      },
      stubs: {
        'geo-list-footer-button': GeoListFooterButton,
        'geo-tertiary-button': GeoTertiaryButton
      }
    }
  }, options))
}

describe('GeoScrollableContainer', () => {
  it('Should render GeoScrollableContainer component', () => {
    const wrapper = createWrapper(GeoScrollableContainer)
    expect(wrapper.find('.geo-scrollable-container').exists()).toBe(true)
  })

  it('Should display default slot', () => {
    const wrapper = createWrapper(GeoScrollableContainer, {
      slots: {
        default: 'test'
      }
    })
    expect(wrapper.find('.geo-scrollable-container__body').text()).toBe('test')
  })

  it('Should display ShowMoreResults button when is set to true', () => {
    const wrapper = createWrapper(GeoScrollableContainer, {
      props: {
        showMoreResultsButton: true
      }
    })

    console.log(wrapper.html())
    expect(wrapper.findComponent(GeoListFooterButton).exists()).toBe(true)
  })

  it('Should not display ShowMoreResults button when is set to false', () => {
    const wrapper = createWrapper(GeoScrollableContainer, {
      props: {
        showMoreResultsButton: false
      }
    })
    expect(wrapper.findComponent(GeoListFooterButton).exists()).toBe(false)
  })

  it('Should customize ShowMoreResults button', () => {
    const wrapper = createWrapper(GeoScrollableContainer, {
      props: {
        showMoreResultsButton: true
      },
      slots: {
        moreResultsTextContent: '<span class="customized-class">Load more results</span>'
      }
    })
    expect(wrapper.find('.customized-class').exists()).toBe(true)
  })

  it('Should emit load-more-results event when clicking on ShowMoreResults button', () => {
    const wrapper = createWrapper(GeoScrollableContainer, {
      props: {
        showMoreResultsButton: true
      },
      global: {
        components: {
          'geo-scrollable-container': GeoScrollableContainer
        },
        stubs: {
          'geo-list-footer-button': true
        }
      }
    })
    wrapper.findComponent({ name: 'geo-list-footer-button' }).vm.$emit('click')
    expect(wrapper.emitted()['load-more-results']).toBeTruthy()
  })

  it('Should scroll after calling callback from load-more-results event ', () => {
    const wrapper = createWrapper(GeoScrollableContainer, {
      props: {
        showMoreResultsButton: true
      },
      global: {
        components: {
          'geo-scrollable-container': GeoScrollableContainer
        },
        stubs: {
          'geo-list-footer-button': true
        }
      }
    })

    const scrollableContainerMock = {
      scrollTop: 2,
      scrollHeight: 3
    }

    // In Vue 3, we need to use a different approach for mocking $refs
    Object.defineProperty(wrapper.vm.$refs, 'scrollableContainer', {
      value: scrollableContainerMock,
      writable: true
    })

    wrapper.findComponent({ name: 'geo-list-footer-button' }).vm.$emit('click')
    const scrollToLastEntry = wrapper.emitted()['load-more-results'][0][0].scrollToLastEntry
    expect(scrollableContainerMock.scrollTop).toBe(2)
    scrollToLastEntry()
    expect(scrollableContainerMock.scrollTop).toBe(5)
  })
})
