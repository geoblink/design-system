import * as sinon from 'sinon'
import { mount } from '@vue/test-utils'
import GeoModal from '@/elements/GeoModal/GeoModal.vue'
import GeoBorderedBox from '@/elements/GeoBorderedBox/GeoBorderedBox.vue'
import GeoBorderedBoxHeader from '@/elements/GeoBorderedBox/GeoBorderedBoxHeader.vue'
import GeoBorderedBoxFooter from '@/elements/GeoBorderedBox/GeoBorderedBoxFooter.vue'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock.js'

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
      global: {
        components: {
          GeoBorderedBox
        }
      }
    })
    expect(wrapper.find('.geo-modal').exists()).toBe(true)
  })

  it('Should only display default slot', () => {
    const wrapper = mount(GeoModal, {
      slots: {
        default: 'default'
      },
      global: {
        components: {
          GeoBorderedBox
        }
      }
    })
    const contentDiv = wrapper.find('.geo-modal__content')
    expect(contentDiv.exists()).toBe(true)
    expect(contentDiv.text()).toBe('default')
  })

  it('Should display header slot', () => {
    const wrapper = mount(GeoModal, {
      slots: {
        header: 'header'
      },
      global: {
        components: {
          GeoBorderedBox,
          GeoBorderedBoxHeader
        },
        stubs: {
          GeoBorderedBoxHeader
        }
      }
    })
    expect(wrapper.findComponent(GeoBorderedBoxHeader).text()).toBe('header')
  })

  it('Should display footer slot', () => {
    const wrapper = mount(GeoModal, {
      slots: {
        footer: 'footer'
      },
      global: {
        components: {
          GeoBorderedBox
        },
        stubs: {
          GeoBorderedBoxFooter
        }
      }
    })
    expect(wrapper.findComponent(GeoBorderedBoxFooter).text()).toBe('footer')
  })

  it('Should display body slot', () => {
    const wrapper = mount(GeoModal, {
      slots: {
        body: 'body'
      },
      global: {
        components: {
          GeoBorderedBox
        }
      }
    })
    expect(wrapper.find('.geo-modal__content-body').text()).toBe('body')
  })

  it('Should display correct headerCloseIcon when header and headerCloseIcon are provided', () => {
    const wrapper = mount(GeoModal, {
      props: {
        headerCloseIcon: ['fas', 'times']
      },
      slots: {
        header: 'header'
      },
      global: {
        components: {
          GeoBorderedBox
        },
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock,
          GeoBorderedBoxHeader
        }
      }
    })
    console.log(wrapper.html())
    const fontAwesomeIconElem = wrapper.findComponent(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'times'])
  })

  it('Should not display headerCloseIcon when none is provided', () => {
    const wrapper = mount(GeoModal, {
      slots: {
        header: 'header'
      },
      global: {
        components: {
          GeoBorderedBox
        },
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock,
          GeoBorderedBoxHeader
        }
      }
    })
    expect(wrapper.findComponent(FontAwesomeIconMock).exists()).toBe(false)
  })

  it('Should display no icon when header is not provided', () => {
    const wrapper = mount(GeoModal, {
      props: {
        headerCloseIcon: ['fas', 'times'],
        headerIcon: ['fas', 'bell']
      },
      global: {
        components: {
          GeoBorderedBox
        },
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock,
          GeoBorderedBoxHeader
        }
      }
    })
    expect(wrapper.findComponent(FontAwesomeIconMock).exists()).toBe(false)
  })

  it('Should display correct headerIcon when header and headerIcon are provided', () => {
    const wrapper = mount(GeoModal, {
      props: {
        headerIcon: ['fas', 'bell']
      },
      slots: {
        header: 'header'
      },
      global: {
        components: {
          GeoBorderedBox
        },
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock,
          GeoBorderedBoxHeader
        }
      }
    })
    const fontAwesomeIconElem = wrapper.findComponent(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'bell'])
  })

  it('Should default attachTo to body', () => {
    const wrapper = mount(GeoModal, {
      global: {
        components: {
          GeoBorderedBox
        }
      }
    })
    expect(wrapper.vm.$props.attachTo).toBeInstanceOf(HTMLBodyElement)
  })

  it('Should emit close event when clicking on headerCloseIcon button', () => {
    const wrapper = mount(GeoModal, {
      slots: {
        header: 'header'
      },
      global: {
        components: {
          GeoBorderedBox
        },
        stubs: {
          GeoBorderedBoxHeader
        }
      }
    })
    wrapper.findComponent(GeoBorderedBoxHeader).vm.$emit('click-trailing-icon')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('Should emit click-backdrop event when clicking on background', () => {
    const wrapper = mount(GeoModal, {
      props: {
        headerCloseIcon: ['fas', 'times']
      },
      slots: {
        header: 'header'
      },
      global: {
        components: {
          GeoBorderedBox
        },
        stubs: {
          'geo-bordered-box-header': true
        }
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

    sandbox.stub(document.body, 'scrollLeft').value(3)
    sandbox.stub(document.body, 'scrollTop').value(4)

    const wrapper = mount(GeoModal, {
      global: {
        components: {
          GeoBorderedBox
        }
      }
    })

    expect(wrapper.vm).toHaveProperty('containerSize.height', 1)
    expect(wrapper.vm).toHaveProperty('containerSize.width', 2)
    expect(wrapper.vm).toHaveProperty('containerScrollOffset.left', 3)
    expect(wrapper.vm).toHaveProperty('containerScrollOffset.top', 4)
  })

  // TODO: WEB-2073 Fix this test, scroll directive may need migration
  xit('Should call repositionModal after scrolling the page', () => {
    sandbox.stub(GeoModal.directives, 'ScrollAnywhere').value({ bind: jest.fn() })

    const repositionModalSpy = jest.spyOn(GeoModal.methods, 'repositionModal')

    const wrapper = mount(GeoModal, {
      global: {
        components: {
          GeoBorderedBox
        }
      }
    })

    const scrollAnywhereCalls = GeoModal.directives.ScrollAnywhere.bind.mock.calls

    expect(scrollAnywhereCalls).toHaveProperty('0.0', wrapper.element)
    expect(scrollAnywhereCalls).toHaveProperty('0.1.value')

    repositionModalSpy.mockClear()
    expect(repositionModalSpy).not.toBeCalled()
    scrollAnywhereCalls[0][1].value()
    expect(repositionModalSpy).toHaveBeenCalledTimes(1)
  })

  // TODO: WEB-2073 Fix this test, scroll directive may need migration
  xit('Should call repositionModal after resizing the page', () => {
    sandbox.stub(GeoModal.directives, 'OnResize').value({ bind: jest.fn() })

    const repositionModalSpy = jest.spyOn(GeoModal.methods, 'repositionModal')

    const wrapper = mount(GeoModal, {
      global: {
        components: {
          GeoBorderedBox
        }
      }
    })

    const onResizeCalls = GeoModal.directives.OnResize.bind.mock.calls

    expect(onResizeCalls).toHaveProperty('0.0', wrapper.element)
    expect(onResizeCalls).toHaveProperty('0.1.value.target', wrapper.vm.attachTo)
    expect(onResizeCalls).toHaveProperty('0.1.value.callback')

    repositionModalSpy.mockClear()
    expect(repositionModalSpy).not.toBeCalled()
    onResizeCalls[0][1].value.callback()
    expect(repositionModalSpy).toHaveBeenCalledTimes(1)
  })
})
