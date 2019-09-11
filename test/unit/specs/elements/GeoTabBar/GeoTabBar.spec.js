import { createLocalVue, mount } from '@vue/test-utils'
import GeoTabBar from '@/elements/GeoTabBar/GeoTabBar.vue'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-tab-bar', GeoTabBar)

describe('GeoTabBar', () => {
  it('Should render tabBar\'s content', function () {
    const wrapper = mount(GeoTabBar, {
      slots: {
        default: '<span>Some content</span>'
      }
    })
    const tabBar = wrapper.find('.geo-tab-bar-default')
    expect(tabBar.exists()).toBe(true)
    expect(tabBar.find('span').exists()).toBe(true)
  })

  it('Should add CSS Suffix when given', function () {
    const wrapper = mount(GeoTabBar, {
      propsData: {
        cssModifier: 'custom'
      }
    })

    expect(wrapper.find('.geo-tab-bar-default--custom').exists()).toBe(true)
  })

  it('Should add CSS varian when given', function () {
    const wrapper = mount(GeoTabBar, {
      propsData: {
        variant: 'modal'
      }
    })

    expect(wrapper.find('.geo-tab-bar-modal').exists()).toBe(true)
  })
})
