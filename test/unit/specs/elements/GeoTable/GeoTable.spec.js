import { stubLodashThrottleFactory } from './GeoTable.spec-utils'
import _ from 'lodash'
import { createLocalVue, mount } from '@vue/test-utils'
import GeoTable from '@/elements/GeoTable/GeoTable'
import GeoTableHeaderRow from '@/elements/GeoTable/GeoTableHeaderRow'
import GeoTableHeaderRowCell from '@/elements/GeoTable/GeoTableHeaderRowCell'
import GeoTableBodyRow from '@/elements/GeoTable/GeoTableBodyRow'
import GeoTableBodyRowCell from '@/elements/GeoTable/GeoTableBodyRowCell'
import GeoTablePagination from '@/elements/GeoTable/GeoTablePagination'

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

  it('should render component', function () {
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
    it('should render empty slot', function () {
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

    it('should pass CSS Modifier to empty slot', function () {
      let slotScope
      const wrapper = mount(GeoTable, {
        propsData: {
          sourceData: [],
          currentPage: 0
        },
        scopedSlots: {
          empty (params) {
            slotScope = params
          }
        }
      })

      const instance = wrapper.find('.geo-table')
      expect(instance.exists()).toBe(true)
      expect(slotScope).toHaveProperty('cssModifier')

      wrapper.setProps({
        sourceData: [],
        currentPage: 0,
        cssModifier: 'demo'
      })

      expect(slotScope).toHaveProperty('cssModifier', 'demo')
    })

    it('should render header slot', function () {
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

    it('should pass CSS Modifier to header slot', function () {
      let scopedSlots
      const wrapper = mount(GeoTable, {
        propsData: {
          sourceData: [{}],
          currentPage: 0
        },
        slots: {
          header: '<GeoTableHeaderRow><GeoTableHeaderRowCell>My header</GeoTableHeaderRowCell></GeoTableHeaderRow>'
        },
        scopedSlots: {
          header (params) {
            scopedSlots = params
          }
        }
      })

      const instance = wrapper.find('.geo-table')
      expect(instance.exists()).toBe(true)
      expect(instance.vm.isHeaderDisplayed).toBe(true)
      expect(scopedSlots).toHaveProperty('cssModifier')

      wrapper.setProps({
        sourceData: [{}],
        currentPage: 0,
        cssModifier: 'demo'
      })

      expect(scopedSlots).toHaveProperty('cssModifier', 'demo')
    })

    it('should not render body slot', function () {
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
      it('should render footer slot', function () {
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
      it('should not render footer slot', function () {
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
    it('should not render empty slot', function () {
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

    it('should render header slot', function () {
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

    it('should pass CSS Modifier to header slot', function () {
      let scopedSlots
      const wrapper = mount(GeoTable, {
        propsData: {
          sourceData: [{}],
          currentPage: 0
        },
        slots: {
          header: '<GeoTableHeaderRow><GeoTableHeaderRowCell>My header</GeoTableHeaderRowCell></GeoTableHeaderRow>'
        },
        scopedSlots: {
          header (params) {
            scopedSlots = params
          }
        }
      })

      const instance = wrapper.find('.geo-table')
      expect(instance.exists()).toBe(true)
      expect(instance.vm.isHeaderDisplayed).toBe(true)
      expect(scopedSlots).toHaveProperty('cssModifier')

      wrapper.setProps({
        sourceData: [{}],
        currentPage: 0,
        cssModifier: 'demo'
      })

      expect(scopedSlots).toHaveProperty('cssModifier', 'demo')
    })

    it('should render body', function () {
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

    it('should pass row properties to body slot', function () {
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

      expect(slotScope).toHaveProperty('cssModifier')
      expect(slotScope).toHaveProperty('item', item)
      expect(slotScope).toHaveProperty('index', 0)
    })

    it('should compute columns\' width', async function () {
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

    it('should complain if two header rows have different widths', async function () {
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

      it('should render footer if there are multiple pages', function () {
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

      it('should emit change page event when clicking on footer buttons', function () {
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

      it('should only render current page items', function () {
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

      it('should only render current page items even if it\'s not the first one', function () {
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

      it('should only render current page items even if it\'s not full', function () {
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
      it('should respect forced page size', function () {
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

      it('should render footer if there are multiple pages', function () {
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

      it('should emit change page event when clicking on footer buttons', function () {
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

      it('should only render current page items', function () {
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

      it('should only render current page items even if it\'s not the first one', function () {
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

      it('should only render current page items even if it\'s not full', function () {
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
