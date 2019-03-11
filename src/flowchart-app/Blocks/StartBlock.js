import { Texture, Sprite, Container } from 'pixi.js'

export default class StartBlock extends Container {
  constructor(x, y, scale = 1) {
    super()

    // main block
    const textureStartBlock = Texture.fromImage('/assets/b-terminal.svg');
    // const textureStartBlock = Texture.fromImage('/assets/b-terminal.png');
    const width = 104, height = 50;
    this.mainBlock = new Sprite(textureStartBlock);
    this.mainBlock.x = 0;
    this.mainBlock.y = 0;

    // connectingPoint

    // add contents
    this.addChild(this.mainBlock)
    this.interactive = true
    this.buttonMode = true

    this.x = x, this.y = y;

    this.center = {
      x: (width / 2) + x,
      y: (height / 2) + y
    }

    this.pivot = {
      x: width / 2,
      y: height / 2
    }
    // console.log([this.width, this.height, this.position, this.pivot])
  }
}