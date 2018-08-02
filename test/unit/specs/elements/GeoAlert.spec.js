import { createLocalVue, mount } from '@vue/test-utils'
import GeoAlert from '@/elements/GeoAlert.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fab, fas, far)
// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-alert', GeoAlert)

describe('GeoAlert', () => {
  it('should render alert component', function () {
    const wrapper = mount(GeoAlert, {
      propsData: {
        variant: 'success'
      }
    })

    expect(wrapper.find('.geo-alert').exists()).toBe(true)
  })

  it('should show the close button if close listener is provided', function () {
    const wrapper = mount(GeoAlert, {
      propsData: {
        variant: 'success',
        closeIcon: ['fas', 'times']
      },
      listeners: {
        close: function () {}
      }
    })
    expect(wrapper.find('.geo-alert').exists()).toBe(true)
    expect(wrapper.find('.geo-alert__content__close-icon').exists()).toBe(true)
    expect(wrapper.vm.shouldShowCloseButton).toBe(true)
  })

  it('shouldn\'t show the close button if close listener is not provided', function () {
    const wrapper = mount(GeoAlert, {
      propsData: {
        variant: 'success'
      }
    })
    expect(wrapper.find('.geo-alert').exists()).toBe(true)
    expect(wrapper.find('.geo-alert__content__close-icon').exists()).toBe(false)
    expect(wrapper.vm.shouldShowCloseButton).toBe(false)
  })

  it('should emit a close event when clicking on the close button', function () {
    const wrapper = mount(GeoAlert, {
      propsData: {
        variant: 'success',
        closeIcon: ['fas', 'times']
      },
      listeners: {
        close: function () {}
      }
    })
    wrapper.find('.geo-alert__content__close-icon').trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('should display actions when the slots are passed', function () {
    const wrapper = mount(GeoAlert, {
      propsData: {
        variant: 'success'
      },
      slots: {
        actions: '<a slot="actions">Run test action</a>'
      }
    })
    expect(wrapper.find('a').text()).toBe('Run test action')
  })

  it('should display correct icon when passed as a slot', function () {
    const wrapper = mount(GeoAlert, {
      propsData: {
        variant: 'success'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      slots: {
        icon: `<font-awesome-icon
                :icon="['fas', 'circle-notch']"
                slot="icon"
                aria-hidden
                fixed-width
                spin
              />`
      }
    })
    expect(wrapper.find('.fa-circle-notch').exists()).toBe(true)
  })

  it('should apply a CSS suffix when the modifier is provided', function () {
    const wrapper = mount(GeoAlert, {
      propsData: {
        variant: 'success',
        closeIcon: ['fas', 'times'],
        cssModifier: 'test-alert'
      },
      listeners: {
        close: function () {}
      }
    })
    expect(wrapper.find('.geo-alert__content__close-icon--test-alert').exists()).toBe(true)
  })

  it('should add extra class if floating is passed as true', function () {
    const wrapper = mount(GeoAlert, {
      propsData: {
        variant: 'success',
        floating: true
      }
    })

    expect(wrapper.find('.geo-alert--floating').exists()).toBe(true)
  })

  it('shouldn\'t add extra class if floating is not passed', function () {
    const wrapper = mount(GeoAlert, {
      propsData: {
        variant: 'success'
      }
    })

    expect(wrapper.find('.geo-alert--floating').exists()).toBe(false)
  })
})
