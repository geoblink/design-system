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
import _ from 'lodash'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

const iconsToMock = [
  'faChevronUp',
  'faChevronDown'
]
const mockedFalIcons = _.mapValues(_.pick(fas, iconsToMock), function (original) {
  return _.assign({}, original, {
    prefix: 'fal'
  })
})

library.add(fas, mockedFalIcons)

describe('GeoSelect', () => {
  it('Should render toggle button', () => {
    const wrapper = mount(GeoSelect, {
      stubs: {
        GeoSelectBase,
        GeoSelectToggleButton,
        GeoDropdown,
        GeoBorderedBox,
        GeoScrollableContainer,
        GeoMarquee,
        GeoHighlightedString,
        GeoListItem,
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        options: _.times(4, idx => { return { label: `${idx}` } }),
        placeholder: 'Some Placeholder',
        dropdownIcon: ['fas', 'chevron-down'],
        forceYAxisPosition: Y_AXIS_POSITION.top,
        pageSize: 4,
        value: { label: 'Item 0' }
      }
    })
    expect(wrapper.find('.geo-select-toggle-button--geo-select').exists()).toBe(true)
  })

  it('Should not render element popup if not opened', () => {
    const wrapper = mount(GeoSelect, {
      stubs: {
        GeoSelectBase,
        GeoSelectToggleButton,
        GeoDropdown,
        GeoBorderedBox,
        GeoScrollableContainer,
        GeoMarquee,
        GeoHighlightedString,
        GeoListItem,
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        options: _.times(4, idx => { return { label: `${idx}` } }),
        placeholder: 'Some Placeholder',
        dropdownIcon: ['fas', 'chevron-down'],
        forceYAxisPosition: Y_AXIS_POSITION.top,
        pageSize: 4,
        value: { label: 'Item 0' }
      }
    })
    expect(wrapper.find('.geo-select__options-container--geo-select').exists()).toBe(false)
  })

  it('Should render element popup if opened', () => {
    const wrapper = mount(GeoSelect, {
      stubs: {
        GeoSelectBase,
        GeoSelectToggleButton,
        GeoDropdown,
        GeoBorderedBox,
        GeoScrollableContainer,
        GeoMarquee,
        GeoHighlightedString,
        GeoListItem,
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        options: _.times(4, idx => { return { label: `${idx}` } }),
        placeholder: 'Some Placeholder',
        dropdownIcon: ['fas', 'chevron-down'],
        forceYAxisPosition: Y_AXIS_POSITION.top,
        pageSize: 4,
        value: { label: 'Item 0' }
      },
      data () {
        return {
          isOpened: true
        }
      }
    })
    expect(wrapper.find('.geo-select__options-container--geo-select').exists()).toBe(true)
  })

  it('Invalid default value for GeoSelect', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {})

    afterEach(() => spy.mockReset())
    const wrapper = mount(GeoSelect, {
      stubs: {
        GeoSelectBase,
        GeoSelectToggleButton,
        GeoDropdown,
        GeoBorderedBox,
        GeoScrollableContainer,
        GeoMarquee,
        GeoHighlightedString,
        GeoListItem,
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        options: _.times(4, idx => { return { label: `${idx}` } }),
        placeholder: 'Some Placeholder',
        dropdownIcon: ['fas', 'chevron-down'],
        value: { label: 45 }
      },
      data () {
        return {
          isOpened: true
        }
      }
    })
    expect(wrapper.find('.geo-select__options-container--geo-select').exists()).toBe(true)
    expect(spy).toBeCalledWith(expect.stringContaining('[Vue warn]: Invalid prop'))
  })

  it('Should execute load more results when given the event', (done) => {
    const mockScrollToLastEntry = jest.fn()
    const wrapper = mount(GeoSelect, {
      stubs: {
        GeoSelectBase,
        GeoSelectToggleButton,
        GeoDropdown,
        GeoBorderedBox,
        GeoScrollableContainer,
        GeoMarquee,
        GeoHighlightedString,
        GeoListItem,
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        options: _.times(4, idx => { return { label: `${idx}` } }),
        placeholder: 'Some Placeholder'
      }
    })
    wrapper.vm.$refs.selectBase.$emit('load-more-results', { scrollToLastEntry: mockScrollToLastEntry })
    // https://vue-test-utils.vuejs.org/guides/testing-async-components.html
    wrapper.vm.$nextTick(() => {
      expect(mockScrollToLastEntry).toHaveBeenCalled()
      done()
    })
  })

  it('Should change selection when selecting one of the options', () => {
    const wrapper = mount(GeoSelect, {
      stubs: {
        GeoSelectBase,
        GeoSelectToggleButton,
        GeoDropdown,
        GeoBorderedBox,
        GeoScrollableContainer,
        GeoMarquee,
        GeoHighlightedString,
        GeoListItem,
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        options: _.times(4, idx => { return { label: `${idx}` } }),
        placeholder: 'Some Placeholder',
        dropdownIcon: ['fas', 'chevron-down']
      }
    })
    wrapper.find('.geo-select-toggle-button--geo-select').trigger('click')
    expect(wrapper.vm.isOpened).toBe(true)
    wrapper.find('.geo-list-item--geo-select').trigger('click')
    expect(wrapper.vm.isOpened).toBe(false)
    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input[0][0]).toEqual({ label: '0' })
  })

  it('Should show/hide search box if given the prop', () => {
    const wrapper = mount(GeoSelect, {
      stubs: {
        GeoSelectBase,
        GeoSelectToggleButton,
        GeoDropdown,
        GeoBorderedBox,
        GeoBorderedBoxHeaderSearchForm,
        GeoScrollableContainer,
        GeoMarquee,
        GeoHighlightedString,
        GeoListItem,
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        options: _.times(4, idx => { return { label: `${idx}` } }),
        placeholder: 'Some Placeholder',
        dropdownIcon: ['fas', 'chevron-down'],
        searchIcon: ['fas', 'search'],
        searchable: true
      },
      data () {
        return {
          isOpened: true
        }
      }
    })
    expect(wrapper.find('.geo-bordered-box-header-search-form--geo-select').exists()).toBe(true)
    wrapper.setProps({ searchable: false })
    expect(wrapper.find('.geo-bordered-box-header-search-form--geo-select').exists()).toBe(false)
  })

  it('Should filter the select options when typing on the search box', () => {
    const wrapper = mount(GeoSelect, {
      stubs: {
        GeoSelectBase,
        GeoSelectToggleButton,
        GeoDropdown,
        GeoBorderedBox,
        GeoBorderedBoxHeaderSearchForm,
        GeoScrollableContainer,
        GeoMarquee,
        GeoHighlightedString,
        GeoListItem,
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        options: _.times(4, idx => { return { label: `Item ${idx}` } }),
        placeholder: 'Some Placeholder',
        dropdownIcon: ['fas', 'chevron-down'],
        searchIcon: ['fas', 'search'],
        searchable: true
      },
      data () {
        return {
          isOpened: true
        }
      }
    })
    wrapper.find('.geo-bordered-box-header-search-form__input').element.value = 'Item 1'
    wrapper.find('.geo-bordered-box-header-search-form__input').trigger('keyup')
    expect(wrapper.findAll('.geo-list-item--geo-select').length).toBe(1)
    expect(wrapper.find('.geo-list-item--geo-select').text()).toEqual('Item 1')
  })

  it('Should filter options in an opt-group select', () => {
    const wrapper = mount(GeoSelect, {
      stubs: {
        GeoSelectBase,
        GeoSelectToggleButton,
        GeoDropdown,
        GeoBorderedBox,
        GeoBorderedBoxHeaderSearchForm,
        GeoScrollableContainer,
        GeoMarquee,
        GeoHighlightedString,
        GeoListItem,
        GeoListGroup,
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
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
        placeholder: 'Some Placeholder',
        dropdownIcon: ['fas', 'chevron-down'],
        searchIcon: ['fas', 'search'],
        searchable: true,
        isOptSelect: true
      },
      data () {
        return {
          isOpened: true
        }
      }
    })
    wrapper.find('.geo-bordered-box-header-search-form__input').element.value = 'Second Group'
    wrapper.find('.geo-bordered-box-header-search-form__input').trigger('keyup')
    expect(wrapper.findAll('.geo-list-item--geo-select').length).toBe(4)
  })
})
