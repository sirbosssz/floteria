<template>
  <div id="app">
    <LoginForm ref="login"></LoginForm>
    <Navbar ref='navbar'/>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
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
import LoginForm from '@/components/LoginForm.vue';
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar, LoginForm
  },
  data() {
    return {
      user: {}
    };
  }
};
</script>
