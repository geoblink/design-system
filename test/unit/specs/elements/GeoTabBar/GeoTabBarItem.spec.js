import { mount } from '@vue/test-utils'
import GeoTabBarItem from '@/elements/GeoTabBar/GeoTabBarItem.vue'

function getWrapper (component, options = {}) {
  return mount(component, Object.assign({
    global: {
      components: {
        GeoTabBarItem
      }
    }
  }, options))
}

describe('GeoTabBarItem', () => {
  it('Should render item\'s content', function () {
    const wrapper = getWrapper(GeoTabBarItem, {
      slots: {
        default: '<span>Some content</span>'
      }
    })
    const tabBarItem = wrapper.find('.geo-tab-bar-item-default')
    expect(tabBarItem.exists()).toBe(true)
    expect(tabBarItem.find('span').exists()).toBe(true)
  })

  it('Should emit an event on click', async function () {
    const wrapper = getWrapper(GeoTabBarItem, {})
    await wrapper.find('.geo-tab-bar-item-default').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().click).toBeTruthy()
  })

  // TODO: Fix check, native click event is still triggered even if custom click event is not emitted
  xit('Should not emit an event when it\'s disabled', async function () {
    const wrapper = getWrapper(GeoTabBarItem, {
      props: {
        disabled: true
      }
    })

    const tabBarItem = wrapper.find('.geo-tab-bar-item-default')
    await tabBarItem.trigger('click')
    expect(wrapper.emitted().click).toBeFalsy()
  })

  it('Should add active suffix when item is active', function () {
    const wrapper = getWrapper(GeoTabBarItem, {
      props: {
        active: true
      }
    })

    expect(wrapper.find('.geo-tab-bar-item-default--active').exists()).toBe(true)
  })

  it('Should add CSS varian when given', function () {
    const wrapper = getWrapper(GeoTabBarItem, {
      props: {
        variant: 'modal'
      }
    })

    expect(wrapper.find('.geo-tab-bar-item-modal').exists()).toBe(true)
  })
})
