<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import { Application } from "pixi.js";
import DrawArea from "@/flowchart-app/DrawArea";
import BlocksSetUI from '@/flowchart-app/UI/BlocksSetUI';

export default {
  name: "FlowApp",
  props: ["type"],

  mounted() {
    this.canvas = this.$refs.canvas;
    this.app = new Application({
      view: this.canvas,
      backgroundColor: 0xffffff
    });

    const { width, height } = this.getCanvasSize();

    // draw area -> Viewport
    let viewWidth = width,
      viewHeight = height;
    this.drawArea = new DrawArea({
      boxWidth: width,
      boxHeight: height
    });
    this.app.stage.addChild(this.drawArea);

    // output area -> Container

    // blocks set UI -> Container
    // this.blocksSetUI = new BlocksSetUI(30, 50);
    // this.app.stage.addChild(this.blocksSetUI);

    this.refreshCanvasSize();
    window.addEventListener("resize", this.refreshCanvasSize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.refreshCanvasSize);
  },

  methods: {
    getCanvasSize() {
      return {
        width: this.canvas.offsetWidth,
        height: this.canvas.offsetHeight
      };
    },

    refreshCanvasSize() {
      const { width, height } = this.getCanvasSize();
      // resize renderer
      this.app.renderer.resize(width, height);

      //resize draw area
      this.drawArea.resize({
        boxWidth: width,
        boxHeight: height
      });
    }
  }
};
</script>

<style lang="scss" scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>
