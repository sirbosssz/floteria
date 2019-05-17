<template>
  <div id="app">
    <Navbar ref='navbar'/>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "@/assets/font/font.scss";
@import "@/assets/colors.scss";

body,
html {
  background: #F9F9F9;
}
#app {
  // text-align: center;
  min-height: 100vh;
  // color: #2c3e50;
}
</style>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
  data() {
    return {
      user: {}
    };
  }
};
</script>
