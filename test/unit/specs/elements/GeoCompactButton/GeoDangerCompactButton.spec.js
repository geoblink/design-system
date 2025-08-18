import { mount } from '@vue/test-utils'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock.js'
import GeoActivityIndicator from '@/elements/GeoActivityIndicator/GeoActivityIndicator.vue'
import GeoCompactButton from '@/elements/GeoCompactButton/GeoCompactButton.vue'
import GeoDangerCompactButton from '@/elements/GeoCompactButton/GeoDangerCompactButton.vue'

library.add(fas)

describe('GeoDangerCompactButton', function () {
  it('Should render button\'s content', function () {
    const wrapper = mount(GeoDangerCompactButton, {
      props: {
        icon: ['fas', 'exclamation-triangle']
      },
      global: {
        stubs: {
          GeoCompactButton,
          FontAwesomeIcon: FontAwesomeIconMock
        }
      }
    })
    const button = wrapper.find('.geo-compact-button--danger')
    expect(button.exists()).toBe(true)
  })

  it('Should render correct icon when provided', function () {
    const wrapper = mount(GeoDangerCompactButton, {
      props: {
        icon: ['fas', 'thumbs-up']
      },
      global: {
        stubs: {
          GeoCompactButton,
          'font-awesome-icon': FontAwesomeIconMock
        }
      }
    })
    const fontAwesomeIconElem = wrapper.findComponent(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'thumbs-up'])
  })

  it('Should emit an event on click', async function () {
    const wrapper = mount(GeoDangerCompactButton, {
      props: {
        icon: ['fas', 'exclamation-triangle']
      },
      global: {
        stubs: {
          GeoCompactButton,
          FontAwesomeIcon: FontAwesomeIconMock
        }
      }
    })
    wrapper.find('.geo-compact-button').trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().click).toBeTruthy()
  })

  xit('Should not emit an event when it\'s disabled', function () {
    const wrapper = mount(GeoDangerCompactButton, {
      props: {
        icon: ['fas', 'exclamation-triangle'],
        disabled: true
      },
      global: {
        stubs: {
          GeoCompactButton,
          FontAwesomeIcon: FontAwesomeIconMock
        }
      }
    })
    const button = wrapper.find('.geo-compact-button')
    button.trigger('click')
    expect(wrapper.emitted().click).toBeFalsy()
  })

  it('Should show activity indicator when loading', function () {
    const wrapper = mount(GeoDangerCompactButton, {
      props: {
        icon: ['fas', 'exclamation-triangle'],
        loading: true
      },
      global: {
        stubs: {
          GeoActivityIndicator,
          GeoCompactButton,
          FontAwesomeIcon: FontAwesomeIconMock
        }
      }
    })
    expect(wrapper.find('.geo-compact-button__activity-indicator').exists()).toBe(true)
  })
})
