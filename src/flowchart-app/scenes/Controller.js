import { Scene } from 'phaser'
import storage from '../storage';

export default class Controller extends Scene {
  constructor(config, parent) {
    super(config)
    this.parent = parent;
    console.log('load scene: Controller')
  }
  create() {
    let background = this.add.rectangle(this.parent.x, this.parent.y, this.parent.width, this.parent.height, 0x333333).setOrigin(0);

    const run_button = this.add.sprite(this.parent.x, this.parent.y, 'c_run').setOrigin(0).setInteractive()
    let scale1 = (this.parent.width / 3) / run_button.width
    run_button.setScale(scale1)
    
    const step_button = this.add.sprite(this.parent.x + run_button.width, this.parent.y, 'c_step').setOrigin(0).setInteractive()
    let scale2 = (this.parent.width / 3) / step_button.width
    step_button.setScale(scale2)

    run_button.on('pointerdown', pointer => {
      console.log(['run program...', storage.flow])
    })
  }
}