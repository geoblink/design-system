import { mount } from '@vue/test-utils'
import GeoDropdown from '@/elements/GeoDropdown/GeoDropdown.vue'

describe('GeoDropdown', () => {
  it('Should render toggle button', function () {
    const wrapper = mount(GeoDropdown, {
      propsData: {
        opened: false
      },
      slots: {
        toggleButton: [`<span class="my-demo-content">Just some unique demo content</span>`]
      }
    })

    expect(wrapper.find('.my-demo-content').exists()).toBe(true)
  })

  it('Should not render popup content if closed', function () {
    const wrapper = mount(GeoDropdown, {
      propsData: {
        opened: false
      },
      slots: {
        popupContent: [`<span class="my-demo-content">Just some unique demo content</span>`]
      }
    })

    expect(wrapper.find('body > .geo-dropdown__popup .my-demo-content').exists()).toBe(false)
  })

  it('Should render popup content if opened', function () {
    const wrapper = mount(GeoDropdown, {
      propsData: {
        opened: true
      },
      slots: {
        popupContent: [`<span class="my-demo-content">Just some unique demo content</span>`]
      }
    })

    expect(wrapper.find('body > .geo-dropdown__popup .my-demo-content').exists()).toBe(true)
  })

  it('Should reposition popup content when it is mounted', function () {
    const reattachPopupToDocumentBody = jest.fn()
    mount(GeoDropdown, {
      propsData: {
        opened: false
      },
      methods: {
        reattachPopupToDocumentBody
      }
    })

    expect(reattachPopupToDocumentBody.mock.calls.length).toBe(1)
  })

  it('Should reposition popup content when it is opened', function () {
    const repositionPopup = jest.fn()
    const wrapper = mount(GeoDropdown, {
      propsData: {
        opened: false
      },
      methods: {
        repositionPopup
      }
    })

    const originalCallCount = repositionPopup.mock.calls.length

    wrapper.setProps({ opened: true })

    expect(repositionPopup.mock.calls.length).toBeGreaterThan(originalCallCount)
  })

  it('Should remove popup from body when unmounted', function () {
    const removePopupFromDOM = jest.fn()
    const wrapper = mount(GeoDropdown, {
      propsData: {
        opened: false
      },
      methods: {
        removePopupFromDOM
      }
    })

    expect(removePopupFromDOM.mock.calls.length).toBe(1)

    wrapper.destroy()

    expect(removePopupFromDOM.mock.calls.length).toBe(2)
  })
})
