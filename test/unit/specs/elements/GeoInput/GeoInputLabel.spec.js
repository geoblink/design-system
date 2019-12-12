import { mount } from '@vue/test-utils'
import GeoInputLabel from '@/elements/GeoInput/GeoInputLabel.vue'

describe('GeoInputLabel', () => {
  it('Should render', function () {
    const wrapper = mount(GeoInputLabel)
    expect(wrapper.find('.geo-input-label').exists()).toBe(true)
  })
})
