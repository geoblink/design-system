import _ from 'lodash'
import * as sinon from 'sinon'
import { mount, createWrapper } from '@vue/test-utils'
import GeoTooltip from '@/elements/GeoTooltip/GeoTooltip.vue'

const tooltipInnerText = 'This is the tooltip content'
const tooltipInnerHTML = `<p class="test-tooltip-content">${tooltipInnerText}</p>`
const tooltipWrapperInnerText = 'This text has a tooltip attached'

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
    it('Should add tooltip container element', function () {
      const wrapper = mount(getComponentWithTooltip(), {
        attachTo: document.body
      })

      expect(document.body.querySelector('.geo-tooltip')).toBeDefined()

      wrapper.unmount()
    })

    it('Should add static tooltip container element', function () {
      const wrapper = mount(getComponentWithTooltip(), {
        attachTo: document.body,
        props: {
          tooltipProps: {
            static: true
          }
        }
      })

      expect(document.body.querySelector('.geo-tooltip')).toBeDefined()

      wrapper.unmount()
    })

    it('Should add only one tooltip container element', function () {
      const firstWrapper = mount(getComponentWithTooltip(), {
        attachTo: document.body
      })
      const secondWrapper = mount(getComponentWithTooltip(), {
        attachTo: document.body
      })

      expect(document.body.querySelectorAll('.geo-tooltip').length).toBe(1)

      firstWrapper.unmount()
      secondWrapper.unmount()
    })

    it('Should add several static tooltip container element', function () {
      const firstWrapper = mount(getComponentWithTooltip(), {
        attachTo: document.body,
        props: {
          tooltipProps: {
            static: true
          }
        }
      })
      const secondWrapper = mount(getComponentWithTooltip(), {
        attachTo: document.body,
        props: {
          tooltipProps: {
            static: true
          }
        }
      })

      expect(document.body.querySelectorAll('.geo-tooltip-static').length).toBe(2)

      firstWrapper.unmount()
      secondWrapper.unmount()
    })

    it('Should not render tooltip content initially', function () {
      const wrapper = mount(getComponentWithTooltip(), {
        attachTo: document.body
      })

      expect(wrapper.find('.test-tooltip-content').exists()).toBe(false)

      wrapper.unmount()
    })

    it('Should destroy tooltip container when tooltip is removed', async function () {
      const wrapper = mount(getComponentWithTooltip(), {
        attachTo: document.body
      })

      expect(document.body.querySelector('.geo-tooltip')).toBeDefined()

      await wrapper.setProps({
        isTooltipEnabled: false
      })

      expect(document.body.querySelector('.geo-tooltip')).toBeNull()
      wrapper.unmount()
    })

    it('Should destroy tooltip container only when last element with tooltip is removed', async function () {
      const firstWrapper = mount(getComponentWithTooltip(), {
        attachTo: document.body
      })
      const secondWrapper = mount(getComponentWithTooltip(), {
        attachTo: document.body
      })

      expect(document.body.querySelector('.geo-tooltip')).toBeDefined()

      await firstWrapper.setProps({
        isTooltipEnabled: false
      })

      expect(document.body.querySelector('.geo-tooltip')).toBeDefined()

      await secondWrapper.setProps({
        isTooltipEnabled: false
      })

      expect(document.body.querySelector('.geo-tooltip')).toBeNull()

      firstWrapper.unmount()
      secondWrapper.unmount()
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
      const wrapper = mount(getComponentWithTooltip(), {
        attachTo: document.body
      })

      expect(document.body.querySelector('.test-tooltip-content')).toBeNull()

      wrapper.find('.test-tooltip-wrapper').trigger('mouseover')

      await wrapper.vm.$nextTick()

      expect(document.body.querySelector('.test-tooltip-content')).toBeDefined()

      wrapper.unmount()
    })

    it('Should hide tooltip when parent is removed', async function () {
      const wrapper = mount(getComponentWithTooltip(), {
        attachTo: document.body
      })

      wrapper.find('.test-tooltip-wrapper').trigger('mouseover')

      wrapper.unmount()

      expect(document.body.querySelector('.test-tooltip-content')).toBeNull()
    })

    it('Should hide tooltip when cursor is moved out of the parent', async function () {
      const wrapper = mount(getComponentWithTooltip(), {
        attachTo: document.body,
        props: {
          delay: 0
        }
      })
      await wrapper.find('.test-tooltip-wrapper').trigger('mouseover')
      await wrapper.vm.$nextTick()

      expect(document.body.querySelector('.test-tooltip-content')).toBeDefined()

      await wrapper.find('.test-tooltip-wrapper').trigger('mouseleave')

      await wrapper.vm.$nextTick()

      expect(document.body.querySelector('.test-tooltip-content')).toBeNull()

      wrapper.unmount()
    })

    it('Should maintain tooltip when cursor is hovering tooltip', async function () {
      const wrapper = mount(getComponentWithTooltip(), {
        attachTo: document.body
      })

      expect(document.body.querySelector('.test-tooltip-content')).toBeNull()

      wrapper.find('.test-tooltip-wrapper').trigger('mouseover')
      await wrapper.vm.$nextTick()

      await document.body.querySelector('.geo-tooltip__content').dispatchEvent(new MouseEvent('mouseover'))
      await wrapper.vm.$nextTick()

      expect(document.body.querySelector('.test-tooltip-content')).toBeDefined()

      wrapper.unmount()
    })

    it('Should remove tooltip after cursor stops hovering tooltip', async function () {
      const wrapper = mount(getComponentWithTooltip(), {
        attachTo: document.body
      })

      expect(document.body.querySelector('.test-tooltip-content')).toBeNull()

      await wrapper.find('.test-tooltip-wrapper').trigger('mouseover')
      await wrapper.vm.$nextTick()

      await document.body.querySelector('.geo-tooltip__content').dispatchEvent(new MouseEvent('mouseover'))
      await wrapper.vm.$nextTick()

      await wrapper.find('.test-tooltip-wrapper').trigger('mouseleave')
      await wrapper.vm.$nextTick()

      await document.body.querySelector('.geo-tooltip__content').dispatchEvent(new MouseEvent('mouseleave'))
      await wrapper.vm.$nextTick()

      expect(document.body.querySelector('.test-tooltip-content')).toBeNull()

      wrapper.unmount()
    })

    it('Should reposition tooltip when displayed', async function () {
      const spy = jest.spyOn(GeoTooltip.methods, 'repositionTooltip')
      const wrapper = mount(getComponentWithTooltip(), {
        attachTo: document.body
      })

      expect(document.body.querySelector('.test-tooltip-content')).toBeNull()

      await wrapper.find('.test-tooltip-wrapper').trigger('mouseover')

      await wrapper.vm.$nextTick()

      expect(spy).toHaveBeenCalled()

      wrapper.unmount()
    })

    it('Should complain if tooltip does not fit in screen', async function () {
      const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })
      jest.spyOn(document.documentElement, 'scrollLeft', 'get').mockImplementation(() => 50)
      jest.spyOn(document.documentElement, 'scrollTop', 'get').mockImplementation(() => 20)
      jest.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(() => -1)
      jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(() => -1)

      const wrapper = mount(getComponentWithTooltip(), {
        attachTo: document.body
      })

      await wrapper.find('.test-tooltip-wrapper').trigger('mouseover')

      await wrapper.vm.$nextTick()

      expect(consoleWarnSpy).toHaveBeenCalled()

      wrapper.unmount()
    })
  })

  describe('Manual visibility', function () {
    it('Should display tooltip when it is manually visible', async function () {
      const wrapper = mount(getComponentWithTooltip(), {
        attachTo: document.body,
        props: {
          tooltipProps: {
            visible: true
          }
        }
      })

      expect(document.body.querySelector('.test-tooltip-content')).toBeDefined()

      wrapper.unmount()

      expect(document.body.querySelector('.test-tooltip-content')).toBeNull()
    })

    it('Should not display tooltip when it is manually hidden', async function () {
      const wrapper = mount(getComponentWithTooltip(), {
        attachTo: document.body,
        props: {
          tooltipProps: {
            visible: false
          }
        }
      })

      expect(document.body.querySelector('.test-tooltip-content')).toBeNull()

      await wrapper.find('.test-tooltip-wrapper').trigger('mouseover')

      await wrapper.vm.$nextTick()

      expect(document.body.querySelector('.test-tooltip-content')).toBeNull()

      wrapper.unmount()
    })
  })

  describe('Properties', function () {
    describe('Position', function () {
      it('Should complain if position is invalid', function () {
        const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })
        const wrapper = mount(getComponentWithTooltip(), {
          attachTo: document.body,
          props: {
            tooltipProps: {
              position: 'invalid position'
            }
          }
        })

        expect(consoleWarnSpy).toHaveBeenCalled()

        wrapper.unmount()
      })

      for (const positionKey of Object.keys(GeoTooltip.constants.POSITIONS)) {
        const position = GeoTooltip.constants.POSITIONS[positionKey]

        it(`Should not complain if position is «${position}»`, function () {
          const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })
          const wrapper = mount(getComponentWithTooltip(), {
            attachTo: document.body,
            props: {
              tooltipProps: {
                position
              }
            }
          })

          expect(consoleWarnSpy).not.toHaveBeenCalled()

          wrapper.unmount()
        })
      }
    })

    describe('Alignment', function () {
      it('Should complain if alignment is invalid', function () {
        const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })
        const wrapper = mount(getComponentWithTooltip(), {
          attachTo: document.body,
          props: {
            tooltipProps: {
              alignment: 'invalid alignment'
            }
          }
        })

        expect(consoleWarnSpy).toHaveBeenCalled()

        wrapper.unmount()
      })

      for (const alignmentKey of Object.keys(GeoTooltip.constants.ALIGNMENTS)) {
        const alignment = GeoTooltip.constants.ALIGNMENTS[alignmentKey]

        it(`Should not complain if alignment is «${alignment}»`, function () {
          const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })
          const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => { })
          const wrapper = mount(getComponentWithTooltip(), {
            attachTo: document.body,
            props: {
              tooltipProps: {
                alignment
              }
            }
          })

          expect(consoleErrorSpy).not.toHaveBeenCalled()
          expect(consoleWarnSpy).not.toHaveBeenCalled()

          wrapper.unmount()
        })
      }
    })

    describe('Delay', function () {
      it('Should complain if delay is a negative number', function () {
        const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })
        const wrapper = mount(getComponentWithTooltip(), {
          attachTo: document.body,
          props: {
            tooltipProps: {
              delay: -10
            }
          }
        })

        expect(consoleWarnSpy).toHaveBeenCalled()

        wrapper.unmount()
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
        default: function () {
          return {}
        }
      }
    }
  }
}
