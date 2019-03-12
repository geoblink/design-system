---
inject: true
to: config/docs.config.js
before: hygen-component
---
        {
          name: '<%= name %>',
          components: '../src/elements/<%= name %>/<%= name %>*.vue',
          sectionDepth: 1
        },