<template>
  <geo-dropdown>
    <slot slot="toggleButton" />
    <!-- TODO: Bind props to geoCalendar -->
    <geo-calendar slot="popupContent" />
  </geo-dropdown>
</template>
