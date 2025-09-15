---
to: .vitepress/docs/components/<%= h.withoutExtension(path) %>.md
---

<%- h.generateExamplesFromFile(exampleMarkdownPath, h.withoutExtension(path), h.renderFileContent('.vitepress/docs/components/' + h.withoutExtension(path) + '.md')) %>
