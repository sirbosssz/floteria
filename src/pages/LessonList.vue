<template>

  <div class="lessonList">
    <h1>Lesson Page: <!-- {{lessonList[0].id}} --></h1>
    
    <ul :key='lesson.id' v-for='lesson in lessonList' class="has-text-left">
      <div class="card">
        <div class="card-content">
              <p class="title is-5">
                <router-link :to="lesson.link">{{lesson.data.name}}</router-link>
              </p>
              <p class="subtitle is-7">
                {{lesson.data.short_description}}
              </p>
          </div>
      </div>      
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
