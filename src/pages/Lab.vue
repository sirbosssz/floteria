<template>
  <div class="labpage">
    <div id="menu-blocks">
      <div class="menu-button" @click="addBlock('operations')">
        <img
          srcset="/assets/b-operations.svg"
          src="/assets/b-operations.png"
          width="100%"
          height="100%"
          alt
        >
      </div>
      <div class="menu-button" @click="addBlock('io')">
        <img srcset="/assets/b-io.svg" src="/assets/b-io.png" width="100%" height="100%" alt>
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
import { Application, loader } from "pixi.js";
import workspaceMap from "@/flowchart-app/WorkspaceMap";
import Block from "@/flowchart-app/Block";
import BlockGroup from "@/flowchart-app/BlockGroup";

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

    this.refreshCanvasSize();
    window.addEventListener("resize", this.refreshCanvasSize);

    // blocks
    this.map.blockList = [];

    loader
      .add([
        "/assets/b-terminal.png",
        "/assets/b-operations.png",
        "/assets/b-io.png",
        "/assets/b-decision.png",
        "/assets/connector.png"
      ])
      .load(this.setup);
  },

  beforeDestroy() {
    console.log("close lab");
    loader.reset();
    this.app.stage.destroy(true);
    this.app.destroy(true, true);
  },

  methods: {
    setup() {
      this.map.blockList.push(this.addBlock("start"));
      this.map.blockList.push(this.addBlock("arrow"));
      this.map.blockList.push(this.addBlock("stop"));
      // this.map.blockGroup[1].moveDown(100)
      console.log(this.map.blockList);
      let posY = 60;
      this.map.blockList.forEach(block => {
        block.y = posY + block.height / 2;
        posY = block.y + block.height / 2;
      });

    },
    addBlock(type) {
      // set some default parameter
      let location = { x: 100, y: 150 };
      let flowdata = { name: type, type: "components" };
      if (type === "start") {
        (type = "terminal"), (location = { x: 300, y: 60 });
      } else if (type === "stop") {
        type = "terminal";
        location = { x: 300, y: 60 };
      } else if (type === "arrow") {
        location = { x: 300, y: 60 };
        flowdata = {
          type: "connector"
        };
      }

      const newBlock = new Block({
        type: type,
        flowdata: flowdata,
        map: this.map,
        coords: location
      });

      this.map.content.addChild(newBlock);
      return newBlock;
      // this.map.blockList.push(newBlock)
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
