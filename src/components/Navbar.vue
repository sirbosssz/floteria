<template>
  <nav id="nav">
    <!-- navbar area -->
    <div class="navigator">
      <!-- web logo -->
      <!-- in home page -->
      <div v-if="page === 'home'" class="logo">
        <router-link to="/">
          <img src="@/assets/svg/logo-main.svg" alt="Logo" width="130">
        </router-link>
      </div>
      <!-- in lab page -->
      <div v-else-if="page === 'lab'" class="logo">
        <router-link to="/">
          <img src="@/assets/svg/logo-lab.svg" alt="Logo" width="162">
        </router-link>
        <router-link class="hide-mobile" to="/">หน้าแรก</router-link>
        <router-link class="hide-mobile" to="/lessons">ไปยังบทเรียน</router-link>
      </div>
      <!-- in lesson page -->
      <div v-else class="logo">
        <router-link to="/">
          <img src="@/assets/svg/logo-lesson.svg" alt="Logo" width="190">
        </router-link>
        <router-link class="hide-mobile" to="/">หน้าแรก</router-link>
        <router-link class="hide-mobile" to="/lab">แลปทดลอง</router-link>
      </div>
      <!-- menu area -->
      <div class="linkmenu">
        <span v-if="login">ยินดีต้อนรับ</span>
        <span v-else class="link" @click="openLoginMenu">เข้าสู่ระบบ</span>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
@import "@/assets/colors.scss";

#nav {
  background: #fff;
  padding: 8px 1em 8px 1em;
  min-height: 40px;
  a,
  .link {
    font-size: 14pt;
    font-weight: bold;
    color: $orange;
    padding-left: 0.5em;
    padding-right: 0.5em;
    cursor: pointer;
    &.router-link-exact-active {
      color: #d12c00;
    }
  }
  a:hover,
  .link:hover {
    color: #ef5a37;
  }
  a,
  .navigator,
  .link {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo,
  .linkmenu {
    display: flex;
  }
  .hide-mobile {
    display: none;
  }
}
@media (min-width: 450px) {
  #nav {
    padding: 8px 2em 8px 2em;
  }
}
@media (min-width: 768px) {
  #nav {
    a,
    .link {
      padding-left: 1em;
      padding-right: 1em;
    }
    .hide-mobile {
      display: flex;
    }
  }
}
@media (min-width: 1408px) {
  #nav {
    padding: 14px 3em 14px 3em;
    min-height: 60px;
    a {
      font-size: 16pt;
    }
  }
}
</style>

<script>
export default {
  name: "Navbar",
  props: {
    page: String
  },
  data() {
    return {
      login: false
    };
  },
  created() {
    // check authentication
  },
  methods: {
    openLoginMenu() {
      alert("login menu open here");
    }
  }
};
</script>

