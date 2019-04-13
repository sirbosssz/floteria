import {Scene} from 'phaser'

export default class LessonOutput extends Scene{
  constructor() {
    super({key: 'LessonOutput'})
    console.log('load scene: LessonOutput')
  }
}