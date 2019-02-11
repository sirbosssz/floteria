<template>
    <h1>Lesson : {{$route.params.name}}</h1>
</template>

<script>
export default {
    name: 'LessonPage',
    data() {
        return{
            lesson: ''
        }
    },
}
</script>
