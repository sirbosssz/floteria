<template>
  <nav id="nav">
    <!-- navbar area -->
    <div class="navigator">
      <!-- web logo -->
      <!-- in home page -->
      <div class="logo">
        <div v-if="page === 'lesson'">
          <router-link to="/lessons">
            <img src="@/assets/svg/logo-lesson.svg" alt="Logo" width="194">
          </router-link>
          <router-link class="hide-mobile" to="/">หน้าแรก</router-link>
          <router-link class="hide-mobile" to="/lab">แลปทดลอง</router-link>
        </div>
        <!-- in lab page -->
        <div v-else-if="page === 'lab'">
          <router-link to="/lab">
            <img src="@/assets/svg/logo-lab.svg" alt="Logo" width="158">
          </router-link>
          <router-link class="hide-mobile" to="/">หน้าแรก</router-link>
          <router-link class="hide-mobile" to="/lessons">ไปยังบทเรียน</router-link>
        </div>
        <!-- in lesson page -->
        <div v-else class="home-logo">
          <router-link to="/">
            <img src="@/assets/svg/logo-main.svg" alt="Logo" width="130">
          </router-link>
        </div>
      </div>

      <!-- center area -->
      <div v-if="lessonNavigator" class="lesson-navigator">
        
        <router-link
          :to="'/lessons/'+lessonPage"
          v-if="onLessonPage"
          class="lesson-navigator-button selected"
        >เนื้อหาบทเรียน</router-link>
        <router-link
          :to="'/lessons/'+lessonPage"
          v-else
          class="lesson-navigator-button notselected"
        >เนื้อหาบทเรียน</router-link>
        <!-- left-arrow -->
        <img class="arrow-left" src="@/assets/svg/arrow-left.svg" alt>

        <router-link
          :key="page"
          v-for="page in lessonPageList"
          :to="'/lessons/' + lessonPage + '/' + page"
          class="nav-btn"
          style="padding: 0 .2em"
        >
          <img v-if="page === currentPage" src="@/assets/svg/nav-btn-current.svg">
          <img v-else src="@/assets/svg/nav-btn.svg">
        </router-link>

        <img class="arrow-right" src="@/assets/svg/arrow-right.svg" alt>
      </div>

      <!-- menu area -->
      <div class="linkmenu">
        <div class="linkitem" v-if="login">
          <span>{{email}}</span>
          <span class="link" @click="logout">ออกจากระบบ</span>
        </div>

        <div v-else class="linkitem">
          <span class="link" @click="openLoginMenu">เข้าสู่ระบบ</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
@import "@/assets/colors.scss";
.arrow-left,
.arrow-right,
.nav-btn img {
  width: 19px;
  height: 19px;
  margin-left: 0.2em;
}

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
  .link {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo > div {
    display: flex;
  }
  .hide-mobile {
    display: none;
  }
  .linkitem {
    span {
      display: inline-block;
      font-size: 13pt;
    }
  }
  .linkmenu {
    display: block;
    padding-top: 0.5em;
    text-align: right;
  }
  .lesson-navigator {
    margin-top: 0.5em;
    padding: 0.3em;
    background: #ededed;
    * {
      cursor: pointer;
    }
    .lesson-navigator-button {
      font-weight: bold;
      font-size: 13pt;
      padding: 0.2em 0.5em 0 0.5em;
      margin: 0 0.2em 0 0.5em;
      line-height: 1.2em;
    }
    .lesson-navigator-button.selected {
      color: #fff;
      background: $blue;
    }
    .lesson-navigator-button.notselected {
      color: $blue;
      background: rgba(0, 0, 0, 0);
      border: 2px solid $blue;
    }
  }
}
@media (min-width: 450px) {
  #nav {
    padding: 8px 2em 8px 2em;
  }
}
@media (min-width: 768px) {
  #nav {
    .home-logo {
      padding-top: 1.5em;
    }
    .lesson-navigator,
    .navigator {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
@media (min-width: 920px) {
  #nav {
    padding: 14px 3em 14px 3em;
    min-height: 60px;
    .hide-mobile {
      display: flex;
    }
    a {
      font-size: 16pt;
    }
    a,
    .link {
      padding-left: 1em;
      padding-right: 1em;
    }

    .linkmenu {
      display: flex;
    }
    .lesson-navigator {
      margin-top: 0;
      background: #ededed;
      padding: 0.3em 0;
    }
  }
}
</style>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Navbar",
  data() {
    return {
      page: "",
      login: false,
      email: "",
      lessonNavigator: false,
      lessonPage: "",
      onLessonPage: false,
      lessonPageList: [],
      currentPage: ""
    };
  },
  created() {
    // check authentication
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.login = true;
        this.email = user.email;
        console.log("current user: " + user.email);
      } else {
        this.login = false;
      }
    });
  },
  methods: {
    openLoginMenu() {
      this.$parent.$refs.login.openLoginForm();
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("ออกจากระบบสำเร็จ");
          this.login = false;
          this.email = "";
        });
      this.$router.push("/");
    }
  }
};
</script>

