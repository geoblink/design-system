import { mount } from '@vue/test-utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import GeoBorderedBoxHeaderSearchForm from '@/elements/GeoBorderedBox/GeoBorderedBoxHeaderSearchForm.vue'
import GeoInput from '@/elements/GeoInput/GeoInput.vue'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock.js'

library.add(fas)

describe('GeoBorderedBoxHeaderSearchForm', () => {
  it('Should render element', () => {
    const wrapper = mount(GeoBorderedBoxHeaderSearchForm, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon,
        GeoInput
      },
      propsData: {
        searchIcon: ['fas', 'search']
      }
    })
    expect(wrapper.find('.geo-bordered-box-header-search-form').exists()).toBe(true)
  })

  it('Should fail validation if passed an incorrect value', () => {
    const spy = jest.spyOn(global.console, 'error').mockImplementation(() => { })
    afterEach(() => spy.mockReset())

    const wrapper = mount(GeoBorderedBoxHeaderSearchForm, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon,
        GeoInput
      },
      propsData: {
        value: 45,
        searchIcon: ['fas', 'search']
      }
    })
    expect(wrapper.find('.geo-bordered-box-header-search-form').exists()).toBe(true)
    expect(spy).toBeCalledWith(expect.stringContaining('[Vue warn]: Invalid prop'))
  })

  it('Should pass validation if passed a correct value', () => {
    const wrapper = mount(GeoBorderedBoxHeaderSearchForm, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon,
        GeoInput
      },
      propsData: {
        value: 'Some value',
        searchIcon: ['fas', 'search']
      }
    })
    expect(wrapper.find('.geo-input__input').exists()).toBe(true)
    expect(wrapper.find('.geo-input__input').element.value).toBe('Some value')
  })

  it('Should display the placeholder if it is given', () => {
    const wrapper = mount(GeoBorderedBoxHeaderSearchForm, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon,
        GeoInput
      },
      propsData: {
        placeholder: 'Some demo placeholder',
        searchIcon: ['fas', 'search']
      }
    })
    expect(wrapper.find('.geo-input__input').exists()).toBe(true)
    expect(wrapper.find('.geo-input__input').element.placeholder).toBe('Some demo placeholder')
  })

  it('Should emit an event when something is typed down', () => {
    const wrapper = mount(GeoBorderedBoxHeaderSearchForm, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon,
        GeoInput
      },
      propsData: {
        searchIcon: ['fas', 'search']
      }
    })

    const textInput = wrapper.find('.geo-input__input')
    textInput.setValue('Some search')
    wrapper.find('.geo-input__input').trigger('keyup')
    expect(wrapper.find('.geo-input__input').element.value).toBe('Some search')
    expect(wrapper.emitted().input).toBeTruthy()
  })

  it('Should render correct default search icon', () => {
    const wrapper = mount(GeoBorderedBoxHeaderSearchForm, {
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock,
        GeoInput
      }
    })

    const fontAwesomeIconElem = wrapper.find(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fal', 'search'])
  })

  it('Should correctly render beforeSearchIconItem slot', () => {
    const wrapper = mount(GeoBorderedBoxHeaderSearchForm, {
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock,
        GeoInput
      },
      slots: {
        beforeSearchIconItem: '<div class="my-content-before">Custom content</div'
      }
    })

    expect(wrapper.find('.my-content-before').exists()).toBe(true)
    expect(wrapper.find('.my-content-before').text()).toBe('Custom content')
  })

  it('Should correctly render afterSearchIconItem slot', () => {
    const wrapper = mount(GeoBorderedBoxHeaderSearchForm, {
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock,
        GeoInput
      },
      slots: {
        afterSearchIconItem: '<div class="my-content-after">Custom content</div'
      }
    })

    expect(wrapper.find('.my-content-after').exists()).toBe(true)
    expect(wrapper.find('.my-content-after').text()).toBe('Custom content')
  })

  it('Should correctly render trailingAccessoryItem slot', () => {
    const wrapper = mount(GeoBorderedBoxHeaderSearchForm, {
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock,
        GeoInput
      },
      slots: {
        trailingAccessoryItem: '<div class="my-content-trailing">Custom content</div'
      }
    })

    expect(wrapper.find('.my-content-trailing').exists()).toBe(true)
    expect(wrapper.find('.my-content-trailing').text()).toBe('Custom content')
  })
})
