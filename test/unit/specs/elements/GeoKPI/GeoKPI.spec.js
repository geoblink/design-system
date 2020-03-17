import { mount } from '@vue/test-utils'
import GeoKPI from '@/elements/GeoKPI/GeoKPI.vue'

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
    const dataProp = GeoKPI.props.data
    expect(dataProp.required).toBeTruthy()
    expect(dataProp.type).toBe(Object)
    expect(dataProp.validator && dataProp.validator(propsWithoutValue)).toBeFalsy()
  })

  it('Should check GeoKPI data.isPrimary validator', function () {
    const propsWithoutIsPrimary = {
      value: 'Mocked value'
    }
    const propsWithInvalidIsPrimary = {
      value: 'Mocked value',
      isPrimary: 'invalid isPrimary type'
    }
    const dataProp = GeoKPI.props.data
    expect(dataProp.required).toBeTruthy()
    expect(dataProp.type).toBe(Object)
    expect(dataProp.validator && dataProp.validator(propsWithoutIsPrimary)).toBeFalsy()
    expect(dataProp.validator && dataProp.validator(propsWithInvalidIsPrimary)).toBeFalsy()
  })

  it('Should check GeoKPI data.colorHighlight validator', function () {
    const propsWithValidColorHighlight = {
      value: 'Mocked KPI value',
      isPrimary: true,
      colorHighlight: 'red'
    }
    const propsWithInvalidColorHighlight = {
      value: 'Mocked KPI value',
      isPrimary: true,
      colorHighlight: 'blue'
    }
    const dataProp = GeoKPI.props.data
    expect(dataProp.required).toBeTruthy()
    expect(dataProp.type).toBe(Object)
    expect(dataProp.validator && dataProp.validator(propsWithValidColorHighlight)).toBeTruthy()
    expect(dataProp.validator && dataProp.validator(propsWithInvalidColorHighlight)).toBeFalsy()
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

  it('Should add appropiate color css class', () => {
    const props = {
      value: 'Mocked KPI value',
      isPrimary: true,
      colorHighlight: 'red'
    }
    const wrapper = mount(GeoKPI, {
      propsData: {
        data: props
      }
    })
    expect(wrapper.find('.geo-kpi--red').exists()).toBe(true)
  })
})
