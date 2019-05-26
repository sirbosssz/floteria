export default class BlockSet {
  constructor(scene) {
    this.scene = scene;
    this.children = [];
    this.flow = [];
  }

  addChild(sprite) {
    this.children.push(sprite);
  }

  removeChildHoverExcept(sprite) {
    this.children.forEach(child => {
      if (child !== sprite) {
        child.removeHover();
      }
    });
  }

  removeChild(sprite) {
    let index = this.children.findIndex(child => {
      return child === sprite;
    });
    this.children.splice(index, 1);
  }

  insertToFlow(sprite, index) {
    this.flow.splice(index + 1, 0, sprite);
  }

  removeFromFlow(sprite) {
    const index = this.getFlowIndex(sprite);
    this.flow.splice(index, 1);
    console.log(this.flow);
  }

  getFlowIndex(sprite) {
    return this.flow.findIndex(child => {
      return child === sprite;
    });
  }

  flowReposition() {
    let baseLocation = {
      x: this.flow[0].x,
      y: this.flow[0].y
    };
    this.moveFlow(baseLocation.x, baseLocation.y);
  }

  moveFlow(x, y) {
    let baseLocation = {
      x: x,
      y: y
    };
    this.flow.forEach(block => {
      // check if not last block of flow
      if (this.getFlowIndex(block) + 1 !== this.flow.length) {
        // check if not have arrow, generate them
        if (!block.arrow || block.arrow === null) {
          block.addArrow(this.scene);
        }
      }
      // begin reposition
      block.moveTo(baseLocation.x, baseLocation.y);
      if (block.arrow) {
        baseLocation.y += block.height + block.arrow.height;
      } else {
        baseLocation.y += block.height;
      }
    });
  }

  getFlowData() {
    let flowData = [];
    this.flow.forEach(block => {
      flowData.push(block.flowData);
    });
    return flowData;
  }
}
