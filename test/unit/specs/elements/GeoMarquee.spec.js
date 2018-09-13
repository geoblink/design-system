import { createLocalVue, mount } from '@vue/test-utils'
import GeoMarquee from '@/elements/GeoMarquee/GeoMarquee'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-marquee', GeoMarquee)

describe('GeoMarquee', () => {
  it('should render marquee\'s content', function () {
    const wrapper = mount(GeoMarquee, {
      scopedSlots: {
        default: '<div slot-scope="{}">Marquee content</div>'
      }
    })
    const marquee = wrapper.find('.geo-marquee')
    expect(marquee.exists()).toBe(true)
    expect(marquee.find('div').exists()).toBe(true)
  })

  it('should have moved when hovering on the marquee', function () {
    const wrapper = mount(GeoMarquee, {
      scopedSlots: {
        default: '<div slot-scope="{}">Marquee content</div>'
      }
    })
    wrapper.trigger('mouseenter')
    expect(wrapper.vm.animationPlayState).toBe('running')
    wrapper.trigger('mouseleave')
    expect(wrapper.vm.animationPlayState).toBe('paused')
  })

  it('shouldn\'t have animation params when the content is smaller than the container', function () {
    const wrapper = mount(GeoMarquee, {
      scopedSlots: {
        default: '<div slot-scope="{}">Marquee content</div>'
      }
    })
    wrapper.trigger('mouseenter')
    expect(wrapper.vm.animationParams).toEqual({})
    wrapper.trigger('mouseleave')
    expect(wrapper.vm.animationParams).toEqual({})
  })

  it('should have animation params when the content is bigger than the container', function () {
    const wrapper = mount(GeoMarquee, {
      scopedSlots: {
        default: '<div slot-scope="{}">Marquee content</div>'
      }
    })
    wrapper.setData({
      contentWidth: 150,
      containerWidth: 50
    })
    wrapper.trigger('mouseenter')
    wrapper.setData({
      contentWidth: 150,
      containerWidth: 50
    })
    expect(wrapper.vm.slotsNeeded).toEqual([0, 1])
    expect(wrapper.vm.animationParams.animationPlayState).toEqual('running')
    wrapper.trigger('mouseleave')
    expect(wrapper.vm.animationParams.animationPlayState).toEqual('paused')
  })

  it('Should apply a CSS suffix when the modifier is provided', function () {
    const wrapper = mount(GeoMarquee, {
      propsData: {
        cssModifier: 'test-marquee'
      },
      scopedSlots: {
        default: '<div slot-scope="{}">Marquee content</div>'
      }
    })
    expect(wrapper.find('.geo-marquee--test-marquee').exists()).toBe(true)
    expect(wrapper.find('.geo-marquee__text-content--test-marquee').exists()).toBe(true)
  })
})
