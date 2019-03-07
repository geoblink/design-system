---
to: test/unit/specs/elements/<%= name %>/<%= name %>.spec.js
---
import { mount } from '@vue/test-utils'
import <%= name %> from '@/elements/<%= name %>/<%= name %>.vue'

describe('<%= name %>', () => {
  it('should render', function () {
    const wrapper = mount(<%= name %>)
    expect(wrapper.find('.<%= h.changeCase.param(name) %>').exists()).toBe(true)
  })
})
