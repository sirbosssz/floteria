import { Container, Texture, Sprite } from 'pixi.js';

const texture = []
texture.terminal = Texture.fromImage('/assets/b-terminal.svg'),
texture.operations = Texture.fromImage('/assets/b-operations.svg'),
texture.io = Texture.fromImage('/assets/b-io.svg'),
texture.decision = Texture.fromImage('/assets/b-decision.svg'),
texture.loop = Texture.fromImage('/assets/b-decision.svg')

export default class Block extends Container {
  constructor(type, flowdata, coords = { x: 100, y: 100 }, scale = 1) {
    super()
    this.x = coords.x;
    this.y = coords.y;
    this.flowdata = flowdata;
    this.type = type;
    // TO DO
    // mainBlock
    const blockTexture = texture[type]
    
    this.block = new Sprite(blockTexture);
    this.block.x = 0
    this.block.y = 0
    this.block.interactive = true;
    this.block.buttonMode = true;

    this.addChild(this.block)
    // connectingPoint

    this.pivot = {
      x: this.width / 2,
      y: this.height / 2
    }
  }

  toggleClickMode() {
    this.block.alpha = this.block.alpha === 1 ? 0.5: 1
  }

  closeClickMode(){
    this.block.alpha = 1
  }

  openClickMode(){
    this.block.alpha = 0.5
  }
}