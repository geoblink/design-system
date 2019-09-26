import _ from 'lodash'
import { createLocalVue, mount } from '@vue/test-utils'
import GeoFileUpload from '@/elements/GeoFileUpload/GeoFileUpload.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import * as sinon from 'sinon'

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

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-file-upload', GeoFileUpload)

describe('GeoFileUpload', () => {
  const sandbox = sinon.createSandbox()

  beforeEach(() => {
    sandbox.restore()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('Should render GeoFileUpload component', function () {
    const wrapper = mount(GeoFileUpload, {
      propsData: {
        status: 'initial'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    expect(wrapper.find('.geo-file-upload').exists()).toBe(true)
  })

  it('Should apply a CSS suffix when the modifier is provided', function () {
    const wrapper = mount(GeoFileUpload, {
      propsData: {
        status: 'initial',
        cssModifier: 'test'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    expect(wrapper.find('.geo-file-upload--test').exists()).toBe(true)
  })

  it('Should check status validator is correct', () => {
    sandbox.stub(console, 'warn').returns({})

    const consoleWarnSpy = jest.spyOn(console, 'warn')

    const status = GeoFileUpload.props.status
    expect(status.validator('initial')).toBeTruthy()
    expect(status.validator('loading')).toBeTruthy()
    expect(status.validator('test')).toBeFalsy()
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
  })

  it('Should display correct icon when status is "initial"', () => {
    const wrapper = mount(GeoFileUpload, {
      propsData: {
        status: 'initial'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      }
    })
    const fontAwesomeIconElem = wrapper.find(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fal', 'upload'])
  })

  it('Should display correct uploadIcon', () => {
    const wrapper = mount(GeoFileUpload, {
      propsData: {
        status: 'initial',
        uploadIcon: ['fas', 'bell']
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      }
    })
    const fontAwesomeIconElem = wrapper.find(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'bell'])
  })

  it('Should display correct icon when status is "success"', () => {
    const wrapper = mount(GeoFileUpload, {
      propsData: {
        status: 'success'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      }
    })
    const fontAwesomeIconElem = wrapper.find(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fal', 'check-circle'])
  })

  it('Should display correct successIcon', () => {
    const wrapper = mount(GeoFileUpload, {
      propsData: {
        status: 'success',
        successIcon: ['fas', 'bell']
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      }
    })
    const fontAwesomeIconElem = wrapper.find(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'bell'])
  })

  it('Should display correct icon when status is "error"', () => {
    const wrapper = mount(GeoFileUpload, {
      propsData: {
        status: 'error'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      }
    })
    const fontAwesomeIconElem = wrapper.find(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fal', 'exclamation-triangle'])
  })

  it('Should render correct errorIcon', () => {
    const wrapper = mount(GeoFileUpload, {
      propsData: {
        status: 'error',
        errorIcon: ['fas', 'bell']
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      }
    })
    const fontAwesomeIconElem = wrapper.find(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'bell'])
  })

  it('Should display correct icon when status is "warning"', () => {
    const wrapper = mount(GeoFileUpload, {
      propsData: {
        status: 'warning'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      }
    })
    const fontAwesomeIconElem = wrapper.find(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fal', 'exclamation-triangle'])
  })

  it('Should display correct warningIcon', () => {
    const wrapper = mount(GeoFileUpload, {
      propsData: {
        status: 'warning',
        warningIcon: ['fas', 'bell']
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      }
    })
    const fontAwesomeIconElem = wrapper.find(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'bell'])
  })

  it('Should display default loading slot', () => {
    const wrapper = mount(GeoFileUpload, {
      propsData: {
        status: 'loading'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon,
        'geo-activity-indicator': true
      }
    })
    expect(wrapper.find('geo-activity-indicator-stub').exists()).toBe(true)

    wrapper.setProps({ status: 'initial' })
    expect(wrapper.find('geo-activity-indicator-stub').exists()).toBe(false)
  })

  it('Should display correct loading slot when provided and status as loading', () => {
    const wrapper = mount(GeoFileUpload, {
      propsData: {
        status: 'loading'
      },
      slots: {
        loading: [`<span class="loading-slot">loading</span>`]
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon,
        'geo-activity-indicator': true
      }
    })
    expect(wrapper.find('geo-activity-indicator-stub').exists()).toBe(false)
    expect(wrapper.find('.loading-slot').text()).toBe('loading')
  })

  it('Should display title slot', () => {
    const wrapper = mount(GeoFileUpload, {
      propsData: {
        status: 'initial'
      },
      slots: {
        title: [`<span class="title-slot">title</span>`]
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    expect(wrapper.find('.title-slot').text()).toBe('title')
  })

  it('Should display help slot', () => {
    const wrapper = mount(GeoFileUpload, {
      propsData: {
        status: 'initial'
      },
      slots: {
        help: [`<span class="help-slot">help</span>`]
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    expect(wrapper.find('.help-slot').text()).toBe('help')
  })

  it('Should correctly call handleDragenter when triggering dragenter', () => {
    const handleDragenterSpy = jest.spyOn(GeoFileUpload.methods, 'handleDragenter')
    const wrapper = mount(GeoFileUpload, {
      propsData: {
        status: 'initial'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    wrapper.find('.geo-file-upload').trigger('dragenter')
    expect(handleDragenterSpy).toBeCalled()
    expect(wrapper.vm.isFocused).toBe(true)
  })

  it('Should correctly call handleDragleave when triggering dragleave', () => {
    const handleDragleaveSpy = jest.spyOn(GeoFileUpload.methods, 'handleDragleave')
    const wrapper = mount(GeoFileUpload, {
      propsData: {
        status: 'initial'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    wrapper.find('.geo-file-upload').trigger('dragleave')
    expect(handleDragleaveSpy).toBeCalled()
    expect(wrapper.vm.isFocused).toBe(false)
  })

  it('Should correctly call handleDragover when triggering dragover.prevent', () => {
    const handleDragoverSpy = jest.spyOn(GeoFileUpload.methods, 'handleDragover')
    const wrapper = mount(GeoFileUpload, {
      propsData: {
        status: 'initial'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    wrapper.find('.geo-file-upload').trigger('dragover.prevent')
    expect(handleDragoverSpy).toBeCalled()
    expect(wrapper.vm.isFocused).toBe(true)
  })

  it('Should correctly call handleDragexit when triggering dragexit', () => {
    const handleDragexitSpy = jest.spyOn(GeoFileUpload.methods, 'handleDragexit')
    const wrapper = mount(GeoFileUpload, {
      propsData: {
        status: 'initial'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    wrapper.find('.geo-file-upload').trigger('dragexit')
    expect(handleDragexitSpy).toBeCalled()
    expect(wrapper.vm.isFocused).toBe(false)
  })

  it('Should call handleDrop when triggering drop.prevent', () => {
    const handleDropSpy = jest.spyOn(GeoFileUpload.methods, 'handleDrop')
    const wrapper = mount(GeoFileUpload, {
      propsData: {
        status: 'initial'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    wrapper.find('.geo-file-upload').trigger('drop.prevent')
    expect(handleDropSpy).toBeCalled()
  })

  it('Should emit pick-file event when calling pickFile', () => {
    const wrapper = mount(GeoFileUpload, {
      propsData: {
        status: 'initial'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    wrapper.vm.pickFile()
    expect(wrapper.vm.isFocused).toBe(false)
    expect(wrapper.emitted()['pick-file']).toBeTruthy()
  })

  it('Should correctly call openPickDialog when triggering click', () => {
    const openPickDialogSpy = jest.spyOn(GeoFileUpload.methods, 'openPickDialog')
    const wrapper = mount(GeoFileUpload, {
      propsData: {
        status: 'initial'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    wrapper.find('.geo-file-upload').trigger('click')
    expect(openPickDialogSpy).toBeCalled()
    expect(wrapper.vm.isFocused).toBe(true)
    expect(wrapper.emitted()['open-pick-dialog']).toBeTruthy()
  })

  it('Should call handleFilePick when triggering change', () => {
    const handleFilePickSpy = jest.spyOn(GeoFileUpload.methods, 'handleFilePick')
    const wrapper = mount(GeoFileUpload, {
      propsData: {
        status: 'initial'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    wrapper.find('.geo-file-upload__input').trigger('change')
    expect(handleFilePickSpy).toBeCalled()
  })
})
