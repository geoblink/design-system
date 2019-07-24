## Empty table

If table has no content to be displayed, its `empty` slot will be rendered. You
can use that slot to easily show an empty state for any table.

```
<div class="element-demo">
  <h3 class="element-demo__header">Empty table</h3>
  <div class="element-demo__block">
    <div class="element-demo__bordered-box geo-activity-indicator-demo-box">
      <geo-table :source-data="[]" :current-page="0">
        <p slot="empty">Table is empty!</p>
      </geo-table>
    </div>
  </div>
</div>
```
