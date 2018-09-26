import { createLocalVue, mount } from '@vue/test-utils'
import GeoDropdownRegularButton from '@/elements/GeoDropdown/GeoDropdownRegularButton.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fab, fas, far)

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-dropdown-footer', GeoDropdownRegularButton)

describe('GeoDropdownRegularButton', () => {
  it('should render icon when given', function () {
    const wrapper = mount(GeoDropdownRegularButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      propsData: {
        icon: ['far', 'user']
      }
    })

    expect(wrapper.find('.geo-dropdown__regular-button-container__icon').exists()).toBe(true)
  })

  it('should not render icon if not given', function () {
    const wrapper = mount(GeoDropdownRegularButton, { })

    expect(wrapper.find('.geo-dropdown__regular-button-container__icon').exists()).toBe(false)
  })

  it('should render default slot content when given', function () {
    const wrapper = mount(GeoDropdownRegularButton, {
      slots: {
        default: [`<span class="my-demo-content">Just some unique demo content</span>`]
      }
    })

    expect(wrapper.find('.geo-dropdown__regular-button-container__string .my-demo-content').exists()).toBe(true)
  })

  it('should not render container if default slot if empty', function () {
    const wrapper = mount(GeoDropdownRegularButton, { })

    expect(wrapper.find('.geo-dropdown__regular-button-container__string').exists()).toBe(false)
  })

  it('should emit click event when clicked', function () {
    const wrapper = mount(GeoDropdownRegularButton, { })

    wrapper.find('.geo-dropdown__regular-button-container').trigger('click')
    expect(wrapper.emitted()['click']).toBeTruthy()
  })
})
