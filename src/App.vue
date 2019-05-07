<template>
  <div id="app">
    
    <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="" width="112" height="28">
    </a>
<nav id="nav">
      <!-- navbar area -->
      <div class="navigator">
        <!-- navigator link -->
        <router-link to="/">หน้าแรก</router-link>
        <router-link to="/lab">ห้องทดลอง</router-link>
        <router-link to="/lessons">บทเรียน</router-link>
      </div>
    </nav>
   
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
  <!--  <div class="navbar-start">
      <a class="navbar-item">
        Home
      </a>

      <a class="navbar-item">
        Documentation
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            About
          </a>
          <a class="navbar-item">
            Jobs
          </a>
          <a class="navbar-item">
            Contact
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
    </div> -->

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
            Log in
          </a>
        </div>
      </div>
    </div>
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
  text-align: center;
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
