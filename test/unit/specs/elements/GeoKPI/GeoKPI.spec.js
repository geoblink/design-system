import { createLocalVue, mount } from '@vue/test-utils'
import GeoKPI from '@/elements/GeoKPI/GeoKPI.vue'
import GeoGoodKPI from '@/elements/GeoKPI/GeoGoodKPI.vue'
import GeoMediumKPI from '@/elements/GeoKPI/GeoMediumKPI.vue'
import GeoBadKPI from '@/elements/GeoKPI/GeoBadKPI.vue'
import GeoStandardKPI from '@/elements/GeoKPI/GeoStandardKPI.vue'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-KPI', GeoKPI)
localVue.component('geo-good-KPI', GeoGoodKPI)
localVue.component('geo-medium-KPI', GeoMediumKPI)
localVue.component('geo-bad-KPI', GeoBadKPI)
localVue.component('geo-standard-KPI', GeoStandardKPI)

describe('GeoKPI', () => {
  it('Should display GeoKPI primary value', () => {
    const props = {
      value: 'Mocked KPI value',
      isPrimary: true
    }
    const wrapper = mount(GeoKPI, {
      propsData: {
        data: props
      }
    })
    expect(wrapper.find('.geo-kpi--is-primary').exists()).toBe(true)
    expect(wrapper.find('.geo-kpi--is-primary .geo-kpi__value').text()).toBe(props.value)
  })

  it('Should check GeoKPI data.value validator', function () {
    const propsWithoutValue = {
      isPrimary: true
    }
    const dataMixinProp = GeoKPI.mixins[0].props.data
    expect(dataMixinProp.required).toBeTruthy()
    expect(dataMixinProp.type).toBe(Object)
    expect(dataMixinProp.validator && dataMixinProp.validator(propsWithoutValue)).toBeFalsy()
  })

  it('Should check GeoKPI data.isPrimary validator', function () {
    const propsWithoutIsPrimary = {
      value: 'Mocked value'
    }
    const propsWithInvalidIsPrimary = {
      value: 'Mocked value',
      isPrimary: 'invalid isPrimary type'
    }
    const dataMixinProp = GeoKPI.mixins[0].props.data
    expect(dataMixinProp.required).toBeTruthy()
    expect(dataMixinProp.type).toBe(Object)
    expect(dataMixinProp.validator && dataMixinProp.validator(propsWithoutIsPrimary)).toBeFalsy()
    expect(dataMixinProp.validator && dataMixinProp.validator(propsWithInvalidIsPrimary)).toBeFalsy()
  })

  it('Should display GeoKPI secondary value', () => {
    const props = {
      value: 'Mocked KPI value',
      isPrimary: false
    }
    const wrapper = mount(GeoKPI, {
      propsData: {
        data: props
      }
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
      propsData: {
        data: props
      }
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
      propsData: {
        data: props
      }
    })
    expect(wrapper.find('.geo-kpi__description').exists()).toBe(true)
    expect(wrapper.find('.geo-kpi__description').text()).toBe(props.description)
  })

  it('Should add appropiate type css class', () => {
    const props = {
      value: 'Mocked KPI value',
      isPrimary: true
    }
    const type = 'bad'
    const wrapper = mount(GeoKPI, {
      propsData: {
        data: props,
        type: type
      }
    })
    expect(wrapper.find('.geo-kpi--bad').exists()).toBe(true)
  })

  it('Should create a bad kpi', () => {
    const props = {
      value: 'Mocked KPI value',
      isPrimary: true
    }
    const wrapper = mount(GeoBadKPI, {
      localVue,
      propsData: {
        data: props
      }
    })
    expect(wrapper.find('.geo-kpi--bad').exists()).toBe(true)
  })

  it('Should create a medium kpi', () => {
    const props = {
      value: 'Mocked KPI value',
      isPrimary: true
    }
    const wrapper = mount(GeoMediumKPI, {
      localVue,
      propsData: {
        data: props
      }
    })
    expect(wrapper.find('.geo-kpi--medium').exists()).toBe(true)
  })

  it('Should create a good kpi', () => {
    const props = {
      value: 'Mocked KPI value',
      isPrimary: true
    }
    const wrapper = mount(GeoGoodKPI, {
      localVue,
      propsData: {
        data: props
      }
    })
    expect(wrapper.find('.geo-kpi--good').exists()).toBe(true)
  })

  it('Should create a standard kpi', () => {
    const props = {
      value: 'Mocked KPI value',
      isPrimary: true
    }
    const wrapper = mount(GeoStandardKPI, {
      localVue,
      propsData: {
        data: props
      }
    })
    expect(wrapper.find('.geo-kpi--standard').exists()).toBe(true)
  })
})
