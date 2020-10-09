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

const EXPANDED_CATEGORY = {
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

  it('should emit the checked item when a category without children nodes is checked', async () => {
    const wrapper = getWrapper({
      category: EXPANDED_CATEGORY
    })

    const itemToCheck = wrapper.find('#avocado')
    itemToCheck.setChecked()
    await itemToCheck.trigger('input')

    expect(wrapper.emitted().check.length).toBe(1)
    expect(wrapper.emitted().check[0]).toEqual([{ id: 'avocado', label: 'Avocado' }, true])
  })

  it('should emit all children nodes when a category with children nodes is checked', async () => {
    const wrapper = getWrapper({
      category: EXPANDED_CATEGORY
    })

    const itemToCheck = wrapper.find('#tropical-fruits')
    itemToCheck.setChecked()
    await itemToCheck.trigger('input')

    expect(wrapper.emitted().check.length).toBe(4)

    const subcategoriesToCheck = _.find(EXPANDED_CATEGORY.subcategories, { id: 'tropical-fruits' })

    _.forEach(subcategoriesToCheck.subcategories, (subcategory, index) => {
      expect(wrapper.emitted().check[index]).toEqual([{ id: subcategory.id, label: subcategory.label }, true])
    })
  })

  it('should mark as check all items passed in checkedItems prop', async () => {
    const wrapper = getWrapper({
      category: EXPANDED_CATEGORY,
      checkedItems: { pineapple: true, coconut: true }
    })

    expect(wrapper.find('#pineapple').element.checked).toBe(true)
    expect(wrapper.find('#coconut').element.checked).toBe(true)
  })

  it.only('should emit as uncheck pre checked items on checking', async () => {
    const wrapper = getWrapper({
      category: EXPANDED_CATEGORY,
      checkedItems: { pineapple: true, coconut: true }
    })

    const itemToCheck1 = wrapper.find('#pineapple')
    itemToCheck1.setChecked(false)
    await itemToCheck1.trigger('input')

    const itemToCheck2 = wrapper.find('#coconut')
    itemToCheck2.setChecked(false)
    await itemToCheck2.trigger('input')

    expect(wrapper.emitted().check.length).toBe(2)
    expect(wrapper.emitted().check[0]).toEqual([{ id: 'pineapple', label: 'Pineapple' }, false])
    expect(wrapper.emitted().check[1]).toEqual([{ id: 'coconut', label: 'Coconut' }, false])
  })
})
