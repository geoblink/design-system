import { createLocalVue, mount } from '@vue/test-utils'
import GeoBorderedBox from '@/elements/GeoBorderedBox/GeoBorderedBox.vue'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-bordered-box', GeoBorderedBox)

describe('GeoBorderedBox', () => {
  it('Should render GeoBorderedBox component', function () {
    const wrapper = mount(GeoBorderedBox, {})
    expect(wrapper.find('.geo-bordered-box').exists()).toBe(true)
  })

  it('Should render default slot', function () {
    const wrapper = mount(GeoBorderedBox, {
      slots: {
        default: ['<span class="my-demo-content">Just some unique demo content</span>']
      }
    })
    expect(wrapper.find('.my-demo-content').exists()).toBe(true)
  })
})
