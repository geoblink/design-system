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
      props: {
        opened: false
      },
      slots: {
        toggleButton: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })

    expect(wrapper.find('.my-demo-content').exists()).toBe(true)
  })

  it('Should not render popup content if closed', function () {
    mount(GeoDropdown, {
      attachTo: document.body,
      props: {
        opened: false
      },
      slots: {
        popupContent: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })

    expect(document.body.querySelector('.geo-dropdown__popup .my-demo-content')).toBeNull()
  })

  it('Should render popup content if opened', function () {
    mount(GeoDropdown, {
      attachTo: document.body,
      props: {
        opened: true
      },
      slots: {
        popupContent: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })
    expect(document.body.querySelector('.geo-dropdown__popup .my-demo-content')).not.toBeNull()
  })

  it('Should add popup class', function () {
    mount(GeoDropdown, {
      attachTo: document.body,
      props: {
        opened: true,
        popupClass: 'test-class'
      },
      slots: {
        popupContent: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })
    expect(document.body.querySelector('.geo-dropdown__popup.test-class .my-demo-content')).not.toBeNull()
  })

  it('Should add popup class when is an object', function () {
    mount(GeoDropdown, {
      attachTo: document.body,
      props: {
        opened: true,
        popupClass: { 'test-class-1': true, 'test-class-2': true }
      },
      slots: {
        popupContent: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })
    expect(document.body.querySelector('.geo-dropdown__popup.test-class-1.test-class-2 .my-demo-content')).not.toBeNull()
  })

  it('Should add popup class when is an array', function () {
    mount(GeoDropdown, {
      attachTo: document.body,
      props: {
        opened: true,
        popupClass: ['test-class-1', 'test-class-2']
      },
      slots: {
        popupContent: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })
    expect(document.body.querySelector('.geo-dropdown__popup.test-class-1.test-class-2 .my-demo-content')).not.toBeNull()
  })

  it('Should be attached to body container on mount', function () {
    mount(GeoDropdown, {
      attachTo: document.body,
      props: {
        opened: true
      },
      slots: {
        popupContent: ['<span class="popup-content">content</span>']
      }
    })
    expect(document.body.querySelector('.geo-dropdown__popup .popup-content')).not.toBeNull()
  })

  it('Should reposition popup content when it is opened', async function () {
    const repositionSpy = jest.spyOn(GeoDropdown.methods, 'repositionPopup')
    const wrapper = mount(GeoDropdown, {
      props: {
        opened: false
      }
    })

    const originalCallCount = repositionSpy.mock.calls.length

    await wrapper.setProps({ opened: true })

    expect(repositionSpy.mock.calls.length).toBeGreaterThan(originalCallCount)
  })

  it('Should remove popup from body when unmounted', function () {
    const wrapper = mount(GeoDropdown, {
      attachTo: document.body,
      props: {
        opened: true
      },
      slots: {
        popupContent: ['<span class="popup-content">content</span>']
      }
    })
    expect(document.body.querySelector('.geo-dropdown__popup .popup-content')).not.toBeNull()
    wrapper.unmount()
    expect(document.body.querySelector('.geo-dropdown__popup .probe')).toBeNull()
  })

  it('Should render a GeoDropdown component', () => {
    const wrapper = mount(GeoDropdown, {
      props: {
        opened: false
      }
    })
    expect(wrapper.find('.geo-dropdown').exists()).toBe(true)
  })

  it('Should render a fixed width when specified', async () => {
    const wrapper = mount(GeoDropdown, {
      attachTo: document.body,
      props: {
        opened: true
      },
      slots: {
        toggleButton: '<div id="slot-btn">button</div>'
      }
    })
    const slotEl = document.getElementById('slot-btn')
    slotEl.getBoundingClientRect = () => ({ width: 3, height: 0, top: 0, left: 0, right: 0, bottom: 0, x: 0, y: 0, toJSON: () => {} })
    await wrapper.setProps({ fixedWidth: true })
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
      props: {
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
      props: {
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
    const wrapper = mount(GeoDropdown, {
      attachTo: document.body,
      props: {
        opened: true
      }
    })
    const outsideEl = document.createElement('div')
    wrapper.vm.checkClickCoordinatesAndEmitClickOutside({ target: outsideEl })
    expect(wrapper.emitted()['click-outside']).toBeTruthy()
  })

  it('Should call repositionPopup when resizing', () => {
    const repositionPopupSpy = jest.spyOn(GeoDropdown.methods, 'repositionPopup')
    const wrapper = mount(GeoDropdown, {
      attachTo: document.body,
      props: {
        opened: true
      }
    })
    repositionPopupSpy.mockClear()
    expect(repositionPopupSpy).not.toBeCalled()
    // directly invoke the directive handler on the component to simulate scroll anywhere
    wrapper.vm.checkScrollEventAndRepositionIfNeeded({ target: null })
    expect(repositionPopupSpy).toHaveBeenCalled()
  })

  it('should not emit click outside when clicking on a popup children', () => {
    const wrapper = mount(GeoDropdown, {
      attachTo: document.body,
      global: {
        components: {
          'geo-dropdown': GeoDropdown
        }
      },
      props: {
        opened: true
      },
      slots: {
        popupContent: `<div>
          <geo-dropdown opened ref="dropdown2">
            <template #toggleButton>
              <p>Toggle</p>
            </template>
            <template #popupContent>
              <geo-dropdown opened ref="dropdown3">
                <template #popupContent>
                  <ul>
                    <li id="click-me">Click me</li>
                    <li>Click me 2</li>
                  </ul>
                </template>
              </geo-dropdown>
            </template>
          </geo-dropdown>
          <geo-dropdown :opened="false" ref="dropdown4">
            <template #toggleButton>
              <p>Toggle</p>
            </template>
          </geo-dropdown>
        </div>`
      }
    })
    const clickTarget = document.body.querySelector('#click-me')
    clickTarget && clickTarget.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(wrapper.emitted()['click-outside']).toBeFalsy()
  })
})
