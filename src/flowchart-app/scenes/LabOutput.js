import { Scene } from 'phaser'

import Controller from './Controller'

export default class LabOutput extends Scene {
  constructor(config, parent) {
    super(config)
    this.parent = parent;
    console.log(['load scene: LabOutput', this])
  }

  create() {
    let background = this.add.rectangle(this.parent.x, this.parent.y, this.parent.width, this.parent.height, 0xf9f9f9).setOrigin(0);

    this.monitor = this.add.sprite(this.parent.x, this.parent.y, 'output_lab').setOrigin(0)
    let scale = this.parent.width / this.monitor.width;
    this.monitor.setScale(scale)

    let placholderText = this.add.text(this.monitor.x + 22, this.monitor.y + 14, "ผลลัพธ์", {
      fontFamily: "Tahoma",
      fontSize: 14,
      fontWeight: 'Bold',
      color: "#383838"
    })
    let horizontal_line = this.add.rectangle(placholderText.x, placholderText.y + 20, this.monitor.width - 80, 1 , 0x383838).setOrigin(0)

    //output show here
    this.outputText = this.add.text(horizontal_line.x, horizontal_line.y + 8, "แสดงข้อมูลผลลัพธ์ที่นี่", {
      fontFamily: "Tahoma",
      fontSize: 14,
      color: "#383838"
    })

    //controller
    this.loadScene({
      key: 'controller',
      x: this.parent.x,
      y: this.parent.y + this.monitor.height + 10,
      width: this.parent.width,
      height: 100,
    }, Controller)
  }

  loadScene(config, sceneClass) {
    const handle = {
      key: config.key,
    }
    const area = this.add.zone(config.x, config.y, config.width, config.height).setOrigin(0);
    const window = new sceneClass(handle, area);
    this.scene.add(config.key, window, true);
  }
}