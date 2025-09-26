import { mount } from '@vue/test-utils'
import GeoSegmentedControlItem from '@/elements/GeoSegmentedControl/GeoSegmentedControlItem.vue'
import GeoInfoSegmentedControlItem from '@/elements/GeoSegmentedControl/GeoInfoSegmentedControlItem.vue'
import GeoSuccessSegmentedControlItem from '@/elements/GeoSegmentedControl/GeoSuccessSegmentedControlItem.vue'
import GeoWarningSegmentedControlItem from '@/elements/GeoSegmentedControl/GeoWarningSegmentedControlItem.vue'
import GeoDangerSegmentedControlItem from '@/elements/GeoSegmentedControl/GeoDangerSegmentedControlItem.vue'
import GeoTrimmedContent from '@/elements/GeoTrimmedContent/GeoTrimmedContent'

function getWrapper (component, options = {}) {
  return mount(component, Object.assign({
    global: {
      stubs: {
        'geo-segmented-control-item': GeoSegmentedControlItem,
        'geo-info-segmented-control-item': GeoInfoSegmentedControlItem,
        'geo-success-segmented-control-item': GeoSuccessSegmentedControlItem,
        'geo-warning-segmented-control-item': GeoWarningSegmentedControlItem,
        'geo-danger-segmented-control-item': GeoDangerSegmentedControlItem,
        'geo-trimmed-content': GeoTrimmedContent
      }
    }
  }, options))
}

describe('GeoSegmentedControlItem', () => {
  it('Should render button\'s content', function () {
    const wrapper = getWrapper(GeoSegmentedControlItem, {
      slots: {
        default: '<span>Segmented control item title</span>'
      },
      props: {
        type: 'primary'
      }
    })
    const button = wrapper.find('.geo-segmented-control-item')
    expect(button.exists()).toBe(true)
    expect(button.find('span').exists()).toBe(true)
  })

  it('Should emit an event on click', function (done) {
    const wrapper = getWrapper(GeoSegmentedControlItem, {
      props: {
        type: 'primary'
      }
    })
    wrapper.find('.geo-segmented-control-item').trigger('click')
    setTimeout(function () {
      try {
        expect(wrapper.emitted().click).toBeTruthy()
        done()
      } catch (error) {
        done(error)
      }
    })
  })

  // TODO: WEB-2073 Fix check, native click event is still triggered even if custom click event is not emitted
  xit('Should not emit an event when it\'s disabled', function () {
    const wrapper = getWrapper(GeoSegmentedControlItem, {
      props: {
        disabled: true
      }
    })

    const button = wrapper.find('.geo-segmented-control-item')
    button.trigger('click')
    expect(wrapper.emitted().click).toBeFalsy()
  })

  it('Should add disabled class when it\'s disabled', function () {
    const wrapper = getWrapper(GeoSegmentedControlItem, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.find('.geo-segmented-control-item--disabled').exists()).toBe(true)
  })

  it('Should nont add disabled class when it\'s not disabled', function () {
    const wrapper = getWrapper(GeoSegmentedControlItem)

    expect(wrapper.find('.geo-segmented-control-item--disabled').exists()).toBe(false)
  })

  it('Should add active class when it\'s active', function () {
    const wrapper = getWrapper(GeoSegmentedControlItem, {
      props: {
        active: true
      }
    })

    expect(wrapper.find('.geo-segmented-control-item--active').exists()).toBe(true)
  })

  it('Should not add active class when it\'s not active', function () {
    const wrapper = getWrapper(GeoSegmentedControlItem)

    expect(wrapper.find('.geo-segmented-control-item--active').exists()).toBe(false)
  })

  it('Should add outline class when it\'s outlined', function () {
    const wrapper = getWrapper(GeoSegmentedControlItem, {
      props: {
        outline: true
      }
    })

    expect(wrapper.find('.geo-segmented-control-item--outline').exists()).toBe(true)
  })

  it('Should not add outline class when it\'s outlined', function () {
    const wrapper = getWrapper(GeoSegmentedControlItem)

    expect(wrapper.find('.geo-segmented-control-item--outline').exists()).toBe(false)
  })
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
        const wrapper = getWrapper(taxonomySegmentedControlItem, {
          slots: {
            default: '<span>Segmented control item title</span>'
          },
          global: {
            components: {
              'geo-segmented-control-item': GeoSegmentedControlItem
            }
          }
        })
        const button = wrapper.find('.geo-segmented-control-item')
        expect(button.exists()).toBe(true)
        expect(button.find('span').exists()).toBe(true)
      })

      it('Should emit an event on click', function (done) {
        const wrapper = getWrapper(taxonomySegmentedControlItem, {
          global: {
            components: {
              'geo-segmented-control-item': GeoSegmentedControlItem
            }
          }
        })
        wrapper.find('.geo-segmented-control-item').trigger('click')
        setTimeout(function () {
          try {
            expect(wrapper.emitted().click).toBeTruthy()
            done()
          } catch (error) {
            done(error)
          }
        })
      })

      // TODO: WEB-2073 Fix check, native click event is still triggered even if custom click event is not emitted
      xit('Should not emit an event when it\'s disabled', function () {
        const wrapper = getWrapper(taxonomySegmentedControlItem, {
          props: {
            disabled: true
          },
          global: {
            components: {
              'geo-segmented-control-item': GeoSegmentedControlItem
            }
          }
        })

        const button = wrapper.find('.geo-segmented-control-item')
        button.trigger('click')
        expect(wrapper.emitted().click).toBeFalsy()
      })

      it('Should add disabled class when it\'s disabled', function () {
        const wrapper = getWrapper(taxonomySegmentedControlItem, {
          props: {
            disabled: true
          },
          global: {
            components: {
              'geo-segmented-control-item': GeoSegmentedControlItem
            }
          }
        })

        expect(wrapper.find('.geo-segmented-control-item--disabled').exists()).toBe(true)
      })

      it('Should not add disabled class when it\'s not disabled', function () {
        const wrapper = getWrapper(taxonomySegmentedControlItem, {
          global: {
            components: {
              'geo-segmented-control-item': GeoSegmentedControlItem
            }
          }
        })

        expect(wrapper.find('.geo-segmented-control-item--disabled').exists()).toBe(false)
      })

      it('Should add outline class when it\'s outlined', function () {
        const wrapper = getWrapper(taxonomySegmentedControlItem, {
          props: {
            outline: true
          },
          global: {
            components: {
              'geo-segmented-control-item': GeoSegmentedControlItem
            }
          }
        })

        expect(wrapper.find('.geo-segmented-control-item--outline').exists()).toBe(true)
      })

      it('Should not add outline class when it\'s not outline', function () {
        const wrapper = getWrapper(taxonomySegmentedControlItem, {
          global: {
            components: {
              'geo-segmented-control-item': GeoSegmentedControlItem
            }
          }
        })

        expect(wrapper.find('.geo-segmented-control-item--outline').exists()).toBe(false)
      })
    })
  })
})
