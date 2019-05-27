<template>
  <div class="container">
    <h1 class="main-title">{{title}}</h1>
    <div class="content" :key="content.title" v-for="content in contents">
      <h1 class="title">{{content.title}}</h1>
      <div :key="data.content" v-for="data in content.description">
        <p v-if="data.type==='paragraph'" class="paragraph">{{data.content}}</p>
        <h2 v-else-if="data.type==='subtitle'" class="subtitle">{{data.content}}</h2>
        <p v-else-if="data.type==='listitem'" class="listitem">{{data.content}}</p>
        <div class="image" v-else-if="data.type==='image'">
          <img :src="data.content">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";

const firestore = firebase.firestore();

export default {
  name: "LessonPage",
  data() {
    return {
      id: "",
      pageList: [],
      contents: [],
      title: ""
    };
  },
  created() {
    // check user
    let navbar = this.$parent.$refs.navbar.$data;
    let page = this.$route.params.number;
    navbar.page = "lesson";
    navbar.lessonNavigator = true;
    navbar.lessonPage = page;
    navbar.onLessonPage = true;

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

    //   get chapter id
    firestore
      .collection("chapters")
      .where("number", "==", Number(page))
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.title = doc.data().name;
          this.id = doc.id;
        });
      })
      .then(() => {
        //   load chapter page list
        firestore
          .collection(`chapters/${this.id}/exercises`)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              this.pageList.push(doc.id);
            });
          })
          .then(() => {
            navbar.lessonPageList = this.pageList;
          });
        //   load chapter content
        firestore
          .collection(`chapters/${this.id}/contents`)
          .orderBy("title", "asc")
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              this.contents.push(doc.data());
            });
          });
      });
  },
  mounted() {},
  beforeDestroy() {
    // let navbar = this.$parent.$refs.navbar.$data;
    // navbar.lessonNavigator = false;
    // navbar.lessonPage = "";
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/colors";
.main-title {
  font-size: 20pt;
  font-weight: bold;
  text-align: center;
  margin-top: 0.7em;
}
.content {
  padding: 0.5em;
  margin-bottom: 0.7em;
  .title {
    font-size: 18pt;
    text-indent: 4em;
    margin-bottom: 0.6em;
  }
  p.paragraph {
    font-size: 14pt;
    text-indent: 4em;
    margin-bottom: 0.6em;
  }
  p.listitem {
    font-size: 14pt;
    padding-left: 6em;
    padding-right: 6em;
    margin-bottom: 0;
  }
  .subtitle {
    font-size: 16pt;
    font-weight: bold;
    text-indent: 8em;
    margin-bottom: 0.6em;
  }
  .image {
    text-align: center;
    padding: 0 8em;
    margin-bottom: 0.6em;
    img {
      margin: auto;
      height: 100%;
      width: auto;
    }
  }
}
</style>

