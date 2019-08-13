<template>
  <div>
    <h2 id="constants">
      <a
        href="#constants"
        class="header-anchor"
        aria-hidden
      >
        #
      </a>
      Constants
    </h2>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="constantMetadata in componentConstants"
          :key="constantMetadata.name"
        >
          <td :id="`constant-${constantMetadata.name}`"><code>{{ constantMetadata.name }}</code></td>
          <td><pre><code>{{ constantMetadata.definition }}</code></pre></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ComponentDocumentationConstants',
  props: {
    componentConstants: {
      type: Array,
      required: true
    }
  }
}
</script>
