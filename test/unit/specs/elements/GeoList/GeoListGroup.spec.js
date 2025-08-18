import { mount } from '@vue/test-utils'
import GeoListGroup from '@/elements/GeoList/GeoListGroup.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock'

library.add(fas)

describe('GeoListGroup', () => {
  it('Should render title slot in header', function () {
    const wrapper = mount(GeoListGroup, {
      slots: {
        title: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })

    expect(wrapper.find('.geo-list-group-header .my-demo-content').exists()).toBe(true)
  })

  it('Should not render header if there is no title slot', function () {
    const wrapper = mount(GeoListGroup, {})

    expect(wrapper.find('.geo-list-group-header').exists()).toBe(false)
  })

  it('Should render icon in header', function () {
    const wrapper = mount(GeoListGroup, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      },
      props: {
        icon: ['fas', 'user']
      },
      slots: {
        title: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })

    expectFontAwesomeIconProp(wrapper.findComponent(FontAwesomeIconMock), ['fas', 'user'])
  })

  it('Should trigger click event when clicking on header', function () {
    const wrapper = mount(GeoListGroup, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      },
      slots: {
        title: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })

    wrapper.find('.geo-list-group-header').trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })

  it('Should render trailing accessory items from trailingAccessoryItem slot', function () {
    const wrapper = mount(GeoListGroup, {
      slots: {
        title: ['<span class="some-title">Just some unique demo content</span>'],
        trailingAccessoryItem: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })

    expect(wrapper.find('.geo-list-group-header__trailing-accessory-items .my-demo-content').exists()).toBe(true)
  })

  it('Should not render trailing accessory items container if trailingAccessoryItem is empty', function () {
    const wrapper = mount(GeoListGroup, {})

    expect(wrapper.find('.geo-list-group-header__trailing-accessory-items').exists()).toBe(false)
  })

  it('Should render item slot in content', function () {
    const wrapper = mount(GeoListGroup, {
      slots: {
        item: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })
    expect(wrapper.find('.geo-list-group__content .my-demo-content').exists()).toBe(true)
  })
})
