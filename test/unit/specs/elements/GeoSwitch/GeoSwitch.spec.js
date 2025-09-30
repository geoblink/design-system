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
      props: {
        value: false
      }
    })
    expect(wrapper.find('.geo-switch').exists()).toBe(true)
  })

  it('Should complain about missing :value binding', function () {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    mount(GeoSwitch)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Should be checked according to :value binding', async function () {
    const wrapper = mount(GeoSwitch, {
      props: {
        value: false
      }
    })

    expect(wrapper.find('.geo-switch').exists()).toBe(true)
    expect(wrapper.find('.geo-switch--checked').exists()).toBe(false)

    await wrapper.setProps({
      value: true
    })

    expect(wrapper.find('.geo-switch').exists()).toBe(true)
    expect(wrapper.find('.geo-switch--checked').exists()).toBe(true)
  })

  it('Should be disabled according to :disabled binding', async function () {
    const wrapper = mount(GeoSwitch, {
      props: {
        value: false
      }
    })

    expect(wrapper.find('.geo-switch').exists()).toBe(true)
    expect(wrapper.find('.geo-switch--disabled').exists()).toBe(false)

    await wrapper.setProps({
      disabled: true
    })

    expect(wrapper.find('.geo-switch').exists()).toBe(true)
    expect(wrapper.find('.geo-switch--disabled').exists()).toBe(true)
  })

  it('Should trigger input event on click', async function () {
    const wrapper = mount(GeoSwitch, {
      // this is necessary so clicking the label correctly triggers the change event on the checkbox
      // https://github.com/vuejs/vue-test-utils/issues/760
      attachTo: document.body,
      props: {
        value: false
      }
    })
    const geoSwitch = wrapper.find('.geo-switch')

    await geoSwitch.trigger('click')

    // Due to emitted event name collision with the native input event,
    // we need to filter the emitted events to get the custom input event
    const emitsFirstClick = wrapper.emitted('input') || []
    const customEmitsFirstClick = emitsFirstClick.filter(args => typeof args[0] === 'boolean')
    expect(customEmitsFirstClick).toHaveLength(1)
    expect(customEmitsFirstClick[0]).toEqual([true])

    await wrapper.setProps({
      value: true
    })

    await geoSwitch.trigger('click')

    // Due to emitted event name collision with the native input event,
    // we need to filter the emitted events to get the custom input event
    const emitsSecondClick = wrapper.emitted('input') || []
    const customEmitsSecondClick = emitsSecondClick.filter(args => typeof args[0] === 'boolean')
    expect(customEmitsSecondClick).toHaveLength(2)
    expect(customEmitsSecondClick[1]).toEqual([false])
  })

  it('Should trigger input event on checkbox change', async function () {
    const wrapper = mount(GeoSwitch, {
      props: {
        value: false
      }
    })
    const input = wrapper.find('.geo-switch__input')

    // @ts-ignore
    input.element.checked = true
    await input.trigger('change')

    expect(wrapper.emitted('input')).toHaveLength(1)
    expect(wrapper.emitted('input')[0]).toEqual([true])

    // @ts-ignore
    input.element.checked = false
    await input.trigger('change')

    expect(wrapper.emitted('input')).toHaveLength(2)
    expect(wrapper.emitted('input')[1]).toEqual([false])
  })

  it('Should not trigger events when disabled', function () {
    const wrapper = mount(GeoSwitch, {
      props: {
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
