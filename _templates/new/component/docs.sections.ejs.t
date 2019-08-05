---
inject: true
to: config/docs.sections.config.js
before: hygen-component
---
      {
        name: '<%= name %>',
        components: '../src/elements/<%= name %>/<%= name %>*.vue',
        sectionDepth: 1
      },