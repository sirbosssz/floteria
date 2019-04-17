// import phaser class(es)
import { Scene } from 'phaser'
// import storage state
import storage from '../storage'

export default class Editor extends Scene {
  constructor(config, parent) {
    super(config)
    this.parent = parent;
    console.log('load scene: Editor')
  }

  create() {
    console.log(this)
    let terminal = this.add.image(150 + this.parent.x, 150 + this.parent.y, 'block_terminal').setOrigin(0);
    terminal.setInteractive()
    this.input.setDraggable(terminal)

    this.input.on('drag', (pointer, object, dragX, dragY) => {
      object.x = dragX;
      object.y = dragY;
    })
  }
}