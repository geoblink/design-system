import { createLocalVue, mount } from '@vue/test-utils'
import GeoValue from '@/elements/GeoValue/GeoValue.vue'
import GeoPositiveValue from '@/elements/GeoValue/GeoPositiveValue.vue'
import GeoNeutralValue from '@/elements/GeoValue/GeoNeutralValue.vue'
import GeoNegativeValue from '@/elements/GeoValue/GeoNegativeValue.vue'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-value', GeoValue)
localVue.component('geo-positive-value', GeoPositiveValue)
localVue.component('geo-neutral-value', GeoNeutralValue)
localVue.component('geo-negative-value', GeoNegativeValue)

describe('GeoValue', () => {
  it('Should display GeoValue primary value', () => {
    const props = {
      value: 'Mocked value',
      isPrimary: true
    }
    const wrapper = mount(GeoValue, {
      propsData: props
    })
    expect(wrapper.find('.geo-value--is-primary').exists()).toBe(true)
    expect(wrapper.find('.geo-value--is-primary .geo-value__value').text()).toBe(props.value)
  })

  it('Should display GeoValue secondary value', () => {
    const props = {
      value: 'Mocked value',
      isPrimary: false
    }
    const wrapper = mount(GeoValue, {
      propsData: props
    })
    expect(wrapper.find('.geo-value--is-secondary').exists()).toBe(true)
    expect(wrapper.find('.geo-value--is-secondary .geo-value__value').text()).toBe(props.value)
  })

  it('Should display GeoValue unit', () => {
    const props = {
      value: 'Mocked value',
      isPrimary: false,
      unit: '€'
    }
    const wrapper = mount(GeoValue, {
      propsData: props
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
    const wrapper = mount(GeoValue, {
      propsData: props
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
    const wrapper = mount(GeoValue, {
      propsData: props
    })
    expect(wrapper.find('.geo-value--negative').exists()).toBe(true)
  })

  it('Should create a negative', () => {
    const props = {
      value: 'Mocked value',
      isPrimary: true
    }
    const wrapper = mount(GeoNegativeValue, {
      localVue,
      propsData: props
    })
    expect(wrapper.find('.geo-value--negative').exists()).toBe(true)
  })

  it('Should create a neutral', () => {
    const props = {
      value: 'Mocked value',
      isPrimary: true
    }
    const wrapper = mount(GeoNeutralValue, {
      localVue,
      propsData: props
    })
    expect(wrapper.find('.geo-value--neutral').exists()).toBe(true)
  })

  it('Should create a positive', () => {
    const props = {
      value: 'Mocked value',
      isPrimary: true
    }
    const wrapper = mount(GeoPositiveValue, {
      localVue,
      propsData: props
    })
    expect(wrapper.find('.geo-value--positive').exists()).toBe(true)
  })
})
