<template>
  <div id="app">
    <div id="nav">
      <!-- navbar area -->
      <router-link to="/">หน้าแรก</router-link>
      <router-link to="/lab">ห้องทดลอง</router-link>
      <router-link to="/lessons">บทเรียน</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "./assets/font/font";
@import "./assets/colors";
body, html{
  background: #f9f9f9;
}
#nav {
  background: #fff;
  padding: 24px;
  max-height: 80px;
  a {
    font-size: 16pt;
    font-weight: normal;
    color: #2c3e50;
    padding-left: .5em;
    padding-right: .5em;
    &.router-link-exact-active {
      color: #d12c00;
    }
  }
  a:hover{
    color: #ef5a37;
  }
}
#app {
  text-align: center;
  // color: #2c3e50;
}
</style>

<script>
export default {
  name: "App",
  data() {
    return {
      user: {}
    };
  }
};
</script>
