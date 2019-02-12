<template>
    <h1>Lesson : {{$route.params.chapter}}</h1>
</template>

<script>
export default {
    name: 'LessonChapter',
    data() {
        return{
            lesson: ''
        }
    },
}
</script>
