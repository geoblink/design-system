import * as sinon from 'sinon'
import { createLocalVue, mount } from '@vue/test-utils'
import GeoModal from '@/elements/GeoModal/GeoModal.vue'
import GeoBorderedBox from '@/elements/GeoBorderedBox/GeoBorderedBox.vue'
import GeoBorderedBoxHeader from '@/elements/GeoBorderedBox/GeoBorderedBoxHeader.vue'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock.js'
import { getDocument } from 'src/utils/ssrProxy'
import { wrap } from 'module'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-modal', GeoModal)

describe('GeoModal', () => {
  const sandbox = sinon.createSandbox()

  beforeEach(() => {
    sandbox.restore()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('Should render GeoModal component', () => {
    const wrapper = mount(GeoModal, {
      stubs: {
        'geo-bordered-box': GeoBorderedBox
      }
    })
    expect(wrapper.find('.geo-modal').exists()).toBe(true)
  })

  it('Should only display default slot', () => {
    const wrapper = mount(GeoModal, {
      slots: {
        default: 'default'
      },
      stubs: {
        'geo-bordered-box': GeoBorderedBox
      }
    })
    expect(wrapper.find('.geo-modal__content').html()).toBe('<div class="geo-modal__content">default</div>')
  })

  it('Should display header slot', () => {
    const wrapper = mount(GeoModal, {
      slots: {
        header: 'header'
      },
      stubs: {
        'geo-bordered-box': true,
        'geo-bordered-box-header': true
      }
    })
    expect(wrapper.find('geo-bordered-box-header-stub').text()).toBe('header')
  })

  it('Should display footer slot', () => {
    const wrapper = mount(GeoModal, {
      slots: {
        footer: 'footer'
      },
      stubs: {
        'geo-bordered-box': true,
        'geo-bordered-box-footer': true
      }
    })
    expect(wrapper.find('geo-bordered-box-footer-stub').text()).toBe('footer')
  })

  it('Should display body slot', () => {
    const wrapper = mount(GeoModal, {
      slots: {
        body: 'body'
      },
      stubs: {
        'geo-bordered-box': GeoBorderedBox
      }
    })
    expect(wrapper.find('.geo-modal__content-body').text()).toBe('body')
  })

  it('Should display correct headerCloseIcon when header and headerCloseIcon are provided', () => {
    const wrapper = mount(GeoModal, {
      propsData: {
        headerCloseIcon: ['fas', 'times']
      },
      slots: {
        header: 'header'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock,
        'geo-bordered-box': true,
        'geo-bordered-box-header': GeoBorderedBoxHeader
      }
    })
    const fontAwesomeIconElem = wrapper.find(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'times'])
  })

  it('Should not display headerCloseIcon when none is provided', () => {
    const wrapper = mount(GeoModal, {
      slots: {
        header: 'header'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock,
        'geo-bordered-box': true,
        'geo-bordered-box-header': GeoBorderedBoxHeader
      }
    })
    expect(wrapper.find(FontAwesomeIconMock).exists()).toBe(false)
  })

  it('Should display no icon when header is not provided', () => {
    const wrapper = mount(GeoModal, {
      propsData: {
        headerCloseIcon: ['fas', 'times'],
        headerIcon: ['fas', 'bell']
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock,
        'geo-bordered-box': true,
        'geo-bordered-box-header': GeoBorderedBoxHeader
      }
    })
    expect(wrapper.find(FontAwesomeIconMock).exists()).toBe(false)
  })

  it('Should display correct headerIcon when header and headerIcon are provided', () => {
    const wrapper = mount(GeoModal, {
      propsData: {
        headerIcon: ['fas', 'bell']
      },
      slots: {
        header: 'header'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock,
        'geo-bordered-box': true,
        'geo-bordered-box-header': GeoBorderedBoxHeader
      }
    })
    const fontAwesomeIconElem = wrapper.find(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'bell'])
  })

  it('Should default attachTo to body', () => {
    const wrapper = mount(GeoModal, {
      stubs: {
        'geo-bordered-box': GeoBorderedBox
      }
    })
    expect(wrapper.vm.$props.attachTo).toBeInstanceOf(HTMLBodyElement)
  })

  it('Should emit close event when clicking on headerCloseIcon button', () => {
    const wrapper = mount(GeoModal, {
      slots: {
        header: 'header'
      },
      stubs: {
        'geo-bordered-box-header': true,
        'geo-bordered-box': GeoBorderedBox
      }
    })
    wrapper.find('geo-bordered-box-header-stub').vm.$emit('close')
    expect(wrapper.emitted()['close']).toBeTruthy()
  })

  it('Should emit click-backdrop event when clicking on background', () => {
    const wrapper = mount(GeoModal, {
      propsData: {
        headerCloseIcon: ['fas', 'times']
      },
      slots: {
        header: 'header'
      },
      stubs: {
        'geo-bordered-box-header': true,
        'geo-bordered-box': GeoBorderedBox
      }
    })
    wrapper.find('.geo-modal__backdrop').trigger('click')
    expect(wrapper.emitted()['click-backdrop']).toBeTruthy()
  })

  it('Should reposition modal correctly', () => {
    sandbox.stub(document.body, 'getBoundingClientRect').returns({
      height: 1,
      width: 2
    })

    const wrapper = mount(GeoModal, {
      stubs: {
        'geo-bordered-box': GeoBorderedBox
      }
    })

    wrapper.vm.$props.attachTo.scrollLeft = 3
    wrapper.vm.$props.attachTo.scrollTop = 4

    wrapper.vm.$options.methods.repositionModal.apply(wrapper.vm)

    expect(wrapper.vm.$data).toHaveProperty('containerSize.height', 1)
    expect(wrapper.vm.$data).toHaveProperty('containerSize.width', 2)
    expect(wrapper.vm.$data).toHaveProperty('containerScrollOffset.left', 3)
    expect(wrapper.vm.$data).toHaveProperty('containerScrollOffset.top', 4)
  })

  it('Should call repositionModal after scrolling the page', () => {
    sandbox.stub(GeoModal.directives, 'ScrollAnywhere').value({ bind: jest.fn() })

    const repositionModalSpy = jest.spyOn(GeoModal.methods, 'repositionModal')

    const wrapper = mount(GeoModal, {
      stubs: {
        'geo-bordered-box': GeoBorderedBox
      }
    })

    const ScrollAnywhereCalls = GeoModal.directives.ScrollAnywhere.bind.mock.calls

    expect(ScrollAnywhereCalls).toHaveProperty('0.0', wrapper.element)
    expect(ScrollAnywhereCalls).toHaveProperty('0.1.value')

    repositionModalSpy.mockClear()
    expect(repositionModalSpy).not.toBeCalled()
    ScrollAnywhereCalls[0][1].value()
    expect(repositionModalSpy).toHaveBeenCalledTimes(1)
  })

  it('Should call repositionModal after resizing the page', () => {
    sandbox.stub(GeoModal.directives, 'OnResize').value({ bind: jest.fn() })

    const repositionModalSpy = jest.spyOn(GeoModal.methods, 'repositionModal')

    const wrapper = mount(GeoModal, {
      stubs: {
        'geo-bordered-box': GeoBorderedBox
      }
    })

    const onResizeCalls = GeoModal.directives.OnResize.bind.mock.calls

    expect(onResizeCalls).toHaveProperty('0.0', wrapper.element)
    expect(onResizeCalls).toHaveProperty('0.1.value.target', wrapper.vm.$props.attachTo)
    expect(onResizeCalls).toHaveProperty('0.1.value.callback')

    repositionModalSpy.mockClear()
    expect(repositionModalSpy).not.toBeCalled()
    onResizeCalls[0][1].value.callback()
    expect(repositionModalSpy).toHaveBeenCalledTimes(1)
  })

  it('Should apply a CSS suffix when the modifier is provided', () => {
    const wrapper = mount(GeoModal, {
      propsData: {
        cssModifier: 'test'
      },
      stubs: {
        'geo-bordered-box': GeoBorderedBox
      }
    })
    expect(wrapper.find('.geo-modal--test').exists()).toBe(true)
  })
})
