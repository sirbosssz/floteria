import Phaser from "phaser";

export default class Block extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    // dock status
    this.onDock;

    this.on("pointerdown", pointer => {
      // console.log(["clicked block", this]);
      this.hover();
    });
    this.on("pointerup", pointer => {
      // this.removeHover();
    });
  }

  hover() {
    // this.setTexture(this.texture_hover_list[this.textureIndex]);
    this.moveTo(this.x, this.y);
  }
  removeHover() {
    // this.setTexture(this.texture_normal_list[this.textureIndex]);
    this.moveTo(this.x, this.y);
  }

  remove() {
    this.removeArrow();
    this.destroy();
  }

  addArrow(scene) {
    // show arrow to connect
    this.arrow = scene.add
      .sprite(this.x, this.y + (this.height/2), "arrow_normal")
      .setOrigin(0.5, 0)
      .setInteractive();
    this.arrow.input.dropZone = true;
    this.arrow.type = "arrow";
    this.arrow.parent = this;
  }

  moveArrow(x, y) {
    if (this.arrow || this.arrow != null) {
      this.arrow.x = x;
      this.arrow.y = this.y + (this.height/2);
    }
  }

  removeArrow() {
    if (this.arrow) {
      this.arrow.destroy();
      this.arrow = null;
    }
  }

  moveTo(x, y) {
    // change x,y of block
    this.x = x;
    this.y = y;

    this.moveArrow(x, y);
  }

  setFlowData(data) {
    this.flowData = data;
  }
}
