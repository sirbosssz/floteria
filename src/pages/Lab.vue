<template>
  <div class="labpage">
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
import Editor from "@/components/Editor";

export default {
  name: "Lab",
  components: {
    Editor
  },
  created() {
    let navbar = this.$parent.$refs.navbar.$data
    navbar.page = 'lab'
  },
  mounted() {
    //navbar change
    let navbar = this.$parent.$refs.navbar.$el;
    let editor = this.$el;
    let height = editor.clientHeight - navbar.clientHeight - 1;
    editor.style.height = height + "px";
  }
};
</script>