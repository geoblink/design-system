---
inject: true
to: src/styles/styles.scss
append: true
---
@import "../styles/elements/<%= name %>/<%= h.changeCase.param(name) %>";