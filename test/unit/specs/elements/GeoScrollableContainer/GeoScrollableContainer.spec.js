import { createLocalVue, mount } from '@vue/test-utils'
import GeoScrollableContainer from '@/elements/GeoScrollableContainer/GeoScrollableContainer.vue'
import GeoListFooterButton from '@/elements/GeoList/GeoListFooterButton.vue'

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
        'geo-list-footer-button': GeoListFooterButton,
        'geo-tertiary-button': true
      }
    })
    expect(wrapper.find(GeoListFooterButton).exists()).toBe(true)
  })

  it('Should not display ShowMoreResults button when is set to false', () => {
    const wrapper = mount(GeoScrollableContainer, {
      propsData: {
        showMoreResultsButton: false
      },
      stubs: {
        'geo-list-footer-button': GeoListFooterButton,
        'geo-tertiary-button': true
      }
    })
    expect(wrapper.find(GeoListFooterButton).exists()).toBe(false)
  })

  it('Should customize ShowMoreResults button', () => {
    const wrapper = mount(GeoScrollableContainer, {
      propsData: {
        showMoreResultsButton: true
      },
      stubs: {
        'geo-list-footer-button': GeoListFooterButton,
        'geo-tertiary-button': true
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
        'geo-list-footer-button': true
      }
    })
    wrapper.find('geo-list-footer-button-stub').vm.$emit('click')
    expect(wrapper.emitted()['load-more-results']).toBeTruthy()
  })

  it('Should scroll after calling callback from load-more-results event ', () => {
    const wrapper = mount(GeoScrollableContainer, {
      propsData: {
        showMoreResultsButton: true
      },
      stubs: {
        'geo-list-footer-button': true
      }
    })

    const scrollableContainerMock = {
      scrollTop: 2,
      scrollHeight: 3
    }

    wrapper.vm.$refs.scrollableContainer = scrollableContainerMock
    wrapper.find('geo-list-footer-button-stub').vm.$emit('click')
    const scrollToLastEntry = wrapper.emitted()['load-more-results'][0][0].scrollToLastEntry
    expect(scrollableContainerMock.scrollTop).toBe(2)
    scrollToLastEntry()
    expect(scrollableContainerMock.scrollTop).toBe(5)
  })
})
