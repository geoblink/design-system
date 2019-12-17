### Playground

```vue live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      <div class="element-demo__inline-input-group">
        <label class="element-demo__inline-input-group__field">
          Header: <select
            v-model="headerMode"
          >
            <option value="none">None</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>
      <div class="element-demo__inline-input-group">
        <label class="element-demo__inline-input-group__field">
          Footer: <select
            v-model="footerMode"
          >
            <option value="none">None</option>
            <option value="buttons">Buttons</option>
          </select>
        </label>
      </div>
      <div class="element-demo__inline-input-group">
        <label class="element-demo__inline-input-group__field">
          Columns: <select
            v-model="columnsMode"
          >
            <option value="one">One column</option>
            <option value="two">Two columns</option>
          </select>
        </label>
      </div>
      <div class="element-demo__inline-input-group">
        <label class="element-demo__inline-input-group__field">
          Content: <input type="text" v-model="content">
        </label>
      </div>
    </h3>

    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-bordered-box>
        <geo-bordered-box-header v-if="showBoxHeader">
          My header
        </geo-bordered-box-header>
        <geo-horizontal-layout v-if="showColumns">
          <geo-bordered-box-column><blockquote>{{ content }}</blockquote></geo-bordered-box-column>
          <geo-bordered-box-column><blockquote>{{ content }}</blockquote></geo-bordered-box-column>
        </geo-horizontal-layout>
        <div v-else>
          <p>Box content:</p>
          <blockquote>{{ content }}</blockquote>
        </div>
        <geo-bordered-box-footer v-if="showBoxFooter">
          <div style="display: flex; flex-direction:row; justify-content: flex-end;">
            <geo-tertiary-button>Cancel</geo-tertiary-button>
            <geo-primary-button>Save changes</geo-primary-button>
          </div>
        </geo-bordered-box-footer>
      </geo-bordered-box>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpen: false,
      headerMode: 'none',
      footerMode: 'none',
      columnsMode: 'one',
      content: 'This is the body of the box'
    }
  },
  computed: {
    showBoxHeader () {
      return this.headerMode !== 'none'
    },

    showBoxFooter () {
      return this.footerMode !== 'none'
    },
    showColumns () {
      return this.columnsMode !== 'one'
    }
  },
  methods: {
    openModal () {
      this.isOpen = true
    },

    closeModal () {
      this.isOpen = false
    }
  }
}
</script>
```

### Header and footer

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-bordered-box>
      <geo-bordered-box-header>My header</geo-bordered-box-header>
      <geo-list-item>This box has a nice header</geo-list-item>
    </geo-bordered-box>

    <geo-bordered-box>
      <geo-list-item>This box has a nice footer</geo-list-item>
      <geo-bordered-box-footer>
        <geo-primary-button>Save changes</geo-primary-button>
      </geo-bordered-box-footer>
    </geo-bordered-box>

    <geo-bordered-box>
      <geo-bordered-box-header>My header</geo-bordered-box-header>
      <geo-list-item>This box has a nice header and footer</geo-list-item>
      <geo-bordered-box-footer>
        <div style="display: flex; flex-direction:row; justify-content: flex-end;">
          <geo-tertiary-button>Cancel</geo-tertiary-button>
          <geo-primary-button>Save changes</geo-primary-button>
        </div>
      </geo-bordered-box-footer>
    </geo-bordered-box>
  </div>
</div>
```

### With groups

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-bordered-box>
      <geo-bordered-box-header>One group</geo-bordered-box-header>
      <geo-list-group>
        <template slot="title">Single group</template>
        <template slot="item">
          <geo-list-item>First option</geo-list-item>
          <geo-list-item>Second option</geo-list-item>
          <geo-list-item>Third option</geo-list-item>
        </template>
      </geo-list-group>
    </geo-bordered-box>

    <geo-bordered-box>
      <geo-bordered-box-header>Several groups</geo-bordered-box-header>
      <geo-list-group>
        <template slot="title">First group</template>
        <template slot="item">
          <geo-list-item>First option</geo-list-item>
          <geo-list-item>Second option</geo-list-item>
          <geo-list-item>Third option</geo-list-item>
        </template>
      </geo-list-group>
      <geo-list-group>
        <template slot="title">Second group</template>
        <template slot="item">
          <geo-list-item>First option</geo-list-item>
          <geo-list-item>Second option</geo-list-item>
          <geo-list-item>Third option</geo-list-item>
        </template>
      </geo-list-group>
    </geo-bordered-box>

    <geo-bordered-box>
      <geo-bordered-box-header>Several groups and footer</geo-bordered-box-header>
      <geo-list-group>
        <template slot="title">First group</template>
        <template slot="item">
          <geo-list-item>First option</geo-list-item>
          <geo-list-item>Second option</geo-list-item>
          <geo-list-item>Third option</geo-list-item>
        </template>
      </geo-list-group>
      <geo-list-group>
        <template slot="title">Second group</template>
        <template slot="item">
          <geo-list-item>First option</geo-list-item>
          <geo-list-item>Second option</geo-list-item>
          <geo-list-item>Third option</geo-list-item>
        </template>
      </geo-list-group>
      <geo-bordered-box-footer>
        <geo-primary-button>Apply</geo-primary-button>
      </geo-bordered-box-footer>
    </geo-bordered-box>
  </div>
</div>
```
