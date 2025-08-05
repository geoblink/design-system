## Empty state

If table has no content to be displayed, its `empty` slot will be rendered. You
can use that slot to easily show an empty state for any table.

```jsv live
<div class="element-demo">
  <div class="element-demo__block">
    <div class="element-demo__bordered-box geo-activity-indicator-demo-box">
      <geo-table :source-data="[]" :current-page="0">
        <template #empty>Table is empty!</template>
      </geo-table>
    </div>
  </div>
</div>
```
