import _ from 'lodash'
import { createLocalVue, mount } from '@vue/test-utils'
import GeoNotificationBar from '@/elements/GeoNotificationBar/GeoNotificationBar.vue'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

const iconsToMock = [
  'faTimes'
]
const mockedFalIcons = _.mapValues(_.pick(fas, iconsToMock), function (original) {
  return _.assign({}, original, {
    prefix: 'fal'
  })
})
library.add(mockedFalIcons)

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-notification-bar', GeoNotificationBar)

describe('GeoNotificationBar', () => {
  it('Should render GeoNotificationBar component', function () {
    const wrapper = mount(GeoNotificationBar, {})
    expect(wrapper.find('.geo-notification-bar').exists()).toBe(true)
  })

  it('Should display bell icon', function () {
    const wrapper = mount(GeoNotificationBar, {
      propsData: {
        icon: ['fas', 'bell']
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      }
    })
    const fontAwesomeIconElem = wrapper.find(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'bell'])
  })

  it('Should display default close icon when listener is provided', function () {
    const wrapper = mount(GeoNotificationBar, {
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      },
      listeners: {
        close () { }
      }
    })
    const fontAwesomeIconElem = wrapper.find(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fal', 'times'])
    expect(wrapper.find('.geo-notification-bar__close-icon').exists()).toBe(true)
  })

  it('Should display actions slot', function () {
    const wrapper = mount(GeoNotificationBar, {
      slots: {
        actions: [`<button class="some-action">A button</button>`]
      }
    })
    expect(wrapper.find('.some-action').exists()).toBe(true)
  })

  it('Should display default slot', function () {
    const wrapper = mount(GeoNotificationBar, {
      slots: {
        default: [`notification`]
      }
    })
    expect(wrapper.find('.geo-notification-bar__message-text').text()).toBe('notification')
  })

  it('Should trigger close event when clicking on close icon', function () {
    const wrapper = mount(GeoNotificationBar, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      },
      listeners: {
        close () { }
      }
    })
    wrapper.find(FontAwesomeIcon).trigger('click')
    expect(wrapper.emitted()['close']).toBeTruthy()
  })

  it('Should apply a CSS suffix when the modifier is provided', function () {
    const wrapper = mount(GeoNotificationBar, {
      propsData: {
        cssModifier: 'test'
      }
    })
    expect(wrapper.find('.geo-notification-bar--test').exists()).toBe(true)
  })
})
