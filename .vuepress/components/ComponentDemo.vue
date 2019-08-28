<template>
  <div class="c-component-demo">
    <div class="c-component-demo__preview">
      <div class="c-component-demo__resizable-content">
        <slot name="preview" />
      </div>
    </div>

    <div class="c-component-demo__code">
      <div class="c-component-demo__pre-code-actions">
        <button
          v-if="isEditorVisible"
          @click="hideEditor()"
        >
          <font-awesome-icon
            :icon="['fas', 'code']"
            fixed-width
            aria-hidden
          />
          Hide code
        </button>
      </div>

      <div
        v-if="isEditorVisible"
        class="c-component-demo__code-editor"
      >
        <slot name="editor" />
      </div>

      <div class="c-component-demo__post-code-actions">
        <button
          v-if="isEditorVisible"
          @click="hideEditor()"
        >
          <font-awesome-icon
            :icon="['fas', 'code']"
            fixed-width
            aria-hidden
          />
          Hide code
        </button>
        <button
          v-else
          @click="showEditor()"
        >
          <font-awesome-icon
            :icon="['fas', 'code']"
            fixed-width
            aria-hidden
          />
          Show code
        </button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ComponentDemo',
  data () {
    return {
      isEditorVisible: false
    }
  },
  methods: {
    showEditor () {
      this.isEditorVisible = true
    },

    hideEditor () {
      this.isEditorVisible = false
    }
  }
}
</script>
