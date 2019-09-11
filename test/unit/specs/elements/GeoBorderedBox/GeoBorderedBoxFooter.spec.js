import { createLocalVue, mount } from '@vue/test-utils'
import GeoBorderedBoxFooter from '@/elements/GeoBorderedBox/GeoBorderedBoxFooter.vue'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-bordered-box-footer', GeoBorderedBoxFooter)

describe('GeoBorderedBoxFooter', () => {
  it('Should render default slot', function () {
    const wrapper = mount(GeoBorderedBoxFooter, {
      slots: {
        default: [`<span class="my-demo-content">Just some unique demo content</span>`]
      }
    })

    expect(wrapper.find('.my-demo-content').exists()).toBe(true)
  })
})
