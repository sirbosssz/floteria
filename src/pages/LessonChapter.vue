<template>
  <div class="lessonChapter">
    <h1>Lesson : {{nameLesson.name}}<!-- {{$route.params.chapter}}//{{lessonList[0].data.name}} --></h1>
    <router-link to="/lessons">Back</router-link>
    
      <ul v-if="contents">
        <li :key="contented.id" v-for="contented in contents">
          <div class="card card-content">
          <router-link :to="contented.link">{{contented.data.title}}</router-link>
          </div>
        </li>
      </ul>
      <div v-else>Loading</div>
    
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
      mission: [],
      lessonList: [],
      nameLesson: ''
    };
  },
  created() {},
  mounted() {
    console.log(firestore);
    let query = firestore
      .collection(`/chapters/${this.$route.params.chapter}/contents`)
      .orderBy("title", "asc");
    query.get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log(`1.1 ${doc.id} => ${doc.data()}`);
        this.contents.push({
          id: doc.id,
          data: doc.data(),
          link: `/lessons/${this.$route.params.chapter}/${doc.id}`
        });
      });
    });
    // let query2 = firestore.collection(`chapters/`)
    // .orderBy("name", "asc");
    // query2.get().then(snapshot => {
    //   snapshot.forEach(doc => {
    //     console.log("2.", `${doc.id} => ${doc.data()}`);
    //       this.lessonList.push({
    //         id: doc.id,
    //         link: `/lessons/${doc.id}`,
    //         data: doc.data()
    //       })
    //   });
    // });
    let query2 = firestore.collection(`chapters/`).doc(this.$route.params.chapter)
    query2.get().then(doc => {
      this.nameLesson = doc.data()
      console.log(`1.2 ${doc.id} => ${doc.data()}`)
      console.log(`1.3`, doc.data())
    })
    console.log(`1.4`, nameLesson)
    
  }
};
</script>
