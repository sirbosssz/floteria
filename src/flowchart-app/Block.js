import { Container, Sprite, loader, Graphics } from 'pixi.js';

const texture = []
texture.terminal = '/assets/b-terminal.png',
  texture.operations = '/assets/b-operations.png',
  texture.io = '/assets/b-io.png',
  texture.decision = '/assets/b-decision.png',
  texture.loop = '/assets/b-decision.png'

export default class Block extends Container {
  constructor({
    type,
    flowdata = {},
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
    console.log(flowdata)
    // mainBlock
    const blockTexture = texture[type]
    this.block = new Sprite(loader.resources[blockTexture].texture);
    this.block.x = 0
    this.block.y = 0
    this.block.interactive = true;
    this.block.buttonMode = true;

    this.linePoint = {
      up: {
        x: (this.block.width / 2),
        y: 0
      },
      down: {
        x: (this.block.width / 2),
        y: this.block.height
      },
      left: {
        x: 0,
        y: (this.block.height / 2)
      },
      right: {
        x: this.block.width,
        y: (this.block.height / 2)
      }
    }

    this.addChild(this.block)

    // coords
    this.pivot = {
      x: this.width / 2,
      y: this.height / 2
    }

    this.hitBox = {
      left: this.x - (this.width / 2),
      right: this.x + (this.width / 2),
      top: this.y - (this.height / 2),
      bottom: this.y + (this.height / 2)
    }

    // map
    this.map = map
    // this.map.content.children[0].on('pointerdown', this.mapDrag)
    // disable edit for Start and Stop block
    this.block
      .on('pointerdown', this.onClick)
      .on('pointerup', this.onDragEnd)
      .on('pointerupoutside', this.onDragEnd)
      .on('pointermove', this.onDrag)

      // create pointer
      if (this.type === 'decision' || this.type === 'loop') {
        this.pointer = null
        this.pointer2 = null
      } else {
        this.pointer = null
      }
  }

  prepareLine() {
    this.parent.map.connecting = true
    this.parent.map.startLine = this.parent.linePoint.down
    this.parent.map.startBlock = this.parent
    console.log(['creating line', this.parent.map])
  }

  createLine() {
    if (this.parent.map.connecting) {

    }
  }

  // clickMode
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
    this.clickMode = false
    if (this.pointer) {
      this.removeChild(this.pointer);
      this.pointer = null
    }

    if (this.pointer2) {
      this.removeChild(this.pointer2);
      this.pointer2 = null
    }
  }
  openClickMode() {
    this.click = true
    this.block.alpha = 0.5
    this.clickMode = true

    if (this.pointer === null) {
      if (this.type === 'decision' || this.type === 'loop') {
        this.pointer = this.addChild(new Graphics())
        this.pointer.beginFill(0x333333).drawCircle(this.linePoint.left.x, this.linePoint.left.y, 4).endFill()
        this.pointer.interactive = true;

        this.pointer2 = this.addChild(new Graphics())
        this.pointer2.beginFill(0x333333).drawCircle(this.linePoint.right.x, this.linePoint.right.y, 4).endFill()
        this.pointer2.interactive = true;
        // will generate line connect to left and right side
      } else {
        // will generate line connect to bottom
        this.pointer = this.addChild(new Graphics())
        this.pointer.beginFill(0x333333).drawCircle(this.linePoint.down.x, this.linePoint.down.y, 4).endFill()
        this.pointer.interactive = true;

        this.pointer
        .on('pointerdown', this.prepareLine)
      }
    }

  }

  // drag, clock events
  onClick(event) {
    this.data = event.data
    this.dragging = true

    if (this.parent.map.connecting && this.parent.map.startBlock != this.parent){
      let linePath = new Graphics();
      linePath.moveTo(this.parent.map.startLine.x, this.parent.map.startLine.y);
      linePath.lineTo(this.parent.linePoint.up.x, this.parent.linePoint.up.y);

      this.parent.map.startBlock.addChild(linePath);
      // this.parent.map.startBlock.next = this.parent
    }


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
      if (this.parent.parent.parent) {
        // console.log(this.parent.parent.parent)
      }
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