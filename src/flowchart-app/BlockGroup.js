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
  
}