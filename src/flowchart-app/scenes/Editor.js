// import phaser class(es)
import { Scene } from 'phaser'
import Block from '../block/Block'
// import storage state
import storage from '../storage'

export default class Editor extends Scene {
  constructor(config, parent) {
    super(config)
    this.parent = parent;
    console.log(['load scene: Editor', this])
  }

  create() {
    // insert dock menu
    const dock = this.add.graphics()
    dock.fillStyle(0xD8D8D8, 1)
    dock.fillRect(this.parent.x, this.parent.y , 150, this.parent.height)

    const dockList = ['b_input_normal', 'b_output_normal', 'b_operation_normal', 'b_condition_normal', 'b_while_normal', 'b_for_normal']
    const dockMenuList = ['Input', 'Output', 'Operation', 'Condition', 'While Loop', 'For Loop']

    let dockY = this.parent.y
    let index = 0;
    dockList.forEach(block => {
      // let block_menu = this.add.sprite(this.parent.x + 75, dockY, block).setOrigin(0.5, 0)
      let block_menu = new Block(this, this.parent.x + 75, dockY, block).setOrigin(0.5, 0).setInteractive();
      block_menu.onDock = true;
      block_menu.setCommand(dockMenuList[index++])
      this.input.setDraggable(block_menu)

      // dockY += block_menu.height;
      dockY += block_menu.block.height + 20
    })

    // drag events
    this.input.on('dragstart', (pointer, object) => {
      this.children.bringToTop(object)
      this.children.bringToTop(object.text)
      this.children.bringToTop(object.arrow)
    })

    this.input.on('drag', (pointer, object, dragX, dragY) => {
      object.moveTo(dragX, dragY)
    })
  }
}