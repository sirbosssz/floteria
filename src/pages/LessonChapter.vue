<template>
  <div>
    <h1>Lesson : {{$route.params.chapter}}</h1>
    <router-link to="/lessons">Back</router-link>
    <div class="box">
      <ul v-if="contents">
        <li :key="content.id" v-for="content in contents">
          <router-link :to="content.link">{{content.data.title}}</router-link>
        </li>
      </ul>
      <div v-else>Loading</div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";

const firestore = firebase.firestore();

export default {
  name: "LessonChapter",
  data() {
    return {
      contents: [],
      exercises: [],
      mission: []
    };
  },
  created() {},
  mounted() {
    let query = firestore
      .collection(`/chapters/${this.$route.params.chapter}/contents`)
      .orderBy("title", "asc");
    query.get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log(`${doc.id} => ${doc.data()}`);
        this.contents.push({
          id: doc.id,
          data: doc.data(),
          link: `/lessons/${this.$route.params.chapter}/${doc.id}`
        });
      });
    });
  }
};
</script>
