<template>
  <div class="labpage">
    <FlowApp type='lab' />
  </div>
</template>

<style lang="scss" scoped>
.labpage {
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
import FlowApp from '@/flowchart-app/FlowApp'

export default {
  name: 'Lab',
  components: {
    FlowApp,
  }
}
</script>
