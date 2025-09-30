```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <div>
      <geo-list-group>
        <template #title>Group title</template>
      </geo-list-group>
    </div>

    <div>
      <geo-list-group>
        <template #title>Exclusive options</template>
        <template #item>
          <geo-list-item>
            First

            <template #trailingAccessoryItem>
              <input
                type="radio"
                name="demo"
              >
            </template>
          </geo-list-item>
          <geo-list-item>
            Second

            <template #trailingAccessoryItem>
              <input
                type="radio"
                name="demo"
              >
            </template>
          </geo-list-item>
          <geo-list-item>
            Third

            <template #trailingAccessoryItem>
              <input
                type="radio"
                name="demo"
              >
            </template>
          </geo-list-item>
        </template>
      </geo-list-group>
    </div>

    <div>
      <geo-list-group :icon="['far', 'user']">
        <template #title>Inclusive options</template>
        <template #trailingAccessoryItem>
          <input
            type="checkbox"
          >
        </template>
        <template #item>
          <geo-list-item>
            First

            <template #trailingAccessoryItem>
              <input
                type="checkbox"
              >
            </template>
          </geo-list-item>
          <geo-list-item>
            Second

            <template #trailingAccessoryItem>
              <input
                type="checkbox"
              >
            </template>
          </geo-list-item>
          <geo-list-item>
            Third

            <template #trailingAccessoryItem>
              <input
                type="checkbox"
              >
            </template>
          </geo-list-item>
        </template>
      </geo-list-group>
    </div>

    <div>
      <geo-list-group :icon="['far', 'bell']">
        <template #title>Notifications</template>
        <template #trailingAccessoryItem>
          <font-awesome-icon
            :icon="['fas', 'chevron-right']"
            aria-hidden
            fixed-width
          />
        </template>
        <template #item>
          <geo-list-item>One</geo-list-item>
          <geo-list-item>Two</geo-list-item>
        </template>
      </geo-list-group>
    </div>

    <div>
      <geo-list-group>
        <template #title>First group</template>
        <template #item>
          <geo-list-item>One</geo-list-item>
          <geo-list-item>Two</geo-list-item>
        </template>
      </geo-list-group>

      <geo-list-group>
        <template #title>Second group</template>
        <template #item>
          <geo-list-item>One</geo-list-item>
          <geo-list-item>Two</geo-list-item>
        </template>
      </geo-list-group>
    </div>
  </div>
</div>
