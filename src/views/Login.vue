<template>
  <div class="loginForm">
    <h1>LOGIN FORM</h1>
    <input type="text" placeholder="email" v-model="email">
    <input type="password" placeholder="password" v-model="password">
    <br>
    <button @click="googleLogin">Google Login</button>
    <button @click="login">account Login</button>
  </div>
</template>

<style lang="scss" scoped>
input,
button {
  margin: 0.4em;
}
</style>

<script>
import firebase from "firebase";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            console.log("login with email");
          },
          err => {
            console.error("login failed");
          }
        );
    },
    googleLogin: function() {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(
          result => {
            console.log("login with google");
            var token = result.credential.accessToken;
            console.log(token)
          },
          err => {
            console.error("login failed");
          }
        );
    }
  }
};
</script>