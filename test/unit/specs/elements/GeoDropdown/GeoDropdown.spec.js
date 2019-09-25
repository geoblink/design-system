// @ts-nocheck
import { mount } from '@vue/test-utils'
import GeoDropdown from '@/elements/GeoDropdown/GeoDropdown.vue'
import * as sinon from 'sinon'

describe('GeoDropdown', () => {
  const sandbox = sinon.createSandbox()

  beforeEach(() => {
    sandbox.restore()
  })

  afterEach(() => {
    sandbox.restore()
  })

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

  it('Should render a GeoDropdown component', () => {
    const wrapper = mount(GeoDropdown, {
      propsData: {
        opened: false
      }
    })
    expect(wrapper.find('.geo-dropdown').exists()).toBe(true)
  })

  it('Should render a fixed width when specified', () => {
    const wrapper = mount(GeoDropdown, {
      propsData: {
        opened: true
      },
      slots: {
        toggleButton: 'button'
      }
    })

    sandbox.stub(wrapper.vm.$slots, 'toggleButton').value(
      [{
        elm: {
          getBoundingClientRect () {
            return {
              width: 3
            }
          }
        }
      }])

    wrapper.setProps({ fixedWidth: true })

    expect(wrapper.vm.$options.computed.popupStyle.call(wrapper.vm).width).toBe('3px')
  })

  it('Should check forceYAxisPosition validator is correct', () => {
    const forceYAxisPosition = GeoDropdown.props.forceYAxisPosition
    expect(forceYAxisPosition.validator(undefined)).toBeTruthy()
    expect(forceYAxisPosition.validator('top')).toBeTruthy()
    expect(forceYAxisPosition.validator('test')).toBeFalsy()
  })

  it('Should render default values for preferredXAxisPosition and preferredYAxisPosition', () => {
    const wrapper = mount(GeoDropdown, {
      propsData: {
        opened: true
      }
    })
    expect(wrapper.vm.$props.preferredYAxisPosition).toBe('bottom')
    expect(wrapper.vm.$props.preferredXAxisPosition).toBe('left')
  })

  it('Should check preferredXAxisPosition validator is correct', () => {
    const preferredXAxisPosition = GeoDropdown.props.preferredXAxisPosition
    expect(preferredXAxisPosition.validator(undefined)).toBeFalsy()
    expect(preferredXAxisPosition.validator('right')).toBeTruthy()
    expect(preferredXAxisPosition.validator('top')).toBeFalsy()
  })

  it('Should render correct preferredYAxisPosition when provided', () => {
    const wrapper = mount(GeoDropdown, {
      propsData: {
        opened: true,
        preferredYAxisPosition: GeoDropdown.constants.Y_AXIS_POSITION.top
      }
    })
    expect(wrapper.vm.$props.preferredYAxisPosition).toBe('top')
  })

  it('Should check preferredYAxisPosition validator is correct', () => {
    const preferredYAxisPosition = GeoDropdown.props.preferredYAxisPosition
    expect(preferredYAxisPosition.validator(undefined)).toBeFalsy()
    expect(preferredYAxisPosition.validator('bottom')).toBeTruthy()
    expect(preferredYAxisPosition.validator('left')).toBeFalsy()
  })

  it('Should render correct preferredXAxisPosition when provided', () => {
    const wrapper = mount(GeoDropdown, {
      propsData: {
        opened: true,
        preferredXAxisPosition: GeoDropdown.constants.X_AXIS_POSITION.right
      }
    })
    expect(wrapper.vm.$props.preferredXAxisPosition).toBe('right')
  })

  it('Should emit click-outside event when clicking in the background', () => {
    const wrapper = mount(GeoDropdown, {
      propsData: {
        opened: true
      }
    })

    const eventMock = {
      target: null
    }
    wrapper.vm.$options.methods.checkClickCoordinatesAndEmitClickOutside.apply(wrapper.vm, [{ $event: eventMock }])
    expect(wrapper.emitted()['click-outside']).toBeTruthy()
  })

  it('Should call repositionPopup when resizing', () => {
    sandbox.stub(GeoDropdown.directives, 'ScrollAnywhere').value({ bind: jest.fn() })

    const repositionPopupSpy = jest.spyOn(GeoDropdown.methods, 'repositionPopup')

    const wrapper = mount(GeoDropdown, {
      propsData: {
        opened: true
      }
    })

    const firstCallParameters = GeoDropdown.directives.ScrollAnywhere.bind.mock.calls
    expect(firstCallParameters).toHaveProperty('0.0', wrapper.element)
    expect(firstCallParameters).toHaveProperty('0.1.value')

    repositionPopupSpy.mockClear()
    expect(repositionPopupSpy).not.toBeCalled()
    firstCallParameters[0][1].value()
    expect(repositionPopupSpy).toHaveBeenCalledTimes(1)
  })

  it('Should apply a CSS suffix when the modifier is provided', () => {
    const wrapper = mount(GeoDropdown, {
      propsData: {
        opened: false,
        cssModifier: 'test'
      }
    })
    expect(wrapper.find('.geo-dropdown--test').exists()).toBe(true)
  })
})
