import _ from 'lodash'
import { createLocalVue, mount } from '@vue/test-utils'
import GeoTablePagination from '@/elements/GeoTable/GeoTablePagination'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

const iconsToMock = [
  'faChevronLeft',
  'faChevronRight',
  'faStepBackward',
  'faStepForward'
]
const mockedFalIcons = _.mapValues(_.pick(fas, iconsToMock), function (original) {
  return _.assign({}, original, {
    prefix: 'fal'
  })
})

library.add(fab, fas, far, mockedFalIcons)

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-table-pagination', GeoTablePagination)

describe('GeoTablePagination', () => {
  it('should render pagination if there are multiple pages', function () {
    const wrapper = mount(GeoTablePagination, {
      propsData: {
        pageSize: 10,
        currentPage: 0,
        sourceDataLength: 20
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    const instance = wrapper.find('.geo-table-pagination')
    expect(instance.exists()).toBe(true)
  })

  it('should render nothing if there\'s only one page', function () {
    const wrapper = mount(GeoTablePagination, {
      propsData: {
        pageSize: 10,
        currentPage: 0,
        sourceDataLength: 10
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    const instance = wrapper.find('.geo-table-pagination')
    expect(instance.exists()).toBe(false)
  })

  it('should render go-to-first-page button if page displayed is not the first one', function () {
    const wrapper = mount(GeoTablePagination, {
      propsData: {
        pageSize: 10,
        currentPage: 1,
        sourceDataLength: 30
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    const button = wrapper.find('.geo-table-pagination__action-first')
    expect(button.exists()).toBe(true)
  })

  it('should render disabled go-to-first-page button if page displayed is the first one', function () {
    const wrapper = mount(GeoTablePagination, {
      propsData: {
        pageSize: 10,
        currentPage: 0,
        sourceDataLength: 30
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    const disabledButton = wrapper.find('.geo-table-pagination__action-first--disabled')
    expect(disabledButton.exists()).toBe(true)

    const enabledButton = wrapper.find('.geo-table-pagination__action-first')
    expect(enabledButton.exists()).toBe(false)
  })

  it('should emit go-to-page event when clicking on go-to-first page button', function () {
    const wrapper = mount(GeoTablePagination, {
      propsData: {
        pageSize: 10,
        currentPage: 2,
        sourceDataLength: 30
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    const button = wrapper.find('.geo-table-pagination__action-first')
    expect(button.exists()).toBe(true)

    button.trigger('click')

    expect(wrapper.emitted()['go-to-page']).toBeTruthy()
    expect(wrapper.emitted()['go-to-page']).toHaveLength(1)
    expect(wrapper.emitted()['go-to-page']).toEqual([[0]])
  })

  it('should render go-to-first-page button if page displayed is not the first one', function () {
    const wrapper = mount(GeoTablePagination, {
      propsData: {
        pageSize: 10,
        currentPage: 1,
        sourceDataLength: 30
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    const button = wrapper.find('.geo-table-pagination__action-first')
    expect(button.exists()).toBe(true)
  })

  it('should allow customizing go-to-first-page button', function () {
    let slotScope
    const wrapper = mount(GeoTablePagination, {
      propsData: {
        pageSize: 10,
        currentPage: 1,
        sourceDataLength: 30
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      scopedSlots: {
        firstPageShortcut (params) {
          slotScope = params
        }
      }
    })

    expect(slotScope).toHaveProperty('hasPreviousPage', true)
    expect(slotScope).toHaveProperty('hasNextPage', true)
    expect(slotScope).toHaveProperty('action')
    slotScope.action()

    expect(wrapper.emitted()['go-to-page']).toBeTruthy()
    expect(wrapper.emitted()['go-to-page']).toHaveLength(1)
    expect(wrapper.emitted()['go-to-page']).toEqual([[0]])

    wrapper.setProps({
      pageSize: 10,
      currentPage: 2,
      sourceDataLength: 30
    })

    expect(slotScope).toHaveProperty('hasPreviousPage', true)
    expect(slotScope).toHaveProperty('hasNextPage', false)

    wrapper.setProps({
      pageSize: 10,
      currentPage: 0,
      sourceDataLength: 30
    })

    expect(slotScope).toHaveProperty('hasPreviousPage', false)
    expect(slotScope).toHaveProperty('hasNextPage', true)
  })

  it('should render go-to-previous-page button if page displayed is not the first one', function () {
    const wrapper = mount(GeoTablePagination, {
      propsData: {
        pageSize: 10,
        currentPage: 1,
        sourceDataLength: 30
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    const button = wrapper.find('.geo-table-pagination__action-prev')
    expect(button.exists()).toBe(true)
  })

  it('should render disabled go-to-previous-page button if page displayed is the first one', function () {
    const wrapper = mount(GeoTablePagination, {
      propsData: {
        pageSize: 10,
        currentPage: 0,
        sourceDataLength: 30
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    const disabledButton = wrapper.find('.geo-table-pagination__action-prev--disabled')
    expect(disabledButton.exists()).toBe(true)

    const enabledButton = wrapper.find('.geo-table-pagination__action-prev')
    expect(enabledButton.exists()).toBe(false)
  })

  it('should emit go-to-page event when clicking on go-to-previous page button', function () {
    const wrapper = mount(GeoTablePagination, {
      propsData: {
        pageSize: 10,
        currentPage: 2,
        sourceDataLength: 30
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    const button = wrapper.find('.geo-table-pagination__action-prev')
    expect(button.exists()).toBe(true)

    button.trigger('click')

    expect(wrapper.emitted()['go-to-page']).toBeTruthy()
    expect(wrapper.emitted()['go-to-page']).toHaveLength(1)
    expect(wrapper.emitted()['go-to-page']).toEqual([[1]])
  })

  it('should render go-to-previous-page button if page displayed is not the first one', function () {
    const wrapper = mount(GeoTablePagination, {
      propsData: {
        pageSize: 10,
        currentPage: 1,
        sourceDataLength: 30
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    const button = wrapper.find('.geo-table-pagination__action-prev')
    expect(button.exists()).toBe(true)
  })

  it('should allow customizing go-to-previous-page button', function () {
    let slotScope
    const wrapper = mount(GeoTablePagination, {
      propsData: {
        pageSize: 10,
        currentPage: 2,
        sourceDataLength: 30
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      scopedSlots: {
        prevPageShortcut (params) {
          slotScope = params
        }
      }
    })

    expect(slotScope).toHaveProperty('hasPreviousPage', true)
    expect(slotScope).toHaveProperty('hasNextPage', false)
    expect(slotScope).toHaveProperty('action')
    slotScope.action()

    expect(wrapper.emitted()['go-to-page']).toBeTruthy()
    expect(wrapper.emitted()['go-to-page']).toHaveLength(1)
    expect(wrapper.emitted()['go-to-page']).toEqual([[1]])

    wrapper.setProps({
      pageSize: 10,
      currentPage: 1,
      sourceDataLength: 30
    })

    expect(slotScope).toHaveProperty('hasPreviousPage', true)
    expect(slotScope).toHaveProperty('hasNextPage', true)

    wrapper.setProps({
      pageSize: 10,
      currentPage: 0,
      sourceDataLength: 30
    })

    expect(slotScope).toHaveProperty('hasPreviousPage', false)
    expect(slotScope).toHaveProperty('hasNextPage', true)
  })

  it('should render go-to-next-page button if page displayed is not the last one', function () {
    const wrapper = mount(GeoTablePagination, {
      propsData: {
        pageSize: 10,
        currentPage: 1,
        sourceDataLength: 30
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    const button = wrapper.find('.geo-table-pagination__action-next')
    expect(button.exists()).toBe(true)
  })

  it('should render disabled go-to-next-page button if page displayed is the last one', function () {
    const wrapper = mount(GeoTablePagination, {
      propsData: {
        pageSize: 10,
        currentPage: 2,
        sourceDataLength: 30
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    const disabledButton = wrapper.find('.geo-table-pagination__action-next--disabled')
    expect(disabledButton.exists()).toBe(true)

    const enabledButton = wrapper.find('.geo-table-pagination__action-next')
    expect(enabledButton.exists()).toBe(false)
  })

  it('should emit go-to-page event when clicking on go-to-next page button', function () {
    const wrapper = mount(GeoTablePagination, {
      propsData: {
        pageSize: 10,
        currentPage: 0,
        sourceDataLength: 30
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    const button = wrapper.find('.geo-table-pagination__action-next')
    expect(button.exists()).toBe(true)

    button.trigger('click')

    expect(wrapper.emitted()['go-to-page']).toBeTruthy()
    expect(wrapper.emitted()['go-to-page']).toHaveLength(1)
    expect(wrapper.emitted()['go-to-page']).toEqual([[1]])
  })

  it('should render go-to-next-page button if page displayed is not the last one', function () {
    const wrapper = mount(GeoTablePagination, {
      propsData: {
        pageSize: 10,
        currentPage: 1,
        sourceDataLength: 30
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    const button = wrapper.find('.geo-table-pagination__action-next')
    expect(button.exists()).toBe(true)
  })

  it('should allow customizing go-to-next-page button', function () {
    let slotScope
    const wrapper = mount(GeoTablePagination, {
      propsData: {
        pageSize: 10,
        currentPage: 1,
        sourceDataLength: 30
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      scopedSlots: {
        nextPageShortcut (params) {
          slotScope = params
        }
      }
    })

    expect(slotScope).toHaveProperty('hasPreviousPage', true)
    expect(slotScope).toHaveProperty('hasNextPage', true)
    expect(slotScope).toHaveProperty('action')
    slotScope.action()

    expect(wrapper.emitted()['go-to-page']).toBeTruthy()
    expect(wrapper.emitted()['go-to-page']).toHaveLength(1)
    expect(wrapper.emitted()['go-to-page']).toEqual([[2]])

    wrapper.setProps({
      pageSize: 10,
      currentPage: 2,
      sourceDataLength: 30
    })

    expect(slotScope).toHaveProperty('hasPreviousPage', true)
    expect(slotScope).toHaveProperty('hasNextPage', false)

    wrapper.setProps({
      pageSize: 10,
      currentPage: 0,
      sourceDataLength: 30
    })

    expect(slotScope).toHaveProperty('hasPreviousPage', false)
    expect(slotScope).toHaveProperty('hasNextPage', true)
  })

  it('should render go-to-last-page button if page displayed is not the last one', function () {
    const wrapper = mount(GeoTablePagination, {
      propsData: {
        pageSize: 10,
        currentPage: 1,
        sourceDataLength: 30
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    const button = wrapper.find('.geo-table-pagination__action-last')
    expect(button.exists()).toBe(true)
  })

  it('should render disabled go-to-last-page button if page displayed is the last one', function () {
    const wrapper = mount(GeoTablePagination, {
      propsData: {
        pageSize: 10,
        currentPage: 2,
        sourceDataLength: 30
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    const disabledButton = wrapper.find('.geo-table-pagination__action-last--disabled')
    expect(disabledButton.exists()).toBe(true)

    const enabledButton = wrapper.find('.geo-table-pagination__action-last')
    expect(enabledButton.exists()).toBe(false)
  })

  it('should emit go-to-page event when clicking on go-to-last page button', function () {
    const wrapper = mount(GeoTablePagination, {
      propsData: {
        pageSize: 10,
        currentPage: 0,
        sourceDataLength: 30
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    const button = wrapper.find('.geo-table-pagination__action-last')
    expect(button.exists()).toBe(true)

    button.trigger('click')

    expect(wrapper.emitted()['go-to-page']).toBeTruthy()
    expect(wrapper.emitted()['go-to-page']).toHaveLength(1)
    expect(wrapper.emitted()['go-to-page']).toEqual([[2]])
  })

  it('should render go-to-last-page button if page displayed is not the last one', function () {
    const wrapper = mount(GeoTablePagination, {
      propsData: {
        pageSize: 10,
        currentPage: 1,
        sourceDataLength: 30
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    const button = wrapper.find('.geo-table-pagination__action-last')
    expect(button.exists()).toBe(true)
  })

  it('should allow customizing go-to-last-page button', function () {
    let slotScope
    const wrapper = mount(GeoTablePagination, {
      propsData: {
        pageSize: 10,
        currentPage: 0,
        sourceDataLength: 30
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      scopedSlots: {
        lastPageShortcut (params) {
          slotScope = params
        }
      }
    })

    expect(slotScope).toHaveProperty('hasPreviousPage', false)
    expect(slotScope).toHaveProperty('hasNextPage', true)
    expect(slotScope).toHaveProperty('action')
    slotScope.action()

    expect(wrapper.emitted()['go-to-page']).toBeTruthy()
    expect(wrapper.emitted()['go-to-page']).toHaveLength(1)
    expect(wrapper.emitted()['go-to-page']).toEqual([[2]])

    wrapper.setProps({
      pageSize: 10,
      currentPage: 2,
      sourceDataLength: 30
    })

    expect(slotScope).toHaveProperty('hasPreviousPage', true)
    expect(slotScope).toHaveProperty('hasNextPage', false)

    wrapper.setProps({
      pageSize: 10,
      currentPage: 1,
      sourceDataLength: 30
    })

    expect(slotScope).toHaveProperty('hasPreviousPage', true)
    expect(slotScope).toHaveProperty('hasNextPage', true)
  })

  it('should apply CSS suffix when the modifier is provided', function () {
    const inactiveWrapper = mount(GeoTablePagination, {
      propsData: {
        cssModifier: 'demo-modifier',
        pageSize: 10,
        currentPage: 0,
        sourceDataLength: 20
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })

    expect(inactiveWrapper.find('.geo-table-pagination--demo-modifier').exists()).toBe(true)
  })
})
