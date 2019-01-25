import { createLocalVue, mount } from '@vue/test-utils'
import GeoTabBarItem from '@/elements/GeoTabBar/GeoTabBarItem.vue'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-tab-bar-item', GeoTabBarItem)

describe('GeoTabBarItem', () => {
  it('should render item\'s content', function () {
    const wrapper = mount(GeoTabBarItem, {
      slots: {
        default: '<span>Some content</span>'
      }
    })
    const tabBarItem = wrapper.find('.geo-tab-bar-item-default')
    expect(tabBarItem.exists()).toBe(true)
    expect(tabBarItem.find('span').exists()).toBe(true)
  })

  it('should emit an event on click', function (done) {
    const wrapper = mount(GeoTabBarItem, {})
    wrapper.find('.geo-tab-bar-item-default').trigger('click')
    setTimeout(function () {
      try {
        expect(wrapper.emitted()['click']).toBeTruthy()
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('should not emit an event when it\'s disabled', function () {
    const wrapper = mount(GeoTabBarItem, {
      propsData: {
        disabled: true
      }
    })

    const tabBarItem = wrapper.find('.geo-tab-bar-item-default')
    tabBarItem.trigger('click')
    expect(wrapper.emitted()['click']).toBeFalsy()
  })

  it('should add active suffix when item is active', function () {
    const wrapper = mount(GeoTabBarItem, {
      propsData: {
        active: true
      }
    })

    expect(wrapper.find('.geo-tab-bar-item-default--active').exists()).toBe(true)
  })

  it('should add CSS Suffix when given', function () {
    const wrapper = mount(GeoTabBarItem, {
      propsData: {
        cssModifier: 'custom'
      }
    })

    expect(wrapper.find('.geo-tab-bar-item-default--custom').exists()).toBe(true)
  })
})
