<template>
    <h1>Lesson : {{$route.params.chapter}} / {{$route.params.page}}</h1>
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

