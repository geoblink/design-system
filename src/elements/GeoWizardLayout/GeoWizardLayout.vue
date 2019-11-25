<template>
  <geo-horizontal-layout class="geo-wizard-layout">
    <slot name="sidebar" />
    <geo-vertical-layout class="geo-wizard-layout__content-container">
      <header
        v-if="$slots.header"
        slot="header"
        class="geo-wizard-layout__header"
      >
        <!-- @slot Use this slot to set the content that will be displayed in the top of the layout -->
        <slot
          name="header"
        />
      </header>
      <slot />
      <footer
        v-if="hasFooter"
        slot="footer"
        class="geo-wizard-layout__footer"
      >
        <div class="geo-wizard-layout__footer__leading">
          <slot name="footerLeading" />
        </div>
        <div class="geo-wizard-layout__footer__trailing">
          <slot name="footerTrailing" />
        </div>
      </footer>
    </geo-vertical-layout>
  </geo-horizontal-layout>
</template>

<script>
export default {
  name: 'GeoWizardLayout',
  status: 'missing-tests',
  release: '28.0.1',
  computed: {
    hasFooter () {
      return !!this.$slots.footerTrailing || !!this.$slots.footerLeading
    }
  }
}
</script>
