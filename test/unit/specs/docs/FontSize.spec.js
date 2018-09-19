import { createLocalVue, mount } from '@vue/test-utils'
import FontSize from 'docs/components/tokens/FontSize.vue'
// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-activity-indicator', FontSize)

describe('FontSize.vue', () => {
  const wrapper = mount(FontSize, {
    stubs: ['font-awesome-icon']
  })
  it('should render correct contents', () => {
    expect(wrapper.vm.$el.querySelector('.font')).toBeDefined()
  })

  it('should render multiple sizes', () => {
    expect(wrapper.vm.$el.querySelectorAll('.font').length).toBeGreaterThan(2)
  })

  it('should create px sizes for copy pasting', () => {
    expect(wrapper.vm.$el.querySelector('.font span')).toBeDefined()
  })

  it('should create apply inline styles', () => {
    expect(wrapper.vm.$el.querySelector('.font').style).toBeDefined()
  })
})
