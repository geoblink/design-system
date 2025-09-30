import _ from 'lodash'
import { mount } from '@vue/test-utils'
import GeoFileUpload from '@/elements/GeoFileUpload/GeoFileUpload.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

const iconsToMock = [
  'faUpload',
  'faCheckCircle',
  'faExclamationTriangle'
]
const mockedFalIcons = _.mapValues(_.pick(fas, iconsToMock), (original) => {
  return _.assign({}, original, {
    prefix: 'fal'
  })
})
library.add(mockedFalIcons)

// Helper function to create wrapper with registered components
function createWrapper (component, options = {}) {
  const defaultOptions = {
    global: {
      components: {
        'geo-file-upload': GeoFileUpload
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock,
        'geo-activity-indicator': true
      }
    }
  }
  return mount(component, _.merge({}, defaultOptions, options))
}

describe('GeoFileUpload', () => {
  it('Should render GeoFileUpload component', function () {
    const wrapper = createWrapper(GeoFileUpload, {
      props: {
        status: 'initial'
      }
    })
    expect(wrapper.find('.geo-file-upload').exists()).toBe(true)
  })

  it('Should check status validator is correct', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    const status = GeoFileUpload.props.status
    expect(status.validator('initial')).toBeTruthy()
    expect(status.validator('loading')).toBeTruthy()
    expect(status.validator('test')).toBeFalsy()
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
    consoleWarnSpy.mockRestore()
  })

  it('Should display correct icon depending on the status', async () => {
    const wrapper = createWrapper(GeoFileUpload, {
      props: {
        status: 'initial'
      },
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      }
    })
    const fontAwesomeIconElem = wrapper.findComponent({ name: 'font-awesome-icon' })
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fal', 'upload'])

    await wrapper.setProps({ status: 'success' })
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fal', 'check-circle'])

    await wrapper.setProps({ status: 'error' })
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fal', 'exclamation-triangle'])

    await wrapper.setProps({ status: 'warning' })
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fal', 'exclamation-triangle'])
  })

  it('Should display correct uploadIcon', () => {
    const wrapper = createWrapper(GeoFileUpload, {
      props: {
        status: 'initial',
        uploadIcon: ['fas', 'bell']
      },
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      }
    })
    const fontAwesomeIconElem = wrapper.findComponent({ name: 'font-awesome-icon' })
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'bell'])
  })

  it('Should display correct successIcon', () => {
    const wrapper = createWrapper(GeoFileUpload, {
      props: {
        status: 'success',
        successIcon: ['fas', 'bell']
      },
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      }
    })
    const fontAwesomeIconElem = wrapper.findComponent({ name: 'font-awesome-icon' })
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'bell'])
  })

  it('Should render correct errorIcon', () => {
    const wrapper = createWrapper(GeoFileUpload, {
      props: {
        status: 'error',
        errorIcon: ['fas', 'bell']
      },
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      }
    })
    const fontAwesomeIconElem = wrapper.findComponent({ name: 'font-awesome-icon' })
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'bell'])
  })

  it('Should display correct warningIcon', () => {
    const wrapper = createWrapper(GeoFileUpload, {
      props: {
        status: 'warning',
        warningIcon: ['fas', 'bell']
      },
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      }
    })
    const fontAwesomeIconElem = wrapper.findComponent({ name: 'font-awesome-icon' })
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'bell'])
  })

  it('Should display default loading slot', async () => {
    const wrapper = createWrapper(GeoFileUpload, {
      props: {
        status: 'loading'
      },
      slots: {},
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock,
          'geo-activity-indicator': true
        }
      }
    })
    expect(wrapper.find('geo-activity-indicator-stub').exists()).toBe(true)

    await wrapper.setProps({ status: 'initial' })
    expect(wrapper.find('geo-activity-indicator-stub').exists()).toBe(false)
  })

  it('Should display correct loading slot when provided and status as loading', () => {
    const wrapper = createWrapper(GeoFileUpload, {
      props: {
        status: 'loading'
      },
      slots: {
        loading: ['<span class="loading-slot">loading</span>']
      },
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock,
          'geo-activity-indicator': true
        }
      }
    })
    expect(wrapper.find('geo-activity-indicator-stub').exists()).toBe(false)
    expect(wrapper.find('.loading-slot').text()).toBe('loading')
  })

  it('Should display title slot', () => {
    const wrapper = createWrapper(GeoFileUpload, {
      props: {
        status: 'initial'
      },
      slots: {
        title: ['<span class="title-slot">title</span>']
      },
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      }
    })
    expect(wrapper.find('.title-slot').text()).toBe('title')
  })

  it('Should display help slot', () => {
    const wrapper = createWrapper(GeoFileUpload, {
      props: {
        status: 'initial'
      },
      slots: {
        help: ['<span class="help-slot">help</span>']
      },
      global: {
        stubs: {
          'font-awesome-icon': FontAwesomeIconMock
        }
      }
    })
    expect(wrapper.find('.help-slot').text()).toBe('help')
  })

  it('Should change isFocused when triggering dragenter', () => {
    const wrapper = createWrapper(GeoFileUpload, {
      props: {
        status: 'initial'
      }
    })
    wrapper.find('.geo-file-upload').trigger('dragenter')
    expect(wrapper.vm.isFocused).toBe(true)
  })

  it('Should change isFocused when triggering dragleave', () => {
    const wrapper = createWrapper(GeoFileUpload, {
      props: {
        status: 'initial'
      }
    })
    wrapper.find('.geo-file-upload').trigger('dragleave')
    expect(wrapper.vm.isFocused).toBe(false)
  })

  it('Should change isFocused when triggering dragover.prevent', () => {
    const wrapper = createWrapper(GeoFileUpload, {
      props: {
        status: 'initial'
      }
    })
    wrapper.find('.geo-file-upload').trigger('dragover.prevent')
    expect(wrapper.vm.isFocused).toBe(true)
  })

  it('Should change isFocused when triggering dragexit', () => {
    const wrapper = createWrapper(GeoFileUpload, {
      props: {
        status: 'initial'
      }
    })
    wrapper.find('.geo-file-upload').trigger('dragexit')
    expect(wrapper.vm.isFocused).toBe(false)
  })

  it('Should emit pick-file event when triggering drop.prevent', () => {
    const wrapper = createWrapper(GeoFileUpload, {
      props: {
        status: 'initial'
      }
    })

    const eventMock = {
      dataTransfer: {
        files: ['someFile']
      }
    }
    wrapper.find('.geo-file-upload').trigger('drop.prevent', eventMock)
    expect(wrapper.vm.isFocused).toBe(false)
    expect(wrapper.emitted()['pick-file']).toBeTruthy()
  })

  it('Should correctly call openPickDialog when triggering click', () => {
    const wrapper = createWrapper(GeoFileUpload, {
      props: {
        status: 'initial'
      }
    })
    wrapper.find('.geo-file-upload').trigger('click')
    expect(wrapper.vm.isFocused).toBe(true)
    expect(wrapper.emitted()['open-pick-dialog']).toBeTruthy()
  })

  it('Should call handleFilePick when triggering change', () => {
    const wrapper = createWrapper(GeoFileUpload, {
      props: {
        status: 'initial'
      }
    })
    wrapper.find('.geo-file-upload__input').trigger('change')
    expect(wrapper.vm.isResettingInputFileField).toBe(false)
  })
})
