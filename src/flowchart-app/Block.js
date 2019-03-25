import { Container, Texture, Sprite, Graphics } from 'pixi.js';

const texture = []
texture.terminal = Texture.fromImage('/assets/b-terminal.svg'),
  texture.operations = Texture.fromImage('/assets/b-operations.svg'),
  texture.decision = Texture.fromImage('/assets/b-decision.svg'),
  texture.loop = Texture.fromImage('/assets/b-decision.svg')

export default class Block extends Container {
  constructor(type, coords = { x: 100, y: 100 }, scale = 1) {
    super()
    this.x = coords.x;
    this.y = coords.y;
    this.type = type;
    // TO DO
    // mainBlock
    const blockTexture = texture[type]

    this.block = new Sprite(blockTexture);
    this.block.x = 0
    this.block.y = 0
    this.interactive = true;
    this.buttonMode = true;

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
    // connectingPoint

    this.pivot = {
      x: this.width / 2,
      y: this.height / 2
    }

    this.clickMode = false
    this.pointer = null
  }

  toggleClickMode() {
    if (this.clickMode) {
      this.closeClickMode()
    } else {
      this.openClickMode()
    }
    this.clickMode = !this.clickMode;
  }

  closeClickMode() {
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
      }
    }

  }
}