import { mount } from '@vue/test-utils'
import GeoInputLabel from '@/elements/GeoInput/GeoInputLabel.vue'

describe('GeoInputLabel', () => {
  it('Should render', function () {
    const wrapper = mount(GeoInputLabel)
    expect(wrapper.find('.geo-input-label').exists()).toBe(true)
  })

  it('Should render with cssModifier', function () {
    const wrapper = mount(GeoInputLabel, {
      context: {
        props: {
          cssModifier: 'my-label'
        }
      }
    })
    expect(wrapper.find('.geo-input-label--my-label').exists()).toBe(true)
  })
})
