import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import firebase from 'firebase/app';

Vue.config.productionTip = false

const config = {
  apiKey: "AIzaSyC2IQLzeeeO_8J5D0FMwUWHms7M9cy86C4",
  authDomain: "floteria-project.firebaseapp.com",
  databaseURL: "https://floteria-project.firebaseio.com",
  projectId: "floteria-project",
  storageBucket: "floteria-project.appspot.com",
  messagingSenderId: "790651973030"
}

firebase.initializeApp(config);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
