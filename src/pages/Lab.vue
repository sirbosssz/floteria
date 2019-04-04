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
import { Application } from "pixi.js";
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
    this.blocks = [];
    this.blockGroup = [];
    
    this.addBlock('start')
    this.addBlock('stop')
    // this.blockGroup[1].moveDown(100)

    // insert stop into startgroup
    this.map.content.removeChild(this.blockGroup[1])
    this.blockGroup[0].insert(this.blockGroup[1])
    this.blockGroup[0].main = true

  },

  beforeDestroy() {
    this.app.destroy();
  },

  methods: {
    addBlock(type) {
      // set some default parameter
      const terminal = ['start', 'stop']
      let id = this.blocks.length;
      let flowData = { id: id }
      let startLocation = {
        x: 100,
        y: 100
      }
      if (terminal.includes(type)) {
        flowData = {
          id: id,
          type: type,
          group: 'terminal'
        };
        startLocation = {
          x: 250,
          y: 75
        }
        type = 'terminal'
      }

      // add sprite
      let block = new Block({
        type: type,
        flowData: flowData,
        coords: startLocation,
        map: this.map
      });
      let group = new BlockGroup(block)

      // insert into map/container/list
      this.map.content.addChild(group);
      this.blocks.push(block);
      this.blockGroup.push(group);

      console.log([`insert a/an ${type} block in Workspace`, this.blocks]);
    },

    delBlock(id) {
      this.map.removeChild(this.blocks[id]);
      this.blocks[id] = null;

      this.map.removeChild(this.blockGroup[id]);
      this.blockGroup[id] = null;

      console.log(`deleted block id = ${id}`);
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
