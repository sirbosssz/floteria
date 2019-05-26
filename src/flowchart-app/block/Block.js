import Phaser from "phaser";

export default class Block extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    // dock status
    this.onDock;

    this.texture_normal_list = [
      "b_terminal_normal",
      "b_input_normal",
      "b_output_normal",
      "b_operation_normal",
      "b_condition_normal",
      "b_while_normal",
      "b_for_normal"
    ];
    this.texture_hover_list = [
      "b_terminal_hover",
      "b_input_hover",
      "b_output_hover",
      "b_operation_hover",
      "b_condition_hover",
      "b_while_hover",
      "b_for_hover"
    ];
    this.textureIndex = this.texture_normal_list.indexOf(texture);

    this.block = {
      y: this.y,
      x: this.x - this.width / 2
    };

    // show text inside blocks
    this.text = scene.add
      .text(x, y, "แสดงคำสั่ง", {
        font: "bold 12pt Quark",
        color: "#ddd",
        align: "center",
        wordWrap: {
          width: this.width * 0.7
        }
      })
      .setOrigin(0.5);
    this.text.setStroke("#777", 3);
    this.text.x = x;
    this.text.y = y + this.height / 2;
    // this.text.setShadow(2, 2, "#333", 2, false, false);

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
    this.text.destroy();
    this.removeArrow();
    this.destroy();
    if (this.textureIndex === 4) {
      this.branch_left.destroy();
    }
  }

  addArrow(scene) {
    // check if condition block
    if (this.textureIndex === 4) {
      console.log("condition block");
    } else {
      // show arrow to connect
      this.arrow = scene.add
        .sprite(this.x, this.y + this.height, "arrow_normal")
        .setOrigin(0.5, 0)
        .setInteractive();
    }
    this.arrow.input.dropZone = true;
    this.arrow.type = "arrow";
    this.arrow.parent = this;
  }

  moveArrow(x, y) {
    if (this.arrow || this.arrow != null) {
      this.arrow.x = x;
      this.arrow.y = this.y + this.height;
    }
    if (this.textureIndex === 4) {
      this.branch_left.x = x - this.block.width;
      this.branch_left.y = this.block.y + this.block.height / 2;
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

    this.block.y = this.y;
    this.block.x = this.x + this.width / 2;

    // change x,y of text
    this.text.x = x;
    this.text.y = y + this.height / 2;

    this.moveArrow(x, y);
  }

  setCommand(command) {
    this.text.text = command;
  }

  setFlowData(data) {
    this.flowData = data;
    this.setCommand(this.flowData.text);
  }
}
