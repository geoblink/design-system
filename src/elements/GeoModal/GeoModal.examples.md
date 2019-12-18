### Body-attached modal

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-primary-button @click="openModal()">
        Open modal
      </geo-primary-button>

      <geo-modal
        v-if="isOpen"
        @click-backdrop="closeModal()"
      >
        <div class="element-demo__bordered-box">
          This is the body of the modal.
        </div>
      </geo-modal>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpen: false
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

### Body-attached GeoBorderedBox-based modal

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-primary-button @click="openModal()">
        Open bordered modal
      </geo-primary-button>

      <geo-modal
        v-if="isOpen"
        :header-close-icon="['fas', 'times']"
        @close="closeModal()"
        @click-backdrop="closeModal()"
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
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpen: false
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

### Body-attached modal with tabs

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-primary-button @click="openModal()">
        Open tabs modal
      </geo-primary-button>

      <geo-modal
        v-if="isOpen"
        :header-close-icon="['fas', 'times']"
        @close="closeModal()"
        @click-backdrop="closeModal()"
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

  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpen: false,
      activeTab: 'First'
    }
  },
  computed: {
    tabs () {
      return ['First', 'Second', 'Third']
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

### Container-attached modal

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__columns-layout">
      <div class="element-demo__block" style="flex: 1;">
        <geo-primary-button @click="toggleModal()">
          Toggle modal
        </geo-primary-button>
      </div>

      <div
        ref="sidebarContainer"
        class="element-demo__bordered-box"
        style="flex: 1; height: 100px; overflow-y: auto;"
      >
        <p>Modal will be opened on top of this container and will block interaction
        with the button below.</p>

        <geo-primary-button @click="showAlert('Hello!')">
          Show alert
        </geo-primary-button>

        <p>There's more content here to force vertical scroll</p>

        <geo-modal
          v-if="isOpen"
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
      isOpen: false
    }
  },
  methods: {
    toggleModal () {
      this.isOpen = !this.isOpen
    },

    showAlert(message) {
      alert(message)
    }
  }
}
</script>
```
