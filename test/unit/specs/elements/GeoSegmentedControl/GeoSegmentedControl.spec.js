import { createLocalVue, mount } from '@vue/test-utils'
import GeoSegmentedControl from '@/elements/GeoSegmentedControl/GeoSegmentedControl.vue'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-segmented-control', GeoSegmentedControl)

describe('GeoSegmentedControlItem', () => {
  it('Should render GeoSegmentedControl component', function () {
    const wrapper = mount(GeoSegmentedControl)
    expect(wrapper.find('.geo-segmented-control').exists()).toBe(true)
  })

  it('Should display default slot', function () {
    const wrapper = mount(GeoSegmentedControl, {
      slots: {
        default: 'test'
      }
    })
    expect(wrapper.find('.geo-segmented-control').text()).toBe('test')
  })

  it('Should apply an outline style when specified', function () {
    const wrapper = mount(GeoSegmentedControl, {
      propsData: {
        outline: true
      }
    })
    expect(wrapper.find('.geo-segmented-control--outline').exists()).toBe(true)
  })

  it('Should apply a CSS suffix when the modifier is provided', function () {
    const wrapper = mount(GeoSegmentedControl, {
      propsData: {
        cssModifier: 'test'
      }
    })
    expect(wrapper.find('.geo-segmented-control--test').exists()).toBe(true)
  })
})
