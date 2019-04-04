export default class BlockGroup {
  constructor(blocks){
    this.blocks = blocks
  }
  // Moveset
  moveUp(range){
    this.blocks.forEach(block => {
      block.y -= range
    });
    return this
  }
  moveDown(range) {
    this.blocks.forEach(block => {
      block.y += range
    })
  }
  moveLeft(range) {
    this.blocks.forEach(block => {
      block.x -= range
    })
  }
  moveRight(range) {
    this.blocks.forEach(block => {
      block.x += range
    })
  }
}