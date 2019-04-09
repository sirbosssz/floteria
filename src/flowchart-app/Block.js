import { Container, Sprite, loader } from 'pixi.js';

const texture = []
texture.terminal = '/assets/b-terminal.png',
  texture.operations = '/assets/b-operations.png',
  texture.io = '/assets/b-io.png',
  texture.decision = '/assets/b-decision.png',
  texture.loop = '/assets/b-decision.png',
  texture.arrow = '/assets/connector.png';

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
    this.block = new Sprite(loader.resources[blockTexture].texture);
    this.block.x = 0
    this.block.y = 0
    this.block.interactive = true;
    this.block.buttonMode = true;
    this.addChild(this.block);

    // dropzone -> arrow
    this.arrow = new Sprite(loader.resources['/assets/connector.png'].texture);
    this.arrow.x = (this.block.width / 2) - (this.arrow.width / 2)
    this.arrow.y = this.block.height

    this.addChild(this.arrow)

    this.dropzoneArea = {
      top: this.arrow.y
    }

    // coords
    this.pivot = {
      x: this.block.width / 2,
      y: this.block.height / 2
    }
    this.hitBox = {
      left: this.x - (this.width / 2),
      right: this.x + (this.width / 2),
      top: this.y - (this.height / 2),
      bottom: this.y + (this.height / 2)
    }

    // map
    this.map = map

    // drag
    this.block.on('pointerdown', this.onBlockClick)
      .on('pointerup', this.onBlockUndrag)
      .on('pointerupoutside', this.onBlockUndrag)
      .on('pointermove', this.onBlockDrag)

    console.log(['Y', this.y, 'dropzone Y', this.dropzoneArea.top])
  }

  onBlockClick(event) {
    console.log(['clicked on Block: ', this])
    this.data = event.data;
    this.dragging = true;
    this.parent.map.drag(false)
  }

  onBlockDrag() {
    if (this.dragging) {
      var newPosition = this.data.getLocalPosition(this.parent.map);
      this.parent.x = newPosition.x;
      this.parent.y = newPosition.y;
    }
  }

  onBlockUndrag() {
    this.data = null;
    this.dragging = false;
    this.parent.map.drag(true)
  }
}