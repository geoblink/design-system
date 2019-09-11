import { createLocalVue, mount } from '@vue/test-utils'
import GeoTrimmedContent from '@/elements/GeoTrimmedContent/GeoTrimmedContent'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-trimmed-content', GeoTrimmedContent)

jest.mock('vue-directive-tooltip')

describe('GeoTrimmedContent', () => {
  it('Should render content', function () {
    const wrapper = mount(GeoTrimmedContent, {
      slots: {
        default: '<div>Custom content</div>'
      }
    })
    const trimmedContent = wrapper.find('.geo-trimmed-content')
    expect(trimmedContent.exists()).toBe(true)
    expect(trimmedContent.find('div').exists()).toBe(true)
    expect(trimmedContent.find('div').text()).toEqual('Custom content')
  })

  it('Should add tooltip HTML content when mounted', function () {
    const wrapper = mount(GeoTrimmedContent, {
      slots: {
        default: '<div>Custom content</div>'
      },
      computed: {
        isContentTrimmed () {
          return true
        }
      }
    })

    const tooltipHTMLContentNode = document.getElementById(wrapper.vm.idTooltipContentNode)

    expect(tooltipHTMLContentNode).toBeTruthy()
    expect(tooltipHTMLContentNode.querySelector('div')).toBeTruthy()
    expect(tooltipHTMLContentNode.querySelector('div').innerHTML).toEqual('Custom content')
  })

  it('Should remove tooltip HTML content when destroyed', function () {
    const wrapper = mount(GeoTrimmedContent, {
      slots: {
        default: '<div>Custom content</div>'
      },
      computed: {
        isContentTrimmed () {
          return true
        }
      }
    })

    const tooltipHTMLContentNodeBefore = document.getElementById(wrapper.vm.idTooltipContentNode)
    expect(tooltipHTMLContentNodeBefore).toBeTruthy()
    expect(tooltipHTMLContentNodeBefore.querySelector('div')).toBeTruthy()
    expect(tooltipHTMLContentNodeBefore.querySelector('div').innerHTML).toEqual('Custom content')

    wrapper.destroy()

    const tooltipHTMLContentNodeAfter = document.getElementById(wrapper.vm.idTooltipContentNode)
    expect(tooltipHTMLContentNodeAfter).toBeFalsy()
  })

  it('Should apply CSS suffix when the modifier is provided', function () {
    const wrapper = mount(GeoTrimmedContent, {
      propsData: {
        cssModifier: 'demo-modifier'
      },
      slots: {
        default: '<div>Demo content</div>'
      }
    })
    const trimmedContent = wrapper.find('.geo-trimmed-content--demo-modifier')
    expect(trimmedContent.exists()).toBe(true)
    expect(trimmedContent.find('div').exists()).toBe(true)
    expect(trimmedContent.find('div').text()).toEqual('Demo content')
  })
})
