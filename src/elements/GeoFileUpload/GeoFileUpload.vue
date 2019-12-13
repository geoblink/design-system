<template>
  <div
    :class="{
      ['geo-file-upload']: true,
      [`geo-file-upload--${status}`]: true,
      [`geo-file-upload--focused`]: isFocused
    }"
    @dragenter="handleDragenter($event)"
    @dragleave="handleDragleave($event)"
    @dragover.prevent="handleDragover($event)"
    @dragexit="handleDragexit($event)"
    @drop.prevent="handleDrop($event)"
    @click="openPickDialog()"
  >
    <div
      v-if="isLoading"
      class="geo-file-upload__loading-indicator"
    >
      <slot name="loading">
        <geo-activity-indicator />
      </slot>
    </div>
    <template v-else>
      <font-awesome-icon
        :icon="currentIcon"
        :class="[
          'geo-file-upload__upload-icon',
          `geo-file-upload__upload-icon--${status}`
        ]"
      />
      <font-awesome-icon
        :icon="uploadIcon"
        :class="[
          'geo-file-upload__upload-icon',
          'geo-file-upload__upload-icon--focused',
          `geo-file-upload__upload-icon--${status}--focused`
        ]"
      />
    </template>

    <div class="geo-file-upload__title">
      <!-- @slot Use this slot to customize the title displayed below icon and above help lines. -->
      <slot name="title" />
    </div>

    <div
      :class="[
        'geo-file-upload__help',
        `geo-file-upload__help--${status}`
      ]"
    >
      <!-- @slot Use this slot to customize help text on the bottom. -->
      <slot name="help" />
    </div>

    <input
      ref="input"
      :disabled="isLoading"
      class="geo-file-upload__input"
      type="file"
      @change="handleFilePick($event)"
    >
  </div>
</template>

<script>
import _ from 'lodash'
import { STATUS } from './GeoFileUpload.mixin'

export default {
  name: 'GeoFileUpload',
  status: 'ready',
  release: '6.2.0',
  constants: {
    STATUS
  },
  props: {
    /**
     * Status of this picker. Use this property to customize the look and feel
     * of the input.
     *
     * It's aimed to show user feedback about the uploaded file.
     *
     * Supported `status` values are exported under `STATUS` named export.
     * See [Component Constants](/docs/components-constants.html) for more info on how
     * to use those constants in your code.
     */
    status: {
      type: String,
      required: true,
      validator (value) {
        if (value in STATUS) return true

        const supportedValues = Object.values(STATUS).map(i => `«${i}»`).join(', ')
        console.warn(`GeoFileUpload [component] :: Unsupported value («${value}») for status property. Use one of ${supportedValues}`)
        return false
      }
    },

    /**
     * Icon to be displayed initially in the input.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    uploadIcon: {
      type: Array,
      default: function () {
        return ['fal', 'upload']
      }
    },
    /**
     * Icon to be displayed in the input when file has been uploaded successfully.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    successIcon: {
      type: Array,
      default: function () {
        return ['fal', 'check-circle']
      }
    },
    /**
     * Icon to be displayed in the input when there are errors.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    errorIcon: {
      type: Array,
      default: function () {
        return ['fal', 'exclamation-triangle']
      }
    },
    /**
     * Icon to be displayed in the input when there are warnings.
     *
     * See [vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome#explicit-prefix-note-the-vue-bind-shorthand-because-this-uses-an-array)
     * for more info about this.
     */
    warningIcon: {
      type: Array,
      default: function () {
        return ['fal', 'exclamation-triangle']
      }
    }
  },
  data () {
    return {
      isFocused: false,
      isResettingInputFileField: false
    }
  },
  computed: {
    currentStatus () {
      return this.isFocused
        ? STATUS.initial
        : this.status
    },

    currentIcon () {
      const icons = {
        [STATUS.initial]: this.uploadIcon,
        [STATUS.success]: this.successIcon,
        [STATUS.error]: this.errorIcon,
        [STATUS.warning]: this.warningIcon
      }
      return icons[this.status]
    },

    isLoading () {
      return this.status === STATUS.loading
    }
  },
  methods: {
    handleDragenter ($event) {
      if (this.isLoading) return

      this.focus()
    },

    handleDragleave ($event) {
      if (this.isLoading) return

      this.unfocus()
    },

    handleDragover ($event) {
      if (this.isLoading) return

      this.focus()
    },

    handleDragexit ($event) {
      if (this.isLoading) return

      this.unfocus()
    },

    handleDrop ($event) {
      if (this.isLoading) return

      // For now we are going to allow only one file at a time
      const file = _.get($event, 'dataTransfer.files[0]')
      if (file) this.pickFile(file)
    },

    handleFilePick ($event) {
      if (this.isLoading || this.isResettingInputFileField) return

      this.isResettingInputFileField = true

      // For now we are going to allow only one file at a time
      const file = _.get($event, 'target.files[0]')
      if (file) this.pickFile(file)

      this.$refs.input.value = null

      this.isResettingInputFileField = false
    },

    openPickDialog ($event) {
      if (this.isLoading) return

      this.focus()
      /**
       * User clicked on the input.
       *
       * @event open-pick-dialog
       * @type {MouseEvent}
       */
      this.$emit('open-pick-dialog', $event)
      this.$refs.input.click()
    },

    focus () {
      this.isFocused = true
    },

    unfocus () {
      this.isFocused = false
    },

    pickFile (file) {
      /**
       * User picked a file.
       *
       * @event pick-file
       * @type {File}
       */
      this.$emit('pick-file', file)
      this.isFocused = false
    }
  }
}
</script>
