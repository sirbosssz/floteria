<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import { Application, Graphics } from "pixi.js";
import Viewport from "pixi-viewport";

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

    // workspace -> Viewport
    this.workspace = new Viewport({
      screenWidth: width,
      screenHeight: height,
      worldWidth: width + 200,
      worldHeight: height + 200,

      interaction: this.app.renderer.interaction
    });

    this.app.stage.addChild(this.workspace);
    this.workspace
      .drag()
      .pinch()
      .decelerate();

        // temp: workspace map -> generate + expand map
    this.workspaceMap = this.workspace.addChild(new Graphics())
    this.workspaceMap.beginFill(0xEDEDED).drawRect(0, 0, (width + 200), (height + 200)).endFill()
    this.workspace.bounce()

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

      //resize workspace
      this.workspace.resize(width, height)
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
