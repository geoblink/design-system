`GeoCollapsableBox` is a component featuring a collapsable box that can be expanded on user demand.

## Regular

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-collapsable-box>
      <template slot="header">The header</template>

      This content can be toggled in and out.
    </geo-collapsable-box>
  </div>
</div>
```

## Initially collapsed

```jsx live
<div class="element-demo">
  <div class="element-demo__block">
    <geo-collapsable-box initially-collapsed>
      <template slot="header">The header</template>

      This content can be toggled in and out.
    </geo-collapsable-box>
  </div>
</div>
```
