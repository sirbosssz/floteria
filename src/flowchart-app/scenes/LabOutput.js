import { Scene } from 'phaser'

export default class LabOutput extends Scene {
  constructor(config, parent) {
    super(config)
    this.parent = parent;
    console.log(['load scene: LabOutput', this])
  }

  create() {
    let background = this.add.rectangle(this.parent.x, this.parent.y, this.parent.width, this.parent.height, 0xf9f9f9).setOrigin(0);
    let textOutput = this.add.text(100, 150, 'แสดงข้อความ', {fontFamily: 'Quark', fontSize: 26, color: '#5656ee'});
    textOutput.text = 'ข้อความ'
  }
}