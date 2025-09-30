import { mount } from '@vue/test-utils'
import GeoBorderedBoxHeader from '@/elements/GeoBorderedBox/GeoBorderedBoxHeader.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock'

library.add(fas)

describe('GeoBorderedBoxHeader', () => {
  it('Should render default slot', function () {
    const wrapper = mount(GeoBorderedBoxHeader, {
      slots: {
        default: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })

    expect(wrapper.find('.my-demo-content').exists()).toBe(true)
  })

  it('Should render icon', function () {
    const wrapper = mount(GeoBorderedBoxHeader, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      },
      props: {
        icon: ['fas', 'user']
      }
    })

    const fontAwesomeIcon = wrapper.findComponent(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIcon, ['fas', 'user'])
  })

  it('Should trigger click-icon event when clicking on icon', async function () {
    const wrapper = mount(GeoBorderedBoxHeader, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      },
      props: {
        icon: ['fas', 'user']
      }
    })

    await wrapper.findComponent(FontAwesomeIconMock).trigger('click')
    expect(wrapper.emitted()['click-icon']).toBeTruthy()
  })

  it('Should not render trailing icon if listener is not provided', function () {
    const wrapper = mount(GeoBorderedBoxHeader, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      }
    })

    expect(wrapper.find('.geo-bordered-box-header__trailing-button').exists()).toBe(false)
  })

  it('Should render trailing icon if listener is provided', function () {
    const wrapper = mount(GeoBorderedBoxHeader, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      },
      props: {
        'trailing-icon': ['fas', 'times']
      },
      attrs: {
        onClickTrailingIcon () { }
      }
    })

    expect(wrapper.find('.geo-bordered-box-header__trailing-button').exists()).toBe(true)
  })

  it('Should trigger click-trailing-icon event on trailing icon click', async function () {
    const wrapper = mount(GeoBorderedBoxHeader, {
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      },
      props: {
        'trailing-icon': ['fas', 'times']
      },
      attrs: {
        onClickTrailingIcon () { }
      }
    })

    await wrapper.find('.geo-bordered-box-header__trailing-button').trigger('click')
    expect(wrapper.emitted()['click-trailing-icon']).toBeTruthy()
  })

  it('Should emit click event', async function () {
    const wrapper = mount(GeoBorderedBoxHeader, {
      slots: {
        default: ['Just some unique demo content']
      }
    })

    await wrapper.find('.geo-bordered-box-header').trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })
})
