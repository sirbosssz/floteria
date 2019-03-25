import { Graphics } from "pixi.js";
import Scrollbox from "pixi-scrollbox";

import Block from '@/flowchart-app/Block'

export default function workspaceMap(options) {
  const map = new Scrollbox(options)

  let mapSize = 4096
  // temp: workspace map -> generate + expand map
  map.background = map.content.addChild(new Graphics())
  map.background.beginFill(0xEDEDED).drawRect(0, 0, mapSize, mapSize).endFill()
  console.log(map.children[0].children)

  let creatingLine = false

  map.drag = function (setting) {
    map.dragScroll = setting
  }

  map.addBlock = function (type) {
    let block = new Block(type, { x: 200, y: 100 })
    map.content.addChild(block)

    block.interactive = true;
    block.buttonMode = true;

    block
      .on('pointerdown', toggleSelectMode)
      .on('pointerup', stopBlockDrag)
      .on('pointerupoutside', stopBlockDrag)
      .on('pointermove', startBlockDrag)

    if (type !== 'decision' || type !== 'loop') {
      block.on()
    }

    function createLine() {
      console.log('created line')
    }

    function toggleSelectMode(event) {
      map.children[0].children.forEach(element => {
        if (element.type) {
          element.closeClickMode()
          element.mode = null
        }
      });

      this.data = event.data;
      if (block.mode === 'click') {
        block.mode = null
        block.closeClickMode()
      } else {
        block.mode = 'click'
        block.openClickMode()
      }
      this.dragging = this.dragging === true ? false : true;
      // block.toggleClickMode()}

    }

    function closeClickMode() {
      if (block.mode === 'click') {
        block.closeClickMode()
        block.mode = null
      }
    }

    function startBlockDrag() {
      if (this.dragging) {
        block.openClickMode()
        let newPos = this.data.getLocalPosition(this.parent);
        this.x = newPos.x;
        this.y = newPos.y;
      }
    }

    function stopBlockDrag() {
      this.dragging = false;

      this.data = null
    }
  }

  return map
}