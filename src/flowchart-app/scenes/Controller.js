import {Scene} from 'phaser'

export default class Controller extends Scene{
  constructor() {
    super({key: 'Controller'})
    console.log('load scene: Controller')
  }
}