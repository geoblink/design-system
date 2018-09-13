<template>
  <div
    :class="{
      [`geo-select-opt-group-header__container${cssSuffix}`]: true,
      [`geo-select-opt-group-header__container--opt-group${cssSuffix}`]: true
  }">
    <div
      :class="{
        [`geo-select-opt-group-header__content${cssSuffix}`]: true,
        [`geo-select-opt-group-header__content--opt-group${cssSuffix}`]: true
    }">
      <!-- @slot Use this slot to customize header content -->
      <slot />
    </div>
  </div>
</template>

<script>
import cssSuffix from '../../mixins/cssModifierMixin'

export default {
  name: 'GeoSelectOptGroupHeader',
  status: 'missing-tests',
  release: '8.1.0',
  mixins: [cssSuffix]
}
</script>
