import { mount, shallowMount } from '@vue/test-utils'
import GeoListItem from '@/elements/GeoList/GeoListItem.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock'

library.add(fas)

describe('GeoListItem', () => {
  it('Should render a <div> wrapper by default', () => {
    expect(getShallowWrapper().find('div.geo-list-item').exists()).toBe(true)
  })

  it('Should render a <label> wrapper if wrapperTag is provided', () => {
    const wrapper = getShallowWrapper({
      props: {
        wrapperTag: 'label'
      }
    })
    expect(wrapper.find('div.geo-list-item').exists()).toBe(false)
    expect(wrapper.find('label.geo-list-item').exists()).toBe(true)
  })

  it('Should render default slot', function () {
    const wrapper = getShallowWrapper({
      slots: {
        default: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })

    expect(wrapper.find('.my-demo-content').exists()).toBe(true)
  })

  it('Should render trailingAccessoryItem slot', function () {
    const wrapper = getShallowWrapper({
      slots: {
        default: ['<span class="my-demo-content">Just some unique demo content</span>'],
        trailingAccessoryItem: ['<span class="my-demo-accessory">Just some accessory item</span>']
      }
    })

    expect(wrapper.find('.my-demo-accessory').exists()).toBe(true)
  })

  it('Should render icon', function () {
    const wrapper = getShallowWrapper({
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      },
      props: {
        icon: ['fas', 'user']
      }
    })

    expectFontAwesomeIconProp(wrapper.findComponent(FontAwesomeIconMock), ['fas', 'user'])
  })

  it('Should render description', function () {
    const wrapper = getShallowWrapper({
      slots: {
        description: ['<span class="my-demo-description">Description</span>']
      }
    })

    expect(wrapper.find('.my-demo-description').exists()).toBe(true)
  })

  describe('click event', () => {
    let clickSpy, Parent

    beforeEach(() => {
      clickSpy = jest.fn()
      Parent = mount({
        components: { GeoListItem },
        props: { disabled: { type: Boolean, default: false } },
        setup () { return { onClick: clickSpy } },
        template: `
          <geo-list-item :disabled="disabled" @click="onClick">
            content
          </geo-list-item>
        `
      })
    })

    // TODO: WEB-2073 Fix check, native click event is still triggered even if custom click event is not emitted
    xit('Should emit click event', async function () {
      await Parent.findComponent(GeoListItem).trigger('click')
      expect(clickSpy).toHaveBeenCalledTimes(1)
    })

    // TODO: WEB-2073 Fix check, native click event is still triggered even if custom click event is not emitted
    xit('Should not emit click event when is disabled', async function () {
      Parent.setProps({ disabled: true })
      await Parent.findComponent(GeoListItem).trigger('click')
      expect(clickSpy).not.toHaveBeenCalled()
    })
  })

  it('Should include disabled suffix when it is disabled', function () {
    const wrapper = getShallowWrapper({
      props: {
        disabled: true
      }
    })

    expect(wrapper.find('.geo-list-item--disabled').exists()).toBe(true)
  })
})

function getShallowWrapper (options) {
  return shallowMount(GeoListItem, options)
}
