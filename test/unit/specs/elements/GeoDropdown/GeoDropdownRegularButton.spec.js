import _ from 'lodash'
import { mount } from '@vue/test-utils'
import GeoDropdownRegularButton from '@/elements/GeoDropdown/GeoDropdownRegularButton.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIconMock } from 'test/unit/utils/FontAwesomeIconMock'
import { X_AXIS_POSITION } from 'src/elements/GeoDropdown/GeoDropdown.constants'

library.add(fas)

describe('GeoDropdownRegularButton', () => {
  it('Should render icon when given', function () {
    const wrapper = getWrapper({
      props: {
        icon: ['fas', 'user']
      }
    })

    expect(wrapper.find('.geo-dropdown-regular-button-container__icon').exists()).toBe(true)
  })

  it('Should not render icon if not given', function () {
    const wrapper = getWrapper()

    expect(wrapper.find('.geo-dropdown-regular-button-container__icon').exists()).toBe(false)
  })

  it('Should render default slot content when given', async function () {
    const wrapper = getWrapper({
      slots: {
        default: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })

    expect(wrapper.find('.geo-dropdown-regular-button-container__content .my-demo-content').exists()).toBe(true)
  })

  it('Should not render container if default slot if empty', async function () {
    const wrapper = getWrapper()

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.geo-dropdown-regular-button-container__content').exists()).toBe(false)
  })

  it('Should emit click event when clicked', function () {
    const wrapper = getWrapper()

    wrapper.find('.geo-dropdown-regular-button-container').trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })

  // TODO: WEB-2073 Fix check, native click event is still triggered even if custom click event is not emitted
  xit('Should not emit click event when disabled', async function () {
    const wrapper = getWrapper({
      props: {
        disabled: true
      }
    })

    await wrapper.find('.geo-dropdown-regular-button-container').trigger('click')
    expect(wrapper.emitted().click).toBeFalsy()
  })

  it('Should apply proper class when active', function () {
    const wrapper = getWrapper({
      props: {
        active: true
      }
    })

    expect(wrapper.find('.geo-dropdown-regular-button-container--active').exists()).toBe(true)
    expect(wrapper.find('.geo-dropdown-regular-button-container--disabled').exists()).toBe(false)
  })

  it('Should apply proper class when disabled', function () {
    const wrapper = getWrapper({
      props: {
        disabled: true
      }
    })

    expect(wrapper.find('.geo-dropdown-regular-button-container--active').exists()).toBe(false)
    expect(wrapper.find('.geo-dropdown-regular-button-container--disabled').exists()).toBe(true)
  })

  it('Should apply proper class when active and disabled', function () {
    const wrapper = getWrapper({
      props: {
        active: true,
        disabled: true
      }
    })

    expect(wrapper.find('.geo-dropdown-regular-button-container--active').exists()).toBe(true)
    expect(wrapper.find('.geo-dropdown-regular-button-container--disabled').exists()).toBe(true)
  })

  it('Should apply proper class when icon position by default', function () {
    const wrapper = getWrapper({
      props: {
        icon: ['fas', 'user']
      }
    })

    expect(wrapper.find('.geo-dropdown-regular-button-container__icon--left').exists()).toBe(true)
  })

  it('Should apply proper class when icon position right', function () {
    const wrapper = getWrapper({
      props: {
        icon: ['fas', 'user'],
        iconPosition: X_AXIS_POSITION.right
      }
    })

    expect(wrapper.find('.geo-dropdown-regular-button-container__icon--right').exists()).toBe(true)
  })
})

function getWrapper (options = {}) {
  return mount(GeoDropdownRegularButton, _.assign({
    global: {
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      }
    }
  }, options))
}
