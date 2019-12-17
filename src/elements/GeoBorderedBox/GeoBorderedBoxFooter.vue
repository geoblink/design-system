<template>
  <div class="geo-bordered-box-footer">
    <!-- @slot Use this slot to customize footer's content -->
    <slot />
  </div>
</template>

<script>
/**
 * `GeoBorderedBoxFooter` is a component designed to fit nicely as footer of a
 * [GeoBorderedBox](./GeoBorderedBox). Use it whenever you want to display some
 * special content at the end like a _Save changes_ buttton.
 */
export default {
  name: 'GeoBorderedBoxFooter',
  status: 'ready',
  release: '7.3.0'
}
</script>
