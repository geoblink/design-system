import { mount } from '@vue/test-utils'
import GeoTabBar from '@/elements/GeoTabBar/GeoTabBar.vue'

// Helper function to create wrapper with registered components
function createWrapper (component, options = {}) {
  return mount(component, Object.assign({
    global: {
      components: {
        'geo-tab-bar': GeoTabBar
      }
    }
  }, options))
}

describe('GeoTabBar', () => {
  it('Should render tabBar\'s content', function () {
    const wrapper = createWrapper(GeoTabBar, {
      slots: {
        default: '<span>Some content</span>'
      }
    })
    const tabBar = wrapper.find('.geo-tab-bar-default')
    expect(tabBar.exists()).toBe(true)
    expect(tabBar.find('span').exists()).toBe(true)
  })

  it('Should add CSS varian when given', function () {
    const wrapper = createWrapper(GeoTabBar, {
      props: {
        variant: 'modal'
      }
    })

    expect(wrapper.find('.geo-tab-bar-modal').exists()).toBe(true)
  })
})
