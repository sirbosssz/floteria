<template>
  <div id="login" class="close">
    <div class="form" @submit="validateForm">
      <div class="login-title">
        <img src="@/assets/svg/logo-main.svg" alt="Logo" width="150">
        <span v-if="mode==='login'" @click="changeToRegister">ลงทะเบียน</span>
        <span v-else @click="changeToLogin">เข้าสู่ระบบ</span>
      </div>
      <div class="errortext" v-if="loginError">
        <span>{{errorText}}</span>
      </div>
      <form @submit="validateForm">
        <div class="input-area">
          <span class="input-label">อีเมล์เข้าใช้งาน</span>
          <input class="input-text" type="email" v-model="username">
        </div>
        <div class="input-area">
          <span class="input-label">รหัสผ่าน</span>
          <input class="input-text" type="password" v-model="password">
        </div>
        <div class="input-area" v-if="mode!=='login'">
          <span class="input-label">ยืนยันรหัสผ่าน</span>
          <input class="input-text" type="password" v-model="checkPassword">
        </div>

        <div class="input-area">
          <input
            class="primary button"
            type="submit"
            value="เข้าสู่ระบบ"
            v-if="mode==='login'"
            @click="validateForm"
          >
          <input
            class="primary button"
            type="submit"
            value="ลงทะเบียน"
            v-else
            @click="validateForm"
          >
          <div class="secondary button" @click="closeLoginForm">ยกเลิก</div>
        </div>
      </form>
      <div class="input-area">
        <button class="button btn-google" @click="loginGoogle">
          <img src="@/assets/g-logo.png">
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/colors.scss";
@import "@/assets/font/font.scss";

#login {
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  z-index: 1000;
  transition: top 0.7s ease-in;
  box-shadow: 0px 0px 30px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  .form {
    margin-top: 10vh;
    width: 90vw;
    max-width: 300px;
  }
}
.login-title {
  span {
    font-size: 14pt;
    font-weight: bold;
    color: $orange;
    cursor: pointer;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 0.5em;
}
.errortext {
  width: 100%;
  text-align: center;
  padding: 0.3em;
  font-size: 14pt;
  font-weight: bold;
  color: red;
  background-color: rgba(255, 0, 0, 0.25);
}
.input-area {
  padding-top: 0.5em;
  .input-label {
    font-size: 14pt;
    padding-left: 1.4rem;
    font-weight: bold;
    color: #6e6e6e;
  }
  .input-text {
    margin-top: 0.1em;
    width: 100%;
    font-size: 13pt;
    font-weight: normal;
    padding: 0.4em 0.7em 0.3em 0.7em;
    background: #f1f1f1;
    color: #6e6e6e;
    border: 0;
  }
  .button {
    font-size: 14pt;
    font-weight: bold;
    margin-top: 1em;
    border-radius: 2em;
    border: 0;
    height: 38px;
  }
  .button.primary {
    width: 58%;
    color: #f1f1f1;
    background-image: linear-gradient($orange-light, $orange);
    margin-right: 7%;
  }
  .button.secondary {
    width: 35%;
    color: $orange;
    border: 3px solid $orange;
    line-height: 1.2em;
  }
  .btn-google {
    font-family: "Roboto", "Quark";
    font-weight: bold;
    color: rgba(0, 0, 0, 0.54);
    background: #fff;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    width: 100%;
    justify-content: left;
    font-size: 13pt;
    img {
      height: 20px;
      padding-left: 8px;
      padding-right: 24px;
    }
  }
}
.close {
  top: -200vh;
}
.open {
  top: 0;
}
</style>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
      checkPassword: "",
      mode: "login",
      loginError: false,
      errorText: ""
    };
  },
  methods: {
    openLoginForm() {
      this.$el.classList.add("open");
      this.$el.classList.remove("close");
    },
    closeLoginForm() {
      this.$el.classList.add("close");
      this.$el.classList.remove("open");

      this.mode = "login";
      this.clearForm();
    },
    changeToRegister() {
      this.clearForm();
      this.mode = "registor";
    },
    changeToLogin() {
      this.clearForm();
      this.mode = "login";
    },
    clearForm() {
      this.username = "";
      this.password = "";
      this.checkPassword = "";
      this.loginError = false;
      this.errorText = "";
    },
    error(text) {
      this.loginError = true;
      this.errorText = text;
    },
    validateForm(event) {
      event.preventDefault();
      // check emty form
      if (this.username.length <= 0) {
        this.error("กรุณาใส่อีเมล์");
      } else if (this.username.search("@") === -1) {
        this.error("รูปแบบอีเมล์ไม่ถูกต้อง");
      } else if (this.password.length <= 0) {
        this.error("กรุณาใส่รหัสผ่าน");
      } else if (this.password.length < 6) {
        this.error("รหัสผ่านควรมีอย่างน้อย 6 ตัวอักษร");
      } else {
        if (this.mode === "login") {
          //login
          firebase
            .auth()
            .signInWithEmailAndPassword(this.username, this.password)
            .catch(error => {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log([errorCode, errorMessage]);
              if (errorCode === "auth/wrong-password") {
                this.error("รหัสผ่านไม่ถูกต้อง");
              } else if (errorCode === "auth/user-not-found") {
                this.error("อีเมล์ไม่ถูกต้อง");
              } else {
                this.error("อีเมล์หรือรหัสผ่านไม่ถูกต้อง");
              }
            });
          this.closeLoginForm();
        } else {
          //register
          // check matched password
          if (this.password !== this.checkPassword) {
            this.error("รหัสผ่านไม่ตรงกัน");
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.username, this.password)
              .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log([errorCode, errorMessage]);
              });
            this.closeLoginForm();
          }
        }
      }
    },
    loginGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().useDeviceLanguage();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          var token = result.credential.accessToken;
          var user = result.user;
          this.closeLoginForm();
        })
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
        });
    }
  }
};
</script>
