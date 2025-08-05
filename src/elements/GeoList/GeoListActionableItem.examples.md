```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <div class="element-demo__item">
      <geo-list-actionable-item :active="true">
        <template #title>
          <div>Title 1 no icon</div>
        </template>
        <template #trailingAccessoryItem>
          <font-awesome-icon
            :icon="['fas', 'times']"
            aria-hidden
            fixed-width
          />
        </template>
        <div>There are 27 new events around your stores..</div>
        <div>31/10/2018</div>
      </geo-list-actionable-item>
      <geo-list-actionable-item>
        <template #title>
          <div>Title 2</div>
        </template>
        <template #trailingAccessoryItem>
          <font-awesome-icon
            :icon="['fas', 'times']"
            aria-hidden
            fixed-width
          />
        </template>
        <div>There are 27 new events around your stores.</div>
        <div>31/10/2018</div>
        <template #actions>
          <geo-secondary-button>Button</geo-secondary-button>
        </template>
      </geo-list-actionable-item>
    </div>

    <div class="element-demo__item">
      <geo-list-actionable-item :icon="['far', 'bell']">
        <template #title>
          <div>Title with icon and trailing icon</div>
        </template>
        <template #trailingAccessoryItem>
          <font-awesome-icon
            :icon="['fas', 'chevron-right']"
            aria-hidden
            fixed-width
          />
        </template>
        <div>There are 27 new events around your stores.</div>
        <div>31/10/2018</div>
        <template #actions>
          <geo-secondary-button>Button</geo-secondary-button>
        </template>
      </geo-list-actionable-item>
      <geo-list-actionable-item :icon="['far', 'bell']">
        <template #title>
          <div>Title with icon and trailing icon</div>
        </template>
        <template #trailingAccessoryItem>
          <font-awesome-icon
            :icon="['fas', 'chevron-right']"
            aria-hidden
            fixed-width
          />
        </template>
        <div>There are 27 new events around your stores.</div>
        <div>31/10/2018</div>
        <template #actions>
          <geo-secondary-button>Button</geo-secondary-button>
        </template>
      </geo-list-actionable-item>
    </div>
  </div>
</div>
