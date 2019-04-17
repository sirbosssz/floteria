import { Scene } from 'phaser'

export default class LessonOutput extends Scene {
  constructor(config, parent) {
    super(config)
    this.parent = parent;
    console.log('load scene: LessonOutput')
  }
}