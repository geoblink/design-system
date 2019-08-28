<template>
  <div>
    <h2 id="slots">
      <a
        href="#slots"
        class="header-anchor"
        aria-hidden
      >
        #
      </a>
      Slots
    </h2>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="slotMetadata in componentSlots"
          :key="slotMetadata.name"
        >
          <td :id="`event-${slotMetadata.name}`"><code>{{ slotMetadata.name }}</code></td>
          <td>{{ slotMetadata.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ComponentDocumentationSlots',
  props: {
    componentSlots: {
      type: Array,
      required: true
    }
  }
}
</script>
