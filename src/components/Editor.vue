<template>
  <div id="editor"></div>
</template>

<style lang="scss" scoped>
#editor {
  position: relative;
  width: 100%;
  height: calc(100% - 1em);
}
</style>

<script>
import { Game, Auto, Scale } from "phaser";
import scene from "@/flowchart-app/scenes";
import storage from "@/flowchart-app/storage";

export default {
  name: "Editor",
  props: ["type"],
  methods: {
    getEditorSize() {
      return {
        width: this.$el.clientWidth,
        height: this.$el.clientHeight
      };
    },
    resize() {
      const { width, height } = this.getEditorSize();
      this.app.scale.resize(width, height);
    }
  },
  mounted() {
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
        autoCenter: Phaser.Scale.CENTER_BOTH
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
    window.addEventListener("resize", this.resize);
    storage.type = this.$props.type;
    storage.config = {
      width,
      height
    }

    console.log(
      "%c Open Floteria: Editor ",
      "background: #009900; color: #ededed; padding: 2px;"
    );
  },
  beforeDestroy() {
    this.app.destroy(true);
    console.clear();
    console.log(
      "%c Close Floteria: Editor ",
      "background: #DD0000; color: #ededed; padding: 2px;"
    );
  }
};
</script>
