import { createLocalVue, mount } from '@vue/test-utils'
import GeoTabBarItem from '@/elements/GeoTabBar/GeoTabBarItem.vue'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-tab-bar-item', GeoTabBarItem)

describe('GeoTabBarItem', () => {
  it('Should render item\'s content', function () {
    const wrapper = mount(GeoTabBarItem, {
      slots: {
        default: '<span>Some content</span>'
      }
    })
    const tabBarItem = wrapper.find('.geo-tab-bar-item-default')
    expect(tabBarItem.exists()).toBe(true)
    expect(tabBarItem.find('span').exists()).toBe(true)
  })

  it('Should emit an event on click', function (done) {
    const wrapper = mount(GeoTabBarItem, {})
    wrapper.find('.geo-tab-bar-item-default').trigger('click')
    setTimeout(function () {
      try {
        expect(wrapper.emitted().click).toBeTruthy()
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  it('Should not emit an event when it\'s disabled', function () {
    const wrapper = mount(GeoTabBarItem, {
      propsData: {
        disabled: true
      }
    })

    const tabBarItem = wrapper.find('.geo-tab-bar-item-default')
    tabBarItem.trigger('click')
    expect(wrapper.emitted().click).toBeFalsy()
  })

  it('Should add active suffix when item is active', function () {
    const wrapper = mount(GeoTabBarItem, {
      propsData: {
        active: true
      }
    })

    expect(wrapper.find('.geo-tab-bar-item-container-default--active').exists()).toBe(true)
  })

  it('Should add CSS varian when given', function () {
    const wrapper = mount(GeoTabBarItem, {
      propsData: {
        variant: 'modal'
      }
    })

    expect(wrapper.find('.geo-tab-bar-item-modal').exists()).toBe(true)
  })
})
