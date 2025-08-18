import _ from 'lodash'
import { mount } from '@vue/test-utils'
import GeoAlert from '@/elements/GeoAlert/GeoAlert.vue'
import GeoErrorAlert from '@/elements/GeoAlert/GeoErrorAlert.vue'
import GeoInfoAlert from '@/elements/GeoAlert/GeoInfoAlert.vue'
import GeoSuccessAlert from '@/elements/GeoAlert/GeoSuccessAlert.vue'
import GeoWarningAlert from '@/elements/GeoAlert/GeoWarningAlert.vue'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock'

function getWrapper (component, options = {}) {
  return mount(component, _.merge({
    global: {
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      }
    }
  }, options))
}

describe('GeoAlert', () => {
  it('Should render alert component', function () {
    const wrapper = getWrapper(GeoAlert, {
      props: {
        variant: 'success',
        icon: ['fas', 'thumbs-up']
      }
    })

    expect(wrapper.find('.geo-alert').exists()).toBe(true)
  })

  it('Should display correct icon', function () {
    const wrapper = getWrapper(GeoAlert, {
      props: {
        variant: 'success',
        icon: ['fas', 'exclamation-triangle']
      }
    })
    expectFontAwesomeIconProp(wrapper.findComponent(FontAwesomeIconMock), ['fas', 'exclamation-triangle'])
  })

  it('Should check variant prop is valid', function () {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })

    const variantProp = GeoAlert.props.variant

    expect(variantProp.required).toBeTruthy()
    expect(variantProp.type).toBe(String)
    expect(variantProp.validator && variantProp.validator('qwerty')).toBeFalsy()
    expect(spy).toBeCalledWith(expect.stringContaining('GeoAlert [component] :: Unsupported value («qwerty») for «variant» property.'))
    expect(variantProp.validator && variantProp.validator('info')).toBeTruthy()
    spy.mockReset()
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
      const wrapper = getWrapper(taxonomyAlert.component, {
        global: {
          components: {
            GeoAlert
          }
        }
      })

      expect(wrapper.find('.geo-alert').exists()).toBe(true)
    })

    it('Should display correct icon', function () {
      const wrapper = getWrapper(taxonomyAlert.component, {
        global: {
          components: {
            GeoAlert
          }
        }
      })
      expectFontAwesomeIconProp(wrapper.findComponent(FontAwesomeIconMock), ['fal', taxonomyAlert.icon])
    })

    it('Should apply correct variant', function () {
      const wrapper = getWrapper(taxonomyAlert.component, {
        global: {
          components: {
            GeoAlert
          }
        }
      })
      expect(wrapper.find(`.geo-alert--${taxonomyAlert.variant}`).exists()).toBe(true)
    })
  })
})
