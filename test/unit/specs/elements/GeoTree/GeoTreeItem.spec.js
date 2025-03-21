import _ from 'lodash'
import { shallowMount } from '@vue/test-utils'
import GeoTreeItem from '@/elements/GeoTree/GeoTreeItem.vue'
import GeoListItem from '@/elements/GeoList/GeoListItem.vue'

const CHECK_ITEM_EVENT = 'check-item'
const CHECK_FOLDER_EVENT = 'check-folder'

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
        },
        {
          id: 'invented-fruits',
          label: 'Invented fruits',
          subcategories: [{
            id: 'epic-tasty-invented-fruit',
            label: 'Epic tasty invented fruit'
          }]
        }
      ]
    }
  ]
}

const CATEGORY_WITHOUT_SUBCATEGORIES = {
  id: 'fruits',
  label: 'Fruits'
}

describe('GeoTreeItem', () => {
  const getWrapper = props => shallowMount(GeoTreeItem, {
    propsData: _.assign(
      {},
      {
        keyForLabel: 'label',
        keyForSubcategory: 'subcategories',
        keyForId: 'id',
        category: CATEGORY,
        checkedItems: {},
        expandedCategories: {}
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
    expect(wrapper.find('.geo-tree-item__total-items').text()).toBe(`(${7})`)
  })

  it('should render a list of subcategories on category click (it it has subcategories)', async () => {
    const wrapper = getWrapper()

    wrapper.find('.geo-list-item').trigger('click')
    wrapper.setProps({ expandedCategories: { fruits: true } })

    expect(wrapper.find('[data-test="subcategory-tropical-fruits"]').exists()).toBe(true)
  })

  it('should render a icon next to the category if the category has a description', () => {
    CATEGORY.description = 'Description to show'
    const wrapper = getWrapper()

    expect(wrapper.find('.geo-tree-item__description').exists()).toBe(true)
    expect(wrapper.find('.geo-tree-item__description').text()).toBe(CATEGORY.description)
  })

  it('should not render input if inputType is hidden and category has no subcategories', () => {
    const wrapper = getWrapper({
      category: CATEGORY_WITHOUT_SUBCATEGORIES,
      inputType: GeoTreeItem.constants.INPUT_MODES.HIDDEN
    })

    expect(wrapper.find(`[data-test="geo-tree-item__input-${CATEGORY_WITHOUT_SUBCATEGORIES.id}"]`).exists()).toBe(false)
  })

  it('should render input if inputType is not hidden and category has no subcategories', () => {
    const wrapper = getWrapper({
      category: CATEGORY_WITHOUT_SUBCATEGORIES,
      inputType: GeoTreeItem.constants.INPUT_MODES.MULTIPLE
    })

    expect(wrapper.find(`[data-test="geo-tree-item__input-${CATEGORY_WITHOUT_SUBCATEGORIES.id}"]`).exists()).toBe(true)
  })

  it('should render item as disabled if disabledTooltipText is set', () => {
    const wrapper = getWrapper({
      category: Object.assign({}, CATEGORY_WITHOUT_SUBCATEGORIES, {
        disabledTooltipText: 'This is a disabled item'
      })
    })

    expect(wrapper.find(`[data-test="geo-tree-item__input-${CATEGORY_WITHOUT_SUBCATEGORIES.id}"]`).exists()).toBe(true)
  })

  it('should render subcategories list when categories are expanded', () => {
    const wrapper = getWrapper()
    wrapper.setProps({ expandedCategories: { 'tropical-fruits': true, fruits: true } })

    expect(wrapper.find('[data-test="subcategory-tropical-fruits"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="subcategory-avocado"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="subcategory-banana"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="subcategory-coconut"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="subcategory-pineapple"]').exists()).toBe(true)
  })
})

describe('GeoTreeItem check behaviour', () => {
  const getWrapper = props => shallowMount(GeoTreeItem, {
    propsData: _.assign(
      {},
      {
        keyForLabel: 'label',
        keyForSubcategory: 'subcategories',
        keyForId: 'id',
        category: CATEGORY,
        checkedItems: {},
        expandedCategories: { fruits: true, 'tropical-fruits': true }
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

  it('should emit the checked item when a category without children nodes is checked', async () => {
    const wrapper = getWrapper()

    const itemToCheck = wrapper.find('#avocado')
    itemToCheck.setChecked()
    await itemToCheck.trigger('input')

    expect(wrapper.emitted()[CHECK_ITEM_EVENT].length).toBe(1)
    expect(wrapper.emitted()[CHECK_ITEM_EVENT][0]).toEqual([{ id: 'avocado', label: 'Avocado' }, true, false])
  })

  it('should emit category event all children nodes as check when a category with children nodes is checked', async () => {
    const wrapper = getWrapper()

    const itemToCheck = wrapper.find('#tropical-fruits')
    itemToCheck.setChecked()
    await itemToCheck.trigger('input')

    const tropicalFruits = _.find(CATEGORY.subcategories, { id: 'tropical-fruits' })
    const subcategoryFolder = _.last(tropicalFruits.subcategories)

    expect(wrapper.emitted()[CHECK_FOLDER_EVENT].length).toBe(2)
    expect(wrapper.emitted()[CHECK_FOLDER_EVENT][0]).toEqual([{ id: tropicalFruits.id, label: tropicalFruits.label, subcategories: tropicalFruits.subcategories }, true, false])
    expect(wrapper.emitted()[CHECK_FOLDER_EVENT][1]).toEqual([{ id: subcategoryFolder.id, label: subcategoryFolder.label, subcategories: subcategoryFolder.subcategories }, true, true])
    expect(wrapper.emitted()[CHECK_ITEM_EVENT].length).toBe(5)

    const subcategoriesToCheck = _.slice(tropicalFruits.subcategories, 0, -1)

    _.forEach(subcategoriesToCheck, (subcategory, index) => {
      expect(wrapper.emitted()[CHECK_ITEM_EVENT][index]).toEqual([{ id: subcategory.id, label: subcategory.label }, true, true])
    })
    expect(wrapper.emitted()[CHECK_ITEM_EVENT][4]).toEqual([{ id: 'epic-tasty-invented-fruit', label: 'Epic tasty invented fruit' }, true, true])
  })

  it('should mark as check all items passed in checkedItems prop', () => {
    const wrapper = getWrapper({
      checkedItems: { pineapple: true, coconut: true }
    })

    expect(wrapper.find('#pineapple').element.checked).toBe(true)
    expect(wrapper.find('#coconut').element.checked).toBe(true)
  })

  it('should emit as uncheck pre checked items on checking', async () => {
    const wrapper = getWrapper({
      checkedItems: { pineapple: true, coconut: true }
    })

    const itemToCheck1 = wrapper.find('#pineapple')
    itemToCheck1.setChecked(false)
    await itemToCheck1.trigger('input')

    const itemToCheck2 = wrapper.find('#coconut')
    itemToCheck2.setChecked(false)
    await itemToCheck2.trigger('input')

    expect(wrapper.emitted()[CHECK_ITEM_EVENT].length).toBe(2)
    expect(wrapper.emitted()[CHECK_ITEM_EVENT][0]).toEqual([{ id: 'pineapple', label: 'Pineapple' }, false, false])
    expect(wrapper.emitted()[CHECK_ITEM_EVENT][1]).toEqual([{ id: 'coconut', label: 'Coconut' }, false, false])
  })

  it('should emit as uncheck all pre checked items and parent on parent node checking', async () => {
    const wrapper = getWrapper({
      checkedItems: { pineapple: true, coconut: true, avocado: true, banana: true }
    })

    const itemToCheck = wrapper.find('#tropical-fruits')
    itemToCheck.setChecked(false)
    await itemToCheck.trigger('input')

    const tropicalFruits = _.find(CATEGORY.subcategories, { id: 'tropical-fruits' })
    const subcategoryFolder = _.last(tropicalFruits.subcategories)
    expect(wrapper.emitted()[CHECK_FOLDER_EVENT].length).toBe(2)
    expect(wrapper.emitted()[CHECK_FOLDER_EVENT][0]).toEqual([{ id: tropicalFruits.id, label: tropicalFruits.label, subcategories: tropicalFruits.subcategories }, false, false])
    expect(wrapper.emitted()[CHECK_FOLDER_EVENT][1]).toEqual([{ id: subcategoryFolder.id, label: subcategoryFolder.label, subcategories: subcategoryFolder.subcategories }, false, true])

    const subcategoriesToCheck = _.slice(tropicalFruits.subcategories, 0, -1)
    _.forEach(subcategoriesToCheck, (subcategory, index) => {
      expect(wrapper.emitted()[CHECK_ITEM_EVENT][index]).toEqual([{ id: subcategory.id, label: subcategory.label }, false, true])
    })
  })

  it('should display a parent category as indeterminate when only some children are checked', async () => {
    const wrapper = getWrapper({
      checkedItems: { pineapple: true, banana: true }
    })

    expect(wrapper.find('#tropical-fruits').element.indeterminate).toBe(true)
  })
})
