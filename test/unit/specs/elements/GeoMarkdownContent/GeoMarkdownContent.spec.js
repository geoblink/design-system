import { createLocalVue, mount } from '@vue/test-utils'
import GeoMarkdownContent from '@/elements/GeoMarkdownContent/GeoMarkdownContent.vue'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-bordered-box-footer', GeoMarkdownContent)

describe('GeoMarkdownContent', () => {
  it('should parse no Markdown if all features all disabled', function () {
    const markdown = 'This is a **bold** word with an _italic_ word and a [link](https://geoblink.com)!'
    const wrapper = mount(GeoMarkdownContent, {
      propsData: {
        markdown,
        features: {
          [GeoMarkdownContent.constants.MarkdownParserFeatures.emphasis]: false,
          [GeoMarkdownContent.constants.MarkdownParserFeatures.linkify]: false,
          [GeoMarkdownContent.constants.MarkdownParserFeatures.link]: false
        }
      }
    })

    expect(wrapper.find('p > span').element.innerHTML).toBe(markdown)
  })

  it('should parse only enabled Markdown features', function () {
    const upToLinkSegment = 'This is a **bold** word with an _italic_ word and a '
    const linkText = 'link'
    const linkURL = 'https://geoblink.com'
    const markdown = `${upToLinkSegment}[${linkText}](${linkURL})!`
    const wrapper = mount(GeoMarkdownContent, {
      propsData: {
        markdown,
        features: {
          [GeoMarkdownContent.constants.MarkdownParserFeatures.emphasis]: false,
          [GeoMarkdownContent.constants.MarkdownParserFeatures.linkify]: false,
          [GeoMarkdownContent.constants.MarkdownParserFeatures.link]: true
        }
      }
    })

    expect(wrapper.find('p > span').element.innerHTML).toBe(upToLinkSegment)
    expect(wrapper.find('p > a').element.getAttribute('href')).toBe(linkURL)
    expect(wrapper.find('p > a > span').element.innerHTML).toBe(linkText)
  })

  it('should not parse interpolated variables', function () {
    const uptoBoldSegment = 'This is a '
    const boldSegment = 'bold'
    const boldToLinkSegment = 'word with a '
    const linkText = 'link'
    const linkURL = 'https://geoblink.com'
    const variableValue = 'and a **markdown** string that will be rendered __without__ [Markdown](https://geoblink.com)'
    const values = {
      myVariable: variableValue
    }
    const markdown = `${uptoBoldSegment}**${boldSegment}**${boldToLinkSegment}[${linkText}](${linkURL}) :myVariable`
    const wrapper = mount(GeoMarkdownContent, {
      propsData: {
        markdown,
        values,
        features: {
          [GeoMarkdownContent.constants.MarkdownParserFeatures.emphasis]: true,
          [GeoMarkdownContent.constants.MarkdownParserFeatures.linkify]: false,
          [GeoMarkdownContent.constants.MarkdownParserFeatures.link]: true
        }
      }
    })

    expect(wrapper.find('p > span:first-of-type').element.innerHTML).toBe(uptoBoldSegment)
    expect(wrapper.find('p > strong > span').element.innerHTML).toBe(boldSegment)
    expect(wrapper.find('p > span:nth-of-type(2)').element.innerHTML).toBe(boldToLinkSegment)
    expect(wrapper.find('p > a').element.getAttribute('href')).toBe(linkURL)
    expect(wrapper.find('p > a > span').element.innerHTML).toBe(linkText)
    expect(wrapper.find('p > span:last-of-type').element.innerHTML).toBe(variableValue)
  })
})
