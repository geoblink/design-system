### Full flow

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-file-upload
        :status="status"
        @pick-file="pickFile($event)"
      >
        <template slot="title">{{ pickerTitle }}</template>
        <template slot="help">{{ pickerHelp }}</template>
      </geo-file-upload>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: 'initial',
      file: null
    }
  },
  computed: {
    pickerTitle () {
      switch (this.status) {
        case 'success':
        case 'error':
        case 'warning':
          return this.fileName
        case 'initial':
          return 'Drag a file from your computer'
      }
    },

    pickerHelp () {
      switch (this.status) {
        case 'success':
          return 'Everything is fine!'
        case 'error':
          return 'Something wrong happened!'
        case 'warning':
          return 'There are issues but we can ignore them'
        case 'initial':
          return 'Only one file, folders are not supported'
      }
    },

    fileName () {
      return this.file ? this.file.name : null
    }
  },
  mounted () {
    this.$refs.focusedFileUpload.isFocused = true
  },
  methods: {
    pickFile (file) {
      this.file = file

      const nextStatus = {
        'initial': 'error',
        'error': 'warning',
        'warning': 'success',
        'success': 'initial'
      }

      this.status = nextStatus[this.status]
    }
  }
}
</script>
```

### Initial state

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-file-upload
      status="initial"
      :upload-icon="['fas', 'upload']"
    >
      <template slot="title">Drag a file from your computer</template>
      <template slot="help">Only single files supported</template>
    </geo-file-upload>
  </div>
</div>
```

### Focused state

```vue live
<template>
  <div class="element-demo">
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-file-upload
        status="initial"
        ref="focusedFileUpload"
      >
        <template slot="title">Drop the file here</template>
        <template slot="help">Only single files supported</template>
      </geo-file-upload>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$refs.focusedFileUpload.isFocused = true
  }
}
</script>
```

### Success state

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-file-upload status="success">
      <template slot="title">my-file.txt</template>
      <template slot="help">Everything is in place!</template>
    </geo-file-upload>
  </div>
</div>
```

### Error state

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-file-upload status="error">
      <template slot="title">my-file.exe</template>
      <template slot="help">The file is not valid!</template>
    </geo-file-upload>
  </div>
</div>
```

### Warning state

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-file-upload
      status="warning"
      :has-file="true"
    >
      <template slot="title">my-file.xlsx</template>
      <template slot="help">Something didn't work as expected</template>
    </geo-file-upload>
  </div>
</div>
```

### Loading state

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-file-upload status="loading">
      <template slot="title">my-file.xlsx</template>
      <template slot="help">Loading...</template>
    </geo-file-upload>
  </div>
</div>
```