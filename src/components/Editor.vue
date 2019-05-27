<template>
  <div id="editor">
    <!-- <input id="textinput" value="test"> -->
  </div>
</template>

<style lang="scss" scoped>
#editor {
  position: relative;
  width: 100%;
}
</style>

<script>
import { Game, Auto, Scale } from "phaser";
import scene from "@/flowchart-app/scenes";
import storage from "@/flowchart-app/storage";

import firebase from "firebase/app";
import "firebase/firestore";

const firestore = firebase.firestore();

export default {
  name: "Editor",
  props: ["type", "exercise", "lesson"],
  methods: {
    getEditorSize() {
      return {
        width: this.$el.clientWidth,
        height: this.$el.clientHeight
      };
    },
    resize() {
      const { width, height } = this.getEditorSize();
    }
  },
  mounted() {
    if (this.$props.exercise) {
      let exerciseId = this.$props.exercise;
      let lessonId = this.$props.lesson;
      let exerciseData = {};
      let testcase = [];

      // load exercise data
      firestore
        .collection(`chapters/${this.$props.lesson}/exercises`)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (doc.id === exerciseId) {
              exerciseData = doc.data();
            }
          });
        })
        .then(() => {
          //load testcase
          firestore
            .collection(`chapters/${this.$props.lesson}/exercises/${exerciseId}/testcase`)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                testcase.push(doc.data());
              });
            });
        })
        .then(() => {
          storage.exerciseData = exerciseData;
          storage.testcase = testcase;
          // save user progress

          // prepare editor app
          this.canvas = this.$refs.canvas;
          const { width, height } = this.getEditorSize();
          const config = {
            type: Phaser.Auto,
            parent: this.$el,
            width: width,
            height: height,
            backgroundColor: 0xf9f9f9,
            scale: {
              mode: Phaser.Scale.RESIZE
            },
            physics: {
              default: "arcade",
              arcade: {
                debug: true,
                gravity: { y: 0 }
              }
            },
            scene
          };
          this.app = new Phaser.Game(config);
          // window.addEventListener("resize", this.resize);
          storage.type = this.$props.type;

          console.log(
            "%c Open Floteria: Editor ",
            "background: #009900; color: #ededed; padding: 2px;"
          );
        });
    } else {
      // prepare editor app
      this.canvas = this.$refs.canvas;
      const { width, height } = this.getEditorSize();
      const config = {
        type: Phaser.Auto,
        parent: this.$el,
        width: width,
        height: height,
        backgroundColor: 0xf9f9f9,
        scale: {
          mode: Phaser.Scale.RESIZE
        },
        physics: {
          default: "arcade",
          arcade: {
            debug: true,
            gravity: { y: 0 }
          }
        },
        scene
      };
      this.app = new Phaser.Game(config);
      // window.addEventListener("resize", this.resize);
      storage.type = this.$props.type;

      console.log(
        "%c Open Floteria: Editor ",
        "background: #009900; color: #ededed; padding: 2px;"
      );
    }
  },
  beforeDestroy() {
    storage = null;
    this.app.destroy(true);
    console.clear();
    console.log(
      "%c Close Floteria: Editor ",
      "background: #DD0000; color: #ededed; padding: 2px;"
    );
  }
};
</script>
