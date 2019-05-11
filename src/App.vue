<template>
  <div id="app">
    <nav id="nav">
      <!-- navbar area -->
      <div class="navigator">
        <!-- navigator link -->
        <router-link to="/">หน้าแรก</router-link>
        <router-link to="/lab">ห้องทดลอง</router-link>
        <router-link to="/cafe">บทเรียน</router-link>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "@/assets/font/font.scss";
@import "@/assets/colors.scss";

body,
html {
  background: #f9f9f9;
}
#nav {
  background: #fff;
  padding: 8px;
  min-height: 40px;
  a {
    font-size: 14pt;
    font-weight: normal;
    color: #2c3e50;
    padding-left: 0.5em;
    padding-right: 0.5em;
    &.router-link-exact-active {
      color: #d12c00;
    }
  }
  a:hover {
    color: #ef5a37;
  }
}
#app {
  // text-align: center;
  min-height: 100vh;
  // color: #2c3e50;
}

@media (min-width: 1408px) {
  #nav {
    padding: 14px;
    min-height: 60px;
    a {
      font-size: 16pt;
    }
  }
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
