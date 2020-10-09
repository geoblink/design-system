import _ from 'lodash'
import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import GeoTreeItem from '@/elements/GeoTree/GeoTreeItem.vue'
import GeoListItem from '@/elements/GeoList/GeoListItem.vue'

const CATEGORY = {
  id: 'fruits',
  label: 'Fruits',
  subcategories: [
    {
      id: 'tropical-fruits',
      label: 'Tropical fruits',
      subcategories: [
        {
          id: 'pineapple',
          label: 'Pineapple'
        },
        {
          id: 'banana',
          label: 'Banana'
        },
        {
          id: 'coconut',
          label: 'Coconut'
        },
        {
          id: 'avocado',
          label: 'Avocado'
        }
      ]
    }
  ]
}

describe.only('GeoTreeItem', () => {
  const getWrapper = (props = {}) => shallowMount(GeoTreeItem, {
    propsData: _.assign(
      {},
      {
        keyForLabel: 'label',
        keyForSubcategory: 'subcategories',
        keyForId: 'id',
        category: props.category || CATEGORY,
        checkedItems: {}
      },
      props
    ),
    stubs: {
      'geo-list-item': GeoListItem,
      'font-awesome-icon': true,
      'geo-highlighted-string': true,
      'geo-tooltip': true,
      'geo-tree-item': GeoTreeItem
    }
  })

  it('should render the total subcategories number if it has subcategories', () => {
    const wrapper = getWrapper()

    expect(wrapper.find('.geo-tree-item__total-items').exists()).toBe(true)
    expect(wrapper.find('.geo-tree-item__total-items').text()).toBe(`(${5})`)
  })

  it('should render a list of subcategories on category click (it it has subcategories)', async () => {
    const wrapper = getWrapper()

    wrapper.find('.geo-tree-item').trigger('click')
    await Vue.nextTick()
    await wrapper.vm.$forceUpdate()

    expect(wrapper.vm.category.isExpanded).toBe(true)

    wrapper.find('[data-test="subcategory-tropical-fruits"]').trigger('click')
    await Vue.nextTick()

    expect(_.find(wrapper.vm.category.subcategories, { id: 'tropical-fruits' }).isExpanded).toBe(true)
  })

  it('should render a icon next to the category if the category has a description', () => {
    CATEGORY.description = 'Description to show'
    const wrapper = getWrapper({ category: CATEGORY })

    expect(wrapper.find('.geo-tree-item__description').exists()).toBe(true)
    expect(wrapper.find('.geo-tree-item__description').text()).toBe(CATEGORY.description)
  })

  it.only('should emit the checked item when a category without children nodes is checked', async () => {
    const wrapper = getWrapper({
      category: {
        id: 'fruits',
        label: 'Fruits',
        isExpanded: true,
        subcategories: [
          {
            id: 'tropical-fruits',
            label: 'Tropical fruits',
            isExpanded: true,
            subcategories: [
              {
                id: 'pineapple',
                label: 'Pineapple'
              },
              {
                id: 'banana',
                label: 'Banana'
              },
              {
                id: 'coconut',
                label: 'Coconut'
              },
              {
                id: 'avocado',
                label: 'Avocado'
              }
            ]
          }
        ]
      }
    })

    const itemToCheck = wrapper.find('#avocado')
    itemToCheck.setChecked()
    await itemToCheck.trigger('input')

    expect(wrapper.emitted().check.length).toBe(1)
    expect(wrapper.emitted().check[0]).toEqual([{ id: 'avocado', label: 'Avocado' }, true])
  })

  it('should mark as checked and then as unchecked a category and all of its children nodes', async () => {
    const wrapper = getWrapper({
      category: {
        id: 'fruits',
        label: 'Fruits',
        isExpanded: true,
        subcategories: [
          {
            id: 'tropical-fruits',
            label: 'Tropical fruits',
            isExpanded: true,
            subcategories: [
              {
                id: 'pineapple',
                label: 'Pineapple'
              },
              {
                id: 'banana',
                label: 'Banana'
              },
              {
                id: 'coconut',
                label: 'Coconut'
              },
              {
                id: 'avocado',
                label: 'Avocado'
              }
            ]
          }
        ]
      }
    })

    expect(wrapper.find('#tropical-fruits').element.checked).toBe(false)

    wrapper.find('#tropical-fruits').setChecked(true)

    expect(wrapper.find('#tropical-fruits').element.checked).toBe(true)

    wrapper.setProps({ checkedItems: {} })

    expect(wrapper.find('#avocado').element.checked).toBe(true)
    expect(wrapper.find('#banana').element.checked).toBe(true)
    expect(wrapper.find('#coconut').element.checked).toBe(true)
    expect(wrapper.find('#pineapple').element.checked).toBe(true)

    wrapper.find('#tropical-fruits').setChecked(false)

    expect(wrapper.find('#tropical-fruits').element.checked).toBe(false)
    expect(wrapper.find('#avocado').element.checked).toBe(false)
    expect(wrapper.find('#banana').element.checked).toBe(false)
    expect(wrapper.find('#coconut').element.checked).toBe(false)
    expect(wrapper.find('#pineapple').element.checked).toBe(false)
  })
})
