<template functional>
  <div
    :class="['c-element-demo-box', data.staticClass, data.class]"
    :style="data.style"
  >
    <slot />
  </div>
</template>