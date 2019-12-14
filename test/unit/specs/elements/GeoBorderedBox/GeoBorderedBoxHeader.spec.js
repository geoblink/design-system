import { mount } from '@vue/test-utils'
import GeoBorderedBoxHeader from '@/elements/GeoBorderedBox/GeoBorderedBoxHeader.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

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
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        icon: ['fas', 'user']
      }
    })

    expect(wrapper.find('svg[data-prefix="fas"][data-icon="user"]').exists()).toBe(true)
  })

  it('Should trigger click-icon event when clicking on icon', function () {
    const wrapper = mount(GeoBorderedBoxHeader, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        icon: ['fas', 'user']
      }
    })

    wrapper.find('svg[data-prefix="fas"][data-icon="user"]').trigger('click')
    expect(wrapper.emitted()['click-icon']).toBeTruthy()
  })

  it('Should not render close icon if listener is not provided', function () {
    const wrapper = mount(GeoBorderedBoxHeader, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })

    expect(wrapper.find('.geo-bordered-box-header__close-button').exists()).toBe(false)
  })

  it('Should render close icon if listener is provided', function () {
    const wrapper = mount(GeoBorderedBoxHeader, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        'close-icon': ['fas', 'times']
      },
      listeners: {
        close () { }
      }
    })

    expect(wrapper.find('.geo-bordered-box-header__close-button').exists()).toBe(true)
  })

  it('Should trigger close event on close icon click', function () {
    const wrapper = mount(GeoBorderedBoxHeader, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        'close-icon': ['fas', 'times']
      },
      listeners: {
        close () { }
      }
    })

    wrapper.find('.geo-bordered-box-header__close-button').trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('Should emit click event', function () {
    const wrapper = mount(GeoBorderedBoxHeader, {
      slots: {
        default: ['Just some unique demo content']
      }
    })

    wrapper.find('.geo-bordered-box-header').trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })
})
