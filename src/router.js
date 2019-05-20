import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/lab",
      name: "lab",
      component: () => import("./pages/Lab.vue")
    },
    {
      path: "/lessons",
      name: "lessons",
      component: () => import("./pages/LessonHome.vue")
    },
    {
      path: "/lessons/:number",
      name: "lesson page",
      component: () => import("./pages/LessonPage.vue")
    },
    {
      path: "/lessons/:number/:exercise",
      name: "lesson exercise",
      component: () => import("./pages/LessonExercise.vue")
    }
  ]
});
