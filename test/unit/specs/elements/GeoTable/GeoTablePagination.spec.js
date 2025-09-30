import _ from 'lodash'
import { mount } from '@vue/test-utils'
import GeoTablePagination from '@/elements/GeoTable/GeoTablePagination'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { FontAwesomeIconMock } from 'test/unit/utils/FontAwesomeIconMock.js'
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

function createWrapper (component, options = {}) {
  return mount(component, Object.assign({
    global: {
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      }
    }
  }, options))
}

describe('GeoTablePagination', () => {
  it('Should render pagination if there are multiple pages', function () {
    const wrapper = createWrapper(GeoTablePagination, {
      props: {
        pageSize: 10,
        currentPage: 0,
        sourceDataLength: 20
      }
    })
    const instance = wrapper.find('.geo-table-pagination')
    expect(instance.exists()).toBe(true)
  })

  it('Should render nothing if there\'s only one page', function () {
    const wrapper = createWrapper(GeoTablePagination, {
      props: {
        pageSize: 10,
        currentPage: 0,
        sourceDataLength: 10
      }
    })
    const instance = wrapper.find('.geo-table-pagination')
    expect(instance.exists()).toBe(false)
  })

  it('Should render go-to-first-page button if page displayed is not the first one', function () {
    const wrapper = createWrapper(GeoTablePagination, {
      props: {
        pageSize: 10,
        currentPage: 1,
        sourceDataLength: 30
      }
    })
    const button = wrapper.find('.geo-table-pagination__action-first')
    expect(button.exists()).toBe(true)
  })

  it('Should render disabled go-to-first-page button if page displayed is the first one', function () {
    const wrapper = createWrapper(GeoTablePagination, {
      props: {
        pageSize: 10,
        currentPage: 0,
        sourceDataLength: 30
      }
    })
    const disabledButton = wrapper.find('.geo-table-pagination__action-first--disabled')
    expect(disabledButton.exists()).toBe(true)

    const enabledButton = wrapper.find('.geo-table-pagination__action-first')
    expect(enabledButton.exists()).toBe(false)
  })

  it('Should emit go-to-page event when clicking on go-to-first page button', function () {
    const wrapper = createWrapper(GeoTablePagination, {
      props: {
        pageSize: 10,
        currentPage: 2,
        sourceDataLength: 30
      }
    })
    const button = wrapper.find('.geo-table-pagination__action-first')
    expect(button.exists()).toBe(true)

    button.trigger('click')

    expect(wrapper.emitted()['go-to-page']).toBeTruthy()
    expect(wrapper.emitted()['go-to-page']).toHaveLength(1)
    expect(wrapper.emitted()['go-to-page']).toEqual([[0]])
  })

  it('Should render go-to-first-page button if page displayed is not the first one', function () {
    const wrapper = createWrapper(GeoTablePagination, {
      props: {
        pageSize: 10,
        currentPage: 1,
        sourceDataLength: 30
      }
    })
    const button = wrapper.find('.geo-table-pagination__action-first')
    expect(button.exists()).toBe(true)
  })

  it('Should allow customizing go-to-first-page button', async function () {
    let slotScope
    const wrapper = createWrapper(GeoTablePagination, {
      props: {
        pageSize: 10,
        currentPage: 1,
        sourceDataLength: 30
      },
      slots: {
        firstPageShortcut: (params) => { slotScope = params; return '' }
      }
    })

    expect(slotScope).toHaveProperty('hasPreviousPage', true)
    expect(slotScope).toHaveProperty('hasNextPage', true)
    expect(slotScope).toHaveProperty('action')
    slotScope.action()

    expect(wrapper.emitted()['go-to-page']).toBeTruthy()
    expect(wrapper.emitted()['go-to-page']).toHaveLength(1)
    expect(wrapper.emitted()['go-to-page']).toEqual([[0]])

    await wrapper.setProps({
      pageSize: 10,
      currentPage: 2,
      sourceDataLength: 30
    })

    expect(slotScope).toHaveProperty('hasPreviousPage', true)
    expect(slotScope).toHaveProperty('hasNextPage', false)

    await wrapper.setProps({
      pageSize: 10,
      currentPage: 0,
      sourceDataLength: 30
    })

    expect(slotScope).toHaveProperty('hasPreviousPage', false)
    expect(slotScope).toHaveProperty('hasNextPage', true)
  })

  it('Should render go-to-previous-page button if page displayed is not the first one', function () {
    const wrapper = createWrapper(GeoTablePagination, {
      props: {
        pageSize: 10,
        currentPage: 1,
        sourceDataLength: 30
      }
    })
    const button = wrapper.find('.geo-table-pagination__action-prev')
    expect(button.exists()).toBe(true)
  })

  it('Should render disabled go-to-previous-page button if page displayed is the first one', function () {
    const wrapper = createWrapper(GeoTablePagination, {
      props: {
        pageSize: 10,
        currentPage: 0,
        sourceDataLength: 30
      }
    })
    const disabledButton = wrapper.find('.geo-table-pagination__action-prev--disabled')
    expect(disabledButton.exists()).toBe(true)

    const enabledButton = wrapper.find('.geo-table-pagination__action-prev')
    expect(enabledButton.exists()).toBe(false)
  })

  it('Should emit go-to-page event when clicking on go-to-previous page button', function () {
    const wrapper = createWrapper(GeoTablePagination, {
      props: {
        pageSize: 10,
        currentPage: 2,
        sourceDataLength: 30
      }
    })
    const button = wrapper.find('.geo-table-pagination__action-prev')
    expect(button.exists()).toBe(true)

    button.trigger('click')

    expect(wrapper.emitted()['go-to-page']).toBeTruthy()
    expect(wrapper.emitted()['go-to-page']).toHaveLength(1)
    expect(wrapper.emitted()['go-to-page']).toEqual([[1]])
  })

  it('Should render go-to-previous-page button if page displayed is not the first one', function () {
    const wrapper = createWrapper(GeoTablePagination, {
      props: {
        pageSize: 10,
        currentPage: 1,
        sourceDataLength: 30
      }
    })
    const button = wrapper.find('.geo-table-pagination__action-prev')
    expect(button.exists()).toBe(true)
  })

  it('Should allow customizing go-to-previous-page button', async function () {
    let slotScope
    const wrapper = createWrapper(GeoTablePagination, {
      props: {
        pageSize: 10,
        currentPage: 2,
        sourceDataLength: 30
      },
      slots: {
        prevPageShortcut: (params) => { slotScope = params; return '' }
      }
    })

    expect(slotScope).toHaveProperty('hasPreviousPage', true)
    expect(slotScope).toHaveProperty('hasNextPage', false)
    expect(slotScope).toHaveProperty('action')
    slotScope.action()

    expect(wrapper.emitted()['go-to-page']).toBeTruthy()
    expect(wrapper.emitted()['go-to-page']).toHaveLength(1)
    expect(wrapper.emitted()['go-to-page']).toEqual([[1]])

    await wrapper.setProps({
      pageSize: 10,
      currentPage: 1,
      sourceDataLength: 30
    })

    expect(slotScope).toHaveProperty('hasPreviousPage', true)
    expect(slotScope).toHaveProperty('hasNextPage', true)

    await wrapper.setProps({
      pageSize: 10,
      currentPage: 0,
      sourceDataLength: 30
    })

    expect(slotScope).toHaveProperty('hasPreviousPage', false)
    expect(slotScope).toHaveProperty('hasNextPage', true)
  })

  it('Should render go-to-next-page button if page displayed is not the last one', function () {
    const wrapper = createWrapper(GeoTablePagination, {
      props: {
        pageSize: 10,
        currentPage: 1,
        sourceDataLength: 30
      }
    })
    const button = wrapper.find('.geo-table-pagination__action-next')
    expect(button.exists()).toBe(true)
  })

  it('Should render disabled go-to-next-page button if page displayed is the last one', function () {
    const wrapper = createWrapper(GeoTablePagination, {
      props: {
        pageSize: 10,
        currentPage: 2,
        sourceDataLength: 30
      }
    })
    const disabledButton = wrapper.find('.geo-table-pagination__action-next--disabled')
    expect(disabledButton.exists()).toBe(true)

    const enabledButton = wrapper.find('.geo-table-pagination__action-next')
    expect(enabledButton.exists()).toBe(false)
  })

  it('Should emit go-to-page event when clicking on go-to-next page button', function () {
    const wrapper = createWrapper(GeoTablePagination, {
      props: {
        pageSize: 10,
        currentPage: 0,
        sourceDataLength: 30
      }
    })
    const button = wrapper.find('.geo-table-pagination__action-next')
    expect(button.exists()).toBe(true)

    button.trigger('click')

    expect(wrapper.emitted()['go-to-page']).toBeTruthy()
    expect(wrapper.emitted()['go-to-page']).toHaveLength(1)
    expect(wrapper.emitted()['go-to-page']).toEqual([[1]])
  })

  it('Should render go-to-next-page button if page displayed is not the last one', function () {
    const wrapper = createWrapper(GeoTablePagination, {
      props: {
        pageSize: 10,
        currentPage: 1,
        sourceDataLength: 30
      }
    })
    const button = wrapper.find('.geo-table-pagination__action-next')
    expect(button.exists()).toBe(true)
  })

  it('Should allow customizing go-to-next-page button', async function () {
    let slotScope
    const wrapper = createWrapper(GeoTablePagination, {
      props: {
        pageSize: 10,
        currentPage: 1,
        sourceDataLength: 30
      },
      slots: {
        nextPageShortcut: (params) => { slotScope = params; return '' }
      }
    })

    expect(slotScope).toHaveProperty('hasPreviousPage', true)
    expect(slotScope).toHaveProperty('hasNextPage', true)
    expect(slotScope).toHaveProperty('action')
    slotScope.action()

    expect(wrapper.emitted()['go-to-page']).toBeTruthy()
    expect(wrapper.emitted()['go-to-page']).toHaveLength(1)
    expect(wrapper.emitted()['go-to-page']).toEqual([[2]])

    await wrapper.setProps({
      pageSize: 10,
      currentPage: 2,
      sourceDataLength: 30
    })

    expect(slotScope).toHaveProperty('hasPreviousPage', true)
    expect(slotScope).toHaveProperty('hasNextPage', false)

    await wrapper.setProps({
      pageSize: 10,
      currentPage: 0,
      sourceDataLength: 30
    })

    expect(slotScope).toHaveProperty('hasPreviousPage', false)
    expect(slotScope).toHaveProperty('hasNextPage', true)
  })

  it('Should render go-to-last-page button if page displayed is not the last one', function () {
    const wrapper = createWrapper(GeoTablePagination, {
      props: {
        pageSize: 10,
        currentPage: 1,
        sourceDataLength: 30
      }
    })
    const button = wrapper.find('.geo-table-pagination__action-last')
    expect(button.exists()).toBe(true)
  })

  it('Should render disabled go-to-last-page button if page displayed is the last one', function () {
    const wrapper = createWrapper(GeoTablePagination, {
      props: {
        pageSize: 10,
        currentPage: 2,
        sourceDataLength: 30
      }
    })
    const disabledButton = wrapper.find('.geo-table-pagination__action-last--disabled')
    expect(disabledButton.exists()).toBe(true)

    const enabledButton = wrapper.find('.geo-table-pagination__action-last')
    expect(enabledButton.exists()).toBe(false)
  })

  it('Should emit go-to-page event when clicking on go-to-last page button', function () {
    const wrapper = createWrapper(GeoTablePagination, {
      props: {
        pageSize: 10,
        currentPage: 0,
        sourceDataLength: 30
      }
    })
    const button = wrapper.find('.geo-table-pagination__action-last')
    expect(button.exists()).toBe(true)

    button.trigger('click')

    expect(wrapper.emitted()['go-to-page']).toBeTruthy()
    expect(wrapper.emitted()['go-to-page']).toHaveLength(1)
    expect(wrapper.emitted()['go-to-page']).toEqual([[2]])
  })

  it('Should render go-to-last-page button if page displayed is not the last one', function () {
    const wrapper = createWrapper(GeoTablePagination, {
      props: {
        pageSize: 10,
        currentPage: 1,
        sourceDataLength: 30
      }
    })
    const button = wrapper.find('.geo-table-pagination__action-last')
    expect(button.exists()).toBe(true)
  })

  it('Should allow customizing go-to-last-page button', async function () {
    let slotScope
    const wrapper = createWrapper(GeoTablePagination, {
      props: {
        pageSize: 10,
        currentPage: 0,
        sourceDataLength: 30
      },
      slots: {
        lastPageShortcut: (params) => { slotScope = params; return '' }
      }
    })

    expect(slotScope).toHaveProperty('hasPreviousPage', false)
    expect(slotScope).toHaveProperty('hasNextPage', true)
    expect(slotScope).toHaveProperty('action')
    slotScope.action()

    expect(wrapper.emitted()['go-to-page']).toBeTruthy()
    expect(wrapper.emitted()['go-to-page']).toHaveLength(1)
    expect(wrapper.emitted()['go-to-page']).toEqual([[2]])

    await wrapper.setProps({
      pageSize: 10,
      currentPage: 2,
      sourceDataLength: 30
    })

    expect(slotScope).toHaveProperty('hasPreviousPage', true)
    expect(slotScope).toHaveProperty('hasNextPage', false)

    await wrapper.setProps({
      pageSize: 10,
      currentPage: 1,
      sourceDataLength: 30
    })

    expect(slotScope).toHaveProperty('hasPreviousPage', true)
    expect(slotScope).toHaveProperty('hasNextPage', true)
  })
})
