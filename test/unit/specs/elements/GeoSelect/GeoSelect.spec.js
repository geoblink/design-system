import { mount } from '@vue/test-utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Y_AXIS_POSITION } from '@/elements/GeoDropdown/GeoDropdown.constants'
import GeoSelect from '@/elements/GeoSelect/GeoSelect.vue'
import GeoSelectBase from '@/elements/GeoSelect/GeoSelectBase.vue'
import GeoSelectToggleButton from '@/elements/GeoSelect/GeoSelectToggleButton.vue'
import GeoDropdown from '@/elements/GeoDropdown/GeoDropdown.vue'
import GeoBorderedBox from '@/elements/GeoBorderedBox/GeoBorderedBox.vue'
import GeoBorderedBoxHeaderSearchForm from '@/elements/GeoBorderedBox/GeoBorderedBoxHeaderSearchForm.vue'
import GeoScrollableContainer from '@/elements/GeoScrollableContainer/GeoScrollableContainer.vue'
import GeoMarquee from '@/elements/GeoMarquee/GeoMarquee'
import GeoHighlightedString from '@/elements/GeoHighlightedString/GeoHighlightedString.vue'
import GeoListItem from '@/elements/GeoList/GeoListItem.vue'
import GeoListGroup from '@/elements/GeoList/GeoListGroup.vue'
import GeoTrimmedContent from '@/elements/GeoTrimmedContent/GeoTrimmedContent.vue'
import GeoInput from '@/elements/GeoInput/GeoInput.vue'
import GeoTooltip from '@/elements/GeoTooltip/GeoTooltip.vue'
import _ from 'lodash'
import * as sinon from 'sinon'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

const iconsToMock = [
  'faChevronUp',
  'faChevronDown',
  'faLock'
]
const mockedFalIcons = _.mapValues(_.pick(fas, iconsToMock), function (original) {
  return _.assign({}, original, {
    prefix: 'fal'
  })
})

library.add(fas, mockedFalIcons)

const stubs = {
  GeoSelectBase,
  GeoSelectToggleButton,
  GeoDropdown,
  GeoBorderedBox,
  GeoScrollableContainer,
  GeoMarquee,
  GeoHighlightedString,
  GeoListItem,
  GeoTrimmedContent,
  GeoBorderedBoxHeaderSearchForm,
  GeoListGroup,
  GeoInput,
  GeoTooltip,
  'geo-list-footer-button': true,
  'font-awesome-icon': FontAwesomeIcon
}

