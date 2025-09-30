import sinon from 'sinon'
import { mount } from '@vue/test-utils'
import GeoFeedbackBox from '@/elements/GeoFeedbackBox/GeoFeedbackBox.vue'
import GeoErrorFeedbackBox from '@/elements/GeoFeedbackBox/GeoErrorFeedbackBox.vue'
import GeoInfoFeedbackBox from '@/elements/GeoFeedbackBox/GeoInfoFeedbackBox.vue'
import GeoProgressFeedbackBox from '@/elements/GeoFeedbackBox/GeoProgressFeedbackBox.vue'
import GeoSuccessFeedbackBox from '@/elements/GeoFeedbackBox/GeoSuccessFeedbackBox.vue'
import GeoWarningFeedbackBox from '@/elements/GeoFeedbackBox/GeoWarningFeedbackBox.vue'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock'

function getWrapper (component, options = {}) {
  return mount(component, Object.assign({
    global: {
      components: {
        'geo-feedback-box': GeoFeedbackBox
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      }
    }
  }, options))
}

describe('GeoFeedbackBox', () => {
  it('Should render alert component', function () {
    const wrapper = getWrapper(GeoFeedbackBox, {
      props: {
        variant: 'success'
      }
    })

    expect(wrapper.find('.geo-feedback-box').exists()).toBe(true)
  })

  it('Should show the close button if close listener is provided', function () {
    const wrapper = getWrapper(GeoFeedbackBox, {
      props: {
        variant: 'success',
        closeIcon: ['fas', 'times']
      },
      attrs: {
        onClose: function () {}
      }
    })
    expect(wrapper.find('.geo-feedback-box').exists()).toBe(true)
    expect(wrapper.find('.geo-feedback-box-content__close-icon').exists()).toBe(true)
    expect(wrapper.vm).toHaveProperty('shouldShowCloseButton', true)
  })

  it('Shouldn\'t show the close button if close listener is not provided', function () {
    const wrapper = getWrapper(GeoFeedbackBox, {
      props: {
        variant: 'success'
      }
    })
    expect(wrapper.find('.geo-feedback-box').exists()).toBe(true)
    expect(wrapper.find('.geo-feedback-box-content__close-icon').exists()).toBe(false)
    expect(wrapper.vm).toHaveProperty('shouldShowCloseButton', false)
  })

  it('Should emit a close event when clicking on the close button', function () {
    const wrapper = getWrapper(GeoFeedbackBox, {
      props: {
        variant: 'success',
        closeIcon: ['fas', 'times']
      },
      attrs: {
        onClose: function () {}
      }
    })
    wrapper.find('.geo-feedback-box-content__close-icon').trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('Should display actions when the slots are passed', function () {
    const wrapper = getWrapper(GeoFeedbackBox, {
      props: {
        variant: 'success'
      },
      slots: {
        actions: '<a>Run test action</a>'
      }
    })
    expect(wrapper.find('a').text()).toBe('Run test action')
  })

  it('Should display correct icon when passed as a slot', function () {
    const wrapper = getWrapper(GeoFeedbackBox, {
      props: {
        variant: 'success'
      },
      slots: {
        leadingAccessoryItem: `<font-awesome-icon
                :icon="['fas', 'circle-notch']"
                slot="icon"
                aria-hidden
                fixed-width
                spin
              />`
      }
    })
    expectFontAwesomeIconProp(wrapper.findComponent(FontAwesomeIconMock), ['fas', 'circle-notch'])
  })

  it('Should add extra class if floating is passed as true', function () {
    const wrapper = getWrapper(GeoFeedbackBox, {
      props: {
        variant: 'success',
        floating: true
      }
    })

    expect(wrapper.find('.geo-feedback-box--floating').exists()).toBe(true)
  })

  it('Shouldn\'t add extra class if floating is not passed', function () {
    const wrapper = getWrapper(GeoFeedbackBox, {
      props: {
        variant: 'success'
      }
    })

    expect(wrapper.find('.geo-feedback-box--floating').exists()).toBe(false)
  })

  it('Should check variant prop is valid', function () {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })

    const wrapper = getWrapper(GeoFeedbackBox, {
      props: {
        variant: 'success'
      }
    })

    const variantProp = wrapper.vm.$options.props.variant

    expect(variantProp.required).toBeTruthy()
    expect(variantProp.type).toBe(String)
    expect(variantProp.validator && variantProp.validator('qwerty')).toBeFalsy()
    expect(spy).toBeCalledWith(expect.stringContaining('GeoFeedbackBox [component] :: Unsupported value («qwerty») for «variant» property.'))
    expect(variantProp.validator && variantProp.validator('info')).toBeTruthy()
    spy.mockReset()
  })
})

