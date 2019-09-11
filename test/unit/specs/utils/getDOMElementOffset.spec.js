import getDOMElementOffset from 'src/utils/getDOMElementOffset'
import GeoButton from '@/elements/GeoButton/GeoButton.vue'
import { mount } from '@vue/test-utils'

describe('getDOMElementOffset.js', () => {
  const getBoundingClientRectMock = function () {
    return {
      top: 100,
      left: 200
    }
  }
  const wrapper = mount(GeoButton, { propsData: { type: 'primary' } })
  wrapper.getBoundingClientRect = jest.fn(getBoundingClientRectMock)

  it('Should call element\'s getBoundingClientRect', () => {
    getDOMElementOffset(wrapper)
    expect(wrapper.getBoundingClientRect).toHaveBeenCalled()
  })

  it('Should consider page vertical offset', () => {
    window.pageYOffset = 400
    const returnValue = getDOMElementOffset(wrapper)

    expect(returnValue.top).toBe(500)
  })

  it('Should consider page horizontal offset', () => {
    window.pageXOffset = 100
    const returnValue = getDOMElementOffset(wrapper)

    expect(returnValue.left).toBe(300)
  })
})
