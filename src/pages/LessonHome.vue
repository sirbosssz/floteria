<template>
  <div class="lessonHome container">
    <h1>รายการบทเรียน</h1>
    <h2>เลือกบทเรียนจากเนื้อหาที่สนใจ</h2>
    <div class="lessonChapterMenu columns">
      <div :key="lesson.id" v-for="lesson in lessonList" class="column">
        <div>
          <h1>{{lesson.data.name}}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.lessonHome{
  text-align: center;
  padding-top: 1.2em;
  h1{
    font-size: 24pt;
    font-weight: bold;
  }
  h2 {
    font-size: 14pt;
  }
}
.lessonChapterMenu{
  margin-top: 1.2em;
  h1{
    font-size: 14pt;
  }
}
</style>

<script>
import firebase from "firebase/app";
import "firebase/firestore";

const firestore = firebase.firestore();

export default {
  name: "LessonHomePage",
  data() {
    return {
      lessonList: []
    };
  },
  created() {
    let navbar = this.$parent.$refs.navbar.$data;
    navbar.page = "lesson";
  },
  mounted() {
    let query = firestore.collection("chapters").orderBy("name", "asc");
    query.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.lessonList.push({
          id: doc.id,
          data: doc.data()
        });
      });
    });
    console.log(this.lessonList);
  }
};
</script>
