import { mount } from '@vue/test-utils'
import GeoWizardLayout from '@/elements/GeoWizardLayout/GeoWizardLayout.vue'

describe('GeoWizardLayout', function () {
  it('Should render GeoWizardLayout component', function () {
    const wrapper = mount(GeoWizardLayout, {
      stubs: [
        'geo-horizontal-layout',
        'geo-vertical-layout'
      ]
    })
    expect(wrapper.find('.geo-wizard-layout').exists()).toBe(true)
    expect(wrapper.find('.geo-wizard-layout__content-container').exists()).toBe(true)
  })

  it('Should render default slot', function () {
    const wrapper = mount(GeoWizardLayout, {
      stubs: [
        'geo-horizontal-layout',
        'geo-vertical-layout'
      ],
      slots: {
        default: [`<span class="my-demo-content">Just some unique demo content</span>`]
      }
    })
    expect(wrapper.find('.my-demo-content').exists()).toBe(true)
  })

  it('Should render header and footer slots', function () {
    const wrapper = mount(GeoWizardLayout, {
      stubs: [
        'geo-horizontal-layout',
        'geo-vertical-layout'
      ],
      slots: {
        default: [`<span class="my-demo-content">Just some unique demo content</span>`],
        header: [`<span class="my-header-demo-content">Just some unique header demo content</span>`],
        footerTrailing: [`<span class="my-footer-demo-content">Just some unique footer demo content</span>`]
      }
    })
    expect(wrapper.find('.my-header-demo-content').exists()).toBe(true)
    expect(wrapper.find('.my-footer-demo-content').exists()).toBe(true)
  })

  it('Should render with sidebar', function () {
    const wrapper = mount(GeoWizardLayout, {
      stubs: [
        'geo-horizontal-layout',
        'geo-vertical-layout'
      ],
      slots: {
        sidebar: [`<span class="my-sidebar-content">Just some unique demo content</span>`]
      }
    })
    expect(wrapper.find('.my-sidebar-content').exists()).toBe(true)
  })
})
