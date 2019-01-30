import _ from 'lodash'
import { createLocalVue, mount } from '@vue/test-utils'
import GeoTableSort from '@/elements/GeoTable/GeoTableSort'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

const iconsToMock = [
  'faCaretUp',
  'faCaretDown'
]
const mockedFalIcons = _.mapValues(_.pick(fas, iconsToMock), function (original) {
  return _.assign({}, original, {
    prefix: 'fal'
  })
})

library.add(fab, fas, far, mockedFalIcons)

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-table-sort', GeoTableSort)

describe('GeoTableSort', () => {
  it('should render content', function () {
    const wrapper = mount(GeoTableSort, {
      propsData: {
        currentSortingDirection: GeoTableSort.constants.SORTING_DIRECTIONS.asc,
        currentlySortingTable: false
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    const instance = wrapper.find('.geo-table-sort')
    expect(instance.exists()).toBe(true)
  })

  it('should emit sort event when clicking on sort asc button', function () {
    const wrapper = mount(GeoTableSort, {
      propsData: {
        currentSortingDirection: GeoTableSort.constants.SORTING_DIRECTIONS.asc,
        currentlySortingTable: false
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    const instance = wrapper.find('.geo-table-sort')
    expect(instance.exists()).toBe(true)

    instance.find('.geo-table-sort__button').trigger('click')

    expect(wrapper.emitted()['sort']).toBeTruthy()
    expect(wrapper.emitted()['sort']).toHaveLength(1)
    expect(wrapper.emitted()['sort']).toEqual([[GeoTableSort.constants.SORTING_DIRECTIONS.asc]])
  })

  it('should emit sort event when clicking on sort desc button', function () {
    const wrapper = mount(GeoTableSort, {
      propsData: {
        currentSortingDirection: GeoTableSort.constants.SORTING_DIRECTIONS.asc,
        currentlySortingTable: false
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    const instance = wrapper.find('.geo-table-sort')
    expect(instance.exists()).toBe(true)

    instance.find('.geo-table-sort__button:last-child').trigger('click')

    expect(wrapper.emitted()['sort']).toBeTruthy()
    expect(wrapper.emitted()['sort']).toHaveLength(1)
    expect(wrapper.emitted()['sort']).toEqual([[GeoTableSort.constants.SORTING_DIRECTIONS.desc]])
  })

  it('should allow customizing sort asc button', function () {
    let slotScope
    const wrapper = mount(GeoTableSort, {
      propsData: {
        currentSortingDirection: GeoTableSort.constants.SORTING_DIRECTIONS.asc,
        currentlySortingTable: false
      },
      scopedSlots: {
        sortAscButton (params) {
          slotScope = params
        }
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })

    expect(wrapper.emitted()['sort']).toBeFalsy()

    expect(slotScope).toHaveProperty('isCurrentSortingDirection', false)
    expect(slotScope).toHaveProperty('action')
    slotScope.action()

    expect(wrapper.emitted()['sort']).toBeTruthy()
    expect(wrapper.emitted()['sort']).toHaveLength(1)
    expect(wrapper.emitted()['sort']).toEqual([[GeoTableSort.constants.SORTING_DIRECTIONS.asc]])

    wrapper.setProps({
      currentSortingDirection: GeoTableSort.constants.SORTING_DIRECTIONS.asc,
      currentlySortingTable: true
    })

    expect(slotScope).toHaveProperty('isCurrentSortingDirection', true)

    wrapper.setProps({
      currentSortingDirection: GeoTableSort.constants.SORTING_DIRECTIONS.desc,
      currentlySortingTable: true
    })

    expect(slotScope).toHaveProperty('isCurrentSortingDirection', false)
  })

  it('should allow customizing sort desc button', function () {
    let slotScope
    const wrapper = mount(GeoTableSort, {
      propsData: {
        currentSortingDirection: GeoTableSort.constants.SORTING_DIRECTIONS.asc,
        currentlySortingTable: false
      },
      scopedSlots: {
        sortDescButton (params) {
          slotScope = params
        }
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })

    expect(slotScope).toHaveProperty('isCurrentSortingDirection', false)
    expect(wrapper.emitted()['sort']).toBeFalsy()

    expect(slotScope).toHaveProperty('action')
    slotScope.action()

    expect(wrapper.emitted()['sort']).toBeTruthy()
    expect(wrapper.emitted()['sort']).toHaveLength(1)
    expect(wrapper.emitted()['sort']).toEqual([[GeoTableSort.constants.SORTING_DIRECTIONS.desc]])

    wrapper.setProps({
      currentSortingDirection: GeoTableSort.constants.SORTING_DIRECTIONS.asc,
      currentlySortingTable: true
    })

    expect(slotScope).toHaveProperty('isCurrentSortingDirection', false)

    wrapper.setProps({
      currentSortingDirection: GeoTableSort.constants.SORTING_DIRECTIONS.desc,
      currentlySortingTable: true
    })

    expect(slotScope).toHaveProperty('isCurrentSortingDirection', true)
  })

  it('should apply CSS suffix when the modifier is provided', function () {
    const inactiveWrapper = mount(GeoTableSort, {
      propsData: {
        cssModifier: 'demo-modifier',
        currentSortingDirection: GeoTableSort.constants.SORTING_DIRECTIONS.asc,
        currentlySortingTable: false
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })

    expect(inactiveWrapper.find('.geo-table-sort--demo-modifier').exists()).toBe(true)
    expect(inactiveWrapper.find('.geo-table-sort--active--demo-modifier').exists()).toBe(false)

    const activeWrapper = mount(GeoTableSort, {
      propsData: {
        cssModifier: 'demo-modifier',
        currentSortingDirection: GeoTableSort.constants.SORTING_DIRECTIONS.asc,
        currentlySortingTable: true
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })

    expect(activeWrapper.find('.geo-table-sort--demo-modifier').exists()).toBe(true)
    expect(activeWrapper.find('.geo-table-sort--active--demo-modifier').exists()).toBe(true)
  })
})
