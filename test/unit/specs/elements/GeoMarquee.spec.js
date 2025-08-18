import { mount } from '@vue/test-utils'
import GeoMarquee from '@/elements/GeoMarquee/GeoMarquee'

// Helper function to create wrapper with registered components
function createWrapper (component, options = {}) {
  return mount(component, Object.assign({
    global: {
      components: {
        'geo-marquee': GeoMarquee
      }
    }
  }, options))
}

describe('GeoMarquee', () => {
  it('Should render marquee\'s content', function () {
    const wrapper = createWrapper(GeoMarquee, {
      slots: {
        default: '<div>Marquee content</div>'
      }
    })
    const marquee = wrapper.find('.geo-marquee')
    expect(marquee.exists()).toBe(true)
    expect(marquee.find('div').exists()).toBe(true)
  })

  it('Should have moved when hovering on the marquee', function () {
    const wrapper = createWrapper(GeoMarquee, {
      slots: {
        default: '<div>Marquee content</div>'
      }
    })
    wrapper.trigger('mouseenter')
    expect(wrapper.vm.animationPlayState).toBe('running')
    wrapper.trigger('mouseleave')
    expect(wrapper.vm.animationPlayState).toBe('paused')
  })

  it('Shouldn\'t have animation params when the content is smaller than the container', function () {
    const wrapper = createWrapper(GeoMarquee, {
      slots: {
        default: '<div>Marquee content</div>'
      }
    })
    wrapper.trigger('mouseenter')
    expect(wrapper.vm.animationParams).toEqual({})
    wrapper.trigger('mouseleave')
    expect(wrapper.vm.animationParams).toEqual({})
  })

  it('Should have animation params when the content is bigger than the container', async function () {
    const wrapper = createWrapper(GeoMarquee, {
      slots: {
        default: '<div>Marquee content</div>'
      }
    })

    const baseBBox = {
      width: 0,
      height: 50,
      x: 0,
      y: 0,
      left: 0,
      right: 0,
      bottom: 0,
      top: 0
    }

    const textContentElement = wrapper.find('.geo-marquee__text-content').element

    jest
      .spyOn(Element.prototype, 'getBoundingClientRect')
      .mockImplementation(function () {
        if (this === textContentElement) {
          return Object.assign({}, baseBBox, { width: 150 })
        }

        return Object.assign({}, baseBBox, {
          width: 50
        })
      })

    wrapper.setData({
      contentWidth: 150,
      containerWidth: 50
    })
    wrapper.trigger('mouseenter')

    expect(wrapper.vm.slotsNeeded).toEqual([0, 1])
    expect(wrapper.vm.animationParams.animationPlayState).toEqual('running')
    wrapper.trigger('mouseleave')
    expect(wrapper.vm.animationParams.animationPlayState).toEqual('paused')
  })
})
