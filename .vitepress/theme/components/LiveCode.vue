<template>
<div class="c-component-demo">
  <div class="c-component-demo__preview">
    <div class="c-component-demo__resizable-content">
      <VueLivePreview
        :code="codeContent"
        :requires="preRequiredObjects"
        @error="(error) => error = error"
        @success="() => error = null"
      />
    </div>
  </div>
  
  <div class="c-component-demo__code">
    <div class="c-component-demo__pre-code-actions">
      <button 
        v-if="showCode"
        @click="toggleCode" 
        :class="{ 'live-code__toggle--active': showCode }"
      >
        Hide Code
      </button>
    </div>
    <div v-if="showCode" class="c-component-demo__code-editor">
      <VueLiveEditor :code="codeContent" :requires="preRequiredObjects" @change="updateCode" :error="error" />
    </div>
    <div class="c-component-demo__post-code-actions">
      <button 
        @click="toggleCode" 
        :class="{ 'live-code__toggle--active': showCode }"
      >
        {{ showCode ? 'Hide Code' : 'Show Code' }}
      </button>
    </div>
  </div>
</div>
</template>

<script>
import { VueLivePreview, VueLiveEditor } from 'vue-live'
import lodash from 'lodash'
import "prismjs/themes/prism-tomorrow.css";

export default {
  name: 'LiveCode',
  components: {
    VueLivePreview,
    VueLiveEditor
  },
  props: {
    code: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      preRequiredObjects: {
        lodash
      },
      showCode: false,
      codeContent: this.code,
      error: null
    }
  },
  methods: {
    async toggleCode() {
      this.showCode = !this.showCode
    },
    updateCode(newCode) {
      this.codeContent = newCode
    }
  }
}
</script>

<style scoped>
.live-code {
  margin: 1rem 0;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.live-code__preview {
  padding: 1.5rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.live-code__actions {
  padding: 0.75rem 1.5rem;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  gap: 0.5rem;
}

.live-code__toggle {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}

.live-code__toggle:hover {
  background: #2563eb;
}

.live-code__toggle--active {
  background: #dc2626;
}

.live-code__toggle--active:hover {
  background: #b91c1c;
}


.live-code__code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: #334155;
  border-bottom: 1px solid #475569;
}

.live-code__code-title {
  font-weight: 600;
  font-size: 0.875rem;
}

.live-code__copy-btn {
  background: #475569;
  color: #e2e8f0;
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
  transition: background-color 0.2s;
}

.live-code__copy-btn:hover {
  background: #64748b;
}


</style> 