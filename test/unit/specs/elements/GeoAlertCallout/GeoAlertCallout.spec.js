import _ from 'lodash'
import { createLocalVue, mount } from '@vue/test-utils'
import GeoAlertCallout from '@/elements/GeoAlertCallout/GeoAlertCallout.vue'
import GeoErrorAlertCallout from '@/elements/GeoAlertCallout/GeoErrorAlertCallout.vue'
import GeoInfoAlertCallout from '@/elements/GeoAlertCallout/GeoInfoAlertCallout.vue'
import GeoSuccessAlertCallout from '@/elements/GeoAlertCallout/GeoSuccessAlertCallout.vue'
import GeoWarningAlertCallout from '@/elements/GeoAlertCallout/GeoWarningAlertCallout.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fab, fas, far)

const iconsToMock = [
  'faExclamationTriangle',
  'faLightbulb',
  'faThumbsUp'
]
const mockedFalIcons = _.mapValues(_.pick(fas, iconsToMock), function (original) {
  return _.assign({}, original, {
    prefix: 'fal'
  })
})
library.add(mockedFalIcons)

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-alert-callout', GeoAlertCallout)

describe('GeoAlertCalloutCallout', () => {
  it('should render alert component', function () {
    const wrapper = mount(GeoAlertCallout, {
      propsData: {
        variant: 'success',
        icon: ['fas', 'thumbs-up']
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })

    expect(wrapper.find('.geo-alert-callout').exists()).toBe(true)
  })

  it('should display correct icon', function () {
    const wrapper = mount(GeoAlertCallout, {
      propsData: {
        variant: 'success',
        icon: ['fas', 'exclamation-triangle']
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    expect(wrapper.find('.fa-exclamation-triangle').exists()).toBe(true)
  })

  it('should apply a CSS suffix when the modifier is provided', function () {
    const wrapper = mount(GeoAlertCallout, {
      propsData: {
        variant: 'success',
        icon: ['fas', 'thumbs-up'],
        cssModifier: 'test-alert'
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    expect(wrapper.find('.geo-alert-callout--test-alert').exists()).toBe(true)
  })

  it('Should check variant prop is valid', function () {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })
    afterEach(() => spy.mockReset())

    const wrapper = mount(GeoAlertCallout, {
      propsData: {
        variant: 'success',
        icon: ['fas', 'thumbs-up']
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })

    const variantProp = GeoAlertCallout.props.variant

    expect(variantProp.required).toBeTruthy()
    expect(variantProp.type).toBe(String)
    expect(variantProp.validator && variantProp.validator('qwerty')).toBeFalsy()
    expect(spy).toBeCalledWith(expect.stringContaining('GeoAlertCallout [component] :: Unsupported value («qwerty») for «variant» property.'))
    expect(variantProp.validator && variantProp.validator('info')).toBeTruthy()
  })
})

const taxonomyAlerts = [
  {
    component: GeoErrorAlertCallout,
    variant: 'error',
    icon: 'exclamation-triangle'
  },
  {
    component: GeoWarningAlertCallout,
    variant: 'warning',
    icon: 'exclamation-triangle'
  },
  {
    component: GeoInfoAlertCallout,
    variant: 'info',
    icon: 'lightbulb'
  },
  {
    component: GeoSuccessAlertCallout,
    variant: 'success',
    icon: 'thumbs-up'
  }
]

describe('GeoAlertCallout Children', () => {
  taxonomyAlerts.forEach((taxonomyAlert) => {
    it('should render alert component', function () {
      const wrapper = mount(taxonomyAlert.component, {
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoAlertCallout
        }
      })

      expect(wrapper.find('.geo-alert-callout').exists()).toBe(true)
    })

    it('should display correct icon', function () {
      const wrapper = mount(taxonomyAlert.component, {
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoAlertCallout
        }
      })
      expect(wrapper.find(`.fa-${taxonomyAlert.icon}`).exists()).toBe(true)
    })

    it('should apply correct variant', function () {
      const wrapper = mount(taxonomyAlert.component, {
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoAlertCallout
        }
      })
      expect(wrapper.find(`.geo-alert-callout--${taxonomyAlert.variant}`).exists()).toBe(true)
    })

    it('should apply a CSS suffix when the modifier is provided', function () {
      const wrapper = mount(taxonomyAlert.component, {
        propsData: {
          cssModifier: 'test-alert'
        },
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoAlertCallout
        }
      })
      expect(wrapper.find('.geo-alert-callout--test-alert').exists()).toBe(true)
    })
  })
})
