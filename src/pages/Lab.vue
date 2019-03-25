<template>
  <div class="labpage">
    <div id="menu-blocks">
      <div class="menu-button" @click="addBlock('terminal')">
        <img
          srcset="/assets/b-terminal.svg"
          src="/assets/b-terminal.png"
          width="100%"
          height="100%"
          alt
        >
      </div>
      <div class="menu-button" @click="addBlock('operations')">
        <img
          srcset="/assets/b-operations.svg"
          src="/assets/b-operations.png"
          width="100%"
          height="100%"
          alt
        >
      </div>
      <div class="menu-button" @click="addBlock('decision')">
        <img
          srcset="/assets/b-decision.svg"
          src="/assets/b-decision.png"
          width="100%"
          height="100%"
          alt
        >
      </div>
      <div class="menu-button" @click="addBlock('loop')">
        <img
          srcset="/assets/b-decision.svg"
          src="/assets/b-decision.png"
          width="100%"
          height="100%"
          alt
        >
      </div>
    </div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style lang="scss" scoped>
#menu-blocks {
  width: 120px;
  display: inline-block;
  padding: 0.4em 0.7em 0.4em 0.7em;
}
.menu-button {
  padding: 0.3em;
  background: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

canvas {
  width: calc(100% - 120px);
  height: 100%;
}

.labpage {
  display: flex;
  height: calc(100vh - 43px);
}

@media (min-width: 1408px) {
  .labpage {
    height: calc(100vh - 60px);
  }
  #menu-blocks {
    width: 140px;
  }
  canvas {
    width: calc(100% - 140px);
  }
}
</style>

<script>
import { Application } from "pixi.js";
import workspaceMap from "@/flowchart-app/WorkspaceMap";
import Block from '@/flowchart-app/Block'

export default {
  name: "Lab",
  props: ["type"],

  mounted() {
    this.canvas = this.$refs.canvas;
    this.app = new Application({
      view: this.canvas,
      backgroundColor: 0xcccccc
    });

    const { width, height } = this.getCanvasSize();

    this.map = workspaceMap({
      boxWidth: width,
      boxHeight: height
    });
    this.app.stage.addChild(this.map);
    this.map.drag(false)

    this.refreshCanvasSize();
    window.addEventListener("resize", this.refreshCanvasSize);
    // blocks set UI -> Container
    // this.blocksSetUI = new BlocksSetUI(30, 50);
    // this.app.stage.addChild(this.blocksSetUI);
  },

  beforeDestroy() {
    this.app.destroy();
  },

  methods: {
    addBlock(type) {
      console.log(`insert a ${type} block in Workspace`);
      let block = this.map.addBlock(type)
    },

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
      //resize map
      this.map.resize({ boxWidth: width, boxHeight: height });
    }
  }
};
</script>
