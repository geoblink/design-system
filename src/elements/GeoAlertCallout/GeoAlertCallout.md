Use `GeoAlertCallout` component to give visual feedback to your users about the
result of an action that has not been performed yet or insights to help them
properly finish a task. You can customize the color to change the intention of
the feedback.

```
<div class="element-demo">
  <h3 class="element-demo__header">Simple</h3>
  <div class="element-demo__block">
    <geo-alert-callout variant="info" :icon="['far', 'lightbulb']">
      A simple info alert callout
    </geo-alert-callout>
    <geo-alert-callout variant="success" :icon="['far', 'thumbs-up']">
      A simple success alert callout
    </geo-alert-callout>
    <geo-alert-callout variant="error" :icon="['fas', 'exclamation-triangle']">
      A simple error alert callout
    </geo-alert-callout>
    <geo-alert-callout variant="warning" :icon="['fas', 'exclamation-triangle']">
      A simple warn alert callout
    </geo-alert-callout>
  </div>
  <h3 class="element-demo__header">Long content</h3>
  <div class="element-demo__block">
    <geo-alert-callout variant="info" :icon="['far', 'lightbulb']">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ullamcorper urna eu mattis consectetur. Nulla efficitur, odio vel bibendum pretium, mi diam malesuada leo, quis porta urna est vitae libero. Morbi ac lacinia dolor, id sagittis lacus. Phasellus egestas, ligula at cursus maximus, ligula elit mattis magna, in aliquet est est molestie ipsum. In euismod euismod posuere. Sed facilisis leo orci, quis lacinia massa pretium non. Donec sapien eros, venenatis non quam vitae, faucibus maximus ex. Ut ac quam at metus ullamcorper malesuada.
    </geo-alert-callout>
    <geo-alert-callout variant="success" :icon="['far', 'thumbs-up']">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ullamcorper urna eu mattis consectetur. Nulla efficitur, odio vel bibendum pretium, mi diam malesuada leo, quis porta urna est vitae libero. Morbi ac lacinia dolor, id sagittis lacus. Phasellus egestas, ligula at cursus maximus, ligula elit mattis magna, in aliquet est est molestie ipsum. In euismod euismod posuere. Sed facilisis leo orci, quis lacinia massa pretium non. Donec sapien eros, venenatis non quam vitae, faucibus maximus ex. Ut ac quam at metus ullamcorper malesuada.
    </geo-alert-callout>
    <geo-alert-callout variant="error" :icon="['fas', 'exclamation-triangle']">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ullamcorper urna eu mattis consectetur. Nulla efficitur, odio vel bibendum pretium, mi diam malesuada leo, quis porta urna est vitae libero. Morbi ac lacinia dolor, id sagittis lacus. Phasellus egestas, ligula at cursus maximus, ligula elit mattis magna, in aliquet est est molestie ipsum. In euismod euismod posuere. Sed facilisis leo orci, quis lacinia massa pretium non. Donec sapien eros, venenatis non quam vitae, faucibus maximus ex. Ut ac quam at metus ullamcorper malesuada.
    </geo-alert-callout>
    <geo-alert-callout variant="warning" :icon="['fas', 'exclamation-triangle']">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ullamcorper urna eu mattis consectetur. Nulla efficitur, odio vel bibendum pretium, mi diam malesuada leo, quis porta urna est vitae libero. Morbi ac lacinia dolor, id sagittis lacus. Phasellus egestas, ligula at cursus maximus, ligula elit mattis magna, in aliquet est est molestie ipsum. In euismod euismod posuere. Sed facilisis leo orci, quis lacinia massa pretium non. Donec sapien eros, venenatis non quam vitae, faucibus maximus ex. Ut ac quam at metus ullamcorper malesuada.
    </geo-alert-callout>
  </div>
</div>
```
