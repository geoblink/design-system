import { mount } from '@vue/test-utils'
import GeoValue from '@/elements/GeoValue/GeoValue.vue'
import GeoPositiveValue from '@/elements/GeoValue/GeoPositiveValue.vue'
import GeoNeutralValue from '@/elements/GeoValue/GeoNeutralValue.vue'
import GeoNegativeValue from '@/elements/GeoValue/GeoNegativeValue.vue'

// Helper function to create wrapper with registered components
function createWrapper (component, options = {}) {
  return mount(component, Object.assign({
    global: {
      components: {
        'geo-value': GeoValue,
        'geo-positive-value': GeoPositiveValue,
        'geo-neutral-value': GeoNeutralValue,
        'geo-negative-value': GeoNegativeValue
      }
    }
  }, options))
}

describe('GeoValue', () => {
  it('Should display GeoValue primary value', () => {
    const props = {
      value: 'Mocked value',
      isPrimary: true
    }
    const wrapper = createWrapper(GeoValue, {
      props: props
    })
    expect(wrapper.find('.geo-value--primary').exists()).toBe(true)
    expect(wrapper.find('.geo-value--primary .geo-value__value').text()).toBe(props.value)
  })

  it('Should display GeoValue secondary value', () => {
    const props = {
      value: 'Mocked value',
      isPrimary: false
    }
    const wrapper = createWrapper(GeoValue, {
      props: props
    })
    expect(wrapper.find('.geo-value--secondary').exists()).toBe(true)
    expect(wrapper.find('.geo-value--secondary .geo-value__value').text()).toBe(props.value)
  })

  it('Should display GeoValue unit', () => {
    const props = {
      value: 'Mocked value',
      isPrimary: false,
      unit: '€'
    }
    const wrapper = createWrapper(GeoValue, {
      props: props
    })
    expect(wrapper.find('.geo-value__unit').exists()).toBe(true)
    expect(wrapper.find('.geo-value__unit').text()).toBe(props.unit)
  })

  it('Should display GeoValue description', () => {
    const props = {
      value: 'Mocked value',
      isPrimary: false,
      description: 'Mocked description'
    }
    const wrapper = createWrapper(GeoValue, {
      props: props
    })
    expect(wrapper.find('.geo-value__description').exists()).toBe(true)
    expect(wrapper.find('.geo-value__description').text()).toBe(props.description)
  })

  it('Should add appropiate type css class', () => {
    const props = {
      value: 'Mocked value',
      isPrimary: true,
      type: 'negative'
    }
    const wrapper = createWrapper(GeoValue, {
      props: props
    })
    expect(wrapper.find('.geo-value--negative').exists()).toBe(true)
  })

  it('Should create a negative', () => {
    const props = {
      value: 'Mocked value',
      isPrimary: true
    }
    const wrapper = createWrapper(GeoNegativeValue, {
      props: props
    })
    expect(wrapper.find('.geo-value--negative').exists()).toBe(true)
  })

  it('Should create a neutral', () => {
    const props = {
      value: 'Mocked value',
      isPrimary: true
    }
    const wrapper = createWrapper(GeoNeutralValue, {
      props: props
    })
    expect(wrapper.find('.geo-value--neutral').exists()).toBe(true)
  })

  it('Should create a positive', () => {
    const props = {
      value: 'Mocked value',
      isPrimary: true
    }
    const wrapper = createWrapper(GeoPositiveValue, {
      props: props
    })
    expect(wrapper.find('.geo-value--positive').exists()).toBe(true)
  })
})
