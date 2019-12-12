import _ from 'lodash'
import { mount } from '@vue/test-utils'
import GeoDropdownCompactButton from '@/elements/GeoDropdown/GeoDropdownCompactButton.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIconMock, expectFontAwesomeIconProp } from 'test/unit/utils/FontAwesomeIconMock'

library.add(fas)

const iconsToMock = [
  'faEllipsisV'
]
const mockedFalIcons = _.mapValues(_.pick(fas, iconsToMock), (original) => {
  return _.assign({}, original, {
    prefix: 'fal'
  })
})
library.add(mockedFalIcons)

describe('GeoDropdownCompactButton', () => {
  it('Should render GeoDropdwonCompactButton component', () => {
    const wrapper = mount(GeoDropdownCompactButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })
    expect(wrapper.find('.geo-dropdown__compact-button-container').exists()).toBe(true)
  })

  it('Should render default icon', () => {
    const wrapper = mount(GeoDropdownCompactButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      }
    })
    const fontAwesomeIconElem = wrapper.find(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fal', 'ellipsis-v'])
  })

  it('Should render correct icon when provided', () => {
    const wrapper = mount(GeoDropdownCompactButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIconMock
      },
      propsData: {
        icon: ['fas', 'user']
      }
    })
    const fontAwesomeIconElem = wrapper.find(FontAwesomeIconMock)
    expectFontAwesomeIconProp(fontAwesomeIconElem, ['fas', 'user'])
  })

  it('Should emit click event when clicked', () => {
    const wrapper = mount(GeoDropdownCompactButton, {
      stubs: {
        'font-awesome-icon': FontAwesomeIcon
      }
    })

    wrapper.find('.geo-dropdown__compact-button-container').trigger('click')
    expect(wrapper.emitted()['click']).toBeTruthy()
  })
})
