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

      <geo-primary-button @click="openModal('bordered')">Open bordered modal</geo-primary-button>
      <geo-modal
        v-if="isOpen.bordered"
        :header-close-icon="['fas', 'times']"
        @close="closeModal('bordered')"
        @click-backdrop="closeModal('bordered')"
      >
        <div slot="header">
          My Title
        </div>
        <div slot="body">
          My modal content
        </div>
        <div slot="footer">
          <geo-primary-button>Button</geo-primary-button>
        </div>
      </geo-modal>

      <geo-primary-button @click="openModal('tabs')">Open tabs modal</geo-primary-button>
      <geo-modal
        v-if="isOpen.tabs"
        :header-close-icon="['fas', 'times']"
        @close="closeModal('tabs')"
        @click-backdrop="closeModal('tabs')"
      >
        <div slot="header">
          <geo-tab-bar variant="modal">
            <geo-tab-bar-item
              v-for="tab in tabs"
              variant="modal"
              :key="tab"
              :active="activeTab === tab"
              @click="activeTab = tab"
            >
              {{ tab }}
            </geo-tab-bar-item>
          </geo-tab-bar>
        </div>
        <div slot="body">
          <template v-if="activeTab === tabs[0]">
            First tab
          </template>
          <template v-else-if="activeTab === tabs[1]">
            Second tab
          </template>
          <template v-else>
            Third tab
          </template>
        </div>
        <div slot="footer">
          <geo-primary-button>Button</geo-primary-button>
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
        containerAttached: false,
        bordered: false,
        tabs: false
      },
      activeTab: 'First'
    }
  },
  computed: {
    tabs () {
      return ['First', 'Second', 'Third']
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
