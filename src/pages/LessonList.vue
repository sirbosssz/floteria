<template>
  <div class="lessonPage">
    <h1>Lesson Page</h1>
    <ul>
      <li :key='lesson.id' v-for='lesson in lessonList'>
        <router-link :to="lesson.link">{{lesson.data.name}}</router-link>
        {{lesson.data.short_desc}}
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";

const firestore = firebase.firestore();

export default {
  name: "LessonList",
  data() {
    return {
      lessonList: []
    };
  },
  mounted() {
    let query = firestore.collection("chapters").orderBy("name", "asc");
    query.get().then(snapshot => {
      snapshot.forEach(doc => {
          this.lessonList.push({
            id: doc.id,
            link: `/lessons/${doc.id}`,
            data: doc.data()
          })
      });
    });
  }
};
</script>
