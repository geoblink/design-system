import _ from 'lodash'
import * as sinon from 'sinon'
import { mount } from '@vue/test-utils'
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
import GeoTooltip from '@/elements/GeoTooltip/GeoTooltip.vue'
import { FontAwesomeIconMock } from 'test/unit/utils/FontAwesomeIconMock'

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
  'font-awesome-icon': FontAwesomeIconMock,
  'geo-list-footer-button': true,
  'geo-list-clear-item': true,
  'geo-link-button': true,
  'geo-pill': true,
  teleport: true
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
      global: {
        stubs
      },
      props: requiredProps
    })

    expect(wrapper.find('.geo-select-toggle-button').exists()).toBe(true)
  })

  it('Should not render element popup if not opened', () => {
    const wrapper = mount(GeoMultiSelect, {
      global: {
        stubs
      },
      props: requiredProps
    })

    expect(wrapper.find('.geo-select-base__options-container').exists()).toBe(false)
  })

  it('Should render element popup if opened', () => {
    const wrapper = mount(GeoMultiSelect, {
      global: {
        stubs
      },
      props: requiredProps,
      data () {
        return {
          isOpened: true
        }
      }
    })

    expect(wrapper.find('.geo-select-base__options-container').exists()).toBe(true)
  })

  it('Should render element popup with custom class', () => {
    const wrapper = mount(GeoMultiSelect, {
      global: {
        stubs
      },
      props: _.assign(requiredProps, {
        popupClass: 'test-popup-class'
      }),
      data () {
        return {
          isOpened: true
        }
      }
    })
    expect(wrapper.find('.test-popup-class').exists()).toBe(true)
  })

  // TODO: fix click triggering toggle event more than once
  xit('Should show popup on click toggle button', async () => {
    const wrapper = mount(GeoMultiSelect, {
      global: {
        stubs
      },
      props: requiredProps
    })

    expect(wrapper.find('.geo-select-toggle-button').exists()).toBe(true)
    expect(wrapper.find('.geo-select-base__options-container').exists()).toBe(false)
    await wrapper.find('.geo-select-toggle-button').trigger('click')
    expect(wrapper.vm.isOpened).toBe(true)
    expect(wrapper.find('.geo-select-base__options-container').exists()).toBe(true)
  })

  it('Should execute load more results when given the event', async () => {
    const mockScrollToLastEntry = jest.fn()
    const wrapper = mount(GeoMultiSelect, {
      global: {
        stubs
      },
      props: requiredProps
    })

    wrapper.vm.$refs.selectBase.$emit('load-more-results', { scrollToLastEntry: mockScrollToLastEntry })
    await wrapper.vm.$nextTick()
    expect(mockScrollToLastEntry).toHaveBeenCalled()
  })

  // TODO: fix click triggering toggle event more than once
  xit('Should change model when selecting one of the options', async () => {
    const wrapper = mount(GeoMultiSelect, {
      global: {
        stubs
      },
      props: requiredProps
    })

    await wrapper.find('.geo-select-toggle-button').trigger('click')
    expect(wrapper.vm.isOpened).toBe(true)
    await wrapper.find('.geo-multi-select__label').trigger('click')
    expect(wrapper.vm.isOpened).toBe(true)
    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input[0][0]).toEqual([{ label: 'Item 0', id: 0 }])
  })

  // TODO: migrate component to emit update-model:input instead of input
  xit('Should change model with multiple options', async () => {
    const wrapper = mount(GeoMultiSelect, {
      global: {
        stubs
      },
      props: requiredProps,
      data () {
        return {
          isOpened: true
        }
      }
    })

    const allOptions = wrapper.findAll('.geo-multi-select_input')
    await allOptions.at(0).trigger('input')
    await wrapper.setProps({ value: wrapper.emitted().input[0][0] })
    await allOptions.at(1).trigger('input')
    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input.length).toBe(2)
    expect(wrapper.emitted().input[0][0]).toEqual([{ label: 'Item 0', id: 0 }])
    expect(wrapper.emitted().input[1][0]).toEqual([{ label: 'Item 0', id: 0 }, { label: 'Item 1', id: 1 }])
  })

  it('Should show/hide search box if given the prop', async () => {
    const wrapper = mount(GeoMultiSelect, {
      global: {
        stubs
      },
      props: _.assign(requiredProps, {
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
    await wrapper.setProps({ searchable: false })
    expect(wrapper.find('.geo-bordered-box-header-search-form').exists()).toBe(false)
  })

  it('Should filter the select options when typing on the search box', async () => {
    const wrapper = mount(GeoMultiSelect, {
      global: {
        stubs
      },
      props: _.assign(requiredProps, {
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
    await wrapper.find('.geo-input__input').trigger('input')
    expect(wrapper.findAll('.geo-list-item').length).toBe(1)
    expect(wrapper.find('.geo-list-item').text()).toEqual('Item 1')
  })

  it('Should toggle all items in group when toggling group', async () => {
    const firstGroupItems = _.times(5, idx => { return { label: `Item ${idx}`, id: `First${idx}` } })
    const wrapper = mount(GeoMultiSelect, {
      global: {
        stubs
      },
      props: _.assign(requiredProps, {
        options: [
          {
            isOptGroup: true,
            label: 'First Group',
            items: firstGroupItems
          }
        ],
        grouped: true
      }),
      data () {
        return {
          isOpened: true
        }
      }
    })
    const changeModelSpy = jest.spyOn(wrapper.vm, 'changeModel')
    expect(wrapper.findAll('.geo-list-item').length).toBe(5)
    expect(wrapper.findAll('.geo-list-group').length).toBe(1)
    await wrapper.findAll('.geo-list-group').at(0).find('.geo-multi-select_input').trigger('input')
    expect(changeModelSpy).toHaveBeenCalledWith(firstGroupItems)
  })

  it('Should toggle all items in group when toggling group even if they\'re not visible because of pagination', async () => {
    const firstGroupItems = _.times(5, idx => { return { label: `Item ${idx}`, id: `First${idx}` } })
    const wrapper = mount(GeoMultiSelect, {
      global: {
        stubs
      },
      props: _.assign(requiredProps, {
        options: [
          {
            isOptGroup: true,
            label: 'First Group',
            items: firstGroupItems
          }
        ],
        grouped: true,
        pageSize: 3
      }),
      data () {
        return {
          isOpened: true
        }
      }
    })
    const changeModelSpy = jest.spyOn(wrapper.vm, 'changeModel')
    expect(wrapper.findAll('.geo-list-item').length).toBe(3)
    expect(wrapper.findAll('.geo-list-group').length).toBe(1)
    await wrapper.findAll('.geo-list-group').at(0).find('.geo-list-group-header .geo-multi-select_input').trigger('input')
    expect(changeModelSpy).toHaveBeenCalledWith(firstGroupItems)
  })
})
