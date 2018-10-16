<template>
  <div
    :class="{
      [`geo-file-upload${cssSuffix}`]: true,
      [`geo-file-upload--${status}${cssSuffix}`]: true,
      [`geo-file-upload--focused${cssSuffix}`]: isFocused
    }"
    @dragenter="handleDragenter($event)"
    @dragleave="handleDragleave($event)"
    @dragover.prevent="handleDragover($event)"
    @dragexit="handleDragexit($event)"
    @drop.prevent="handleDrop($event)"
    @click="openPickDialog()"
  >
    <font-awesome-icon
      :icon="currentIcon"
      :class="[
        `geo-file-upload__upload-icon${cssSuffix}`,
        `geo-file-upload__upload-icon--${status}${cssSuffix}`
      ]"
    />
    <font-awesome-icon
      :icon="uploadIcon"
      :class="[
        `geo-file-upload__upload-icon${cssSuffix}`,
        `geo-file-upload__upload-icon--focused${cssSuffix}`,
        `geo-file-upload__upload-icon--${status}--focused${cssSuffix}`
      ]"
    />

    <div :class="`geo-file-upload__title${cssSuffix}`">
      <!-- @slot Use this slot to customize the title displayed below icon and above help lines. -->
      <slot name="title" />
    </div>

    <div
      :class="[
        `geo-file-upload__help${cssSuffix}`,
        `geo-file-upload__help--${status}${cssSuffix}`
      ]"
    >
      <!-- @slot Use this slot to customize help text on the bototm. -->
      <slot name="help" />
    </div>

    <input
      ref="input"
      :class="`geo-file-upload__input${cssSuffix}`"
      type="file"
      @change="handleFilePick($event)"
    >
  </div>
</template>

<script>
import _ from 'lodash'
import cssSuffix from '../../mixins/cssModifierMixin'
import { STATUS } from './GeoFileUpload.mixin'

export default {
  name: 'GeoFileUpload',
  status: 'missing-tests',
  release: '6.2.0',
  mixins: [cssSuffix],
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
     * See [Component Constants](./#/Component%20Constants) for more info on how
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
      default () {
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
      default () {
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
      default () {
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
      default () {
        return ['fal', 'exclamation-triangle']
      }
    }
  },
  data () {
    return {
      isFocused: false
    }
  },
  computed: {
    currentStatus () {
      return this.isFocused ? STATUS.initial : this.status
    },

    currentIcon () {
      const icons = {
        [STATUS.initial]: this.uploadIcon,
        [STATUS.success]: this.successIcon,
        [STATUS.error]: this.errorIcon,
        [STATUS.warning]: this.warningIcon
      }
      return icons[this.status]
    }
  },
  methods: {
    handleDragenter ($event) {
      this.focus()
    },

    handleDragleave ($event) {
      this.unfocus()
    },

    handleDragover ($event) {
      this.focus()
    },

    handleDragexit ($event) {
      this.unfocus()
    },

    handleDrop ($event) {
      // For now we are going to allow only one file at a time
      const file = _.get($event, 'dataTransfer.files[0]')
      if (file) this.pickFile(file)
    },

    handleFilePick ($event) {
      // For now we are going to allow only one file at a time
      const file = _.get($event, 'target.files[0]')
      if (file) this.pickFile(file)
    },

    openPickDialog ($event) {
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
