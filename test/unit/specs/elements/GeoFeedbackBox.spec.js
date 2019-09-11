import sinon from 'sinon'
import { createLocalVue, mount } from '@vue/test-utils'
import GeoFeedbackBox from '@/elements/GeoFeedbackBox/GeoFeedbackBox.vue'
import GeoErrorFeedbackBox from '@/elements/GeoFeedbackBox/GeoErrorFeedbackBox.vue'
import GeoInfoFeedbackBox from '@/elements/GeoFeedbackBox/GeoInfoFeedbackBox.vue'
import GeoProgressFeedbackBox from '@/elements/GeoFeedbackBox/GeoProgressFeedbackBox.vue'
import GeoSuccessFeedbackBox from '@/elements/GeoFeedbackBox/GeoSuccessFeedbackBox.vue'
import GeoWarningFeedbackBox from '@/elements/GeoFeedbackBox/GeoWarningFeedbackBox.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fab, fas, far)
// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-feedback-box', GeoFeedbackBox)

describe('GeoFeedbackBox', () => {
  it('Should render alert component', function () {
    const wrapper = mount(GeoFeedbackBox, {
      propsData: {
        variant: 'success'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })

    expect(wrapper.find('.geo-feedback-box').exists()).toBe(true)
  })

  it('Should show the close button if close listener is provided', function () {
    const wrapper = mount(GeoFeedbackBox, {
      propsData: {
        variant: 'success',
        closeIcon: ['fas', 'times']
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      listeners: {
        close: function () {}
      }
    })
    expect(wrapper.find('.geo-feedback-box').exists()).toBe(true)
    expect(wrapper.find('.geo-feedback-box__content__close-icon').exists()).toBe(true)
    expect(wrapper.vm).toHaveProperty('shouldShowCloseButton', true)
  })

  it('Shouldn\'t show the close button if close listener is not provided', function () {
    const wrapper = mount(GeoFeedbackBox, {
      propsData: {
        variant: 'success'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    expect(wrapper.find('.geo-feedback-box').exists()).toBe(true)
    expect(wrapper.find('.geo-feedback-box__content__close-icon').exists()).toBe(false)
    expect(wrapper.vm).toHaveProperty('shouldShowCloseButton', false)
  })

  it('Should emit a close event when clicking on the close button', function () {
    const wrapper = mount(GeoFeedbackBox, {
      propsData: {
        variant: 'success',
        closeIcon: ['fas', 'times']
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      listeners: {
        close: function () {}
      }
    })
    wrapper.find('.geo-feedback-box__content__close-icon').trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('Should display actions when the slots are passed', function () {
    const wrapper = mount(GeoFeedbackBox, {
      propsData: {
        variant: 'success'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      slots: {
        actions: '<a slot="actions">Run test action</a>'
      }
    })
    expect(wrapper.find('a').text()).toBe('Run test action')
  })

  it('Should display correct icon when passed as a slot', function () {
    const wrapper = mount(GeoFeedbackBox, {
      propsData: {
        variant: 'success'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
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
    expect(wrapper.find('.fa-circle-notch').exists()).toBe(true)
  })

  it('Should apply a CSS suffix when the modifier is provided', function () {
    const wrapper = mount(GeoFeedbackBox, {
      propsData: {
        variant: 'success',
        closeIcon: ['fas', 'times'],
        cssModifier: 'test-feedback-box'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      listeners: {
        close: function () {}
      }
    })
    expect(wrapper.find('.geo-feedback-box__content__close-icon--test-feedback-box').exists()).toBe(true)
  })

  it('Should add extra class if floating is passed as true', function () {
    const wrapper = mount(GeoFeedbackBox, {
      propsData: {
        variant: 'success',
        floating: true
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })

    expect(wrapper.find('.geo-feedback-box--floating').exists()).toBe(true)
  })

  it('Shouldn\'t add extra class if floating is not passed', function () {
    const wrapper = mount(GeoFeedbackBox, {
      propsData: {
        variant: 'success'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })

    expect(wrapper.find('.geo-feedback-box--floating').exists()).toBe(false)
  })

  it('Should check variant prop is valid', function () {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })
    afterEach(() => spy.mockReset())

    const wrapper = mount(GeoFeedbackBox, {
      propsData: {
        variant: 'success'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })

    const variantProp = wrapper.vm.$options.props.variant

    expect(variantProp.required).toBeTruthy()
    expect(variantProp.type).toBe(String)
    expect(variantProp.validator && variantProp.validator('qwerty')).toBeFalsy()
    expect(spy).toBeCalledWith(expect.stringContaining('GeoFeedbackBox [component] :: Unsupported value («qwerty») for «variant» property.'))
    expect(variantProp.validator && variantProp.validator('info')).toBeTruthy()
  })
})

const taxonomyFeedbackBoxs = [GeoErrorFeedbackBox, GeoInfoFeedbackBox, GeoProgressFeedbackBox, GeoSuccessFeedbackBox, GeoWarningFeedbackBox]

describe('GeoFeedbackBox Children', () => {
  taxonomyFeedbackBoxs.forEach((taxonomyFeedbackBox) => {
    it('Should render alert component', function () {
      const wrapper = mount(taxonomyFeedbackBox, {
        propsData: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times']
        },
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoFeedbackBox
        }
      })

      expect(wrapper.find('.geo-feedback-box').exists()).toBe(true)
    })

    it('Should show the close button if close listener is provided', function () {
      const wrapper = mount(taxonomyFeedbackBox, {
        propsData: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times']
        },
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoFeedbackBox
        },
        listeners: {
          close: function () {}
        }
      })
      expect(wrapper.find('.geo-feedback-box').exists()).toBe(true)
      expect(wrapper.find('.geo-feedback-box__content__close-icon').exists()).toBe(true)
      expect(wrapper.vm).toHaveProperty('shouldShowCloseButton', true)
    })

    it('Shouldn\'t show the close button if close listener is not provided', function () {
      const wrapper = mount(taxonomyFeedbackBox, {
        propsData: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times']
        },
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoFeedbackBox
        }
      })
      expect(wrapper.find('.geo-feedback-box').exists()).toBe(true)
      expect(wrapper.vm).toHaveProperty('shouldShowCloseButton', false)
      expect(wrapper.find('.geo-feedback-box__content__close-icon').exists()).toBe(false)
    })

    it('Should emit a close event when clicking on the close button', function () {
      const closeStub = sinon.spy()
      const wrapper = mount(taxonomyFeedbackBox, {
        propsData: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times']
        },
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoFeedbackBox
        },
        listeners: {
          close: closeStub
        }
      })
      wrapper.find('.geo-feedback-box__content__close-icon').trigger('click')
      expect(closeStub).toHaveProperty('calledOnce', true)
    })

    it('Should display actions when the slots are passed', function () {
      const wrapper = mount(taxonomyFeedbackBox, {
        propsData: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times']
        },
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoFeedbackBox
        },
        slots: {
          actions: '<a slot="actions">Run test action</a>'
        }
      })
      expect(wrapper.find('a').text()).toBe('Run test action')
    })

    it('Should display correct icon when passed as a property', function () {
      const wrapper = mount(taxonomyFeedbackBox, {
        propsData: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times']
        },
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoFeedbackBox
        }
      })
      expect(wrapper.find('.fa-image').exists()).toBe(true)
    })

    it('Should apply a CSS suffix when the modifier is provided', function () {
      const closeStub = sinon.spy()
      const wrapper = mount(taxonomyFeedbackBox, {
        propsData: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times'],
          cssModifier: 'test-feedback-box'
        },
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoFeedbackBox
        },
        listeners: {
          close: closeStub
        }
      })
      expect(wrapper.find('.geo-feedback-box__content__close-icon--test-feedback-box').exists()).toBe(true)
    })

    it('Should add extra class if floating is passed as true', function () {
      const wrapper = mount(taxonomyFeedbackBox, {
        propsData: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times'],
          floating: true
        },
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoFeedbackBox
        }
      })

      expect(wrapper.find('.geo-feedback-box--floating').exists()).toBe(true)
    })

    it('Shouldn\'t add extra class if floating is not passed', function () {
      const wrapper = mount(taxonomyFeedbackBox, {
        propsData: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times']
        },
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoFeedbackBox
        }
      })

      expect(wrapper.find('.geo-feedback-box--floating').exists()).toBe(false)
    })
  })
})
