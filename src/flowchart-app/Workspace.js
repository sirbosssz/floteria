import Scrollbox from 'pixi-scrollbox';

export default class Workspace extends Scrollbox {
  constructor(options) {
    super(options)
    let mapSize = {
      width: options.boxWidth,
      height: options.boxHeight
    }
    // temp: workspace map -> generate + expand map
    this.background = this.content.addChild(new Graphics())
    this.background.beginFill(0xEDEDED).drawRect(0, 0, mapSize.width, mapSize.height).endFill()
    console.log(this.children[0].children)

    let focus = null
  }

  setDrag(flag) {
    this.dragScroll = flag;
  }
}