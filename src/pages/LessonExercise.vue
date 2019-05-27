<template>
  <div class="lesson-exercise">
    <div ref="editor">
      <Editor type="lesson" :key="lessonId+pageId" :exercise="pageId" :lesson="lessonId"/>
    </div>
  </div>
</template>

<style lang="scss">
.lesson-exercise {
  min-height: 100vh;
  height: 1080px;
  div {
    position: static;
    display: flex;
    height: 100%;
  }
}
</style>

<script>
import firebase from "firebase/app";
import "firebase/firestore";

import Editor from "@/components/Editor";

const firestore = firebase.firestore();

export default {
  name: "LessonExercise",
  components: {
    Editor
  },
  data() {
    return {
      exercise: {},
      pageId: "",
      lessonId: ""
    };
  },
  created() {
    let navbar = this.$parent.$refs.navbar.$data;
    let page = this.$route.params.number;
    let exercise = this.$route.params.exercise;
    navbar.page = "lesson";
    navbar.lessonNavigator = true;
    navbar.lessonPage = page;
    navbar.onLessonPage = false;
    navbar.currentPage = exercise;
    this.pageId = exercise;
    let pageList = [];
    //   get chapter id
    firestore
      .collection("chapters")
      .where("number", "==", Number(page))
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.lessonId = doc.id;
          console.log(this.lessonId)
        });
      })
      .then(() => {
        //   load chapter page list
        firestore
          .collection(`chapters/${this.lessonId}/exercises`)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              pageList.push(doc.id);
            });
          })
          .then(() => {
            navbar.lessonPageList = pageList;
          });
      });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.login = true;
        this.user = user;
      } else {
        this.login = false;
        this.$parent.$refs.login.openLoginForm();
        this.$parent.$refs.login.error("เข้าสู่ระบบก่อนเข้าสู่บทเรียน");
      }
    });
  },
  beforeDestroy() {
    let navbar = this.$parent.$refs.navbar.$data;
    navbar.currentPage = "";
  },
  beforeRouteUpdate(to, from, next) {
    let navbar = this.$parent.$refs.navbar.$data;
    navbar.currentPage = to.params.exercise;
    // this.loadExercise(to.params.exercise);
    this.pageId = to.params.exercise;
    next();
    // this.$router.push(to.path);
  },
  mounted() {
    //navbar change
    let navbar = this.$parent.$refs.navbar.$el;
    let editor = this.$el;
    let height = editor.clientHeight - navbar.clientHeight;

    console.log([this.pageId, this.lessonId]);
    // editor.style.height = height + "px";
  },
  methods: {
    loadExercise(doc) {
      //   load chapter exercises
      console.log(doc);
      firestore
        .collection(`chapters/${this.pageId}/exercises`)
        .doc(doc)
        .get()
        .then(doc => {
          this.exercise = doc.data();
        })
        .then(() => {
          console.log(this.exercise);
        });
    }
  }
};
</script>