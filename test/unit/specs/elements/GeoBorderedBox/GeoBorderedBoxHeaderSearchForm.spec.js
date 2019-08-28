import { mount } from '@vue/test-utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import GeoBorderedBoxHeaderSearchForm from '@/elements/GeoBorderedBox/GeoBorderedBoxHeaderSearchForm.vue'

library.add(fas)

describe('GeoBorderedBoxHeaderSearchForm', () => {
  it('should render element', () => {
    const wrapper = mount(GeoBorderedBoxHeaderSearchForm, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
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
        'font-awesome-icon': FontAwesomeIcon
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
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        value: 'Some value',
        searchIcon: ['fas', 'search']
      }
    })
    expect(wrapper.find('.geo-bordered-box-header-search-form__input').element.value).toBe('Some value')
  })

  it('should display the placeholder if it is given', () => {
    const wrapper = mount(GeoBorderedBoxHeaderSearchForm, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        placeholder: 'Some demo placeholder',
        searchIcon: ['fas', 'search']
      }
    })
    expect(wrapper.find('.geo-bordered-box-header-search-form__input').exists()).toBe(true)
    expect(wrapper.find('.geo-bordered-box-header-search-form__input').element.placeholder).toBe('Some demo placeholder')
  })

  it('should emit an event when something is typed down', () => {
    jest.useFakeTimers()
    const wrapper = mount(GeoBorderedBoxHeaderSearchForm, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        searchIcon: ['fas', 'search']
      }
    })
    const textInput = wrapper.find('.geo-bordered-box-header-search-form__input')
    textInput.setValue('Some search')
    wrapper.find('.geo-bordered-box-header-search-form__input').trigger('keyup')
    expect(wrapper.find('.geo-bordered-box-header-search-form__input').element.value).toBe('Some search')
    jest.runAllTimers()
    expect(wrapper.emitted().input).toBeTruthy()
  })
})
