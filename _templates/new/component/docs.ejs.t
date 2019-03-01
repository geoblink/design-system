---
inject: true
to: config/docs.config.js
before: hygen-component
---
        , // TODO: Place comma
        {
          name: '<%= name %>',
          components: '../src/elements/<%= name %>/<%= name %>*.vue',
          sectionDepth: 1
        }