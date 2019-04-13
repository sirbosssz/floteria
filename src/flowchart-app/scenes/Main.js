// import phaser class(es)
import {Scene} from 'phaser'
// import scenes
import Editor from './Editor'
import Controller from './Controller'
import LabOutput from './LabOutput'
import LessonOutput from './LessonOutput'
// import storage state
import storage from '../storage'

// for Main: Contains all Sub Scenes
export default class Main extends Scene{
  constructor() {
    super({key: 'Main'})
    console.log('load scene: Main')
    // console.log(['on Main', storage])
  }
}