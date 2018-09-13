`GeoSelectMoreResultsFooterButton` is a button designed to be displayed as footer of a `GeoSelect` when there are too many options to display all of them at once. When clicking the button an event will be emitted to allow parent component to feed in more data.

```jsx
<div class="element-demo">
  <h3 class="element-demo__header">More results button with more results to show</h3>
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-select-more-results-footer-button>
      <template slot="moreResultsContent">Load more results</template>
    </geo-select-more-results-footer-button>
  </div>
</div>
```
