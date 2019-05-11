import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import './registerServiceWorker'

import 'bulma'

import firebase from 'firebase/app';
import 'firebase/firestore'

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

const firestore = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);
firebase.firestore().enablePersistence()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
