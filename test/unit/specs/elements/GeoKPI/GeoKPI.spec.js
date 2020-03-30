import { createLocalVue, mount } from '@vue/test-utils'
import GeoKPI from '@/elements/GeoKPI/GeoKPI.vue'
import GeoPositiveKPI from '@/elements/GeoKPI/GeoPositiveKPI.vue'
import GeoNeutralKPI from '@/elements/GeoKPI/GeoNeutralKPI.vue'
import GeoNegativeKPI from '@/elements/GeoKPI/GeoNegativeKPI.vue'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-KPI', GeoKPI)
localVue.component('geo-positive-KPI', GeoPositiveKPI)
localVue.component('geo-neutral-KPI', GeoNeutralKPI)
localVue.component('geo-negative-KPI', GeoNegativeKPI)

describe('GeoKPI', () => {
  it('Should display GeoKPI primary value', () => {
    const props = {
      value: 'Mocked KPI value',
      isPrimary: true
    }
    const wrapper = mount(GeoKPI, {
      propsData: props
    })
    expect(wrapper.find('.geo-kpi--is-primary').exists()).toBe(true)
    expect(wrapper.find('.geo-kpi--is-primary .geo-kpi__value').text()).toBe(props.value)
  })

  it('Should display GeoKPI secondary value', () => {
    const props = {
      value: 'Mocked KPI value',
      isPrimary: false
    }
    const wrapper = mount(GeoKPI, {
      propsData: props
    })
    expect(wrapper.find('.geo-kpi--is-secondary').exists()).toBe(true)
    expect(wrapper.find('.geo-kpi--is-secondary .geo-kpi__value').text()).toBe(props.value)
  })

  it('Should display GeoKPI unit', () => {
    const props = {
      value: 'Mocked KPI value',
      isPrimary: false,
      unit: '€'
    }
    const wrapper = mount(GeoKPI, {
      propsData: props
    })
    expect(wrapper.find('.geo-kpi__unit').exists()).toBe(true)
    expect(wrapper.find('.geo-kpi__unit').text()).toBe(props.unit)
  })

  it('Should display GeoKPI description', () => {
    const props = {
      value: 'Mocked KPI value',
      isPrimary: false,
      description: 'Mocked KPI description'
    }
    const wrapper = mount(GeoKPI, {
      propsData: props
    })
    expect(wrapper.find('.geo-kpi__description').exists()).toBe(true)
    expect(wrapper.find('.geo-kpi__description').text()).toBe(props.description)
  })

  it('Should add appropiate type css class', () => {
    const props = {
      value: 'Mocked KPI value',
      isPrimary: true,
      type: 'negative'
    }
    const wrapper = mount(GeoKPI, {
      propsData: props
    })
    expect(wrapper.find('.geo-kpi--negative').exists()).toBe(true)
  })

  it('Should create a negative kpi', () => {
    const props = {
      value: 'Mocked KPI value',
      isPrimary: true
    }
    const wrapper = mount(GeoNegativeKPI, {
      localVue,
      propsData: props
    })
    expect(wrapper.find('.geo-kpi--negative').exists()).toBe(true)
  })

  it('Should create a neutral kpi', () => {
    const props = {
      value: 'Mocked KPI value',
      isPrimary: true
    }
    const wrapper = mount(GeoNeutralKPI, {
      localVue,
      propsData: props
    })
    expect(wrapper.find('.geo-kpi--neutral').exists()).toBe(true)
  })

  it('Should create a positive kpi', () => {
    const props = {
      value: 'Mocked KPI value',
      isPrimary: true
    }
    const wrapper = mount(GeoPositiveKPI, {
      localVue,
      propsData: props
    })
    expect(wrapper.find('.geo-kpi--positive').exists()).toBe(true)
  })
})
