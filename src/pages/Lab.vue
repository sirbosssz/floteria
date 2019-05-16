<template>
  <div class="labpage">
    <Navbar page="lab" ref="navbar"/>
    <div ref="editor">
      <Editor type="lab"/>
    </div>
  </div>
</template>

<style lang="scss">
.labpage {
  height: 100vh;
  div {
    position: static;
    display: flex;
    height: 100%;
  }
}
</style>

<script>
import Navbar from "@/components/Navbar.vue";
import Editor from "@/components/Editor";

export default {
  name: "Lab",
  components: {
    Navbar,
    Editor
  },
  mounted() {
    let navbar = this.$refs.navbar.$el
    let editor = this.$refs.editor
    let height = editor.clientHeight - navbar.clientHeight - 10;
    editor.style.height = height + 'px'
  },
};
</script>