const taxonomyFeedbackBoxs = [GeoErrorFeedbackBox, GeoInfoFeedbackBox, GeoProgressFeedbackBox, GeoSuccessFeedbackBox, GeoWarningFeedbackBox]

describe('GeoFeedbackBox Children', () => {
  taxonomyFeedbackBoxs.forEach((taxonomyFeedbackBox) => {
    it('Should render alert component', function () {
      const wrapper = getWrapper(taxonomyFeedbackBox, {
        props: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times']
        },
        global: {
          components: {
            'geo-feedback-box': GeoFeedbackBox
          },
          stubs: {
            'font-awesome-icon': FontAwesomeIconMock,
            GeoFeedbackBox
          }
        }
      })

      expect(wrapper.find('.geo-feedback-box').exists()).toBe(true)
    })

    it('Should show the close button if close listener is provided', function () {
      const wrapper = getWrapper(taxonomyFeedbackBox, {
        props: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times']
        },
        global: {
          components: {
            'geo-feedback-box': GeoFeedbackBox
          },
          stubs: {
            'font-awesome-icon': FontAwesomeIconMock,
            GeoFeedbackBox
          }
        },
        attrs: {
          onClose: function () {}
        }
      })
      expect(wrapper.find('.geo-feedback-box').exists()).toBe(true)
      expect(wrapper.find('.geo-feedback-box-content__close-icon').exists()).toBe(true)
      expect(wrapper.vm).toHaveProperty('shouldShowCloseButton', true)
    })

    it('Shouldn\'t show the close button if close listener is not provided', function () {
      const wrapper = getWrapper(taxonomyFeedbackBox, {
        props: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times']
        },
        global: {
          components: {
            'geo-feedback-box': GeoFeedbackBox
          },
          stubs: {
            'font-awesome-icon': FontAwesomeIconMock,
            GeoFeedbackBox
          }
        }
      })
      expect(wrapper.find('.geo-feedback-box').exists()).toBe(true)
      expect(wrapper.vm).toHaveProperty('shouldShowCloseButton', false)
      expect(wrapper.find('.geo-feedback-box-content__close-icon').exists()).toBe(false)
    })

    it('Should emit a close event when clicking on the close button', function () {
      const closeStub = jest.fn()
      const wrapper = getWrapper(taxonomyFeedbackBox, {
        props: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times']
        },
        global: {
          components: {
            GeoFeedbackBox
          },
          stubs: {
            'font-awesome-icon': FontAwesomeIconMock
          }
        },
        attrs: {
          onClose: closeStub
        }
      })
      wrapper.find('.geo-feedback-box-content__close-icon').trigger('click')
      expect(closeStub).toHaveBeenCalledTimes(1)
    })

    it('Should display actions when the slots are passed', function () {
      const wrapper = getWrapper(taxonomyFeedbackBox, {
        props: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times']
        },
        global: {
          components: {
            'geo-feedback-box': GeoFeedbackBox
          },
          stubs: {
            'font-awesome-icon': FontAwesomeIconMock,
            GeoFeedbackBox
          }
        },
        slots: {
          actions: '<a slot="actions">Run test action</a>'
        }
      })
      expect(wrapper.find('a').text()).toBe('Run test action')
    })

    it('Should display correct icon when passed as a property', function () {
      const wrapper = getWrapper(taxonomyFeedbackBox, {
        props: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times']
        },
        global: {
          components: {
            'geo-feedback-box': GeoFeedbackBox
          },
          stubs: {
            'font-awesome-icon': FontAwesomeIconMock,
            GeoFeedbackBox
          }
        }
      })
      expectFontAwesomeIconProp(wrapper.findComponent(FontAwesomeIconMock), ['far', 'image'])
    })

    it('Should add extra class if floating is passed as true', function () {
      const wrapper = getWrapper(taxonomyFeedbackBox, {
        props: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times'],
          floating: true
        },
        global: {
          components: {
            'geo-feedback-box': GeoFeedbackBox
          },
          stubs: {
            'font-awesome-icon': FontAwesomeIconMock
          }
        }
      })
      console.log(wrapper.html())

      expect(wrapper.find('.geo-feedback-box--floating').exists()).toBe(true)
    })

    it('Shouldn\'t add extra class if floating is not passed', function () {
      const wrapper = getWrapper(taxonomyFeedbackBox, {
        props: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times']
        },
        global: {
          components: {
            'geo-feedback-box': GeoFeedbackBox
          },
          stubs: {
            'font-awesome-icon': FontAwesomeIconMock,
            GeoFeedbackBox
          }
        }
      })

      expect(wrapper.find('.geo-feedback-box--floating').exists()).toBe(false)
    })
  })
})
