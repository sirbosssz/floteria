import {Scene} from 'phaser'

export default class Editor extends Scene{
  constructor() {
    super({key: 'Editor'})
    console.log('load scene: Editor')
  }
}