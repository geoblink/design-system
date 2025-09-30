---
to: .vitepress/docs/components/<%= h.withoutExtension(path) %>.md
---

<% const componentName = h.path.dirname(path).split('/').pop() %>

# <%= h.inflection.classify(componentName) %> <badge text="Ready" type="tip" /> <badge text="2.0.0+" />

<%= h.getComponentDescription(jsonDocumentation) %>

<% if (h.getComponentPropertiesJSON(jsonDocumentation) != '[]' ) { %>
## Properties

<component-documentation-properties
  v-if='componentProperties.length'
  :component-properties='componentProperties'
/>
<% } %>

<% if (h.getComponentEventsJSON(jsonDocumentation) != '[]') { %>
## Events

<component-documentation-events
  v-if='componentEvents.length'
  :component-events='componentEvents'
/>
<% } %>

<% if (h.getComponentSlotsJSON(jsonDocumentation) != '[]') { %>
## Slots

<component-documentation-slots
  v-if='componentSlots.length'
  :component-slots='componentSlots'
/>
<% } %>

## Constants

<constants-<%= h.inflection.classify(componentName) %>-<%= h.inflection.classify(componentName) %>Constants />

## Examples

<script setup>
import { computed } from 'vue'

<% if (h.getComponentPropertiesJSON(jsonDocumentation) != '[]' ) { %>
const componentProperties = computed(() => {
  return <%- h.getComponentPropertiesJSON(jsonDocumentation) %>
})
<% } %>

<% if (h.getComponentEventsJSON(jsonDocumentation) != '[]') { %>
const componentEvents = computed(() => {
  return <%- h.getComponentEventsJSON(jsonDocumentation) %>
})
<% } %>

<% if (h.getComponentSlotsJSON(jsonDocumentation) != '[]') { %>
const componentSlots = computed(() => {
  return <%- h.getComponentSlotsJSON(jsonDocumentation) %>
})
<% } %>
</script>

