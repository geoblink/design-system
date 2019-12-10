---
to: docs/components/<%= h.withoutExtension(path) %>.md
---

# <%= h.getComponentName(jsonDocumentation) %> <% if (h.getComponentStatusBadgeText(jsonDocumentation)) { %> <badge text="<%= h.getComponentStatusBadgeText(jsonDocumentation) %>" type="<%= h.getComponentStatusBadgeType(jsonDocumentation) %>" />  <% } %> <% if (h.getComponentReleaseBadgeText(jsonDocumentation)) { %> <badge text="<%= h.getComponentReleaseBadgeText(jsonDocumentation) %>" />  <% } %>

<%- h.unescapeString(h.getComponentDescription(jsonDocumentation)) %>

<% if (h.getComponentPropertiesJSON(jsonDocumentation) != '[]' ) { %>
## Properties

<component-documentation-properties
  v-if='JSON.parse(`<%- h.escapeString(h.getComponentPropertiesJSON(jsonDocumentation)) %>`).length'
  :component-properties='JSON.parse(`<%- h.escapeString(h.getComponentPropertiesJSON(jsonDocumentation)) %>`)'
/>
<% } %>

<% if (h.getComponentEventsJSON(jsonDocumentation) != '[]') { %>
## Events

<component-documentation-events
  v-if='JSON.parse(`<%- h.escapeString(h.getComponentEventsJSON(jsonDocumentation)) %>`).length'
  :component-events='JSON.parse(`<%- h.escapeString(h.getComponentEventsJSON(jsonDocumentation)) %>`)'
/>
<% } %>

<% if (h.getComponentSlotsJSON(jsonDocumentation) != '[]') { %>
## Slots

<component-documentation-slots
  v-if='JSON.parse(`<%- h.escapeString(h.getComponentSlotsJSON(jsonDocumentation)) %>`).length'
  :component-slots='JSON.parse(`<%- h.escapeString(h.getComponentSlotsJSON(jsonDocumentation)) %>`)'
/>
<% } %>

## Constants

<constants-<%= h.slashesAsDashes(h.withoutExtension(path)) %>Constants />

## Examples
