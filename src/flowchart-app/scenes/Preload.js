import {Scene} from 'phaser'

// for Preload: load everything and move to Main Scene
export default class Preload extends Scene{
  constructor() {
    super({key: 'Preload'});
    console.log('load scene: Preload')
  }
  preload() {
    // load everything here
  }
  create() {
    this.scene.start('Main')
  }
}