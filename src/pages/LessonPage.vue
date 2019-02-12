<template>
    <h1 id="lesson-test">Lesson : {{$route.params.name}}</h1>
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

<style lang="scss" scoped>
@import '../assets/colors';

#lesson-test{
    color: $blue;
}
</style>

