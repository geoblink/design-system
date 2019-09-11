import { mount } from '@vue/test-utils'
import GeoSwitch from '@/elements/GeoSwitch/GeoSwitch.vue'

describe('GeoSwitch', () => {
  beforeEach(function () {
    jest.restoreAllMocks()
  })
  afterEach(function () {
    jest.restoreAllMocks()
  })

  it('Should render', function () {
    const wrapper = mount(GeoSwitch, {
      propsData: {
        value: false
      }
    })
    expect(wrapper.find('.geo-switch').exists()).toBe(true)
  })

  it('Should respect CSS modifier', function () {
    const wrapper = mount(GeoSwitch, {
      propsData: {
        cssModifier: 'my-custom-modifier',
        value: false
      }
    })
    expect(wrapper.find('.geo-switch--my-custom-modifier').exists()).toBe(true)
  })

  it('Should complain about missing :value binding', function () {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
    mount(GeoSwitch)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Should be checked according to :value binding', function () {
    const wrapper = mount(GeoSwitch, {
      propsData: {
        value: false
      }
    })

    expect(wrapper.find('.geo-switch').exists()).toBe(true)
    expect(wrapper.find('.geo-switch--checked').exists()).toBe(false)

    wrapper.setProps({
      value: true
    })

    expect(wrapper.find('.geo-switch').exists()).toBe(true)
    expect(wrapper.find('.geo-switch--checked').exists()).toBe(true)
  })

  it('Should be disabled according to :disabled binding', function () {
    const wrapper = mount(GeoSwitch, {
      propsData: {
        value: false
      }
    })

    expect(wrapper.find('.geo-switch').exists()).toBe(true)
    expect(wrapper.find('.geo-switch--disabled').exists()).toBe(false)

    wrapper.setProps({
      disabled: true
    })

    expect(wrapper.find('.geo-switch').exists()).toBe(true)
    expect(wrapper.find('.geo-switch--disabled').exists()).toBe(true)
  })

  it('Should trigger input event on click', function () {
    const wrapper = mount(GeoSwitch, {
      propsData: {
        value: false
      }
    })

    wrapper.find('.geo-switch').trigger('click')

    expect(wrapper.emitted('input')).toHaveLength(1)
    expect(wrapper.emitted('input')[0]).toEqual([true])

    wrapper.setProps({
      value: true
    })

    wrapper.find('.geo-switch').trigger('click')

    expect(wrapper.emitted('input')).toHaveLength(2)
    expect(wrapper.emitted('input')[1]).toEqual([false])
  })

  it('Should trigger input event on checkbox change', function () {
    const wrapper = mount(GeoSwitch, {
      propsData: {
        value: false
      }
    })

    wrapper.find('.geo-switch__input').setChecked(true)

    expect(wrapper.emitted('input')).toHaveLength(1)
    expect(wrapper.emitted('input')[0]).toEqual([true])

    wrapper.find('.geo-switch__input').setChecked(false)

    expect(wrapper.emitted('input')).toHaveLength(2)
    expect(wrapper.emitted('input')[1]).toEqual([false])
  })

  it('Should not trigger events when disabled', function () {
    const wrapper = mount(GeoSwitch, {
      propsData: {
        value: false,
        disabled: true
      }
    })

    wrapper.find('.geo-switch').trigger('click')
    expect(wrapper.emitted('input')).toBeUndefined()

    wrapper.find('.geo-switch__input').trigger('change')
    expect(wrapper.emitted('input')).toBeUndefined()
  })
})
