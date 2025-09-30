import { mount } from '@vue/test-utils'
import GeoBorderedBox from '@/elements/GeoBorderedBox/GeoBorderedBox.vue'

// Helper function to create wrapper with registered components
function createWrapper (component, options = {}) {
  return mount(component, Object.assign({
    global: {
      components: {
        'geo-bordered-box': GeoBorderedBox
      }
    }
  }, options))
}

describe('GeoBorderedBox', () => {
  it('Should render GeoBorderedBox component', function () {
    const wrapper = createWrapper(GeoBorderedBox, {})
    expect(wrapper.find('.geo-bordered-box').exists()).toBe(true)
  })

  it('Should render default slot', function () {
    const wrapper = createWrapper(GeoBorderedBox, {
      slots: {
        default: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })
    expect(wrapper.find('.my-demo-content').exists()).toBe(true)
  })
})
