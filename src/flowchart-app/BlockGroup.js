import { Container, Graphics, Sprite, loader } from "pixi.js";

export default class BlockGroup extends Container {
  constructor(block) {
    super()
    // group must have main, parent(before)and child(after/inside)
    this.block = block
    this.addChild(this.block)
    this.main = false

    this.nextReady = false
  }
  // Moveset
  moveUp(range) {
    this.y -= range
    return this
  }
  moveDown(range) {
    this.y += range
    return this
  }
  moveLeft(range) {
    this.x -= range
    return this
  }
  moveRight(range) {
    this.x += range
    return this
  }
  insertArrow() {
    if (this.next && !this.hitBox) {
      let coords = {
        x: this.block.x - (this.block.width / 2),
        y: this.block.y + (this.block.height / 2)
      }
      // generate hitbox
      this.hitBox = new Graphics();
      this.hitBox.beginFill(0xEE0000, 0.5).drawRect(coords.x, coords.y, this.block.width, 32).endFill();
      this.hitBox.coords = coords;
      this.hitBox.left = coords.x;
      this.hitBox.right = coords.x + this.block.width;
      this.hitBox.top = coords.y;
      this.hitBox.bottom = coords.y + 32;

      // generate arrow
      const arrowTexture = loader.resources['/assets/connector.png'].texture;
      this.arrow = new Sprite(arrowTexture);
      this.arrow.anchor.set(0.5);
      this.arrow.x = this.block.x;
      this.arrow.y = this.block.y + (this.arrow.height / 2) + (this.block.height / 2);

      this.addChild(this.hitBox, this.arrow);
      // this.next.moveDown(32)
    }
  }

  // check next
  update() {
    this.insertArrow()
    if (this.next) {
      this.next.moveDown(this.height)
    }

  }

  // add Blockgroup inside
  insert(group) {
    this.next = group;
    this.addChild(this.next);
    // this.update();
  }

  // remove next blockgroup to fill in parent
  remove(group) {
    this.removeChild(this.next);
  }

  // ready for insert
  ready(insertBlock) {
    if (this.next && !this.nextReady) {
      // move block
      this.next.moveDown(insertBlock.height);
      this.hitBox.bottom += (insertBlock.height + 32);
      // console.log(this.hitBox.bottom)
      // expand hitbox
      this.hoverHitBox = new Graphics();
      this.hoverHitBox.beginFill(0xEE0000, 0.5).drawRect(this.hitBox.coords.x, this.hitBox.coords.y + 32, this.block.width, (insertBlock.height + 32)).endFill();
      this.addChild(this.hoverHitBox)
      // change status
      this.nextReady = true;
    }
  }

  //cancel insert
  cancelReady(insertBlock, insert = false) {
    if (this.nextReady) {
      // move block
      this.next.moveUp(insertBlock.height)
      this.hitBox.bottom -= (insertBlock.height + 32);
      console.log(this.hitBox.bottom)
      // remove additional hitbox
      this.removeChild(this.hoverHitBox)
      // change status
      this.nextReady = false;
    }
  }
}