import { Scene } from 'phaser'

export default class Controller extends Scene {
  constructor(config, parent) {
    super(config)
    this.parent = parent;
    console.log('load scene: Controller')
  }
}