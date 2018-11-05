`GeoBorderedBox` is a component designed to show an isolated set of elements or
actions inside a boxed environment. Use it in dropdowns or modals to offer a
consistent experience.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">
      Bordered box playground
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
          Content: <input type="text" v-model="content">
        </label>
      </div>
    </h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-bordered-box>
        <geo-bordered-box-header v-if="showBoxHeader">
          My header
        </geo-bordered-box-header>
        <p>Box content:</p>
        <blockquote>{{ content }}</blockquote>
        <geo-bordered-box-footer v-if="showBoxFooter">
          <div style="display: flex; flex-direction:row; justify-content: flex-end;">
            <geo-tertiary-button>Cancel</geo-tertiary-button>
            <geo-primary-button>Save changes</geo-primary-button>
          </div>
        </geo-bordered-box-footer>
      </geo-bordered-box>
    </div>
    <h3 class="element-demo__header">Bordered box with header</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-bordered-box>
        <geo-bordered-box-header>My header</geo-bordered-box-header>
        <geo-list-item>This box has a nice header</geo-list-item>
      </geo-bordered-box>
    </div>
    <h3 class="element-demo__header">Bordered box with footer</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-bordered-box>
        <geo-list-item>This box has a nice footer</geo-list-item>
        <geo-bordered-box-footer>
          <geo-primary-button>Save changes</geo-primary-button>
        </geo-bordered-box-footer>
      </geo-bordered-box>
    </div>
    <h3 class="element-demo__header">Bordered box with header and footer</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
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
</template>

<script>
export default {
  data () {
    return {
      isOpen: false,
      headerMode: 'none',
      footerMode: 'none',
      content: 'This is the body of the box'
    }
  },
  computed: {
    showBoxHeader () {
      return this.headerMode !== 'none'
    },

    showBoxFooter () {
      return this.footerMode !== 'none'
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
