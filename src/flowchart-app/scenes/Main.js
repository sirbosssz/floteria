// import phaser class(es)
import { Scene } from 'phaser'
// import scenes
import Editor from './Editor'
import Controller from './Controller'
import LabOutput from './LabOutput'
import LessonOutput from './LessonOutput'
// import storage state
import storage from '../storage'

// for Main: Contains all Sub Scenes
export default class Main extends Scene {
  constructor() {
    super({ key: 'Main' })
    console.log('load scene: Main')
    // console.log(['on Main', storage])
  }
  create() {
    let resolution = {
      width: this.game.config.width,
      height: this.game.config.height,
    }

    // editor zone
    // landscape
    this.loadScene({
      key: 'editor',
      x: resolution.width/3,
      y: 0,
      width: (resolution.width/3) + resolution.width,
      height: resolution.height
    }, Editor)
    // protrait

    // output zone
    if (storage.type == 'lab') {
      // landscape
      this.loadScene({
        key: 'lab',
        x: 0,
        y: 0,
        width: resolution.width/3,
        height: resolution.height
      }, LabOutput)
      // protrait
    } else {
      // landscape
      this.loadScene({
        key: 'lesson',
        x: 0,
        y: 0,
        width: resolution.width/3,
        height: resolution.height
      }, LessonOutput)
      // protrait
    }

  }

  loadScene(config, sceneClass) {
    const handle = {
      key: config.key,
    }
    const area = this.add.zone(config.x, config.y, config.width, config.height).setOrigin(0);
    const window = new sceneClass(handle, area);

    this.scene.add(config.key, window, true);
  }
}