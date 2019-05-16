<template>
  <div class="lessonHome">
  </div>
</template>

<script>
export default {
  name: "LessonHomePage",
  created() {
    let navbar = this.$parent.$refs.navbar.$data
    navbar.page = 'lesson'
  },
}
</script>
