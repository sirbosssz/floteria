import { Container, Graphics, Sprite, Texture } from "pixi.js";

const arrowTexture = Texture.fromImage('/assets/connector.svg');
export default class BlockGroup extends Container {
  constructor(block) {
    super()
    // group must have main, parent(before)and child(after/inside)
    this.block = block
    this.addChild(this.block)
    this.main = false
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

  // check next
  update() {
    if (this.next) {
      let coords = {
        x: this.block.x - (this.block.width / 2),
        y: this.block.y + (this.block.height / 2)
      }
      // generate hitbox
      this.hitBox = new Graphics();
      this.hitBox.beginFill(0xEE0000, 0.5).drawRect(coords.x, coords.y, this.block.width, 32).endFill();
      this.hitBox.coords = coords;

      // generate arrow
      this.arrow = new Sprite(arrowTexture);
      this.arrow.anchor.set(0.5);
      this.arrow.x = this.block.x;
      this.arrow.y = this.block.y + (this.arrow.height / 2) + (this.block.height / 2);

      this.addChild(this.hitBox, this.arrow);
      this.next.moveDown(32 + this.block.height);

      console.log(['add arrow', this.hitBox]);
    } else {
      // destroy arrow
    }
  }

  // add Blockgroup inside
  insert(group) {
    this.next = group;
    this.addChild(this.next);
    this.update();
  }

  // remove next blockgroup to fill in parent
  remove(group) {
    this.parent.next = this.next;
    this.removeChild(this.next);
    this.parent.removeChild(this);
    this.update()
  }
}