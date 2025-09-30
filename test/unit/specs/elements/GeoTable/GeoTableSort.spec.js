import _ from 'lodash'
import { mount } from '@vue/test-utils'
import GeoTableSort from '@/elements/GeoTable/GeoTableSort'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock'

function getWrapper (component, options = {}) {
  return mount(component, _.merge({
    global: {
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      }
    }
  }, options))
}

describe('GeoTableSort', () => {
  it('Should render content', function () {
    const wrapper = getWrapper(GeoTableSort, {
      props: {
        currentSortingDirection: GeoTableSort.constants.SORTING_DIRECTIONS.asc,
        currentlySortingTable: false
      }
    })
    const instance = wrapper.find('.geo-table-sort')
    expect(instance.exists()).toBe(true)
  })

  it('Should complain when using unknown sorting direction', function () {
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })

    getWrapper(GeoTableSort, {
      props: {
        currentSortingDirection: 'unknown-sorting-direction-for-tests',
        currentlySortingTable: false
      }
    })

    expect(consoleWarnSpy).toHaveBeenCalled()

    consoleWarnSpy.mockRestore()
  })

  it('Should emit sort event when clicking on sort asc button', function () {
    const wrapper = getWrapper(GeoTableSort, {
      props: {
        currentSortingDirection: GeoTableSort.constants.SORTING_DIRECTIONS.asc,
        currentlySortingTable: false
      }
    })
    const instance = wrapper.find('.geo-table-sort')
    expect(instance.exists()).toBe(true)

    instance.find('.geo-table-sort__button').trigger('click')

    expect(wrapper.emitted().sort).toBeTruthy()
    expect(wrapper.emitted().sort).toHaveLength(1)
    expect(wrapper.emitted().sort).toEqual([[GeoTableSort.constants.SORTING_DIRECTIONS.asc]])
  })

  it('Should emit sort event when clicking on sort desc button', function () {
    const wrapper = getWrapper(GeoTableSort, {
      props: {
        currentSortingDirection: GeoTableSort.constants.SORTING_DIRECTIONS.asc,
        currentlySortingTable: false
      }
    })
    const instance = wrapper.find('.geo-table-sort')
    expect(instance.exists()).toBe(true)

    instance.find('.geo-table-sort__button:last-child').trigger('click')

    expect(wrapper.emitted().sort).toBeTruthy()
    expect(wrapper.emitted().sort).toHaveLength(1)
    expect(wrapper.emitted().sort).toEqual([[GeoTableSort.constants.SORTING_DIRECTIONS.desc]])
  })

  it('Should allow customizing sort asc button', async function () {
    let slotScope
    const wrapper = getWrapper(GeoTableSort, {
      props: {
        currentSortingDirection: GeoTableSort.constants.SORTING_DIRECTIONS.asc,
        currentlySortingTable: false
      },
      slots: {
        sortAscButton: (params) => { slotScope = params; return '' }
      }
    })

    expect(wrapper.emitted().sort).toBeFalsy()

    expect(slotScope).toHaveProperty('isCurrentSortingDirection', false)
    expect(slotScope).toHaveProperty('action')
    slotScope.action()

    expect(wrapper.emitted().sort).toBeTruthy()
    expect(wrapper.emitted().sort).toHaveLength(1)
    expect(wrapper.emitted().sort).toEqual([[GeoTableSort.constants.SORTING_DIRECTIONS.asc]])

    await wrapper.setProps({
      currentSortingDirection: GeoTableSort.constants.SORTING_DIRECTIONS.asc,
      currentlySortingTable: true
    })

    expect(slotScope).toHaveProperty('isCurrentSortingDirection', true)

    await wrapper.setProps({
      currentSortingDirection: GeoTableSort.constants.SORTING_DIRECTIONS.desc,
      currentlySortingTable: true
    })

    expect(slotScope).toHaveProperty('isCurrentSortingDirection', false)
  })

  it('Should allow customizing sort desc button', async function () {
    let slotScope
    const wrapper = getWrapper(GeoTableSort, {
      props: {
        currentSortingDirection: GeoTableSort.constants.SORTING_DIRECTIONS.asc,
        currentlySortingTable: false
      },
      slots: {
        sortDescButton: (params) => { slotScope = params; return '' }
      }
    })

    expect(slotScope).toHaveProperty('isCurrentSortingDirection', false)
    expect(wrapper.emitted().sort).toBeFalsy()

    expect(slotScope).toHaveProperty('action')
    slotScope.action()

    expect(wrapper.emitted().sort).toBeTruthy()
    expect(wrapper.emitted().sort).toHaveLength(1)
    expect(wrapper.emitted().sort).toEqual([[GeoTableSort.constants.SORTING_DIRECTIONS.desc]])

    await wrapper.setProps({
      currentSortingDirection: GeoTableSort.constants.SORTING_DIRECTIONS.asc,
      currentlySortingTable: true
    })

    expect(slotScope).toHaveProperty('isCurrentSortingDirection', false)

    await wrapper.setProps({
      currentSortingDirection: GeoTableSort.constants.SORTING_DIRECTIONS.desc,
      currentlySortingTable: true
    })

    expect(slotScope).toHaveProperty('isCurrentSortingDirection', true)
  })
})
