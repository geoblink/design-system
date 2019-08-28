<template functional>
  <div
    :class="['c-element-demo-actions', data.staticClass, data.class]"
    :style="data.style"
  >
    <slot />
  </div>
</template>