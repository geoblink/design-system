<template>
  <div class="geo-list-clear-item">
    <!-- @slot Use this slot to customize content displayed in this entry -->
    <slot />
  </div>
</template>

<script>
/**
 * `GeoListClearItem` is a component designed to be used as a non-interactible,
 * read only row-like item next to [GeoListItem](/#/Elements/GeoListItem).
 *
 * It's specially designed to be used to display special messages like
 * _No results found_.
 */
export default {
  name: 'GeoListClearItem',
  status: 'ready',
  release: '8.0.0'
}
</script>
