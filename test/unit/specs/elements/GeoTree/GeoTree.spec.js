import _ from 'lodash'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import GeoTree from '@/elements/GeoTree/GeoTree.vue'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-tree', GeoTree)

const CATEGORIES = [
  {
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
      },
      {
        id: 'citrus-fruits',
        label: 'Citrus fruits',
        subcategories: [
          {
            id: 'orange',
            label: 'Orange'
          },
          {
            id: 'lime',
            label: 'Lime'
          },
          {
            id: 'grapefruit',
            label: 'GrapeFruit'
          },
          {
            id: 'mandarin',
            label: 'Mandarin'
          },
          {
            id: 'pomelo',
            label: 'Pomelo'
          }
        ]
      },
      {
        id: 'sweet-fruits',
        label: 'Sweet fruits',
        subcategories: [
          {
            id: 'pear',
            label: 'Pear'
          },
          {
            id: 'apple',
            label: 'Apple'
          },
          {
            id: 'redGrapes',
            label: 'Red Grapes'
          }
        ]
      }
    ]
  },
  {
    id: 'vegetables',
    label: 'Vegetables',
    subcategories: [
      {
        id: 'fruits',
        label: 'Fruits',
        subcategories: [
          {
            id: 'eggplant',
            label: 'Eggplant'
          },
          {
            id: 'pepper',
            label: 'Pepper'
          }
        ]
      },
      {
        id: 'bulbs',
        label: 'Bulbs',
        subcategories: [
          {
            id: 'onion',
            label: 'Onion'
          },
          {
            id: 'leek',
            label: 'Leek'
          },
          {
            id: 'garlic',
            label: 'Garlic'
          }
        ]
      }
    ]
  }
]

describe.only('GeoTree', () => {
  const getWrapper = props => shallowMount(GeoTree, {
    propsData: _.assign(
      {},
      {
        keyForLabel: 'label',
        keyForChildren: 'subcategories',
        keyForId: 'id',
        categories: CATEGORIES
      },
      props
    )
  })

  it('should render correctly', () => {
    expect(getWrapper()).toMatchSnapshot()
  })

  it('should render a list of categories which length is equal to the categories prop', () => {
    expect(getWrapper().findAll('geo-tree-item').length).toEqual(CATEGORIES.length)
  })

  it('should display a loading label when isLoading prop is passed', () => {
    const loadingLabel = 'Fake loading label'
    const wrapper = getWrapper({
      isLoading: true,
      loadingLabel
    })

    expect(wrapper.find('.geo-tree__loading').exists()).toBeTruthy()
    expect(wrapper.find('.geo-tree__loading').text()).toEqual(loadingLabel)
  })

  it('should render a searcher box when searchable prop is passed', () => {
    const wrapper = getWrapper({
      searchable: true
    })

    expect(wrapper.find('geo-bordered-box-header-search-form').exists()).toBeTruthy()
  })

  it('should filter the categories when on user searching', () => {
    const wrapper = getWrapper({
      searchable: true
    })
    const expectedFilteredCategories = []

    /*
    * TODO:
    *  1. Search for the searcher input.
    *  2. Type some text that can be found in the categories.
    *
    * ¿? How to know that filtered categories are right?
    */

    expect(getWrapper().findAll('geo-tree-item').length).toEqual(expectedFilteredCategories.length)
  })

  it('should display a no results found label when nothing matches with searched text', () => {
    const noResultsLabel = 'Fake no results label'
    const wrapper = getWrapper({
      searchable: true,
      noResultsLabel
    })

    /*
    * TODO:
    *  1. Search for the searcher input.
    *  2. Type some random weird text
    * */

    expect(wrapper.find('.geo-tree__no-results-found').exists()).toBeTruthy()
    expect(wrapper.find('.geo-tree__no-results-found').text()).toEqual(noResultsLabel)
  })
})
