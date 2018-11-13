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
})
