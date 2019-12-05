---
inject: true
to: docs/components/<%= h.withoutExtension(path) %>.md
append: true
---

<%- h.unescapeNewlines(exampleMarkdownCode) %>
