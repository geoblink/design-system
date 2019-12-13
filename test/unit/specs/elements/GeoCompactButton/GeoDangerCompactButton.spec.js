import { createLocalVue, mount } from '@vue/test-utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock.js'
import GeoActivityIndicator from '@/elements/GeoActivityIndicator/GeoActivityIndicator.vue'
import GeoCompactButton from '@/elements/GeoCompactButton/GeoCompactButton.vue'
import GeoDangerCompactButton from '@/elements/GeoCompactButton/GeoDangerCompactButton.vue'

library.add(fas)

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-activity-indicator', GeoActivityIndicator)
localVue.component('geo-compact-button', GeoCompactButton)
localVue.component('geo-danger-compact-button', GeoDangerCompactButton)

describe('GeoDangerCompactButton', function () {
  it('Should render button\'s content', function () {
    const wrapper = mount(GeoDangerCompactButton, {
      propsData: {
        icon: ['fas', 'exclamation-triangle']
      },
      stubs: {
        GeoCompactButton,
        FontAwesomeIcon
      }
    })
    const button = wrapper.find('.geo-compact-button--danger')
    expect(button.exists()).toBe(true)
  })

  it('Should render correct icon when provided', function () {
    const wrapper = mount(GeoDangerCompactButton, {
      propsData: {
        icon: ['fas', 'thumbs-up']
      },
      stubs: {
        GeoCompactButton,
        'font-awesome-icon': FontAwesomeIconMock
      }
    })
    const fontAwesomeIconElem = wrapper.find(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'thumbs-up'])
  })

  it('Should emit an event on click', async function () {
    const wrapper = mount(GeoDangerCompactButton, {
      propsData: {
        icon: ['fas', 'exclamation-triangle']
      },
      stubs: {
        GeoCompactButton,
        FontAwesomeIcon
      }
    })
    wrapper.find('.geo-compact-button').trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted()['click']).toBeTruthy()
  })

  it('Should not emit an event when it\'s disabled', function () {
    const wrapper = mount(GeoDangerCompactButton, {
      propsData: {
        icon: ['fas', 'exclamation-triangle'],
        disabled: true
      },
      stubs: {
        GeoCompactButton,
        FontAwesomeIcon
      }
    })
    const button = wrapper.find('.geo-compact-button')
    button.trigger('click')
    expect(wrapper.emitted()['click']).toBeFalsy()
  })

  it('Should show activity indicator when loading', function () {
    const wrapper = mount(GeoDangerCompactButton, {
      propsData: {
        icon: ['fas', 'exclamation-triangle'],
        loading: true
      },
      stubs: {
        GeoActivityIndicator,
        GeoCompactButton,
        FontAwesomeIcon
      }
    })
    expect(wrapper.find('.geo-compact-button__activity-indicator').exists()).toBe(true)
  })
})
