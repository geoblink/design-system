`GeoModal` is a generic component designed to block user interaction with
underlying UI while forcing them to focus attention in modal's child component.

Use it together with [`GeoBorderedBox`]() to offer a modal window experience.

```vue
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Body-attached modal</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-primary-button @click="openModal('bodyAttached')">Open modal</geo-primary-button>
      <geo-modal
        v-if="isOpen.bodyAttached"
        @click-backdrop="closeModal('bodyAttached')"
      >
        <div class="element-demo__bordered-box">
          This is the body of the modal.
        </div>
      </geo-modal>
    </div>
    <h3 class="element-demo__header">Container-attached modal</h3>
    <div class="element-demo__columns-layout">
      <div class="element-demo__block" style="flex: 1;">
        <geo-primary-button @click="toggleModal('containerAttached')">Toggle modal</geo-primary-button>
      </div>
      <div class="element-demo__bordered-box" style="flex: 1;" ref="sidebarContainer">
        <p>Modal will be opened on top of this container and will block interaction
        with the button below.</p>

        <geo-primary-button @click="showAlert('Hello!')">Show alert</geo-primary-button>

        <geo-modal
          v-if="isOpen.containerAttached"
          :attach-to="$refs.sidebarContainer"
        >
          <div class="element-demo__bordered-box">
            This modal only covers part of the page.
          </div>
        </geo-modal>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpen: {
        bodyAttached: false,
        containerAttached: false
      }
    }
  },
  methods: {
    openModal (modalName) {
      this.isOpen[modalName] = true
    },

    closeModal (modalName) {
      this.isOpen[modalName] = false
    },

    toggleModal (modalName) {
      this.isOpen[modalName] = !this.isOpen[modalName]
    },

    showAlert(message) {
      alert(message)
    }
  }
}
</script>
```
