import getDOMElementOffset from 'src/utils/getDOMElementOffset'
import GeoButton from '@/elements/GeoButton/GeoButton.vue'
import { mount } from '@vue/test-utils'

const getBoundingClientRectMock = function () {
  return {
    top: 100,
    left: 200
  }
}
const wrapper = mount(GeoButton, { propsData: { type: 'primary' } })
wrapper.getBoundingClientRect = jest.fn(getBoundingClientRectMock)

describe('getDOMElementOffset.js', () => {
  it('should call element\'s getBoundingClientRect', () => {
    getDOMElementOffset(wrapper)
    expect(wrapper.getBoundingClientRect).toHaveBeenCalled()
  })

  it('should consider page vertical offset', () => {
    window.pageYOffset = 400
    const returnValue = getDOMElementOffset(wrapper)

    expect(returnValue.top).toBe(500)
  })

  it('should consider page horizontal offset', () => {
    window.pageXOffset = 100
    const returnValue = getDOMElementOffset(wrapper)

    expect(returnValue.left).toBe(300)
  })
})
