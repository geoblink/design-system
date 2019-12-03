<template>
  <geo-horizontal-layout class="geo-wizard-layout">
    <!-- @slot Use this slot to set the sidebar container of the wizard -->
    <slot name="sidebar" />
    <geo-vertical-layout class="geo-wizard-layout__content-container">
      <header
        v-if="$slots.header"
        slot="header"
        class="geo-wizard-layout__header"
      >
        <!-- @slot Use this slot to set the content that will be displayed in the top of the wizard layout -->
        <slot name="header" />
      </header>
      <!-- @slot The content that is not assigned to a slot will be rendered here, being the main content of the wizard -->
      <section
        v-if="$slots.default"
        class="geo-wizard-layout__body"
      >
        <slot />
      </section>

      <footer
        v-if="hasFooter"
        slot="footer"
        class="geo-wizard-layout__footer"
      >
        <div class="geo-wizard-layout__footer--leading">
          <!-- @slot Use this slot to set the content of the footer that will be displayed in the leading (top - left) part of the container -->
          <slot name="footerLeading" />
        </div>

        <div class="geo-wizard-layout__footer--trailing">
          <!-- @slot Use this slot to set the content of the footer that will be displayed in the trailing (bottom - right) part of the container -->
          <slot name="footerTrailing" />
        </div>
      </footer>
    </geo-vertical-layout>
  </geo-horizontal-layout>
</template>

<script>
export default {
  name: 'GeoWizardLayout',
  status: 'ready',
  release: '28.1.0',
  computed: {
    hasFooter () {
      return !!this.$slots.footerTrailing || !!this.$slots.footerLeading
    }
  }
}
</script>
