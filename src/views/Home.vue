<template>
  <div class="home">
    <h1>current email is: {{ user }}</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from "firebase";

export default {
  name: "home",
  data() {
    return {
      user: ""
    };
  },
  methods: {
    checkUser: function() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.user = user.email;
        }
      });
    },
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("logout success");
        })
        .then(() => {
          this.user = "nothing";
        })
        .catch(error => {
          console.error("logout unsuccessful");
        });
    }
  },
  mounted() {
    this.user = "nothing";
    this.checkUser();
  }
};
</script>
