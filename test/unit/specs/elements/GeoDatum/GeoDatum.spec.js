import { mount } from '@vue/test-utils'
import GeoDatum from '@/elements/GeoDatum/GeoDatum.vue'

describe('GeoDatum', function () {
  it('Should render', function () {
    const wrapper = mount(GeoDatum)
    expect(wrapper.find('.geo-datum').exists()).toBe(true)
  })
})
