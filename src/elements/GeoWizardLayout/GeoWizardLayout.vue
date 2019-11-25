<template>
  <geo-horizontal-layout class="geo-wizard-layout">
    <slot name="sidebar" />
    <geo-vertical-layout class="geo-wizard-layout__content-container">
      <header
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
        slot="footer"
        class="geo-wizard-layout__footer"
      >
        <div class="geo-wizard-layout__footer__leading">
          <slot name="footer-leading" />
        </div>
        <div class="geo-wizard-layout__footer__trailing">
          <slot name="footer-trailing" />
        </div>
      </footer>
    </geo-vertical-layout>
  </geo-horizontal-layout>
</template>

<script>
export default {
  name: 'GeoWizardLayout',
  status: 'missing-tests',
  release: '28.0.1'
}
</script>
