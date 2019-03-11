import { Container, Graphics, Text } from 'pixi.js'

export default class BlocksSetUI extends Container {
  constructor(x, y, scale = 1) {
    super();

    //add label
    this.label = new Text('เพิ่มบล็อกคำสั่ง', {
      fontFamily: 'Quark',
      fontSize: 16,
    })
    this.label.x = x + 20;
    this.label.y = y + 10;

    //add background
    this.background = new Graphics();
    this.background.beginFill(0xFFFFFF).drawRect(x, y, (this.label.width + 40) * scale, 350 * scale).endFill();

    // insert to ui
    this.addChild(this.background, this.label)
  }
}