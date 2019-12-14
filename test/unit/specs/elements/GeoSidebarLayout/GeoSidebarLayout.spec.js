import { mount } from '@vue/test-utils'
import GeoSidebarLayout from '@/elements/GeoSidebarLayout/GeoSidebarLayout.vue'

describe('GeoSidebarLayout', function () {
  it('Should render GeoSidebarLayout component', function () {
    const wrapper = mount(GeoSidebarLayout, {
      stubs: ['geo-vertical-layout']
    })
    expect(wrapper.find('.geo-sidebar-layout').exists()).toBe(true)
  })

  it('Should render default slot', function () {
    const wrapper = mount(GeoSidebarLayout, {
      stubs: ['geo-vertical-layout'],
      slots: {
        default: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })
    expect(wrapper.find('.my-demo-content').exists()).toBe(true)
  })

  it('Should render header and footer slots', function () {
    const wrapper = mount(GeoSidebarLayout, {
      stubs: ['geo-vertical-layout'],
      slots: {
        default: ['<span class="my-demo-content">Just some unique demo content</span>'],
        header: ['<span class="my-header-demo-content">Just some unique header demo content</span>'],
        footer: ['<span class="my-footer-demo-content">Just some unique footer demo content</span>']
      }
    })
    expect(wrapper.find('.my-header-demo-content').exists()).toBe(true)
    expect(wrapper.find('.my-footer-demo-content').exists()).toBe(true)
  })
})
