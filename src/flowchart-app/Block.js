import { Container, Sprite, loader } from 'pixi.js';

const texture = []
texture.terminal = '/assets/b-terminal.png',
  texture.operations = '/assets/b-operations.png',
  texture.io = '/assets/b-io.png',
  texture.decision = '/assets/b-decision.png',
  texture.loop = '/assets/b-decision.png'

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
    if (this.type !== 'terminal') {
      this.block
        .on('pointerdown', this.onClick)
        .on('pointerup', this.onDragEnd)
        .on('pointerupoutside', this.onDragEnd)
        .on('pointermove', this.onDrag)
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
  }
  openClickMode() {
    this.click = true
    this.block.alpha = 0.5
  }

  // drag, clock events
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
      if (this.parent.parent.parent) {
        // console.log(this.parent.parent.parent)
      }
      var newPosition = this.data.getLocalPosition(this.parent.map);
      this.parent.x = newPosition.x;
      this.parent.y = newPosition.y;

      this.parent.hitBox = {
        left: this.parent.x - (this.parent.width / 2),
        right: this.parent.x + (this.parent.width / 2),
        top: this.parent.y - (this.parent.height / 2),
        bottom: this.parent.y + (this.parent.height / 2)
      }

      // checkCollide
      this.collide = this.parent.checkCollision(this.parent);
      console.log(this.collide)

      //reserve space
      if (this.collide) {
        this.collide.ready(this.parent)
      } else {
        this.parent.map.blockGroup.forEach(group => {
          group.cancelReady(this.parent)
        })
      }
    }
  }
  onDragEnd() {
    // console.log(['unclicked', this.parent])
    this.dragging = false
    this.data = null
    this.parent.map.drag(true)

    if (this.collide) {
      this.collide.cancelReady(this.parent, true)
      this.parent.x = this.collide.block.x
      this.parent.y = this.collide.hitBox.bottom + (this.parent.height / 2)
      this.parent.parent.insert(this.collide.next)
      this.collide.insert(this.parent.parent)
      this.parent.parent.insertArrow()
    }
  }

  // collision
  checkCollision(block) {
    const groups = block.map.blockGroup
    let collide = null
    groups.forEach(group => {
      if (group !== block.parent && group.hitBox) {
        if (block.hitBox.right >= group.hitBox.left && block.hitBox.left <= group.hitBox.right && block.hitBox.bottom >= group.hitBox.top && block.hitBox.top <= group.hitBox.bottom) {
          collide = group;
          return collide
        }
      }
    });
    // console.log(['hit', collide])
    return collide
  }

}