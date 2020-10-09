import _ from 'lodash'
import Vue from 'vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import GeoTreeItem from '@/elements/GeoTree/GeoTreeItem.vue'
import GeoListItem from '@/elements/GeoList/GeoListItem.vue'

const localVue = createLocalVue()
localVue.component('geo-tree-item', GeoTreeItem)

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

  it('should render correctly', () => {
    expect(getWrapper()).toMatchSnapshot()
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

  it('should mark as checked and then as unchecked a category without children nodes', async () => {
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

    expect(wrapper.find('#avocado').element.checked).toBe(false)

    wrapper.find('#avocado').setChecked()
    expect(wrapper.find('#avocado').element.checked).toBe(true)

    wrapper.find('#avocado').setChecked(false)
    expect(wrapper.find('#avocado').element.checked).toBe(false)
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
