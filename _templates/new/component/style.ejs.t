---
to: src/styles/elements/<%= name %>/_<%= h.changeCase.param(name) %>.scss
---
<% dashedName = h.changeCase.param(name) -%>
@mixin <%= dashedName %>-make($modifier-name) {

  $modifier-name-with-prefix: '';

  @if $modifier-name != '' {
    // sass-lint:disable space-around-operator
    $modifier-name-with-prefix: --#{$modifier-name};
  }

  .<%= dashedName %>#{$modifier-name-with-prefix} {
    // TODO: Put some SCSS code here
  }

}

@include <%= dashedName %>-make('');
