import { Container, Texture, Sprite } from 'pixi.js';

const texture = []
texture.terminal = Texture.fromImage('/assets/b-terminal.svg'),
  texture.operations = Texture.fromImage('/assets/b-operations.svg'),
  texture.io = Texture.fromImage('/assets/b-io.svg'),
  texture.decision = Texture.fromImage('/assets/b-decision.svg'),
  texture.loop = Texture.fromImage('/assets/b-decision.svg')

export default class Block extends Container {
  constructor({
    type,
    flowdata,
    coords = { x: 100, y: 100 },
    scale = 1,
    map,
  }) {

    super()
    this.x = coords.x;
    this.y = coords.y;
    this.flowdata = flowdata;
    this.type = type;
    this.click = false;
    // mainBlock
    const blockTexture = texture[type]
    this.block = new Sprite(blockTexture);
    this.block.x = 0
    this.block.y = 0
    this.block.interactive = true;
    this.block.buttonMode = true;

    this.addChild(this.block)

    // coords
    this.pivot = {
      x: this.width / 2,
      y: this.height / 2
    }

    // map
    this.map = map
    // this.map.content.children[0].on('pointerdown', this.mapDrag)
    // disable edit for Start and Stop block
    if (this.type !== 'terminal') {
      this.block
        .on('pointerdown', this.onClick)
        .on('pointerup', this.onDragEnd)
        .on('pointerupoutside', this.onDragEnd)
        .on('pointermove', this.onDrag)
    }
  }

  toggleClickMode() {
    this.click = this.click === true ? false : true
    if (this.click) {
      this.openClickMode()
    } else {
      this.closeClickMode()
    }
    // this.block.alpha = this.block.alpha === 1 ? 0.5 : 1
  }
  closeClickMode() {
    this.click = false
    this.block.alpha = 1
  }
  openClickMode() {
    this.click = true
    this.block.alpha = 0.5
  }

  onClick(event) {
    this.data = event.data
    this.dragging = true
    if (this.parent.map.focus !== this.parent) {
      this.parent.map.closeAllClickMode()
      this.parent.map.focus = this.parent
    }
    this.parent.map.drag(false)
    this.parent.toggleClickMode()
    // console.log(['clicked', this.parent])
  }
  onDrag() {
    if (this.dragging) {
      var newPosition = this.data.getLocalPosition(this.parent.map);
      this.parent.x = newPosition.x;
      this.parent.y = newPosition.y;
    }
  }
  onDragEnd() {
    // console.log(['unclicked', this.parent])
    this.dragging = false
    this.data = null
    this.parent.map.drag(true)
  }

}