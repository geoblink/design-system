import _ from 'lodash'
import { createLocalVue, mount } from '@vue/test-utils'
import GeoAlert from '@/elements/GeoAlert/GeoAlert.vue'
import GeoErrorAlert from '@/elements/GeoAlert/GeoErrorAlert.vue'
import GeoInfoAlert from '@/elements/GeoAlert/GeoInfoAlert.vue'
import GeoSuccessAlert from '@/elements/GeoAlert/GeoSuccessAlert.vue'
import GeoWarningAlert from '@/elements/GeoAlert/GeoWarningAlert.vue'
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
localVue.component('geo-alert', GeoAlert)

describe('GeoAlert', () => {
  it('Should render alert component', function () {
    const wrapper = mount(GeoAlert, {
      context: {
        props: {
          variant: 'success',
          icon: ['fas', 'thumbs-up']
        }
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })

    expect(wrapper.find('.geo-alert').exists()).toBe(true)
  })

  it('Should display correct icon', function () {
    const wrapper = mount(GeoAlert, {
      context: {
        props: {
          variant: 'success',
          icon: ['fas', 'exclamation-triangle']
        }
      },
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    expect(wrapper.find('.fa-exclamation-triangle').exists()).toBe(true)
  })

  it('Should check variant prop is valid', function () {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })
    afterEach(() => spy.mockReset())

    const variantProp = GeoAlert.props.variant

    expect(variantProp.required).toBeTruthy()
    expect(variantProp.type).toBe(String)
    expect(variantProp.validator && variantProp.validator('qwerty')).toBeFalsy()
    expect(spy).toBeCalledWith(expect.stringContaining('GeoAlert [component] :: Unsupported value («qwerty») for «variant» property.'))
    expect(variantProp.validator && variantProp.validator('info')).toBeTruthy()
  })
})

const taxonomyAlerts = [
  {
    component: GeoErrorAlert,
    variant: 'error',
    icon: 'exclamation-triangle'
  },
  {
    component: GeoWarningAlert,
    variant: 'warning',
    icon: 'exclamation-triangle'
  },
  {
    component: GeoInfoAlert,
    variant: 'info',
    icon: 'lightbulb'
  },
  {
    component: GeoSuccessAlert,
    variant: 'success',
    icon: 'thumbs-up'
  }
]

describe('GeoAlert Children', () => {
  taxonomyAlerts.forEach((taxonomyAlert) => {
    it('Should render alert component', function () {
      const wrapper = mount(taxonomyAlert.component, {
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoAlert
        }
      })

      expect(wrapper.find('.geo-alert').exists()).toBe(true)
    })

    it('Should display correct icon', function () {
      const wrapper = mount(taxonomyAlert.component, {
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoAlert
        }
      })
      expect(wrapper.find(`.fa-${taxonomyAlert.icon}`).exists()).toBe(true)
    })

    it('Should apply correct variant', function () {
      const wrapper = mount(taxonomyAlert.component, {
        stubs: {
          'font-awesome-icon': FontAwesomeIcon,
          GeoAlert
        }
      })
      expect(wrapper.find(`.geo-alert--${taxonomyAlert.variant}`).exists()).toBe(true)
    })
  })
})
