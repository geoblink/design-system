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
      }

    ]
  }
]

describe.only('GeoTree', () => {
  const wrapper = shallowMount(GeoTree, {
    propsData: {
      keyForLabel: 'label',
      keyForChildren: 'subcategories',
      keyForId: 'id',
      categories: CATEGORIES
    }
  })

  it('renders a list of categories which length is equal to the categories prop', () => {})
  it('adds an hover class to each category wen user place his mouse over', () => {})
  it('renders a counter next to the category if it has subcategories which is the total subcategories number', () => {})
  it('creates a list of subcategories when user clicks on a category', () => {})
})
