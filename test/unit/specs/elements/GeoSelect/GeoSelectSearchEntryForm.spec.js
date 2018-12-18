import { mount } from '@vue/test-utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import GeoSelectSearchEntryForm from '@/elements/GeoSelect/GeoSelectSearchEntryForm.vue'

library.add(fas)

describe('GeoSelectSearchEntryForm', () => {
  it('should render element', () => {
    const wrapper = mount(GeoSelectSearchEntryForm, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        searchIcon: ['fas', 'search']
      }
    })
    expect(wrapper.find('.geo-select-search-entry-form__container').exists()).toBe(true)
  })

  it('Should fail validation if passed an incorrect value', () => {
    let spy = jest.spyOn(console, 'error')
    afterEach(() => spy.mockReset())

    const wrapper = mount(GeoSelectSearchEntryForm, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        value: 45,
        searchIcon: ['fas', 'search']
      }
    })
    expect(spy).toBeCalledWith(expect.stringContaining('[Vue warn]: Invalid prop'))
  })

  it('Should pass validation if passed a correct value', () => {
    let spy = jest.spyOn(console, 'error')
    afterEach(() => spy.mockReset())

    const wrapper = mount(GeoSelectSearchEntryForm, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        value: 'Some value',
        searchIcon: ['fas', 'search']
      }
    })
    expect(wrapper.find('.geo-select-search-entry-form__search-input').element.value).toBe('Some value')
  })

  it('should display the placeholder if it is given', () => {
    const wrapper = mount(GeoSelectSearchEntryForm, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        placeholder: 'Some demo placeholder',
        searchIcon: ['fas', 'search']
      }
    })
    expect(wrapper.find('.geo-select-search-entry-form__search-input').exists()).toBe(true)
    expect(wrapper.find('.geo-select-search-entry-form__search-input').element.placeholder).toBe('Some demo placeholder')
  })

  it('should emit an event when something is typed down', (done) => {
    const wrapper = mount(GeoSelectSearchEntryForm, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        searchIcon: ['fas', 'search']
      }
    })
    const textInput = wrapper.find('.geo-select-search-entry-form__search-input')
    textInput.setValue('Some search')
    wrapper.find('.geo-select-search-entry-form__search-input').trigger('keyup')
    expect(wrapper.find('.geo-select-search-entry-form__search-input').element.value).toBe('Some search')
    setTimeout(function () {
      expect(wrapper.emitted().input).toBeTruthy()
      done()
    })
  })
})
