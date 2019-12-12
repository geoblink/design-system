<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="eventMetadata in componentEvents"
        :key="eventMetadata.name"
      >
        <td :id="`event-${eventMetadata.name}`"><code>{{ eventMetadata.name }}</code></td>
        <td>
          <code
            v-for="(type, index) in eventMetadata.types"
            :key="index"
          >
            {{ type }}
          </code>
        </td>
        <td>{{ eventMetadata.description }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'ComponentDocumentationEvents',
  props: {
    componentEvents: {
      type: Array,
      required: true
    }
  }
}
</script>
