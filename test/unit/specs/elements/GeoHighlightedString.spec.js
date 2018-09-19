import { createLocalVue, mount } from '@vue/test-utils'
import GeoHighlightedString from '@/elements/GeoHighlightedString/GeoHighlightedString.vue'

import chai from 'chai'
import chaiThings from 'chai-things'

chai.use(chaiThings)

const { expect: chaiExpect } = chai

// create an extended `Vue` constructor
const localVue = createLocalVue()
localVue.component('geo-highlighted-string', GeoHighlightedString)

describe('highlighted-string-component.vue', function () {
  describe('#groups', function () {
    it('Should return an empty array when there are no matches', function () {
      const wrapper = mount(GeoHighlightedString, {
        propsData: {
          referenceString: 'Accommodation',
          highlightedChars: []
        }
      })

      chaiExpect(wrapper.vm.groups).to.be.an('array').that.has.lengthOf(1)
      chaiExpect(wrapper.vm.groups).to.have.property(0).that.has.property('substring', 'Accommodation')
      chaiExpect(wrapper.vm.groups).to.have.property(0).that.has.property('isHighlighted', false)
    })

    it('Should return an array when there is a single group match', function () {
      const wrapper = mount(GeoHighlightedString, {
        propsData: {
          referenceString: 'Accommodation',
          highlightedChars: [5, 6, 7, 8] // moda :: -> accom moda tion
        }
      })

      chaiExpect(wrapper.vm.groups).to.be.an('array').that.has.lengthOf(3)
      chaiExpect(wrapper.vm.groups).all.to.have.property('substring')
      chaiExpect(wrapper.vm.groups).all.to.have.property('isHighlighted')

      // accom {substring:'acco', isHighlighted: false}
      chaiExpect(wrapper.vm.groups).to.have.property(0).that.has.property('substring', 'Accom')
      chaiExpect(wrapper.vm.groups).to.have.property(0).that.has.property('isHighlighted', false)
      // TODO: Check if these triplets could be replaced with:
      // expect(wrapper.vm.groups).to.have.property(0).that.is.deep.equal({
      //  substring: 'accom', isHighlighted: false
      // })

      // moda {substring: 'moda', isHighlighted: true}
      chaiExpect(wrapper.vm.groups).to.have.property(1).that.has.property('substring', 'moda')
      chaiExpect(wrapper.vm.groups).to.have.property(1).that.has.property('isHighlighted', true)

      // tion {substring: 'tion', isHighlighted: false}
      chaiExpect(wrapper.vm.groups).to.have.property(2).that.has.property('substring', 'tion')
      chaiExpect(wrapper.vm.groups).to.have.property(2).that.has.property('isHighlighted', false)
    })

    it('Should return an array when the string finishes with a match', function () {
      const wrapper = mount(GeoHighlightedString, {
        propsData: {
          referenceString: 'Accommodation',
          highlightedChars: [1, 3, 7, 12] // codn :: -> a c c o mmo d atio n
        }
      })

      chaiExpect(wrapper.vm.groups).to.be.an('array').that.has.lengthOf(8)
      chaiExpect(wrapper.vm.groups).all.to.have.property('substring')
      chaiExpect(wrapper.vm.groups).all.to.have.property('isHighlighted')

      // a {substring: 'a', isHighlighted: false}
      chaiExpect(wrapper.vm.groups).to.have.property(0).that.has.property('substring', 'A')
      chaiExpect(wrapper.vm.groups).to.have.property(0).that.has.property('isHighlighted', false)

      // c {substring: 'c', isHighlighted: true}
      chaiExpect(wrapper.vm.groups).to.have.property(1).that.has.property('substring', 'c')
      chaiExpect(wrapper.vm.groups).to.have.property(1).that.has.property('isHighlighted', true)

      // c {substring: 'c', isHighlighted: false}
      chaiExpect(wrapper.vm.groups).to.have.property(2).that.has.property('substring', 'c')
      chaiExpect(wrapper.vm.groups).to.have.property(2).that.has.property('isHighlighted', false)

      // o {substring: 'o', isHighlighted: true}
      chaiExpect(wrapper.vm.groups).to.have.property(3).that.has.property('substring', 'o')
      chaiExpect(wrapper.vm.groups).to.have.property(3).that.has.property('isHighlighted', true)

      // mmo {substring: 'mmo', isHighlighted: false}
      chaiExpect(wrapper.vm.groups).to.have.property(4).that.has.property('substring', 'mmo')
      chaiExpect(wrapper.vm.groups).to.have.property(4).that.has.property('isHighlighted', false)

      // d {substring: 'd', isHighlighted: true}
      chaiExpect(wrapper.vm.groups).to.have.property(5).that.has.property('substring', 'd')
      chaiExpect(wrapper.vm.groups).to.have.property(5).that.has.property('isHighlighted', true)

      // atio {substring: 'atio', isHighlighted: false}
      chaiExpect(wrapper.vm.groups).to.have.property(6).that.has.property('substring', 'atio')
      chaiExpect(wrapper.vm.groups).to.have.property(6).that.has.property('isHighlighted', false)

      // n {substring: 'n', isHighlighted: true}
      chaiExpect(wrapper.vm.groups).to.have.property(7).that.has.property('substring', 'n')
      chaiExpect(wrapper.vm.groups).to.have.property(7).that.has.property('isHighlighted', true)
    })

    it('Should return an array when the string begins with a match', function () {
      const wrapper = mount(GeoHighlightedString, {
        propsData: {
          referenceString: 'Accommodation',
          highlightedChars: [0, 3, 7, 12] // aodn :: -> a cc o mmo d atio n
        }
      })

      chaiExpect(wrapper.vm.groups).to.be.an('array').that.has.lengthOf(7)
      chaiExpect(wrapper.vm.groups).all.to.have.property('substring')
      chaiExpect(wrapper.vm.groups).all.to.have.property('isHighlighted')

      // a {substring: 'a', isHighlighted: false}
      chaiExpect(wrapper.vm.groups).to.have.property(0).that.has.property('substring', 'A')
      chaiExpect(wrapper.vm.groups).to.have.property(0).that.has.property('isHighlighted', true)

      // c {substring: 'cc', isHighlighted: true}
      chaiExpect(wrapper.vm.groups).to.have.property(1).that.has.property('substring', 'cc')
      chaiExpect(wrapper.vm.groups).to.have.property(1).that.has.property('isHighlighted', false)

      // o {substring: 'o', isHighlighted: true}
      chaiExpect(wrapper.vm.groups).to.have.property(2).that.has.property('substring', 'o')
      chaiExpect(wrapper.vm.groups).to.have.property(2).that.has.property('isHighlighted', true)

      // mmo {substring: 'mmo', isHighlighted: false}
      chaiExpect(wrapper.vm.groups).to.have.property(3).that.has.property('substring', 'mmo')
      chaiExpect(wrapper.vm.groups).to.have.property(3).that.has.property('isHighlighted', false)

      // d {substring: 'd', isHighlighted: true}
      chaiExpect(wrapper.vm.groups).to.have.property(4).that.has.property('substring', 'd')
      chaiExpect(wrapper.vm.groups).to.have.property(4).that.has.property('isHighlighted', true)

      // atio {substring: 'atio', isHighlighted: false}
      chaiExpect(wrapper.vm.groups).to.have.property(5).that.has.property('substring', 'atio')
      chaiExpect(wrapper.vm.groups).to.have.property(5).that.has.property('isHighlighted', false)

      // n {substring: 'n', isHighlighted: true}
      chaiExpect(wrapper.vm.groups).to.have.property(6).that.has.property('substring', 'n')
      chaiExpect(wrapper.vm.groups).to.have.property(6).that.has.property('isHighlighted', true)
    })

    it('Should not shift the original matched data', function () {
      const wrapper = mount(GeoHighlightedString, {
        propsData: {
          referenceString: 'Accommodation',
          highlightedChars: [0, 3, 7, 12] // aodn :: -> a cc o mmo d atio n
        }
      })
      chaiExpect(wrapper.vm.highlightedChars).to.be.an('array').that.has.lengthOf(4)
    })
  })
})
