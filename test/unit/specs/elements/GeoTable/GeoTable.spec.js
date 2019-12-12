import { stubLodashThrottleFactory } from './GeoTable.spec-utils'
import _ from 'lodash'
import { createLocalVue, mount } from '@vue/test-utils'
import GeoTable from '@/elements/GeoTable/GeoTable'
import GeoTableHeaderRow from '@/elements/GeoTable/GeoTableHeaderRow'
import GeoTableHeaderRowCell from '@/elements/GeoTable/GeoTableHeaderRowCell'
import GeoTableBodyRow from '@/elements/GeoTable/GeoTableBodyRow'
import GeoTableBodyRowCell from '@/elements/GeoTable/GeoTableBodyRowCell'
import GeoTablePagination from '@/elements/GeoTable/GeoTablePagination'

import {
  DATA_KEYS as INFER_PAGE_SIZE_DATA_KEYS,
  INFERRED_PAGE_SIZE_CHANGED_EVENT_NAME
} from '@/mixins/inferPageSizeMixin'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-table', GeoTable)

describe('GeoTable', () => {
  const stubLodashThrottle = stubLodashThrottleFactory()

  beforeEach(function () {
    stubLodashThrottle.setup()
  })

  afterEach(function () {
    stubLodashThrottle.teardown()
  })

  beforeAll(function () {
    jest.useFakeTimers()
  })

  afterAll(function () {
    jest.useRealTimers()
  })

  it('Should render component', function () {
    const wrapper = mount(GeoTable, {
      propsData: {
        sourceData: [{}],
        currentPage: 0
      }
    })

    const instance = wrapper.find('.geo-table')
    expect(instance.exists()).toBe(true)
  })

  describe('When table is empty', function () {
    it('Should render empty slot', function () {
      const wrapper = mount(GeoTable, {
        propsData: {
          sourceData: [],
          currentPage: 0
        },
        scopedSlots: {
          empty: '<p>Some data when empty</p>'
        }
      })

      const instance = wrapper.find('.geo-table')
      expect(instance.exists()).toBe(true)
      expect(instance.text()).toEqual('Some data when empty')
    })

    it('Should render header slot', function () {
      const wrapper = mount(GeoTable, {
        propsData: {
          sourceData: [],
          currentPage: 0
        },
        slots: {
          header: 'My header'
        }
      })

      const instance = wrapper.find('.geo-table')
      expect(instance.exists()).toBe(true)
      expect(instance.text()).toEqual('My header')
    })

    it('Should not render body slot', function () {
      const wrapper = mount(GeoTable, {
        propsData: {
          sourceData: [],
          currentPage: 0
        },
        slots: {
          body: 'My body'
        }
      })

      const instance = wrapper.find('.geo-table')
      expect(instance.exists()).toBe(true)
      expect(instance.text()).not.toEqual('My body')
    })

    describe('When footer slot is provided', function () {
      it('Should render footer slot', function () {
        const wrapper = mount(GeoTable, {
          propsData: {
            sourceData: [],
            currentPage: 0
          },
          slots: {
            footer: 'My footer'
          }
        })

        const instance = wrapper.find('.geo-table')
        expect(instance.exists()).toBe(true)
        expect(instance.text()).toEqual('My footer')
      })
    })

    describe('When footer slot is nont provided', function () {
      it('Should not render footer slot', function () {
        const wrapper = mount(GeoTable, {
          propsData: {
            sourceData: [],
            currentPage: 0
          }
        })

        const instance = wrapper.find('.geo-table')
        expect(instance.exists()).toBe(true)
        expect(instance.find('.geo-table-pagination').exists()).toBe(false)
      })
    })
  })

  describe('When there is content', function () {
    it('Should not render empty slot', function () {
      const wrapper = mount(GeoTable, {
        propsData: {
          sourceData: [{}],
          currentPage: 0
        },
        scopedSlots: {
          empty: '<p>Some data when empty</p>'
        }
      })

      const instance = wrapper.find('.geo-table')
      expect(instance.exists()).toBe(true)
      expect(instance.text()).not.toEqual('Some data when empty')
    })

    it('Should render header slot', function () {
      const wrapper = mount(GeoTable, {
        propsData: {
          sourceData: [],
          currentPage: 0
        },
        slots: {
          header: 'My header'
        }
      })

      const instance = wrapper.find('.geo-table')
      expect(instance.exists()).toBe(true)
      expect(instance.text()).toEqual('My header')
    })

    it('Should render body', function () {
      const wrapper = mount(GeoTable, {
        stubs: {
          GeoTableHeaderRow,
          GeoTableHeaderRowCell,
          GeoTableBodyRow,
          GeoTableBodyRowCell
        },
        propsData: {
          sourceData: [{ value: 'Body row cell content' }],
          currentPage: 0
        },
        slots: {
          header: '<GeoTableHeaderRow><GeoTableHeaderRowCell>My header</GeoTableHeaderRowCell></GeoTableHeaderRow>'
        },
        scopedSlots: {
          body: '<GeoTableBodyRow slot-scope="row"><GeoTableBodyRowCell>{{ row.item.value }}</GeoTableBodyRowCell></GeoTableBodyRow>'
        }
      })

      const instance = wrapper.find('.geo-table')
      expect(instance.exists()).toBe(true)

      expect(instance.find('.geo-table-header-row-cell--main').text()).toBe('My header')
      expect(instance.find('.geo-table-body-row-cell').text()).toBe('Body row cell content')
    })

    it('Should pass row properties to body slot', function () {
      let slotScope
      const item = { value: 'Body row cell content' }
      const wrapper = mount(GeoTable, {
        stubs: {
          GeoTableHeaderRow,
          GeoTableHeaderRowCell,
          GeoTableBodyRow,
          GeoTableBodyRowCell
        },
        propsData: {
          sourceData: [item],
          currentPage: 0
        },
        scopedSlots: {
          body (params) {
            slotScope = params
          }
        }
      })

      const instance = wrapper.find('.geo-table')
      expect(instance.exists()).toBe(true)

      expect(slotScope).toHaveProperty('item', item)
      expect(slotScope).toHaveProperty('index', 0)
    })

    it('Should compute columns\' width', async function () {
      const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })

      const wrapper = mount(GeoTable, {
        stubs: {
          GeoTableHeaderRow,
          GeoTableHeaderRowCell,
          GeoTableBodyRow,
          GeoTableBodyRowCell
        },
        propsData: {
          sourceData: [{ value: 'Body row cell content' }],
          currentPage: 0
        },
        slots: {
          header: '<geo-table-header-row><geo-table-header-row-cell>My header</geo-table-header-row-cell></geo-table-header-row>'
        },
        scopedSlots: {
          body: '<geo-table-body-row slot-scope="row"><geo-table-body-row-cell>{{ row.item.value }}</geo-table-body-row-cell></geo-table-body-row>'
        }
      })

      const instance = wrapper.find('.geo-table')
      expect(instance.exists()).toBe(true)

      expect(instance.find('.geo-table-header-row-cell--main').text()).toBe('My header')
      expect(instance.find('.geo-table-body-row-cell').text()).toBe('Body row cell content')

      jest.runAllTimers()
      jest.useRealTimers()

      // This is an ugly hack required because the actual width computation runs
      // in a promise.
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            expect(consoleWarnSpy).not.toHaveBeenCalled()
            resolve()
          } catch (error) {
            reject(error)
          } finally {
            jest.useFakeTimers()
            consoleWarnSpy.mockRestore()
          }
        }, 0)
      })
    })

    it('Should complain if two header rows have different widths', async function () {
      const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })

      const wrapper = mount(GeoTable, {
        stubs: {
          GeoTableHeaderRow,
          GeoTableHeaderRowCell,
          GeoTableBodyRow,
          GeoTableBodyRowCell
        },
        propsData: {
          sourceData: [{ value: 'Body row cell content' }],
          currentPage: 0
        },
        slots: {
          header: '<geo-table-header-row><geo-table-header-row-cell :column-width="100">My first row header</geo-table-header-row-cell></geo-table-header-row><geo-table-header-row><geo-table-header-row-cell :column-width="200">My second row header</geo-table-header-row-cell></geo-table-header-row>'
        },
        scopedSlots: {
          body: '<geo-table-body-row slot-scope="row"><geo-table-body-row-cell>{{ row.item.value }}</geo-table-body-row-cell></geo-table-body-row>'
        }
      })

      const instance = wrapper.find('.geo-table')
      expect(instance.exists()).toBe(true)

      jest.runAllTimers()
      jest.useRealTimers()

      // This is an ugly hack required because the actual width computation runs
      // in a promise.
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            expect(consoleWarnSpy).toHaveBeenCalled()
            resolve()
          } catch (error) {
            reject(error)
          } finally {
            jest.useFakeTimers()
            consoleWarnSpy.mockRestore()
          }
        }, 0)
      })
    })

    it('Should relayout on scroll', async function () {
      const wrapper = mount(GeoTable, {
        stubs: {
          GeoTableHeaderRow,
          GeoTableHeaderRowCell,
          GeoTableBodyRow,
          GeoTableBodyRowCell
        },
        propsData: {
          sourceData: [{ value: 'Body row cell content' }],
          currentPage: 0
        },
        slots: {
          header: '<GeoTableHeaderRow><GeoTableHeaderRowCell>My header</GeoTableHeaderRowCell></GeoTableHeaderRow>'
        },
        scopedSlots: {
          body: '<GeoTableBodyRow slot-scope="row"><GeoTableBodyRowCell>{{ row.item.value }}</GeoTableBodyRowCell></GeoTableBodyRow>'
        }
      })

      const instance = wrapper.find('.geo-table')
      expect(instance.exists()).toBe(true)

      const layoutHeadersAndShadowsSpy = jest.spyOn(wrapper.vm, 'layoutHeadersAndShadows')

      wrapper.find('.geo-table__container').trigger('scroll')
      expect(layoutHeadersAndShadowsSpy).toHaveBeenCalled()

      layoutHeadersAndShadowsSpy.mockRestore()
    })

    it('Should emit `@infer-page-size` event after inferring page size', async function () {
      const numRows = 10
      const wrapper = mount(GeoTable, {
        stubs: {
          GeoTableHeaderRow,
          GeoTableHeaderRowCell,
          GeoTableBodyRow,
          GeoTableBodyRowCell,
          GeoTablePagination,
          FontAwesomeIcon: true
        },
        propsData: {
          sourceData: _.times(numRows, (i) => { return { value: `Body row cell content: ${i}` } }),
          currentPage: 0,
          automaticPageSize: true
        },
        slots: {
          header: '<GeoTableHeaderRow><GeoTableHeaderRowCell>My header</GeoTableHeaderRowCell></GeoTableHeaderRow>'
        },
        scopedSlots: {
          body: '<GeoTableBodyRow slot-scope="row"><GeoTableBodyRowCell>{{ row.item.value }}</GeoTableBodyRowCell></GeoTableBodyRow>'
        }
      })

      const instance = wrapper.find('.geo-table')
      expect(instance.exists()).toBe(true)

      await wrapper.vm.forcedLayoutTable()

      while (wrapper.vm[INFER_PAGE_SIZE_DATA_KEYS.isInferringPageSize]) {
        await delayPromise(0)
      }

      expect(wrapper.vm[INFER_PAGE_SIZE_DATA_KEYS.isInferringPageSize]).toBe(false)
      expect(wrapper.find('.geo-table').emitted(INFERRED_PAGE_SIZE_CHANGED_EVENT_NAME)).toHaveLength(1)
      expect(wrapper.find('.geo-table').emitted(INFERRED_PAGE_SIZE_CHANGED_EVENT_NAME)[0]).toEqual([numRows])
    })

    describe('When there is no forced page size', function () {
      it(`should render ${GeoTable.constants.DEFAULT_PAGESIZE} items`, function () {
        const stubBodyRowConstructor = jest.fn()
        const items = _.times(
          2 * GeoTable.constants.DEFAULT_PAGESIZE + 5,
          i => { return { value: `Body row cell ${i}` } }
        )
        const wrapper = mount(GeoTable, {
          stubs: {
            GeoTablePagination,
            FontAwesomeIcon: true
          },
          propsData: {
            sourceData: items,
            currentPage: 0
          },
          scopedSlots: {
            body: stubBodyRowConstructor
          }
        })

        const instance = wrapper.find('.geo-table')
        expect(instance.exists()).toBe(true)

        expect(stubBodyRowConstructor).toBeCalledTimes(GeoTable.constants.DEFAULT_PAGESIZE)
      })

      it('Should render footer if there are multiple pages', function () {
        const items = _.times(
          2 * GeoTable.constants.DEFAULT_PAGESIZE + 5,
          i => { return { value: `Body row cell ${i}` } }
        )
        const wrapper = mount(GeoTable, {
          stubs: {
            GeoTablePagination,
            FontAwesomeIcon: true
          },
          propsData: {
            sourceData: items,
            currentPage: 0
          }
        })

        const instance = wrapper.find('.geo-table')
        expect(instance.exists()).toBe(true)

        expect(instance.find('.geo-table-pagination').exists()).toBe(true)
      })

      it('Should emit change page event when clicking on footer buttons', function () {
        const items = _.times(
          2 * GeoTable.constants.DEFAULT_PAGESIZE + 5,
          i => { return { value: `Body row cell ${i}` } }
        )
        const wrapper = mount(GeoTable, {
          stubs: {
            GeoTablePagination,
            FontAwesomeIcon: true
          },
          propsData: {
            sourceData: items,
            currentPage: 0
          }
        })

        const instance = wrapper.find('.geo-table')
        expect(instance.exists()).toBe(true)

        instance.find('.geo-table-pagination').vm.$emit('go-to-page', 2)

        expect(instance.find('.geo-table-pagination').emitted('go-to-page')).toEqual([[2]])
      })

      it('Should only render current page items', function () {
        const slotScopes = []
        const items = _.times(
          2 * GeoTable.constants.DEFAULT_PAGESIZE + 5,
          i => { return { value: `Body row cell ${i}` } }
        )
        const wrapper = mount(GeoTable, {
          stubs: {
            FontAwesomeIcon: true,
            GeoTablePagination
          },
          propsData: {
            sourceData: items,
            currentPage: 0
          },
          scopedSlots: {
            body (params) {
              slotScopes.push(params)
            }
          }
        })

        const instance = wrapper.find('.geo-table')
        expect(instance.exists()).toBe(true)

        expect(slotScopes).toHaveLength(GeoTable.constants.DEFAULT_PAGESIZE)

        for (let i = 0; i < slotScopes.length; i++) {
          expect(slotScopes[i]).toHaveProperty('index', i)
          expect(slotScopes[i]).toHaveProperty('item')
          expect(slotScopes[i].item).toHaveProperty('value', items[i].value)
        }
      })

      it('Should only render current page items even if it\'s not the first one', function () {
        const slotScopes = []
        const items = _.times(
          2 * GeoTable.constants.DEFAULT_PAGESIZE + 5,
          i => { return { value: `Body row cell ${i}` } }
        )
        const wrapper = mount(GeoTable, {
          stubs: {
            FontAwesomeIcon: true,
            GeoTablePagination
          },
          propsData: {
            sourceData: items,
            currentPage: 1
          },
          scopedSlots: {
            body (params) {
              slotScopes.push(params)
            }
          }
        })

        const instance = wrapper.find('.geo-table')
        expect(instance.exists()).toBe(true)

        expect(slotScopes).toHaveLength(GeoTable.constants.DEFAULT_PAGESIZE)

        for (let i = 0; i < slotScopes.length; i++) {
          expect(slotScopes[i]).toHaveProperty('index', i)
          expect(slotScopes[i]).toHaveProperty('item')
          expect(slotScopes[i].item).toHaveProperty('value', items[i + GeoTable.constants.DEFAULT_PAGESIZE].value)
        }
      })

      it('Should only render current page items even if it\'s not full', function () {
        const slotScopes = []
        const items = _.times(
          2 * GeoTable.constants.DEFAULT_PAGESIZE + 5,
          i => { return { value: `Body row cell ${i}` } }
        )
        const wrapper = mount(GeoTable, {
          stubs: {
            FontAwesomeIcon: true,
            GeoTablePagination
          },
          propsData: {
            sourceData: items,
            currentPage: 2
          },
          scopedSlots: {
            body (params) {
              slotScopes.push(params)
            }
          }
        })

        const instance = wrapper.find('.geo-table')
        expect(instance.exists()).toBe(true)

        expect(slotScopes).toHaveLength(5)

        for (let i = 0; i < slotScopes.length; i++) {
          expect(slotScopes[i]).toHaveProperty('index', i)
          expect(slotScopes[i]).toHaveProperty('item')
          expect(slotScopes[i].item).toHaveProperty('value', items[i + 2 * GeoTable.constants.DEFAULT_PAGESIZE].value)
        }
      })
    })

    describe('When there is forced page size', function () {
      it('Should respect forced page size', function () {
        const stubBodyRowConstructor = jest.fn()
        const items = _.times(
          2 * GeoTable.constants.DEFAULT_PAGESIZE + 5,
          i => { return { value: `Body row cell ${i}` } }
        )
        const wrapper = mount(GeoTable, {
          stubs: {
            GeoTablePagination,
            FontAwesomeIcon: true
          },
          propsData: {
            sourceData: items,
            forcedPageSize: 2 * GeoTable.constants.DEFAULT_PAGESIZE,
            currentPage: 0
          },
          scopedSlots: {
            body: stubBodyRowConstructor
          }
        })

        const instance = wrapper.find('.geo-table')
        expect(instance.exists()).toBe(true)

        expect(stubBodyRowConstructor).toBeCalledTimes(2 * GeoTable.constants.DEFAULT_PAGESIZE)
      })

      it('Should render footer if there are multiple pages', function () {
        const items = _.times(
          2 * GeoTable.constants.DEFAULT_PAGESIZE + 5,
          i => { return { value: `Body row cell ${i}` } }
        )
        const wrapper = mount(GeoTable, {
          stubs: {
            GeoTablePagination,
            FontAwesomeIcon: true
          },
          propsData: {
            sourceData: items,
            forcedPageSize: 2 * GeoTable.constants.DEFAULT_PAGESIZE,
            currentPage: 0
          }
        })

        const instance = wrapper.find('.geo-table')
        expect(instance.exists()).toBe(true)

        expect(instance.find('.geo-table-pagination').exists()).toBe(true)
      })

      it('Should emit change page event when clicking on footer buttons', function () {
        const items = _.times(
          2 * GeoTable.constants.DEFAULT_PAGESIZE + 5,
          i => { return { value: `Body row cell ${i}` } }
        )
        const wrapper = mount(GeoTable, {
          stubs: {
            GeoTablePagination,
            FontAwesomeIcon: true
          },
          propsData: {
            sourceData: items,
            forcedPageSize: 2 * GeoTable.constants.DEFAULT_PAGESIZE,
            currentPage: 0
          }
        })

        const instance = wrapper.find('.geo-table')
        expect(instance.exists()).toBe(true)

        instance.find('.geo-table-pagination').vm.$emit('go-to-page', 2)

        expect(instance.find('.geo-table-pagination').emitted('go-to-page')).toEqual([[2]])
      })

      it('Should only render current page items', function () {
        const slotScopes = []
        const items = _.times(
          5,
          i => { return { value: `Body row cell ${i}` } }
        )
        const wrapper = mount(GeoTable, {
          stubs: {
            FontAwesomeIcon: true,
            GeoTablePagination
          },
          propsData: {
            sourceData: items,
            forcedPageSize: 2,
            currentPage: 0
          },
          scopedSlots: {
            body (params) {
              slotScopes.push(params)
            }
          }
        })

        const instance = wrapper.find('.geo-table')
        expect(instance.exists()).toBe(true)

        expect(slotScopes).toHaveLength(2)

        for (let i = 0; i < slotScopes.length; i++) {
          expect(slotScopes[i]).toHaveProperty('index', i)
          expect(slotScopes[i]).toHaveProperty('item')
          expect(slotScopes[i].item).toHaveProperty('value', items[i].value)
        }
      })

      it('Should only render current page items even if it\'s not the first one', function () {
        const slotScopes = []
        const items = _.times(
          5,
          i => { return { value: `Body row cell ${i}` } }
        )
        const wrapper = mount(GeoTable, {
          stubs: {
            FontAwesomeIcon: true,
            GeoTablePagination
          },
          propsData: {
            sourceData: items,
            forcedPageSize: 2,
            currentPage: 1
          },
          scopedSlots: {
            body (params) {
              slotScopes.push(params)
            }
          }
        })

        const instance = wrapper.find('.geo-table')
        expect(instance.exists()).toBe(true)

        expect(slotScopes).toHaveLength(2)

        for (let i = 0; i < slotScopes.length; i++) {
          expect(slotScopes[i]).toHaveProperty('index', i)
          expect(slotScopes[i]).toHaveProperty('item')
          expect(slotScopes[i].item).toHaveProperty('value', items[i + 2].value)
        }
      })

      it('Should only render current page items even if it\'s not full', function () {
        const slotScopes = []
        const items = _.times(
          5,
          i => { return { value: `Body row cell ${i}` } }
        )
        const wrapper = mount(GeoTable, {
          stubs: {
            FontAwesomeIcon: true,
            GeoTablePagination
          },
          propsData: {
            sourceData: items,
            forcedPageSize: 2,
            currentPage: 2
          },
          scopedSlots: {
            body (params) {
              slotScopes.push(params)
            }
          }
        })

        const instance = wrapper.find('.geo-table')
        expect(instance.exists()).toBe(true)

        expect(slotScopes).toHaveLength(1)

        for (let i = 0; i < slotScopes.length; i++) {
          expect(slotScopes[i]).toHaveProperty('index', i)
          expect(slotScopes[i]).toHaveProperty('item')
          expect(slotScopes[i].item).toHaveProperty('value', items[i + 2 * 2].value)
        }
      })
    })
  })
})

function delayPromise (duration) {
  return function (...args) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(...args)
      }, duration)
    })
  }
}
