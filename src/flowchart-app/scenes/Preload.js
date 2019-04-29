// import phaser class(es)
import { Scene } from 'phaser'
// import assets
import bTerminal from '@/assets/svg/b-terminal.svg'
import bOperations from '@/assets/svg/b-operations.svg'
import bIO from '@/assets/svg/b-io.svg'
import bDecision from '@/assets/svg/b-decision.svg'
import connector from '@/assets/svg/connector.svg'

// for Preload: load everything and move to Main Scene
export default class Preload extends Scene {
  constructor() {
    super({ key: 'Preload' });
    console.log('load scene: Preload')
  }
  preload() {
    // load everything here
    this.load.image('block_terminal', bTerminal);
    this.load.image('block_operations', bOperations);
    this.load.image('block_io', bIO);
    this.load.image('block_decision', bDecision);
    this.load.image('arrow', connector);

    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  }
  create() {
    this.scene.start('Main')
  }
}