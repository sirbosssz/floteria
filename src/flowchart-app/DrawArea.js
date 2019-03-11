import { Graphics } from 'pixi.js';
import Scrollbox from 'pixi-scrollbox';

import StartBlock from '@/flowchart-app/Blocks/StartBlock'

const worldSize = (window.innerHeight > 2048 || window.innerWidth > 2048) ? 4096 : 2048;

export default class DrawArea extends Scrollbox {
  constructor() {
    super();

    // background
    this.background = this.content.addChild(new Graphics())
    this.background.beginFill(0xEDEDED).drawRect(0, 0, worldSize, worldSize).endFill()

    // test content
    this.startBlock = new StartBlock(400, 100)
    this.content.addChild(this.startBlock)

    this.disableAreaDrag()

  }

  enableAreaDrag() {
    this.dragScroll = true;
    console.log('enable drag')
  }
  disableAreaDrag() {
    this.dragScroll = false
    console.log('disable drag')
  }
}