// create an extended `Vue` constructor
import { createLocalVue, shallowMount } from '@vue/test-utils'
import GeoTreeItem from '@/elements/GeoTree/GeoTreeItem.vue'
import _ from 'lodash'

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
      'geo-list-item': true,
      'font-awesome-icon': true,
      'geo-highlighted-string': true,
      'geo-tooltip': true
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

  it('should render a list of subcategories on category click (it it has subcategories)', () => {
    // TODO: no funciona, parece que no refresca el html
    const wrapper = getWrapper()

    wrapper.trigger('click')

    expect(wrapper.vm.category.isExpanded).toBe(true)
    expect(wrapper.find('.geo-tree-item__list').exists()).toBe(true)
  })

  it('should render a icon next to the category if the category has a description', () => {
    CATEGORY.description = 'Description to show'
    const wrapper = getWrapper({ category: CATEGORY })

    expect(wrapper.find('.geo-tree-item__description').exists()).toBe(true)
    expect(wrapper.find('.geo-tree-item__description').text()).toBe(CATEGORY.description)
  })
})
