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
    expect(wrapper.find('.geo-select-toggle-button--geo-select').exists()).toBe(true)
  })

  it('Should not render element popup if not opened', () => {
    const wrapper = mount(GeoSelect, {
      stubs,
      propsData: defaultProps
    })
    expect(wrapper.find('.geo-select__options-container--geo-select').exists()).toBe(false)
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
    expect(wrapper.find('.geo-select__options-container--geo-select').exists()).toBe(true)
  })

  it('Should show element popup on click on toggle button', () => {
    const wrapper = mount(GeoSelect, {
      stubs,
      propsData: defaultProps
    })
    expect(wrapper.find('.geo-select-toggle-button--geo-select').exists()).toBe(true)

    wrapper.find('.geo-select-toggle-button--geo-select').trigger('click')

    expect(wrapper.find('.geo-select__options-container--geo-select').exists()).toBe(true)
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

  it('Should change selection when selecting one of the options', () => {
    const wrapper = mount(GeoSelect, {
      stubs,
      propsData: defaultProps
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
    expect(wrapper.find('.geo-bordered-box-header-search-form--geo-select').exists()).toBe(true)
    wrapper.setProps({ searchable: false })
    expect(wrapper.find('.geo-bordered-box-header-search-form--geo-select').exists()).toBe(false)
  })

  it('Should filter the select options when typing on the search box', async () => {
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

    expect(wrapper.findAll('.geo-list-item--geo-select').length).toBe(4)
    wrapper.find('.geo-input__input').element.value = 'Item 1'
    const event = new Event('keyup')
    wrapper.find('.geo-input__input').element.dispatchEvent(event)
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.geo-list-item--geo-select').length).toBe(1)
    expect(wrapper.find('.geo-list-item--geo-select').text()).toEqual('Item 1')
  })

  it('Should filter options in an opt-group select', async () => {
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

    expect(wrapper.findAll('.geo-list-item--geo-select').length).toBe(8)
    wrapper.find('.geo-input__input').element.value = 'Second Group'
    const event = new Event('keyup')
    wrapper.find('.geo-input__input').element.dispatchEvent(event)
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.geo-list-item--geo-select').length).toBe(4)
  })

  describe('When disabled', () => {
    it('Should pass disabled prop to toggle button', () => {
      const wrapper = mount(GeoSelect, {
        stubs,
        propsData: _.assign({}, defaultProps, {
          disabled: true
        })
      })
      expect(wrapper.find('.geo-select-toggle-button--geo-select').exists()).toBe(true)
      expect(wrapper.find('.geo-select-toggle-button--disabled--geo-select').exists()).toBe(true)
    })

    it('Should disable user interaction', () => {
      const wrapper = mount(GeoSelect, {
        stubs,
        propsData: _.assign({}, defaultProps, {
          disabled: true
        })
      })
      expect(wrapper.find('.geo-select-toggle-button--geo-select').exists()).toBe(true)

      wrapper.find('.geo-select-toggle-button--geo-select').trigger('click')

      expect(wrapper.find('.geo-select__options-container--geo-select').exists()).toBe(false)
    })
  })
})
