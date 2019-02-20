import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    /*
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    */
   {
     path: '/lab',
     name: 'lab',
     component: () => import('./pages/Lab.vue')
   },
   {
     path: '/lessons',
     name: 'Lessons',
     component: () => import('./pages/LessonList.vue')
   },
   {
     path: '/lessons/:chapter',
     name: 'Lesson Chapter',
     component: () => import('./pages/LessonChapter.vue')
   },
   {
     path: '/lessons/:chapter/:page',
     name: 'Lesson Chapter Page',
     component: () => import('./pages/LessonPage.vue')
   }
  ]
})
