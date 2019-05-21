<template>
  <div class="lessonHome">
    <div class="container">
      <h1>รายการบทเรียน</h1>
      <h2>เลือกบทเรียนจากเนื้อหาที่สนใจ</h2>
      <div class="lessonChapterMenu columns is-tablet" v-if="!loading" ref="card">
        <div
          :key="lesson.id"
          v-for="lesson in lessonChapterList"
          class="column"
          @click="loadChapter(lesson.data.number)"
        >
          <div class="lesson-card">
            <h1 class="lesson-title">{{lesson.data.name}}</h1>
            <img class="lesson-icon" :src="lesson.data.icon" alt="lesson icon">
            <p class="lesson-desc">{{lesson.data.description}}</p>
            <p class="lesson-userdetail" v-if="login">
              ความคืบหน้า:
              <span>ยังไม่มี</span>
            </p>
            <p class="lesson-userdetail" v-else>
              <span>เข้าสู่ระบบก่อนเข้าบทเรียน</span>
            </p>
          </div>
        </div>
      </div>
      <div class="lessonChapterMenu columns is-tablet" v-else>
        <div class="column">
          <div class="lesson-card loading">
            <h1 class="lesson-title">
              <div class="load-title">
                กำลังโหลด
                <br>หัวข้อบทเรียน
              </div>
            </h1>
            <img class="lesson-icon" src="@/assets/svg/icon-lesson.svg" alt="lesson icon">
            <p class="lesson-desc load-desc">
              <span class>โหลดคำอธิบายบทเรียน</span>
            </p>
          </div>
        </div>
        <div class="column">
          <div class="lesson-card loading">
            <h1 class="lesson-title">
              <div class="load-title">
                กำลังโหลด
                <br>หัวข้อบทเรียน
              </div>
            </h1>
            <img class="lesson-icon" src="@/assets/svg/icon-lesson.svg" alt="lesson icon">
            <p class="lesson-desc load-desc">
              <span class>โหลดคำอธิบายบทเรียน</span>
            </p>
          </div>
        </div>
        <div class="column">
          <div class="lesson-card loading">
            <h1 class="lesson-title">
              <div class="load-title">
                กำลังโหลด
                <br>หัวข้อบทเรียน
              </div>
            </h1>
            <img class="lesson-icon" src="@/assets/svg/icon-lesson.svg" alt="lesson icon">
            <p class="lesson-desc load-desc">
              <span class>โหลดคำอธิบายบทเรียน</span>
            </p>
          </div>
        </div>
        <div class="column">
          <div class="lesson-card loading">
            <h1 class="lesson-title">
              <div class="load-title">
                กำลังโหลด
                <br>หัวข้อบทเรียน
              </div>
            </h1>
            <img class="lesson-icon" src="@/assets/svg/icon-lesson.svg" alt="lesson icon">
            <p class="lesson-desc load-desc">
              <span class>โหลดคำอธิบายบทเรียน</span>
            </p>
          </div>
        </div>
        <div class="column">
          <div class="lesson-card loading">
            <h1 class="lesson-title">
              <div class="load-title">
                กำลังโหลด
                <br>หัวข้อบทเรียน
              </div>
            </h1>
            <img class="lesson-icon" src="@/assets/svg/icon-lesson.svg" alt="lesson icon">
            <p class="lesson-desc load-desc">
              <span class>โหลดคำอธิบายบทเรียน</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/colors.scss";

.lessonChapterMenu {
  margin-top: 1.2em;
}
.lesson-card {
  background: #ffffff;
  cursor: pointer;
  p.lesson-desc {
    padding: 0.5em 1.3em 0.3em 1.3em;
    font-size: 13pt;
    min-height: 20vh;
    width: 100%;
  }
  h1.lesson-title {
    padding: 0.5em 1.5em 0.3em 1.5em;
    font-size: 14pt;
    color: $blue;
    min-height: 3.5em;
  }
  img.lesson-icon {
    width: 100%;
    max-width: 300px;
    height: 25vh;
    max-height: 300px;
    object-fit: cover;
  }
  p.lesson-userdetail {
    padding-bottom: 1em;
    span {
      color: $blue-dark;
      font-weight: bold;
    }
  }
}
.loading {
  div.load-title {
    background: $blue;
  }
  .load-desc {
    color: #333;
    background: #333;
    width: 70%;
    height: 20vh;
  }
}
@media (max-width: 1080px) {
  .lesson-card {
    p.lesson-desc {
      min-height: 100%;
      padding-bottom: 1rem;
    }
  }
}
.lessonHome {
  text-align: center;
  padding-top: 1.2em;
  h1 {
    font-size: 24pt;
    font-weight: bold;
  }
  h2 {
    font-size: 14pt;
  }
}
</style>

<script>
import firebase from "firebase/app";
import "firebase/firestore";

const firestore = firebase.firestore();

export default {
  name: "LessonList",
  data() {
    return {
      loading: true,
      lessonChapterList: [],
      login: false,
      user: {}
    };
  },
  created() {
    let navbar = this.$parent.$refs.navbar.$data;
    navbar.page = "lesson";
    navbar.lessonNavigator = false;

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.login = true;
        this.user = user;
      } else {
        this.login = false;
      }
    });
  },
  mounted() {
    // load chapters
    let query = firestore.collection("chapters").orderBy("name", "asc");
    query.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.lessonChapterList.push({
          id: doc.id,
          data: doc.data()
        });
        this.loading = false;
      });
    });
    console.log(this.lessonChapterList);
    // load progress
    this.loadProgress();
  },
  methods: {
    loadChapter(chapter) {
      if (this.login) {
        this.$router.push("/lessons/" + chapter);
      } else {
        this.$parent.$refs.login.openLoginForm();
        this.$parent.$refs.login.error("เข้าสู่ระบบก่อนเข้าสู่บทเรียน");
      }
    },
    loadProgress() {}
  }
};
</script>
