import Phaser from 'phaser'

export default class Block extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    // dock status
    this.onDock;

    const texture_normal_list = [
      'b_terminal_normal',
      'b_input_normal',
      'b_output_normal',
      'b_operation_normal',
      'b_condition_normal',
      'b_while_normal',
      'b_for_normal'
    ]
    const texture_hover_list = [
      'b_terminal_hover',
      'b_input_hover',
      'b_output_hover',
      'b_operation_hover',
      'b_condition_hover',
      'b_while_hover',
      'b_for_hover'
    ]
    const texture_size = [
      {width: 83.262, height: 43.791},
      {width: 98.086, height: 50.625},
      {width: 98.086, height: 50.625},
      {width: 98.086, height: 50.678},
      {width: 138.557, height: 71.86},
      {width: 138.557, height: 71.86},
      {width: 138.557, height: 71.86}
    ]
    let textureIndex = texture_normal_list.indexOf(texture)

    this.block = {
      width: texture_size[textureIndex].width,
      height: texture_size[textureIndex].height,
      y: this.y + ((this.height - texture_size[textureIndex].height) / 2),
      x: this.x + ((this.width - texture_size[textureIndex].height) / 2)
    }

    // show text inside blocks
    this.text = scene.add.text(x, y + (this.height / 2), 'แสดงคำสั่ง', {
      fontFamily: 'Tahoma',
      fontSize: 14,
      color: '#EDEDED'
    }).setOrigin(0.5)

  }

  addArrow(scene) {
    // show arrow to connect
    this.arrow = scene.add.sprite(this.x, this.block.y + this.block.height - 2, 'arrow_normal').setOrigin(0.5, 0).setInteractive();
    this.arrow.input.dropZone = true;
  }

  moveTo(x, y) {
    // change x,y of block
    this.x = x;
    this.y = y;

    this.block.y = this.y + ((this.height - this.block.height) / 2);
    this.block.x = this.x + ((this.width - this.block.height) / 2);

    // change x,y of text
    this.text.x = x;
    this.text.y = y + (this.height / 2);

    this.arrow.x = x;
    this.arrow.y = this.block.y + this.block.height - 2
  }

  setCommand(command) {
    this.text.text = command;
  }
}