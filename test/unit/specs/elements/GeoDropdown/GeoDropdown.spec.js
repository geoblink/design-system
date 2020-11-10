import _ from 'lodash'
import { mount } from '@vue/test-utils'
import GeoDropdown from '@/elements/GeoDropdown/GeoDropdown.vue'
import * as sinon from 'sinon'

describe('GeoDropdown', () => {
  const sandbox = sinon.createSandbox()

  afterEach(() => jest.restoreAllMocks())

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
        data.isDemoDropdownOpened = true

        mixin.methods.dismissDemoDropdown.apply(data)

        expect(data).toHaveProperty('isDemoDropdownOpened', false)
      })

      it('Should toggle data property when toggled', function () {
        const mixin = GeoDropdown.constants.geoDropdownMixinFactory('demo')
        const data = mixin.data()

        mixin.methods.toggleDemoDropdown.apply(data)
        expect(data).toHaveProperty('isDemoDropdownOpened', true)

        mixin.methods.toggleDemoDropdown.apply(data)
        expect(data).toHaveProperty('isDemoDropdownOpened', false)

        mixin.methods.toggleDemoDropdown.apply(data)
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
        toggleButton: ['<span class="my-demo-content">Just some unique demo content</span>']
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
        popupContent: ['<span class="my-demo-content">Just some unique demo content</span>']
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
        popupContent: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })

    expect(wrapper.find('body > .geo-dropdown__popup .my-demo-content').exists()).toBe(true)
  })

  it('Should add popup class', function () {
    const wrapper = mount(GeoDropdown, {
      propsData: {
        opened: true,
        popupClass: 'test-class'
      },
      slots: {
        popupContent: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })

    expect(wrapper.find('body > .geo-dropdown__popup.test-class .my-demo-content').exists()).toBe(true)
  })

  it('Should add popup class when is an object', function () {
    const wrapper = mount(GeoDropdown, {
      propsData: {
        opened: true,
        popupClass: { 'test-class-1': true, 'test-class-2': true }
      },
      slots: {
        popupContent: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })

    expect(wrapper.find('body > .geo-dropdown__popup.test-class-1.test-class-2 .my-demo-content').exists()).toBe(true)
  })

  it('Should add popup class when is an array', function () {
    const wrapper = mount(GeoDropdown, {
      propsData: {
        opened: true,
        popupClass: ['test-class-1', 'test-class-2']
      },
      slots: {
        popupContent: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })

    expect(wrapper.find('body > .geo-dropdown__popup.test-class-1.test-class-2 .my-demo-content').exists()).toBe(true)
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

    sandbox.stub(wrapper.vm.$slots, 'toggleButton').value([{
      elm: {
        getBoundingClientRect () {
          return {
            width: 3
          }
        }
      }
    }])

    wrapper.setProps({ fixedWidth: true })

    expect(wrapper.vm.popupStyle.width).toBe('3px')
  })

  it('Should check forceYAxisPosition validator is correct', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    const forceYAxisPosition = GeoDropdown.props.forceYAxisPosition
    expect(forceYAxisPosition.validator(undefined)).toBeTruthy()
    expect(forceYAxisPosition.validator('top')).toBeTruthy()
    expect(forceYAxisPosition.validator('test')).toBeFalsy()
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
  })

  it('Should check preferredXAxisPosition validator is correct', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    const preferredXAxisPosition = GeoDropdown.props.preferredXAxisPosition
    expect(preferredXAxisPosition.validator(undefined)).toBeFalsy()
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
    expect(preferredXAxisPosition.validator('right')).toBeTruthy()
    expect(preferredXAxisPosition.validator('top')).toBeFalsy()
    expect(consoleWarnSpy).toHaveBeenCalledTimes(2)
  })

  it('Should check preferredYAxisPosition validator is correct', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    const preferredYAxisPosition = GeoDropdown.props.preferredYAxisPosition
    expect(preferredYAxisPosition.validator(undefined)).toBeFalsy()
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
    expect(preferredYAxisPosition.validator('bottom')).toBeTruthy()
    expect(preferredYAxisPosition.validator('left')).toBeFalsy()
    expect(consoleWarnSpy).toHaveBeenCalledTimes(2)
  })

  it('Should not emit click-outside event when clicking on the element', () => {
    const wrapper = mount(GeoDropdown, {
      propsData: {
        opened: true
      }
    })

    const allElementsInDocument = document.getElementsByClassName('geo-dropdown__popup')
    const eventMock = {
      target: _.last(allElementsInDocument)
    }
    wrapper.vm.$options.methods.checkClickCoordinatesAndEmitClickOutside.apply(wrapper.vm, [eventMock])
    expect(wrapper.emitted()['click-outside']).toBeFalsy()
  })

  it('Should emit click-outside event when clicking in the background', () => {
    const wrapper = mount(GeoDropdown, {
      propsData: {
        opened: true
      }
    })

    const eventMock = {
      target: wrapper.element
    }
    wrapper.vm.$options.methods.checkClickCoordinatesAndEmitClickOutside.apply(wrapper.vm, [{ $event: eventMock }])
    expect(wrapper.emitted()['click-outside']).toBeTruthy()
  })

  it('Should call checkClickCoordinatesAndEmitClickOutside when clicking outside', () => {
    sandbox.stub(GeoDropdown.directives, 'ClickOutside').value({ bind: jest.fn() })
    sandbox.stub(GeoDropdown.methods, 'checkClickCoordinatesAndEmitClickOutside').returns()

    const checkClickCoordinatesSpy = jest.spyOn(GeoDropdown.methods, 'checkClickCoordinatesAndEmitClickOutside')

    const wrapper = mount(GeoDropdown, {
      propsData: {
        opened: true
      }
    })

    const clickOutsideCalls = GeoDropdown.directives.ClickOutside.bind.mock.calls
    expect(clickOutsideCalls).toHaveProperty('0.0', wrapper.element)
    expect(clickOutsideCalls).toHaveProperty('0.1.value')

    checkClickCoordinatesSpy.mockClear()
    expect(checkClickCoordinatesSpy).not.toBeCalled()
    clickOutsideCalls[0][1].value()
    expect(checkClickCoordinatesSpy).toHaveBeenCalledTimes(1)
  })

  it('Should call repositionPopup when resizing', () => {
    sandbox.stub(GeoDropdown.directives, 'ScrollAnywhere').value({ bind: jest.fn() })

    const repositionPopupSpy = jest.spyOn(GeoDropdown.methods, 'repositionPopup')

    const wrapper = mount(GeoDropdown, {
      propsData: {
        opened: true
      }
    })

    const scrollAnywhereSpy = GeoDropdown.directives.ScrollAnywhere.bind.mock.calls
    expect(scrollAnywhereSpy).toHaveProperty('0.0', wrapper.element)
    expect(scrollAnywhereSpy).toHaveProperty('0.1.value')

    repositionPopupSpy.mockClear()
    expect(repositionPopupSpy).not.toBeCalled()
    scrollAnywhereSpy[0][1].value({ target: null })
    expect(repositionPopupSpy).toHaveBeenCalledTimes(1)
  })

  it('should not emit click outside when clicking on a popup children', () => {
    const clickListener = jest.fn()

    const wrapper = mount(GeoDropdown, {
      propsData: {
        opened: true
      },
      slots: {
        popupContent: `<div>
          <geo-dropdown opened ref="dropdown2">
            <geo-dropdown opened slot="popupContent" ref="dropdown3">
              <ul slot="popupContent">
                <li id="click-me">Click me</li>
                <li>Click me 2</li>
              </ul>
            </geo-dropdown>
          </geo-dropdown>
          <geo-dropdown :opened="false" ref="dropdown4">
            <p slot="toggleButton">Toggle</p>
          </geo-dropdown>
        </div>`
      },
      stubs: {
        'geo-dropdown': GeoDropdown
      },
      listeners: {
        'click-outside': clickListener
      }
    })

    wrapper.find('#click-me').trigger('click')

    expect(clickListener).not.toHaveBeenCalled()
  })
})
