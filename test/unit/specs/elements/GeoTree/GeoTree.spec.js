import _ from 'lodash'
import { shallowMount } from '@vue/test-utils'
import GeoTree from '@/elements/GeoTree/GeoTree.vue'
import GeoBorderedBoxHeaderSearchForm from '@/elements/GeoBorderedBox/GeoBorderedBoxHeaderSearchForm.vue'
import GeoInput from '@/elements/GeoInput/GeoInput.vue'

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
        label: 'Sweet',
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
        id: 'vegetables-fruits',
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

describe('GeoTree basic behaviour', () => {
  const getWrapper = (props = {}) => shallowMount(GeoTree, {
    propsData: _.assign(
      {},
      {
        keyForLabel: 'label',
        keyForSubcategory: 'subcategories',
        keyForId: 'id',
        categories: props.categories || CATEGORIES
      },
      props
    ),
    stubs: {
      'geo-bordered-box-header-search-form': true,
      'geo-input': true,
      'geo-tree-item': true,
      'font-awesome-icon': true,
      'geo-scrollable-container': true
    }
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

  it('should display all categories sorted by alphabetical order', () => {
    const expandedCategories = [
      {
        id: 'vegetables',
        label: 'Vegetables',
        matches: [],
        subcategories: [
          {
            id: 'vegetables-fruits',
            label: 'Fruits',
            subcategories: [
              {
                id: 'pepper',
                label: 'Pepper',
                matches: []
              },
              {
                id: 'eggplant',
                label: 'Eggplant',
                matches: []
              }
            ]
          }
        ]
      },
      {
        id: 'fruits',
        label: 'Fruits',
        subcategories: [
          {
            id: 'tropical-fruits',
            label: 'Tropical fruits',
            subcategories: [
              {
                id: 'banana',
                label: 'Banana',
                matches: []
              },
              {
                id: 'avocado',
                label: 'Avocado',
                matches: []
              },
              {
                id: 'pineapple',
                label: 'Pineapple',
                matches: []
              },
              {
                id: 'coconut',
                label: 'Coconut',
                matches: []
              }
            ]
          }
        ]
      }
    ]

    const wrapper = getWrapper({ categories: expandedCategories })
    const expectedSortedCategories = [
      {
        id: 'fruits',
        label: 'Fruits',
        subcategories: [
          {
            id: 'tropical-fruits',
            label: 'Tropical fruits',
            subcategories: [
              {
                id: 'avocado',
                label: 'Avocado',
                matches: []
              },
              {
                id: 'banana',
                label: 'Banana',
                matches: []
              },
              {
                id: 'coconut',
                label: 'Coconut',
                matches: []
              },
              {
                id: 'pineapple',
                label: 'Pineapple',
                matches: []
              }
            ]
          }
        ]
      },
      {
        id: 'vegetables',
        label: 'Vegetables',
        matches: [],
        subcategories: [
          {
            id: 'vegetables-fruits',
            label: 'Fruits',
            subcategories: [
              {
                id: 'eggplant',
                label: 'Eggplant',
                matches: []
              },
              {
                id: 'pepper',
                label: 'Pepper',
                matches: []
              }
            ]
          }
        ]
      }
    ]

    expect(wrapper.vm.filteredCategories).toEqual(expectedSortedCategories)
    expect(wrapper.vm.sortedCategories).toEqual(expectedSortedCategories)
  })
})

describe('GeoTree searching functionality', () => {
  const getWrapper = props => shallowMount(GeoTree, {
    propsData: _.assign(
      {},
      {
        keyForLabel: 'label',
        keyForSubcategory: 'subcategories',
        keyForId: 'id',
        categories: CATEGORIES,
        searchable: true
      },
      props
    ),
    stubs: {
      'geo-bordered-box-header-search-form': GeoBorderedBoxHeaderSearchForm,
      'geo-input': GeoInput,
      'geo-tree-item': true,
      'font-awesome-icon': true,
      'geo-scrollable-container': true
    }
  })

  it('should display a no results found label when nothing matches with searched text', () => {
    const noResultsLabel = 'Fake no results label'
    const wrapper = getWrapper({
      noResultsFoundLabel: noResultsLabel
    })

    expect(wrapper.find('.geo-input input').exists()).toBe(true)
    wrapper.find('.geo-input input').setValue('bevhjehvjfew')
    wrapper.find('.geo-input input').trigger('input')

    expect(wrapper.vm.filteredCategories.length).toBe(0)
    expect(wrapper.find('.geo-tree__no-results-found').exists()).toBeTruthy()
    expect(wrapper.find('.geo-tree__no-results-found').text()).toEqual(noResultsLabel)
  })

  it('should display the right categories when searching for a grandchild node without matches in ancestors', () => {
    const wrapper = getWrapper({
      searchable: true
    })
    const expectedFilteredCategories = [
      {
        id: 'fruits',
        label: 'Fruits',
        matches: [],
        subcategories: [
          {
            id: 'tropical-fruits',
            label: 'Tropical fruits',
            matches: [],
            subcategories: [
              {
                matches: _.times(6),
                id: 'banana',
                label: 'Banana'
              }
            ]
          }
        ]
      }
    ]

    expect(wrapper.find('.geo-input').exists()).toBe(true)
    wrapper.find('.geo-input input').setValue('banana')

    expect(wrapper.vm.filteredCategories).toEqual(expectedFilteredCategories)
    expect(wrapper.vm.expandedCategories).toEqual({ fruits: true, 'tropical-fruits': true })
  })

  it('should display the right categories when searching for matches in parent and child node', () => {
    const wrapper = getWrapper({
      searchable: true
    })

    const expectedFilteredCategories = [
      {
        id: 'vegetables',
        label: 'Vegetables',
        matches: _.times(7).slice(2),
        subcategories: [
          {
            id: 'bulbs',
            label: 'Bulbs',
            matches: [],
            subcategories: [
              {
                id: 'garlic',
                label: 'Garlic',
                matches: []
              },
              {
                id: 'leek',
                label: 'Leek',
                matches: []
              },
              {
                id: 'onion',
                label: 'Onion',
                matches: []
              }
            ]
          },
          {
            id: 'vegetables-fruits',
            label: 'Fruits',
            matches: [],
            subcategories: [
              {
                id: 'eggplant',
                label: 'Eggplant',
                matches: []
              },
              {
                id: 'pepper',
                label: 'Pepper',
                matches: []
              }
            ]
          }
        ]
      }
    ]

    expect(wrapper.find('.geo-input').exists()).toBe(true)
    wrapper.find('.geo-input input').setValue('getab')

    expect(wrapper.vm.filteredCategories).toEqual(expectedFilteredCategories)
    expect(wrapper.vm.expandedCategories).toEqual({ bulbs: true, vegetables: true, 'vegetables-fruits': true })
  })

  it('should display the right categories when searching for matches in a grandchild node with matches in ancestors', () => {
    const wrapper = getWrapper({
      searchable: true
    })

    const expectedFilteredCategories = [
      {
        id: 'fruits',
        label: 'Fruits',
        matches: _.times(5),
        subcategories: [
          {
            id: 'citrus-fruits',
            label: 'Citrus fruits',
            matches: _.times(12).slice(7),
            subcategories: [
              {
                id: 'grapefruit',
                label: 'GrapeFruit',
                matches: _.times(10).slice(5)
              },
              {
                id: 'lime',
                label: 'Lime',
                matches: []
              },
              {
                id: 'mandarin',
                label: 'Mandarin',
                matches: []

              },
              {
                id: 'orange',
                label: 'Orange',
                matches: []
              },
              {
                id: 'pomelo',
                label: 'Pomelo',
                matches: []
              }
            ]
          },
          {
            id: 'sweet-fruits',
            matches: [],
            label: 'Sweet',
            subcategories: [
              {
                id: 'apple',
                label: 'Apple',
                matches: []
              },
              {
                id: 'pear',
                label: 'Pear',
                matches: []
              },
              {
                id: 'redGrapes',
                label: 'Red Grapes',
                matches: []
              }
            ]
          },
          {
            id: 'tropical-fruits',
            label: 'Tropical fruits',
            matches: _.times(14).slice(9),
            subcategories: [
              {
                id: 'avocado',
                label: 'Avocado',
                matches: []
              },
              {
                id: 'banana',
                label: 'Banana',
                matches: []
              },
              {
                id: 'coconut',
                label: 'Coconut',
                matches: []
              },
              {
                id: 'pineapple',
                label: 'Pineapple',
                matches: []
              }
            ]
          }
        ]
      },
      {
        id: 'vegetables',
        label: 'Vegetables',
        matches: [],
        subcategories: [
          {
            id: 'vegetables-fruits',
            label: 'Fruits',
            matches: _.times(5),
            subcategories: [
              {
                id: 'eggplant',
                label: 'Eggplant',
                matches: []
              },
              {
                id: 'pepper',
                label: 'Pepper',
                matches: []
              }
            ]
          }
        ]
      }
    ]

    expect(wrapper.find('.geo-input').exists()).toBe(true)
    wrapper.find('.geo-input input').setValue('fruit')

    expect(wrapper.vm.filteredCategories).toEqual(expectedFilteredCategories)
    expect(wrapper.vm.expandedCategories).toEqual({ fruits: true, 'citrus-fruits': true, 'sweet-fruits': true, 'tropical-fruits': true, vegetables: true, 'vegetables-fruits': true })
  })
})
