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
    const sceneConfig = {
      width: 2048,
      height: 2048
    }
    // map bounds
    this.cameras.main.setBounds(0, 0, sceneConfig.width, sceneConfig.height)

    const background = this.add.rectangle(sceneConfig.width / 2, sceneConfig.height / 2, sceneConfig.width, sceneConfig.height, 0xEAEAEA);

    // load flow from storage
    this.loadFlow();

    // TODO: add UI Blocks Bar
    // TODO: add UI Control
    // TODO: add Editor Area

    // test object
    let terminal = this.add.sprite(400, 80, 'block_terminal').setOrigin(0).setInteractive();
    terminal.flowData = { name: 'start', type: 'terminal' }
    this.input.setDraggable(terminal);
    storage.flow.push(terminal)
    let arrow1 = this.add.sprite(terminal.x + (terminal.width / 2), terminal.y + terminal.height, 'arrow').setOrigin(0.5, 0).setInteractive();
    arrow1.input.dropZone = true;
    terminal.arrow = arrow1;
    terminal.arrow.index = storage.flow.findIndex(flow => flow === terminal)

    let terminal2 = this.add.sprite(0, 30, 'block_terminal').setOrigin(0).setInteractive();
    this.input.setDraggable(terminal2);
    terminal2.flowData = { name: 'stop', type: 'terminal' }

    let opertaion1 = this.add.sprite(0, 90, 'block_operations').setOrigin(0).setInteractive();
    opertaion1.flowData = { name: 'set', type: 'operation', var: {name: 'test', value: 'text1'} }
    this.input.setDraggable(opertaion1);

    let opertaion2 = this.add.sprite(0, 170, 'block_operations').setOrigin(0).setInteractive();
    opertaion2.flowData = { name: 'set', type: 'operation', var: {name: 'test', value: 'text2'}}
    this.input.setDraggable(opertaion2);

    let io1 = this.add.sprite(0, 250, 'block_io').setOrigin(0).setInteractive();
    io1.flowData = { name: 'print', type: 'output', var: {name: 'test'} }
    this.input.setDraggable(io1);

    let condition1 = this.add.sprite(0, 330, 'block_decision').setOrigin(0).setInteractive();
    condition1.flowData = { type: 'condition', data: 1 }
    this.input.setDraggable(condition1);

    let loop1 = this.add.sprite(0, 420, 'block_decision').setOrigin(0).setInteractive();
    loop1.flowData = { type: 'loop', data: 1 }
    this.input.setDraggable(loop1);

    // drag events
    this.input.on('dragstart', (pointer, object) => {
      this.children.bringToTop(object)
    })

    this.input.on('drag', (pointer, object, dragX, dragY) => {
      // todo: change to class and move all child in methods
      object.x = dragX;
      object.y = dragY;

      let newX = object.x + (object.width / 2)
      let newY = object.y + object.height
      // check arrow
      if (object.arrow != null) {
        object.arrow.x = newX
        object.arrow.y = newY
        newY += object.arrow.height
      }

      // search for next // check if in array: storage.flow
      let index = storage.flow.findIndex(flow => flow === object)
      if (index < storage.flow.length - 1 && index !== -1) {
        for (let i = index + 1; i < storage.flow.length; i++) {
          storage.flow[i].x = newX - (storage.flow[i].width / 2)
          storage.flow[i].y = newY
          newY += storage.flow[i].height
          if (storage.flow[i].arrow != null) {
            storage.flow[i].arrow.x = newX
            storage.flow[i].arrow.y = newY
            newY += storage.flow[i].arrow.height
          }
        }
      }
    })

    this.input.on('dragenter', (pointer, object, dropZone) => {
      console.log(['drop on', dropZone])
    })

    this.input.on('drop', (pointer, object, dropZone) => {
      object.x = dropZone.x - (object.width / 2)
      object.y = dropZone.y + dropZone.height

      let newY
      // generate arrow
      if (object.flowData.type == 'operation' || object.flowData.type == 'output' || object.flowData.type == 'input') {
        newY = object.y + object.height
        let newArrow = this.add.sprite(object.x + (object.width / 2), object.y + object.height, 'arrow').setOrigin(0.5, 0).setInteractive();
        newArrow.input.dropZone = true;
        object.arrow = newArrow;
        object.arrow.index = storage.flow.findIndex(flow => flow === object)
        object.arrow.index = dropZone.index + 1

      } else if (object.flowData.type == 'condition') {
        newY = object.y + 32 + object.height
        // create condition group
        let newArrow = this.add.sprite(object.x + (object.width / 2), object.y + 32 + object.height, 'arrow').setOrigin(0.5, 0).setInteractive();
        newArrow.input.dropZone = true;
        object.arrow = newArrow;
        object.arrow.index = storage.flow.findIndex(flow => flow === object)
        object.arrow.index = dropZone.index + 1

        let leftArrow = this.add.sprite(object.x - 50, object.y + object.height, 'arrow').setOrigin(0.5, 0).setInteractive();
        leftArrow.input.dropZone = true;
        object.leftArrow = leftArrow;
        leftArrow.inBranch = 'left'
        leftArrow.condition = object

        let rightArrow = this.add.sprite(object.x + object.width + 50, object.y + object.height, 'arrow').setOrigin(0.5, 0).setInteractive();
        rightArrow.input.dropZone = true;
        object.rightArrow = rightArrow;
        rightArrow.inBranch = 'right'
        rightArrow.condition = object

        object.newY = newY
        // console.log(['generate Arrow', newArrow, leftArrow, rightArrow])
      } else if (object.flowData.type == 'loop') {
        newY = object.y + 40 + object.height
        let newArrow = this.add.sprite(object.x + (object.width / 2), object.y + 42 + object.height, 'arrow').setOrigin(0.5, 0).setInteractive();
        newArrow.input.dropZone = true;
        object.arrow = newArrow;
        object.arrow.index = storage.flow.findIndex(flow => flow === object)
        object.arrow.index = dropZone.index + 1

        let childArrow = this.add.sprite(object.x + (object.width / 2), object.y + object.height, 'arrow').setOrigin(0.5, 0).setInteractive();
        childArrow.input.dropZone = true;
        object.childArrow = childArrow;
        childArrow.loop = object

        object.newY = newY
      }

      // insert to flow storage state
      storage.flow.splice(dropZone.index + 1, 0, object)

      // check if in branch
      if (dropZone.condition != undefined) {
        let parent = dropZone.condition
        // move next arrow
        // parent.arrow.y = newY
      } else if (dropZone.loop != undefined) {
        let parent = dropZone.loop
        // move next arrow
        // parent.arrow.y = newY + parent.arrow.height + 10
      }

      object.input.enabled = false
      dropZone.input.dropZone = false
    })

    this.input.on('dragend', (pointer, object) => {
      console.log(['stop drag', object])
    })

    // add run button
    let run_button = this.add.rectangle(500, 550, 100, 40, 0x330000).setInteractive();
    this.add.text(500, 550, 'RUN step', { font: '16px Quark', fill: '#ededed' }).setOrigin(0.5);

    let current_step = 0
    // run events
    run_button.on('pointerdown', () => {
      this.runFlow(storage.flow[current_step].flowData, current_step)
      current_step++
      if (current_step === storage.flow.length) {
        console.log('----------------end----------------')
        current_step = 0
      }
    })

    // center camera
    this.cameras.main.centerOn(0, 0);
    console.log(storage.flow)
  }

  runFlow(flow, index) {
    console.log(['running', flow])

    // check start
    if (index === 0 && flow.name !== 'start') {
      console.log('----------------error: no start block----------------');
      this.current_step = 0
      return
    }
    // check end
    if (index+1 === storage.flow.length && flow.name !== 'stop') {
      console.log('----------------error: no stop block----------------');
      this.current_step = 0
      return
    }
    // create var
    if (flow.name === 'set') {
      // check var name in flowVar
      let varData = storage.flowData.find(data => data.name === flow.var.name)
      let varIndex = storage.flowData.findIndex(data => data === varData)
      if (varIndex !== -1) { // found
        storage.flowData[varIndex] = flow.var
      } else { // not found
        storage.flowData.push(flow.var)
      }
    }
    // output
    if (flow.name === 'print') {
      let data
      if (flow.var !== undefined) {
        data = storage.flowData.find(text => text.name == flow.var.name)
        data = data.value
      } else {
        data = flow.message
      }
      console.log(`OUTPUT: ${data}`)
    }
  }

  loadFlow() {
    storage.flow = []
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