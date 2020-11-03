import { createLocalVue, shallowMount } from '@vue/test-utils'
import GeoSegmentedControlItem from '@/elements/GeoSegmentedControl/GeoSegmentedControlItem.vue'
import GeoInfoSegmentedControlItem from '@/elements/GeoSegmentedControl/GeoInfoSegmentedControlItem.vue'
import GeoSuccessSegmentedControlItem from '@/elements/GeoSegmentedControl/GeoSuccessSegmentedControlItem.vue'
import GeoWarningSegmentedControlItem from '@/elements/GeoSegmentedControl/GeoWarningSegmentedControlItem.vue'
import GeoDangerSegmentedControlItem from '@/elements/GeoSegmentedControl/GeoDangerSegmentedControlItem.vue'
import GeoTrimmedContent from '@/elements/GeoTrimmedContent/GeoTrimmedContent.vue'

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-segmented-control-item', GeoSegmentedControlItem)
localVue.component('geo-info-segmented-control-item', GeoInfoSegmentedControlItem)
localVue.component('geo-success-segmented-control-item', GeoSuccessSegmentedControlItem)
localVue.component('geo-warning-segmented-control-item', GeoWarningSegmentedControlItem)
localVue.component('geo-danger-segmented-control-item', GeoDangerSegmentedControlItem)
localVue.component('geo-trimmed-content', GeoTrimmedContent)

describe('GeoSegmentedControlItem', () => {
  it('Should render button\'s content', function () {
    const wrapper = getShallowWrapper({
      slots: {
        default: '<span>Segmented control item title</span>'
      },
      propsData: {
        type: 'primary'
      }
    })
    const button = wrapper.find('.geo-segmented-control-item')
    expect(button.exists()).toBe(true)
    expect(button.find('span').exists()).toBe(true)
  })

  it('Should emit an event on click', function () {
    const clickListener = jest.fn()
    const wrapper = getShallowWrapper({
      propsData: {
        type: 'primary'
      },
      listeners: {
        click: clickListener
      }
    })
    wrapper.find('.geo-segmented-control-item').trigger('click')
    expect(clickListener).toHaveBeenCalled()
  })

  it('Should not emit an event when it\'s disabled', function () {
    const clickListener = jest.fn()
    const wrapper = getShallowWrapper({
      propsData: {
        disabled: true
      },
      listeners: {
        click: clickListener
      }
    })

    wrapper.find('.geo-segmented-control-item').trigger('click')
    expect(clickListener).not.toHaveBeenCalled()
  })

  it('Should add disabled class when it\'s disabled', function () {
    const wrapper = getShallowWrapper({
      propsData: {
        disabled: true
      }
    })

    expect(wrapper.find('.geo-segmented-control-item--disabled').exists()).toBe(true)
  })

  it('Should not add disabled class when it\'s not disabled', function () {
    expect(getShallowWrapper().find('.geo-segmented-control-item--disabled').exists()).toBe(false)
  })

  it('Should add active class when it\'s active', function () {
    const wrapper = getShallowWrapper({
      propsData: {
        active: true
      }
    })

    expect(wrapper.find('.geo-segmented-control-item--active').exists()).toBe(true)
  })

  it('Should not add active class when it\'s not active', function () {
    expect(getShallowWrapper().find('.geo-segmented-control-item--active').exists()).toBe(false)
  })

  it('Should add outline class when it\'s outlined', function () {
    const wrapper = getShallowWrapper({
      propsData: {
        outline: true
      }
    })

    expect(wrapper.find('.geo-segmented-control-item--outline').exists()).toBe(true)
  })

  it('Should not add outline class when it\'s outlined', function () {
    expect(getShallowWrapper().find('.geo-segmented-control-item--outline').exists()).toBe(false)
  })

  function getShallowWrapper (options) {
    return shallowMount(GeoSegmentedControlItem, options)
  }
})

const taxonomySegmentedControlItems = [
  GeoInfoSegmentedControlItem,
  GeoSuccessSegmentedControlItem,
  GeoWarningSegmentedControlItem,
  GeoDangerSegmentedControlItem
]

describe('GeoSegmentedControlItem Children', () => {
  taxonomySegmentedControlItems.forEach((taxonomySegmentedControlItem) => {
    describe(taxonomySegmentedControlItem.name, function () {
      it('Should render button\'s content', function () {
        const wrapper = getShallowWrapper({
          slots: {
            default: '<span>Segmented control item title</span>'
          },
          stubs: {
            GeoSegmentedControlItem
          }
        })
        const button = wrapper.find('.geo-segmented-control-item')
        expect(button.exists()).toBe(true)
        expect(button.find('span').exists()).toBe(true)
      })

      it('Should emit an event on click', function () {
        const clickListener = jest.fn()
        const wrapper = getShallowWrapper({
          stubs: {
            GeoSegmentedControlItem
          },
          listeners: {
            click: clickListener
          }
        })

        wrapper.find('.geo-segmented-control-item').trigger('click')
        expect(clickListener).toHaveBeenCalled()
      })

      it('Should not emit the click event when it\'s disabled', function () {
        const clickListener = jest.fn()
        const wrapper = getShallowWrapper({
          propsData: {
            disabled: true
          },
          stubs: {
            GeoSegmentedControlItem
          },
          listeners: {
            click: clickListener
          }
        })

        wrapper.find('.geo-segmented-control-item').trigger('click')
        expect(clickListener).not.toHaveBeenCalled()
      })

      it('Should add disabled class when it\'s disabled', function () {
        const wrapper = getShallowWrapper({
          propsData: {
            disabled: true
          },
          stubs: {
            GeoSegmentedControlItem
          }
        })

        expect(wrapper.find('.geo-segmented-control-item--disabled').exists()).toBe(true)
      })

      it('Should not add disabled class when it\'s not disabled', function () {
        const wrapper = getShallowWrapper({
          stubs: {
            GeoSegmentedControlItem
          }
        })

        expect(wrapper.find('.geo-segmented-control-item--disabled').exists()).toBe(false)
      })

      it('Should add outline class when it\'s outlined', function () {
        const wrapper = getShallowWrapper({
          propsData: {
            outline: true
          },
          stubs: {
            GeoSegmentedControlItem
          }
        })

        expect(wrapper.find('.geo-segmented-control-item--outline').exists()).toBe(true)
      })

      it('Should not add outline class when it\'s not outline', function () {
        const wrapper = getShallowWrapper({
          stubs: {
            GeoSegmentedControlItem
          }
        })

        expect(wrapper.find('.geo-segmented-control-item--outline').exists()).toBe(false)
      })

      function getShallowWrapper (options) {
        return shallowMount(taxonomySegmentedControlItem, options)
      }
    })
  })
})
