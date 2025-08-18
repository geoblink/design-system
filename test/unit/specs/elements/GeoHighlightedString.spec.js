import { mount } from '@vue/test-utils'
import GeoHighlightedString from '@/elements/GeoHighlightedString/GeoHighlightedString.vue'

// Helper function to create wrapper with registered components
function createWrapper (component, options = {}) {
  return mount(component, Object.assign({
    global: {
      components: {
        'geo-highlighted-string': GeoHighlightedString
      }
    }
  }, options))
}

describe('highlighted-string-component.vue', function () {
  describe('#groups', function () {
    it('Should return an empty array when there are no matches', function () {
      const wrapper = createWrapper(GeoHighlightedString, {
        props: {
          referenceString: 'Accommodation',
          highlightedChars: []
        }
      })

      expect(wrapper.vm.groups).toBeInstanceOf(Array)
      expect(wrapper.vm.groups).toHaveLength(1)
      expect(wrapper.vm.groups[0]).toHaveProperty('substring', 'Accommodation')
      expect(wrapper.vm.groups[0]).toHaveProperty('isHighlighted', false)
    })

    it('Should return an array when there is a single group match', function () {
      const wrapper = createWrapper(GeoHighlightedString, {
        props: {
          referenceString: 'Accommodation',
          highlightedChars: [5, 6, 7, 8] // moda :: -> accom moda tion
        }
      })

      expect(wrapper.vm.groups).toBeInstanceOf(Array)
      expect(wrapper.vm.groups).toHaveLength(3)
      wrapper.vm.groups.forEach(group => {
        expect(group).toHaveProperty('substring')
        expect(group).toHaveProperty('isHighlighted')
      })

      // accom {substring:'acco', isHighlighted: false}
      expect(wrapper.vm.groups[0]).toHaveProperty('substring', 'Accom')
      expect(wrapper.vm.groups[0]).toHaveProperty('isHighlighted', false)

      // moda {substring: 'moda', isHighlighted: true}
      expect(wrapper.vm.groups[1]).toHaveProperty('substring', 'moda')
      expect(wrapper.vm.groups[1]).toHaveProperty('isHighlighted', true)

      // tion {substring: 'tion', isHighlighted: false}
      expect(wrapper.vm.groups[2]).toHaveProperty('substring', 'tion')
      expect(wrapper.vm.groups[2]).toHaveProperty('isHighlighted', false)
    })

    it('Should return an array when the string finishes with a match', function () {
      const wrapper = createWrapper(GeoHighlightedString, {
        props: {
          referenceString: 'Accommodation',
          highlightedChars: [1, 3, 7, 12] // codn :: -> a c c o mmo d atio n
        }
      })

      expect(wrapper.vm.groups).toBeInstanceOf(Array)
      expect(wrapper.vm.groups).toHaveLength(8)
      wrapper.vm.groups.forEach(group => {
        expect(group).toHaveProperty('substring')
        expect(group).toHaveProperty('isHighlighted')
      })

      // a {substring: 'a', isHighlighted: false}
      expect(wrapper.vm.groups[0]).toHaveProperty('substring', 'A')
      expect(wrapper.vm.groups[0]).toHaveProperty('isHighlighted', false)

      // c {substring: 'c', isHighlighted: true}
      expect(wrapper.vm.groups[1]).toHaveProperty('substring', 'c')
      expect(wrapper.vm.groups[1]).toHaveProperty('isHighlighted', true)

      // c {substring: 'c', isHighlighted: false}
      expect(wrapper.vm.groups[2]).toHaveProperty('substring', 'c')
      expect(wrapper.vm.groups[2]).toHaveProperty('isHighlighted', false)

      // o {substring: 'o', isHighlighted: true}
      expect(wrapper.vm.groups[3]).toHaveProperty('substring', 'o')
      expect(wrapper.vm.groups[3]).toHaveProperty('isHighlighted', true)

      // mmo {substring: 'mmo', isHighlighted: false}
      expect(wrapper.vm.groups[4]).toHaveProperty('substring', 'mmo')
      expect(wrapper.vm.groups[4]).toHaveProperty('isHighlighted', false)

      // d {substring: 'd', isHighlighted: true}
      expect(wrapper.vm.groups[5]).toHaveProperty('substring', 'd')
      expect(wrapper.vm.groups[5]).toHaveProperty('isHighlighted', true)

      // atio {substring: 'atio', isHighlighted: false}
      expect(wrapper.vm.groups[6]).toHaveProperty('substring', 'atio')
      expect(wrapper.vm.groups[6]).toHaveProperty('isHighlighted', false)

      // n {substring: 'n', isHighlighted: true}
      expect(wrapper.vm.groups[7]).toHaveProperty('substring', 'n')
      expect(wrapper.vm.groups[7]).toHaveProperty('isHighlighted', true)
    })

    it('Should return an array when the string begins with a match', function () {
      const wrapper = createWrapper(GeoHighlightedString, {
        props: {
          referenceString: 'Accommodation',
          highlightedChars: [0, 3, 7, 12] // aodn :: -> a cc o mmo d atio n
        }
      })

      expect(wrapper.vm.groups).toBeInstanceOf(Array)
      expect(wrapper.vm.groups).toHaveLength(7)
      wrapper.vm.groups.forEach(group => {
        expect(group).toHaveProperty('substring')
        expect(group).toHaveProperty('isHighlighted')
      })

      // a {substring: 'a', isHighlighted: false}
      expect(wrapper.vm.groups[0]).toHaveProperty('substring', 'A')
      expect(wrapper.vm.groups[0]).toHaveProperty('isHighlighted', true)

      // c {substring: 'cc', isHighlighted: true}
      expect(wrapper.vm.groups[1]).toHaveProperty('substring', 'cc')
      expect(wrapper.vm.groups[1]).toHaveProperty('isHighlighted', false)

      // o {substring: 'o', isHighlighted: true}
      expect(wrapper.vm.groups[2]).toHaveProperty('substring', 'o')
      expect(wrapper.vm.groups[2]).toHaveProperty('isHighlighted', true)

      // mmo {substring: 'mmo', isHighlighted: false}
      expect(wrapper.vm.groups[3]).toHaveProperty('substring', 'mmo')
      expect(wrapper.vm.groups[3]).toHaveProperty('isHighlighted', false)

      // d {substring: 'd', isHighlighted: true}
      expect(wrapper.vm.groups[4]).toHaveProperty('substring', 'd')
      expect(wrapper.vm.groups[4]).toHaveProperty('isHighlighted', true)

      // atio {substring: 'atio', isHighlighted: false}
      expect(wrapper.vm.groups[5]).toHaveProperty('substring', 'atio')
      expect(wrapper.vm.groups[5]).toHaveProperty('isHighlighted', false)

      // n {substring: 'n', isHighlighted: true}
      expect(wrapper.vm.groups[6]).toHaveProperty('substring', 'n')
      expect(wrapper.vm.groups[6]).toHaveProperty('isHighlighted', true)
    })

    it('Should not shift the original matched data', function () {
      const wrapper = createWrapper(GeoHighlightedString, {
        props: {
          referenceString: 'Accommodation',
          highlightedChars: [0, 3, 7, 12] // aodn :: -> a cc o mmo d atio n
        }
      })
      expect(wrapper.vm.highlightedChars).toBeInstanceOf(Array)
      expect(wrapper.vm.highlightedChars).toHaveLength(4)
    })
  })
})
