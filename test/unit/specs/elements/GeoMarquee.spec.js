import { createLocalVue, mount } from '@vue/test-utils'
import GeoMarquee from '@/elements/GeoMarquee'

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
})
