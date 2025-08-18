import { mount } from '@vue/test-utils'
import GeoBorderedBoxFooter from '@/elements/GeoBorderedBox/GeoBorderedBoxFooter.vue'

// Helper function to create wrapper with registered components
function createWrapper (component, options = {}) {
  return mount(component, Object.assign({
    global: {
      components: {
        'geo-bordered-box-footer': GeoBorderedBoxFooter
      }
    }
  }, options))
}

describe('GeoBorderedBoxFooter', () => {
  it('Should render default slot', function () {
    const wrapper = createWrapper(GeoBorderedBoxFooter, {
      slots: {
        default: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })

    expect(wrapper.find('.my-demo-content').exists()).toBe(true)
  })
})
