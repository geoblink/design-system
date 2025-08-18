import { mount } from '@vue/test-utils'
import GeoSegmentedControl from '@/elements/GeoSegmentedControl/GeoSegmentedControl.vue'

// Helper function to create wrapper with registered components
function createWrapper (component, options = {}) {
  return mount(component, Object.assign({
    global: {
      components: {
        'geo-segmented-control': GeoSegmentedControl
      }
    }
  }, options))
}

describe('GeoSegmentedControlItem', () => {
  it('Should render GeoSegmentedControl component', function () {
    const wrapper = createWrapper(GeoSegmentedControl)
    expect(wrapper.find('.geo-segmented-control').exists()).toBe(true)
  })

  it('Should display default slot', function () {
    const wrapper = createWrapper(GeoSegmentedControl, {
      slots: {
        default: 'test'
      }
    })
    expect(wrapper.find('.geo-segmented-control').text()).toBe('test')
  })

  it('Should apply an outline style when specified', function () {
    const wrapper = createWrapper(GeoSegmentedControl, {
      props: {
        outline: true
      }
    })
    expect(wrapper.find('.geo-segmented-control--outline').exists()).toBe(true)
  })
})