describe('GeoSelect', () => {
  const sandbox = sinon.createSandbox()

  const defaultProps = {
    options: _.times(4, idx => { return { label: `${idx}` } }),
    placeholder: 'Some Placeholder',
    dropdownIcon: ['fas', 'chevron-down'],
    forceYAxisPosition: Y_AXIS_POSITION.top,
    keyForLabel: 'label',
    pageSize: 4,
    popupClass: 'test-popup-class',
    value: { label: 'Item 0' }
  }

  beforeEach(function () {
    sandbox.restore()
    sandbox.stub(_, 'throttle').returnsArg(0)
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('Should render toggle button', () => {
    const wrapper = mount(GeoSelect, {
      stubs,
      propsData: defaultProps
    })
    expect(wrapper.find('.geo-select-toggle-button').exists()).toBe(true)
  })

  it('Should not render element popup if not opened', () => {
    const wrapper = mount(GeoSelect, {
      stubs,
      propsData: defaultProps
    })
    expect(wrapper.find('.geo-select-base__options-container').exists()).toBe(false)
  })

  it('Should render element popup if opened', () => {
    const wrapper = mount(GeoSelect, {
      stubs,
      propsData: defaultProps,
      data () {
        return {
          isOpened: true
        }
      }
    })
    expect(wrapper.find('.geo-select-base__options-container').exists()).toBe(true)
  })

  it('Should render element popup with custom class', () => {
    const wrapper = mount(GeoSelect, {
      stubs,
      propsData: defaultProps,
      data () {
        return {
          isOpened: true
        }
      }
    })
    expect(wrapper.find('.test-popup-class').exists()).toBe(true)
  })

  it('Should show element popup on click on toggle button', () => {
    const wrapper = mount(GeoSelect, {
      stubs,
      propsData: defaultProps
    })
    expect(wrapper.find('.geo-select-toggle-button').exists()).toBe(true)

    wrapper.find('.geo-select-toggle-button').trigger('click')

    expect(wrapper.find('.geo-select-base__options-container').exists()).toBe(true)
  })

  it('Should execute load more results when given the event', (done) => {
    const mockScrollToLastEntry = jest.fn()
    const wrapper = mount(GeoSelect, {
      stubs,
      propsData: defaultProps
    })
    wrapper.vm.$refs.selectBase.$emit('load-more-results', { scrollToLastEntry: mockScrollToLastEntry })
    // https://vue-test-utils.vuejs.org/guides/testing-async-components.html
    wrapper.vm.$nextTick(() => {
      expect(mockScrollToLastEntry).toHaveBeenCalled()
      done()
    })
  })

  it('Should check forceYAxisPosition validator is correct', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    const forceYAxisPosition = GeoSelectBase.props.forceYAxisPosition
    expect(forceYAxisPosition.validator(undefined)).toBeTruthy()
    expect(forceYAxisPosition.validator('top')).toBeTruthy()
    expect(forceYAxisPosition.validator('test')).toBeFalsy()
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
  })

  it('Should change selection when selecting one of the options', () => {
    const wrapper = mount(GeoSelect, {
      stubs,
      propsData: defaultProps
    })
    wrapper.find('.geo-select-toggle-button').trigger('click')
    expect(wrapper.vm.isOpened).toBe(true)
    wrapper.find('.geo-list-item').trigger('click')
    expect(wrapper.vm.isOpened).toBe(false)
    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input[0][0]).toEqual({ label: '0' })
  })

  it('Should show/hide search box if given the prop', () => {
    const wrapper = mount(GeoSelect, {
      stubs,
      propsData: _.assign({}, defaultProps, {
        searchIcon: ['fas', 'search'],
        searchable: true
      }),
      data () {
        return {
          isOpened: true
        }
      }
    })
    expect(wrapper.find('.geo-bordered-box-header-search-form').exists()).toBe(true)
    wrapper.setProps({ searchable: false })
    expect(wrapper.find('.geo-bordered-box-header-search-form').exists()).toBe(false)
  })

  it('Should filter the select options when typing on the search box', () => {
    const wrapper = mount(GeoSelect, {
      stubs,
      propsData: _.assign({}, defaultProps, {
        options: _.times(4, idx => { return { label: `Item ${idx}` } }),
        searchIcon: ['fas', 'search'],
        searchable: true
      }),
      data () {
        return {
          isOpened: true
        }
      }
    })

    expect(wrapper.findAll('.geo-list-item').length).toBe(4)
    wrapper.find('.geo-input__input').element.value = 'Item 1'
    wrapper.find('.geo-input__input').trigger('input')
    expect(wrapper.findAll('.geo-list-item').length).toBe(1)
    expect(wrapper.find('.geo-list-item').text()).toEqual('Item 1')
  })

  it('Should filter options in an opt-group select', () => {
    const wrapper = mount(GeoSelect, {
      stubs,
      propsData: _.assign({}, defaultProps, {
        options: [
          {
            isOptGroup: true,
            label: 'First Group',
            items: _.times(4, idx => { return { label: `Item ${idx}` } })
          },
          {
            isOptGroup: true,
            label: 'Second Group',
            items: _.times(4, idx => { return { label: `Item ${idx}` } })
          }
        ],
        pageSize: 10,
        searchIcon: ['fas', 'search'],
        searchable: true,
        grouped: true
      }),
      data () {
        return {
          isOpened: true
        }
      }
    })

    expect(wrapper.findAll('.geo-list-item').length).toBe(8)
    wrapper.find('.geo-input__input').element.value = 'Second Group'
    wrapper.find('.geo-input__input').trigger('input')
    expect(wrapper.findAll('.geo-list-item').length).toBe(4)
  })

  describe('When disabled', () => {
    it('Should pass disabled prop to toggle button', () => {
      const wrapper = mount(GeoSelect, {
        stubs,
        propsData: _.assign({}, defaultProps, {
          disabled: true
        })
      })
      expect(wrapper.find('.geo-select-toggle-button').exists()).toBe(true)
      expect(wrapper.find('.geo-select-toggle-button--disabled').exists()).toBe(true)
    })

    it('Should disable user interaction', () => {
      const wrapper = mount(GeoSelect, {
        stubs,
        propsData: _.assign({}, defaultProps, {
          disabled: true
        })
      })
      expect(wrapper.find('.geo-select-toggle-button').exists()).toBe(true)

      wrapper.find('.geo-select-toggle-button').trigger('click')

      expect(wrapper.find('.geo-select-base__options-container').exists()).toBe(false)
    })
  })

  describe('When paginating', () => {
    const pageSize = 5

    it('Should show initial visible items equal to page size', () => {
      const wrapper = mount(GeoSelect, {
        stubs,
        propsData: _.assign({}, defaultProps, {
          options: _.times(3 * pageSize, idx => { return { label: `${idx}` } }),
          pageSize
        }),
        data () {
          return {
            isOpened: true
          }
        }
      })
      expect(wrapper.findAll('.geo-list-item').length).toBe(pageSize)
    })

    it('Should load items equal to page size after loading more items', () => {
      const mockScrollToLastEntry = jest.fn()
      const wrapper = mount(GeoSelect, {
        stubs,
        propsData: _.assign({}, defaultProps, {
          options: _.times(3 * pageSize, idx => { return { label: `${idx}` } }),
          pageSize
        }),
        data () {
          return {
            isOpened: true
          }
        }
      })
      expect(_.size(wrapper.vm.visibleOptions)).toEqual(pageSize)
      wrapper.vm.loadNextPage({ scrollToLastEntry: mockScrollToLastEntry })
      expect(wrapper.findAll('.geo-list-item').length).toBe(2 * pageSize)
    })

    it('Should show footer button to load more items when there are items to load', () => {
      const wrapper = mount(GeoSelect, {
        stubs,
        propsData: _.assign({}, defaultProps, {
          options: _.times(2 * pageSize, idx => { return { label: `${idx}` } }),
          pageSize
        }),
        data () {
          return {
            isOpened: true
          }
        }
      })
      expect(wrapper.findAll('.geo-list-item').length).toBe(pageSize)
      expect(wrapper.find('geo-list-footer-button-stub').exists()).toBe(true)
    })

    it('Should NOT show footer button to load more items when all items loaded', () => {
      const mockScrollToLastEntry = jest.fn()
      const wrapper = mount(GeoSelect, {
        stubs,
        propsData: _.assign({}, defaultProps, {
          options: _.times(2 * pageSize, idx => { return { label: `${idx}` } }),
          pageSize
        }),
        data () {
          return {
            isOpened: true
          }
        }
      })
      expect(wrapper.findAll('.geo-list-item').length).toBe(pageSize)
      expect(wrapper.find('geo-list-footer-button-stub').exists()).toBe(true)
      wrapper.vm.loadNextPage({ scrollToLastEntry: mockScrollToLastEntry })
      expect(wrapper.findAll('.geo-list-item').length).toBe(2 * pageSize)
      expect(wrapper.find('geo-list-footer-button-stub').exists()).toBe(false)
    })

    it('Should show initial visible items equal to page size when grouping', () => {
      const wrapper = mount(GeoSelect, {
        stubs,
        propsData: _.assign({}, defaultProps, {
          options: [
            {
              isOptGroup: true,
              label: 'First Group',
              items: _.times(pageSize + 1, idx => { return { label: `Item ${idx}`, id: `First${idx}` } })
            },
            {
              isOptGroup: true,
              label: 'Second Group',
              items: _.times(pageSize, idx => { return { label: `Item ${idx}`, id: `Second${idx}` } })
            }
          ],
          pageSize,
          grouped: true
        }),
        data () {
          return {
            isOpened: true
          }
        }
      })

      expect(wrapper.findAll('.geo-list-item').length).toBe(pageSize)
      expect(wrapper.findAll('.geo-list-group').length).toBe(1)
    })

    it('Should show next group when loading next page if is loading items from next group', () => {
      const mockScrollToLastEntry = jest.fn()
      const wrapper = mount(GeoSelect, {
        stubs,
        propsData: _.assign({}, defaultProps, {
          options: [
            {
              isOptGroup: true,
              label: 'First Group',
              // just one item over pageSize so when we load the next we load items from the next group
              items: _.times(pageSize + 1, idx => { return { label: `Item ${idx}`, id: `First${idx}` } })
            },
            {
              isOptGroup: true,
              label: 'Second Group',
              items: _.times(pageSize, idx => { return { label: `Item ${idx}`, id: `Second${idx}` } })
            }
          ],
          pageSize,
          grouped: true
        }),
        data () {
          return {
            isOpened: true
          }
        }
      })

      expect(wrapper.findAll('.geo-list-item').length).toBe(pageSize)
      expect(wrapper.findAll('.geo-list-group').length).toBe(1)
      wrapper.vm.loadNextPage({ scrollToLastEntry: mockScrollToLastEntry })
      expect(wrapper.findAll('.geo-list-item').length).toBe(2 * pageSize)
      expect(wrapper.findAll('.geo-list-group').length).toBe(2)
    })

    it('Should NOT show next group when loading next page if is NOT loading items from next group', () => {
      const mockScrollToLastEntry = jest.fn()
      const wrapper = mount(GeoSelect, {
        stubs,
        propsData: _.assign({}, defaultProps, {
          options: [
            {
              isOptGroup: true,
              label: 'First Group',
              // 2 times pageSize so when loading next page we don't load any item from second group
              items: _.times(2 * pageSize, idx => { return { label: `Item ${idx}`, id: `First${idx}` } })
            },
            {
              isOptGroup: true,
              label: 'Second Group',
              items: _.times(pageSize, idx => { return { label: `Item ${idx}`, id: `Second${idx}` } })
            }
          ],
          pageSize,
          grouped: true
        }),
        data () {
          return {
            isOpened: true
          }
        }
      })

      expect(wrapper.findAll('.geo-list-item').length).toBe(pageSize)
      expect(wrapper.findAll('.geo-list-group').length).toBe(1)
      wrapper.vm.loadNextPage({ scrollToLastEntry: mockScrollToLastEntry })
      expect(wrapper.findAll('.geo-list-item').length).toBe(2 * pageSize)
      expect(wrapper.findAll('.geo-list-group').length).toBe(1)
    })

    it('Should show footer button to load more items when grouping when there are items to load', () => {
      const mockScrollToLastEntry = jest.fn()
      const wrapper = mount(GeoSelect, {
        stubs,
        propsData: _.assign({}, defaultProps, {
          options: [
            {
              isOptGroup: true,
              label: 'First Group',
              items: _.times(pageSize, idx => { return { label: `Item ${idx}`, id: `First${idx}` } })
            },
            {
              isOptGroup: true,
              label: 'Second Group',
              items: _.times(pageSize, idx => { return { label: `Item ${idx}`, id: `Second${idx}` } })
            }
          ],
          pageSize,
          grouped: true
        }),
        data () {
          return {
            isOpened: true
          }
        }
      })
      expect(wrapper.findAll('.geo-list-item').length).toBe(pageSize)
      expect(wrapper.findAll('.geo-list-group').length).toBe(1)
      expect(wrapper.find('geo-list-footer-button-stub').exists()).toBe(true)
      wrapper.vm.loadNextPage({ scrollToLastEntry: mockScrollToLastEntry })
    })

    it('Should NOT show footer button to load more items when grouping when all items loaded', () => {
      const mockScrollToLastEntry = jest.fn()
      const wrapper = mount(GeoSelect, {
        stubs,
        propsData: _.assign({}, defaultProps, {
          options: [
            {
              isOptGroup: true,
              label: 'First Group',
              items: _.times(pageSize, idx => { return { label: `Item ${idx}`, id: `First${idx}` } })
            },
            {
              isOptGroup: true,
              label: 'Second Group',
              items: _.times(pageSize, idx => { return { label: `Item ${idx}`, id: `Second${idx}` } })
            }
          ],
          pageSize,
          grouped: true
        }),
        data () {
          return {
            isOpened: true
          }
        }
      })
      expect(wrapper.findAll('.geo-list-item').length).toBe(pageSize)
      expect(wrapper.findAll('.geo-list-group').length).toBe(1)
      expect(wrapper.find('geo-list-footer-button-stub').exists()).toBe(true)
      wrapper.vm.loadNextPage({ scrollToLastEntry: mockScrollToLastEntry })
      expect(wrapper.findAll('.geo-list-item').length).toBe(2 * pageSize)
      expect(wrapper.findAll('.geo-list-group').length).toBe(2)
      expect(wrapper.find('geo-list-footer-button-stub').exists()).toBe(false)
    })
  })
})
