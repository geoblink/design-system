import _ from 'lodash'
import * as sinon from 'sinon'
import { mount, createWrapper } from '@vue/test-utils'
import GeoTooltip from '@/elements/GeoTooltip/GeoTooltip.vue'

const tooltipInnerText = 'This is the tooltip content'
const tooltipInnerHTML = `<p class="test-tooltip-content">${tooltipInnerText}</p>`
const tooltipWrapperInnerText = `This text has a tooltip attached`

// These utils require faking timers
jest.useFakeTimers()

export function stubLodashDebounceFactory () {
  const sandbox = sinon.createSandbox()

  return { setup, teardown }

  function setup () {
    sandbox.stub(_, 'debounce').returnsArg(0)
  }

  function teardown () {
    sandbox.restore()
  }
}

describe('GeoTooltip', function () {
  afterEach(function () {
    jest.restoreAllMocks()
  })

  describe('Lifecycle', function () {
    it('should add tooltip container element', function () {
      const wrapper = mount(getComponentWithTooltip())
      const bodyWrapper = createWrapper(document.body)

      expect(bodyWrapper.find('.geo-tooltip').exists()).toBe(true)

      wrapper.destroy()
    })

    it('should add only one tooltip container element', function () {
      const firstWrapper = mount(getComponentWithTooltip())
      const secondWrapper = mount(getComponentWithTooltip())
      const bodyWrapper = createWrapper(document.body)

      expect(bodyWrapper.findAll('.geo-tooltip')).toHaveLength(1)

      firstWrapper.destroy()
      secondWrapper.destroy()
    })

    it('should not render tooltip content initially', function () {
      const wrapper = mount(getComponentWithTooltip())

      expect(wrapper.find('.test-tooltip-content').exists()).toBe(false)

      wrapper.destroy()
    })

    it('should destroy tooltip container when tooltip is removed', async function () {
      const wrapper = mount(getComponentWithTooltip())
      const bodyWrapper = createWrapper(document.body)

      expect(bodyWrapper.find('.geo-tooltip').exists()).toBe(true)

      wrapper.setProps({
        isTooltipEnabled: false
      })

      expect(bodyWrapper.find('.geo-tooltip').exists()).toBe(false)
    })

    it('should destroy tooltip container only when last element with tooltip is removed', async function () {
      const firstWrapper = mount(getComponentWithTooltip())
      const secondWrapper = mount(getComponentWithTooltip())
      const bodyWrapper = createWrapper(document.body)

      expect(bodyWrapper.find('.geo-tooltip').exists()).toBe(true)

      firstWrapper.setProps({
        isTooltipEnabled: false
      })

      expect(bodyWrapper.find('.geo-tooltip').exists()).toBe(true)

      secondWrapper.setProps({
        isTooltipEnabled: false
      })

      expect(bodyWrapper.find('.geo-tooltip').exists()).toBe(false)
    })
  })

  describe('Event handling', function () {
    const stubLodashDebounce = stubLodashDebounceFactory()
    beforeEach(function () {
      stubLodashDebounce.setup()
    })

    afterEach(function () {
      stubLodashDebounce.teardown()
    })

    it('Should display tooltip when cursor is over the parent', async function () {
      const wrapper = mount(getComponentWithTooltip())
      const bodyWrapper = createWrapper(document.body)

      expect(bodyWrapper.find('.test-tooltip-content').exists()).toBe(false)

      wrapper.find('.test-tooltip-wrapper').trigger('mouseover')

      await wrapper.vm.$nextTick()

      expect(bodyWrapper.find('.test-tooltip-content').exists()).toBe(true)

      wrapper.destroy()
    })

    it('Should hide tooltip when parent is removed', async function () {
      const wrapper = mount(getComponentWithTooltip())
      const bodyWrapper = createWrapper(document.body)

      wrapper.find('.test-tooltip-wrapper').trigger('mouseover')

      wrapper.destroy()

      expect(bodyWrapper.find('.test-tooltip-content').exists()).toBe(false)
    })

    it('Should hide tooltip when cursor is moved out of the parent', async function () {
      const wrapper = mount(getComponentWithTooltip(), {
        propsData: {
          delay: 0
        }
      })
      const bodyWrapper = createWrapper(document.body)
      wrapper.find('.test-tooltip-wrapper').trigger('mouseover')
      await wrapper.vm.$nextTick()

      expect(bodyWrapper.find('.test-tooltip-content').exists()).toBe(true)

      wrapper.find('.test-tooltip-wrapper').trigger('mouseleave')

      await wrapper.vm.$nextTick()

      expect(bodyWrapper.find('.test-tooltip-content').exists()).toBe(false)

      wrapper.destroy()
    })

    it('Should maintain tooltip when cursor is hovering tooltip', async function () {
      const wrapper = mount(getComponentWithTooltip())
      const bodyWrapper = createWrapper(document.body)

      expect(bodyWrapper.find('.test-tooltip-content').exists()).toBe(false)

      wrapper.find('.test-tooltip-wrapper').trigger('mouseover')
      await wrapper.vm.$nextTick()

      bodyWrapper.find('.geo-tooltip__content').trigger('mouseover')
      await wrapper.vm.$nextTick()

      expect(bodyWrapper.find('.test-tooltip-content').exists()).toBe(true)

      wrapper.destroy()
    })

    it('Should remove tooltip after cursor stops hovering tooltip', async function () {
      const wrapper = mount(getComponentWithTooltip())
      const bodyWrapper = createWrapper(document.body)

      expect(bodyWrapper.find('.test-tooltip-content').exists()).toBe(false)

      wrapper.find('.test-tooltip-wrapper').trigger('mouseover')
      await wrapper.vm.$nextTick()

      bodyWrapper.find('.geo-tooltip__content').trigger('mouseover')
      await wrapper.vm.$nextTick()

      wrapper.find('.test-tooltip-wrapper').trigger('mouseleave')
      await wrapper.vm.$nextTick()

      bodyWrapper.find('.geo-tooltip__content').trigger('mouseleave')
      await wrapper.vm.$nextTick()

      expect(bodyWrapper.find('.test-tooltip-content').exists()).toBe(false)

      wrapper.destroy()
    })

    it('Should reposition tooltip when displayed', async function () {
      const spy = jest.spyOn(GeoTooltip.methods, 'repositionTooltip')
      const wrapper = mount(getComponentWithTooltip())
      const bodyWrapper = createWrapper(document.body)

      expect(bodyWrapper.find('.test-tooltip-content').exists()).toBe(false)

      wrapper.find('.test-tooltip-wrapper').trigger('mouseover')

      await wrapper.vm.$nextTick()

      expect(spy).toHaveBeenCalled()

      wrapper.destroy()
    })

    it('Should complain if tooltip does not fit in screen', async function () {
      const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })
      jest.spyOn(document.documentElement, 'scrollLeft', 'get').mockImplementation(() => 50)
      jest.spyOn(document.documentElement, 'scrollTop', 'get').mockImplementation(() => 20)
      jest.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(() => -1)
      jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(() => -1)

      const wrapper = mount(getComponentWithTooltip())

      wrapper.find('.test-tooltip-wrapper').trigger('mouseover')

      await wrapper.vm.$nextTick()

      expect(consoleWarnSpy).toHaveBeenCalled()

      wrapper.destroy()
    })
  })

  describe('Manual visibility', function () {
    it('Should display tooltip when it is manually visible', async function () {
      const wrapper = mount(getComponentWithTooltip(), {
        propsData: {
          tooltipProps: {
            visible: true
          }
        }
      })
      const bodyWrapper = createWrapper(document.body)

      expect(bodyWrapper.find('.test-tooltip-content').exists()).toBe(true)

      wrapper.destroy()

      expect(bodyWrapper.find('.test-tooltip-content').exists()).toBe(false)
    })

    it('Should not display tooltip when it is manually hidden', async function () {
      const wrapper = mount(getComponentWithTooltip(), {
        propsData: {
          tooltipProps: {
            visible: false
          }
        }
      })
      const bodyWrapper = createWrapper(document.body)

      expect(bodyWrapper.find('.test-tooltip-content').exists()).toBe(false)

      wrapper.find('.test-tooltip-wrapper').trigger('mouseover')

      await wrapper.vm.$nextTick()

      expect(bodyWrapper.find('.test-tooltip-content').exists()).toBe(false)

      wrapper.destroy()
    })
  })

  describe('Properties', function () {
    describe('Position', function () {
      it('Should complain if position is invalid', function () {
        const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })
        const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => { })
        const wrapper = mount(getComponentWithTooltip(), {
          propsData: {
            tooltipProps: {
              position: 'invalid position'
            }
          }
        })

        expect(consoleErrorSpy).toHaveBeenCalled()
        expect(consoleWarnSpy).toHaveBeenCalled()

        wrapper.destroy()
      })

      for (const positionKey of Object.keys(GeoTooltip.constants.POSITIONS)) {
        const position = GeoTooltip.constants.POSITIONS[positionKey]

        it(`Should not complain if position is «${position}»`, function () {
          const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })
          const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => { })
          const wrapper = mount(getComponentWithTooltip(), {
            propsData: {
              tooltipProps: {
                position
              }
            }
          })

          expect(consoleErrorSpy).not.toHaveBeenCalled()
          expect(consoleWarnSpy).not.toHaveBeenCalled()

          wrapper.destroy()
        })
      }
    })

    describe('Alignment', function () {
      it('Should complain if alignment is invalid', function () {
        const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })
        const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => { })
        const wrapper = mount(getComponentWithTooltip(), {
          propsData: {
            tooltipProps: {
              alignment: 'invalid alignment'
            }
          }
        })

        expect(consoleErrorSpy).toHaveBeenCalled()
        expect(consoleWarnSpy).toHaveBeenCalled()

        wrapper.destroy()
      })

      for (const alignmentKey of Object.keys(GeoTooltip.constants.ALIGNMENTS)) {
        const alignment = GeoTooltip.constants.ALIGNMENTS[alignmentKey]

        it(`Should not complain if alignment is «${alignment}»`, function () {
          const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })
          const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => { })
          const wrapper = mount(getComponentWithTooltip(), {
            propsData: {
              tooltipProps: {
                alignment
              }
            }
          })

          expect(consoleErrorSpy).not.toHaveBeenCalled()
          expect(consoleWarnSpy).not.toHaveBeenCalled()

          wrapper.destroy()
        })
      }
    })

    describe('Delay', function () {
      it('Should complain if delay is a negative number', function () {
        const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => { })
        const wrapper = mount(getComponentWithTooltip(), {
          propsData: {
            tooltipProps: {
              delay: -10
            }
          }
        })

        expect(consoleErrorSpy).toHaveBeenCalled()

        wrapper.destroy()
      })
    })
  })
})

function getComponentWithTooltip () {
  return {
    name: 'GeoTooltipDemoWrapper',
    template: `
      <p class="test-tooltip-wrapper">
        <geo-tooltip v-if="isTooltipEnabled" v-bind="tooltipProps">
          ${tooltipInnerHTML}
        </geo-tooltip>

        {{ isTooltipEnabled }}
        {{ tooltipProps }}

        ${tooltipWrapperInnerText}
      </p>
    `,
    components: {
      GeoTooltip
    },
    props: {
      isTooltipEnabled: {
        type: Boolean,
        default: true
      },
      tooltipProps: {
        type: Object,
        default () {
          return {}
        }
      }
    }
  }
}
