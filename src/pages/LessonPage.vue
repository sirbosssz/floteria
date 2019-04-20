<template>
    <div>
        <h1>Lesson : {{subLesson.title}}<!--  /{{$route.params.chapter}} / {{$route.params.page}} --></h1>
        <router-link to="/lessons/">Back</router-link>
        <div class="box">
            <!--
            {{subLesson.description}}
            -->
            <li :key="contented.id" v-for="contented in subLesson.description">
                {{contented.content}}
            </li>
        <!-- <ul v-if="contents">
                <li :key="contented.id" v-for="contented in contents">
                    <router-link :to="contented.link">{{contented.data.title}}</router-link>
                    {{contented.data.description.content}}
                </li>
            </ul>
        <div v-else>Loading</div> -->
        </div>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";

const firestore = firebase.firestore();

export default {
    name: 'LessonPage',
    data() {
        return{
            lesson: this.$route.params.chapter,
            page: this.$route.params.page,
            contents: [],
            exercises: [],
            mission: [],
            subLesson: '',

        }
    },
    created() {},
    mounted() {
        // let query = firestore
        // .collection(`/chapters/${this.$route.params.chapter}/contents/`)
        // .orderBy("title", "asc");
        // query.get().then(snapshot => {
        // snapshot.forEach(doc => {
        //     this.contents.push({
        //     id: doc.id,
        //     data: doc.data(),
        //     link: `/lessons/${this.$route.params.chapter}/${doc.id}`
        //     });
        //     console.log(`2.1 ${doc.id} => ${doc.data()}`);
        // });
        // });
        let query2 = firestore.collection(`chapters/${this.$route.params.chapter}/contents/`)
        .doc(this.$route.params.page)
        query2.get().then(doc => {
            this.subLesson = doc.data()
            
            console.log(`2.2 ${doc.id} => ${doc.data()}`)
            console.log(`2.3`, doc.data())
        })
        console.log(`2.4`, subLesson)
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/colors';

#lesson-test{
    color: $blue;
}
</style>

