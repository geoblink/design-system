import _ from 'lodash'
import * as sinon from 'sinon'
import { mount } from '@vue/test-utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import GeoMultiSelect from '@/elements/GeoSelect/GeoMultiSelect.vue'
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

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

const iconsToMock = [
  'faChevronUp',
  'faChevronDown',
  'faTimes'
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
  FontAwesomeIcon
}

const requiredProps = {
  options: _.times(4, idx => { return { label: `Item ${idx}`, id: idx } }),
  keyForId: 'id',
  keyForLabel: 'label',
  placeholder: 'Some Placeholder',
  dropdownIcon: ['fas', 'chevron-down']
}

describe('GeoMultiSelect', () => {
  const sandbox = sinon.createSandbox()

  beforeEach(function () {
    sandbox.restore()
    sandbox.stub(_, 'throttle').returnsArg(0)
  })

  afterEach(function () {
    sandbox.restore()
  })
  
  it('Should render toggle button', () => {
    const wrapper = mount(GeoMultiSelect, {
      stubs,
      propsData: requiredProps
    })

    expect(wrapper.find('.geo-select-toggle-button--geo-multi-select').exists()).toBe(true)
  })

  it('Should not render element popup if not opened', () => {
    const wrapper = mount(GeoMultiSelect, {
      stubs,
      propsData: requiredProps
    })

    expect(wrapper.find('.geo-select__options-container--geo-multi-select').exists()).toBe(false)
  })

  it('Should render element popup if opened', () => {
    const wrapper = mount(GeoMultiSelect, {
      stubs,
      propsData: requiredProps,
      data () {
        return {
          isOpened: true
        }
      }
    })

    expect(wrapper.find('.geo-select__options-container--geo-multi-select').exists()).toBe(true)
  })

  it('Should show popup on click toggle button', () => {
    const wrapper = mount(GeoMultiSelect, {
      stubs,
      propsData: requiredProps
    })

    expect(wrapper.find('.geo-select-toggle-button--geo-multi-select').exists()).toBe(true)
    expect(wrapper.find('.geo-select__options-container--geo-multi-select').exists()).toBe(false)
    wrapper.find('.geo-select-toggle-button--geo-multi-select').trigger('click')
    expect(wrapper.find('.geo-select__options-container--geo-multi-select').exists()).toBe(true)
  })

  it('Should execute load more results when given the event', (done) => {
    const mockScrollToLastEntry = jest.fn()
    const wrapper = mount(GeoMultiSelect, {
      stubs,
      propsData: requiredProps
    })

    wrapper.vm.$refs.selectBase.$emit('load-more-results', { scrollToLastEntry: mockScrollToLastEntry })
    // https://vue-test-utils.vuejs.org/guides/testing-async-components.html
    wrapper.vm.$nextTick(() => {
      expect(mockScrollToLastEntry).toHaveBeenCalled()
      done()
    })
  })

  it('Should change model when selecting one of the options', () => {
    const wrapper = mount(GeoMultiSelect, {
      stubs,
      propsData: requiredProps
    })

    wrapper.find('.geo-select-toggle-button--geo-multi-select').trigger('click')
    expect(wrapper.vm.isOpened).toBe(true)
    wrapper.find('.geo-multi-select_label').trigger('click')
    expect(wrapper.vm.isOpened).toBe(true)
    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input[0][0]).toEqual([{ label: 'Item 0', id: 0 }])
  })

  it('Should change model with multiple options', () => {
    const wrapper = mount(GeoMultiSelect, {
      stubs,
      propsData: requiredProps,
      data () {
        return {
          isOpened: true
        }
      }
    })

    const allOptions = wrapper.findAll('.geo-multi-select_label')
    allOptions.at(0).trigger('click')
    wrapper.setProps({ value: wrapper.emitted().input[0][0] })
    allOptions.at(1).trigger('click')
    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input.length).toBe(2)
    expect(wrapper.emitted().input[0][0]).toEqual([{ label: 'Item 0', id: 0 }])
    expect(wrapper.emitted().input[1][0]).toEqual([{ label: 'Item 0', id: 0 }, { label: 'Item 1', id: 1 }])
  })

  it('Should show/hide search box if given the prop', () => {
    const wrapper = mount(GeoMultiSelect, {
      stubs,
      propsData: _.assign(requiredProps, {
        searchIcon: ['fas', 'search'],
        searchable: true
      }),
      data () {
        return {
          isOpened: true
        }
      }
    })
    expect(wrapper.find('.geo-bordered-box-header-search-form--geo-multi-select').exists()).toBe(true)
    wrapper.setProps({ searchable: false })
    expect(wrapper.find('.geo-bordered-box-header-search-form--geo-multi-select').exists()).toBe(false)
  })

  it('Should filter the select options when typing on the search box', async () => {
    const wrapper = mount(GeoMultiSelect, {
      stubs,
      propsData: _.assign(requiredProps, {
        searchIcon: ['fas', 'search'],
        searchable: true
      }),
      data () {
        return {
          isOpened: true
        }
      }
    })    

    expect(wrapper.findAll('.geo-list-item--geo-multi-select').length).toBe(4)
    wrapper.find('.geo-input__input').element.value = 'Item 1'
    const event = new Event('keyup')
    wrapper.find('.geo-input__input').element.dispatchEvent(event)
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.geo-list-item--geo-multi-select').length).toBe(1)
    expect(wrapper.find('.geo-list-item--geo-multi-select').text()).toEqual('Item 1')
  })
})
