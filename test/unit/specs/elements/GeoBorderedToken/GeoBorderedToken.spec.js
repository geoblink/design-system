import _ from 'lodash'
import { createLocalVue, mount } from '@vue/test-utils'
import GeoBorderedToken from '@/elements/GeoBorderedToken/GeoBorderedToken.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

const iconsToMock = [
  'faMapMarker'
]
const mockedFalIcons = _.mapValues(_.pick(fas, iconsToMock), function (original) {
  return _.assign({}, original, {
    prefix: 'fal'
  })
})
library.add(mockedFalIcons)

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-bordered-token', GeoBorderedToken)

describe('GeoAlert', () => {
  it('Should render GeoBorderedToken component', function () {
    const wrapper = mount(GeoBorderedToken, {
      propsData: {
        label: 'test'
      }
    })
    expect(wrapper.find('.geo-bordered-token').exists()).toBe(true)
  })

  it('Should display an icon when provided', function () {
    const wrapper = mount(GeoBorderedToken, {
      propsData: {
        label: 'test',
        icon: ['fas', 'map-marker']
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    expect(wrapper.find('.fa-map-marker').exists()).toBe(true)
  })

  it('Should apply a CSS suffix when the modifier is provided', function () {
    const wrapper = mount(GeoBorderedToken, {
      propsData: {
        label: 'test',
        icon: ['fas', 'map-marker'],
        cssModifier: 'test-alert'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    expect(wrapper.find('.geo-bordered-token--test-alert').exists()).toBe(true)
  })
})
