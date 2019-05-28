import { mount } from '@vue/test-utils'
import GeoDropdown from '@/elements/GeoDropdown/GeoDropdown.vue'

describe('GeoDropdown', () => {
  describe('Mixins', function () {
    describe('#geoDropdownMixinFactory', function () {
      it('Should export factory', function () {
        expect(GeoDropdown).toHaveProperty('constants')
        expect(GeoDropdown.constants).toHaveProperty('geoDropdownMixinFactory')
        expect(GeoDropdown.constants.geoDropdownMixinFactory).toBeInstanceOf(Function)
      })

      it('Should return data object with boolean property', function () {
        const mixin = GeoDropdown.constants.geoDropdownMixinFactory('demo')

        expect(mixin).toHaveProperty('data')
        expect(mixin.data).toBeInstanceOf(Function)

        const data = mixin.data()

        expect(data).toHaveProperty('isDemoDropdownOpened', false)
      })

      it('Should set data property to false when dismissed', function () {
        const mixin = GeoDropdown.constants.geoDropdownMixinFactory('demo')
        const data = mixin.data()
        data['isDemoDropdownOpened'] = true

        mixin.methods['dismissDemoDropdown'].apply(data)

        expect(data).toHaveProperty('isDemoDropdownOpened', false)
      })

      it('Should toggle data property when toggled', function () {
        const mixin = GeoDropdown.constants.geoDropdownMixinFactory('demo')
        const data = mixin.data()

        mixin.methods['toggleDemoDropdown'].apply(data)
        expect(data).toHaveProperty('isDemoDropdownOpened', true)

        mixin.methods['toggleDemoDropdown'].apply(data)
        expect(data).toHaveProperty('isDemoDropdownOpened', false)

        mixin.methods['toggleDemoDropdown'].apply(data)
        expect(data).toHaveProperty('isDemoDropdownOpened', true)
      })
    })
  })

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
