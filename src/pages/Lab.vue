<template>
  <div class="labpage">
    <Editor type='lab'/>
  </div>
</template>

<style lang="scss">
.labpage {
  position: static;
  display: flex;
  height: calc(100vh - 43px);
}
@media (min-width: 1408px) {
  .labpage {
    height: calc(100vh - 60px);
  }
}
</style>

<script>
import Editor from '@/components/Editor'

export default {
  name: 'Lab',
  components: {
    Editor
  }
}
</script>