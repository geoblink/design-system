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
        <!-- @slot Use this slot to customize wizard body -->
        <slot />
      </section>

      <footer
        v-if="!!$slots.footerTrailing || !!$slots.footerLeading"
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
/**
 * `GeoWizardLayout` is a component that displays a complete structure of what a
 * step from a wizard should look like.
 *
 * It comprehends an optional sidebar with an optional header and footer and
 * main content.
 *
 * The main content of the wizard is an horizontal container that can also
 * display a header and a footer along with its main displayed info.
 */
export default {
  name: 'GeoWizardLayout',
  status: 'ready',
  release: '28.1.0'
}
</script>
