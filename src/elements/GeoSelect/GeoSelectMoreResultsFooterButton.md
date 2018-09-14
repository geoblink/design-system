`GeoSelectMoreResultsFooterButton` is component designed to be displayed as
footer of a [GeoSelect](./#/Elements/GeoSelect?id=geoselect-1) when there are
too many options to display all of them at once.

When clicking the button an event will be emitted to allow parent component to
feed in more data.

```jsx
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-select-more-results-footer-button>
      <template slot="moreResultsContent">Load more results</template>
    </geo-select-more-results-footer-button>
  </div>
</div>
```
