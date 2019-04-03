import sinon from 'sinon'
import { createLocalVue, mount } from '@vue/test-utils'
import GeoAlert from '@/elements/GeoAlert/GeoAlert.vue'
import GeoErrorAlert from '@/elements/GeoAlert/GeoErrorAlert.vue'
import GeoInfoAlert from '@/elements/GeoAlert/GeoInfoAlert.vue'
import GeoProgressAlert from '@/elements/GeoAlert/GeoProgressAlert.vue'
import GeoSuccessAlert from '@/elements/GeoAlert/GeoSuccessAlert.vue'
import GeoWarningAlert from '@/elements/GeoAlert/GeoWarningAlert.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fab, fas, far)
// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-alert', GeoAlert)

describe('GeoAlert', () => {
  it('should render alert component', function () {
    const wrapper = mount(GeoAlert, {
      propsData: {
        variant: 'success'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })

    expect(wrapper.find('.geo-alert').exists()).toBe(true)
  })

  it('should show the close button if close listener is provided', function () {
    const wrapper = mount(GeoAlert, {
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
    expect(wrapper.find('.geo-alert').exists()).toBe(true)
    expect(wrapper.find('.geo-alert__content__close-icon').exists()).toBe(true)
    expect(wrapper.vm).toHaveProperty('shouldShowCloseButton', true)
  })

  it('shouldn\'t show the close button if close listener is not provided', function () {
    const wrapper = mount(GeoAlert, {
      propsData: {
        variant: 'success'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    expect(wrapper.find('.geo-alert').exists()).toBe(true)
    expect(wrapper.find('.geo-alert__content__close-icon').exists()).toBe(false)
    expect(wrapper.vm).toHaveProperty('shouldShowCloseButton', false)
  })

  it('should emit a close event when clicking on the close button', function () {
    const wrapper = mount(GeoAlert, {
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
    wrapper.find('.geo-alert__content__close-icon').trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('should display actions when the slots are passed', function () {
    const wrapper = mount(GeoAlert, {
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

  it('should display correct icon when passed as a slot', function () {
    const wrapper = mount(GeoAlert, {
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

  it('should apply a CSS suffix when the modifier is provided', function () {
    const wrapper = mount(GeoAlert, {
      propsData: {
        variant: 'success',
        closeIcon: ['fas', 'times'],
        cssModifier: 'test-alert'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      listeners: {
        close: function () {}
      }
    })
    expect(wrapper.find('.geo-alert__content__close-icon--test-alert').exists()).toBe(true)
  })

  it('should add extra class if floating is passed as true', function () {
    const wrapper = mount(GeoAlert, {
      propsData: {
        variant: 'success',
        floating: true
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })

    expect(wrapper.find('.geo-alert--floating').exists()).toBe(true)
  })

  it('shouldn\'t add extra class if floating is not passed', function () {
    const wrapper = mount(GeoAlert, {
      propsData: {
        variant: 'success'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })

    expect(wrapper.find('.geo-alert--floating').exists()).toBe(false)
  })

  it('Should check variant prop is valid', function () {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })
    afterEach(() => spy.mockReset())

    const wrapper = mount(GeoAlert, {
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
    expect(spy).toBeCalledWith(expect.stringContaining('GeoAlert [component] :: Unsupported value («qwerty») for «variant» property.'))
    expect(variantProp.validator && variantProp.validator('info')).toBeTruthy()
  })
})

const taxonomyAlerts = [GeoErrorAlert, GeoInfoAlert, GeoProgressAlert, GeoSuccessAlert, GeoWarningAlert]

describe('GeoAlert Children', () => {
  taxonomyAlerts.forEach((taxonomyAlert) => {
    it('should render alert component', function () {
      const wrapper = mount(taxonomyAlert, {
        propsData: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times']
        },
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoAlert
        }
      })

      expect(wrapper.find('.geo-alert').exists()).toBe(true)
    })

    it('should show the close button if close listener is provided', function () {
      const wrapper = mount(taxonomyAlert, {
        propsData: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times']
        },
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoAlert
        },
        listeners: {
          close: function () {}
        }
      })
      expect(wrapper.find('.geo-alert').exists()).toBe(true)
      expect(wrapper.find('.geo-alert__content__close-icon').exists()).toBe(true)
      expect(wrapper.vm).toHaveProperty('shouldShowCloseButton', true)
    })

    it('shouldn\'t show the close button if close listener is not provided', function () {
      const wrapper = mount(taxonomyAlert, {
        propsData: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times']
        },
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoAlert
        }
      })
      expect(wrapper.find('.geo-alert').exists()).toBe(true)
      expect(wrapper.vm).toHaveProperty('shouldShowCloseButton', false)
      expect(wrapper.find('.geo-alert__content__close-icon').exists()).toBe(false)
    })

    it('should emit a close event when clicking on the close button', function () {
      const closeStub = sinon.spy()
      const wrapper = mount(taxonomyAlert, {
        propsData: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times']
        },
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoAlert
        },
        listeners: {
          close: closeStub
        }
      })
      wrapper.find('.geo-alert__content__close-icon').trigger('click')
      expect(closeStub).toHaveProperty('calledOnce', true)
    })

    it('should display actions when the slots are passed', function () {
      const wrapper = mount(taxonomyAlert, {
        propsData: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times']
        },
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoAlert
        },
        slots: {
          actions: '<a slot="actions">Run test action</a>'
        }
      })
      expect(wrapper.find('a').text()).toBe('Run test action')
    })

    it('should display correct icon when passed as a property', function () {
      const wrapper = mount(taxonomyAlert, {
        propsData: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times']
        },
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoAlert
        }
      })
      expect(wrapper.find('.fa-image').exists()).toBe(true)
    })

    it('should apply a CSS suffix when the modifier is provided', function () {
      const closeStub = sinon.spy()
      const wrapper = mount(taxonomyAlert, {
        propsData: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times'],
          cssModifier: 'test-alert'
        },
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoAlert
        },
        listeners: {
          close: closeStub
        }
      })
      expect(wrapper.find('.geo-alert__content__close-icon--test-alert').exists()).toBe(true)
    })

    it('should add extra class if floating is passed as true', function () {
      const wrapper = mount(taxonomyAlert, {
        propsData: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times'],
          floating: true
        },
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoAlert
        }
      })

      expect(wrapper.find('.geo-alert--floating').exists()).toBe(true)
    })

    it('shouldn\'t add extra class if floating is not passed', function () {
      const wrapper = mount(taxonomyAlert, {
        propsData: {
          icon: ['far', 'image'],
          closeIcon: ['fas', 'times']
        },
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoAlert
        }
      })

      expect(wrapper.find('.geo-alert--floating').exists()).toBe(false)
    })
  })
})
