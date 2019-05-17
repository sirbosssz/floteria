// import phaser class(es)
import { Scene } from "phaser";
import Block from "../block/Block";
import BlockSet from "../block/BlockSet";
// import storage state
import storage from "../storage";

export default class Editor extends Scene {
  constructor(config, parent) {
    super(config);
    this.parent = parent;
    console.log(["load scene: Editor", this]);
  }

  create() {
    storage.flow = []
    this.background = this.add
      .rectangle(
        this.parent.x,
        this.parent.y,
        this.parent.width,
        this.parent.height,
        0xeaeaea
      )
      .setOrigin(0)
      .setInteractive();
    this.background.background = true;
    this.input.setDraggable(this.background);
    // insert dock menu
    const dockList = [
      // "b_input_normal",
      "b_output_normal",
      "b_output_normal"
      // "b_operation_normal",
      // "b_condition_normal",
      // "b_while_normal",
      // "b_for_normal"
    ];
    const dockMenuList = [
      // "Input",
      "Output",
      "Output"
      // "Operation",
      // "Condition",
      // "While Loop",
      // "For Loop"
    ];
    const dockCommand = [
      {
        type: "output",
        message: "Hello"
      },
      {
        type: "output",
        message: "Bye"
      }
    ];

    // remove block zone
    this.removeZone = this.add
      .rectangle(
        this.parent.x,
        this.parent.y,
        150,
        this.parent.height,
        0xee0000
      )
      .setOrigin(0)
      .setInteractive();
    this.removeZone.input.dropZone = true;
    this.removeZone.type = "remove";

    // dock zone
    const dock = this.add.graphics();
    dock.fillStyle(0xd8d8d8, 1);
    dock.fillRect(this.parent.x, this.parent.y, 150, this.parent.height);

    let dockY = this.parent.y;
    let index = 0;
    dockList.forEach(block => {
      let block_menu = new Block(this, this.parent.x + 75, dockY, block)
        .setOrigin(0.5, 0)
        .setInteractive();
      block_menu.onDock = true;
      block_menu.index = index;
      block_menu.setFlowData(dockCommand[index++]);
      // block_menu.setCommand(dockMenuList[index]);
      this.input.setDraggable(block_menu);
      dockY += block_menu.block.height + 20;
    });

    this.blockSet = new BlockSet(this);
    this.id = 0;
    let flow = [];
    let starter1 = new Block(
      this,
      this.parent.x + 400,
      this.parent.y + 100,
      "b_terminal_normal"
    )
      .setOrigin(0.5, 0)
      .setInteractive();
    starter1.flowData = {
      type: "start"
    };
    starter1.setCommand("START");
    starter1.addArrow(this);
    starter1.id = this.id++;
    this.blockSet.addChild(starter1);
    this.blockSet.insertToFlow(starter1, 0);

    let starter2 = new Block(
      this,
      this.parent.x + 400,
      this.parent.y + 100 + starter1.block.height + starter1.arrow.height,
      "b_terminal_normal"
    )
      .setOrigin(0.5, 0)
      .setInteractive();
    starter2.flowData = {
      type: "end"
    };
    starter2.setCommand("END");
    starter2.id = this.id++;
    this.blockSet.addChild(starter2);
    this.blockSet.insertToFlow(starter2, 1);
    this.blockSet.flowReposition();

    this.blockSet.getFlowData();

    // drag events
    this.input.on("dragstart", (pointer, object) => {
      // create new block from dock
      if (!object.background) {
        if (object.onDock) {
          let newBlockMenu = new Block(
            this,
            object.x,
            object.y,
            dockList[object.index]
          )
            .setOrigin(0.5, 0)
            .setInteractive();
          newBlockMenu.onDock = true;
          newBlockMenu.index = object.index;
          newBlockMenu.setFlowData(object.flowData);
          // newBlockMenu.setCommand(object.text.text);
          this.input.setDraggable(newBlockMenu);
          // out of dock
          object.onDock = false;
          // insert into editor container
          object.id = this.id++;
          this.blockSet.addChild(object);
        }
        this.removeZone.setDepth(1);
        object.setDepth(5);
        object.text.setDepth(5);
      }
    });

    this.input.on("drag", (pointer, object, dragX, dragY) => {
      if (!object.background) {
        object.moveTo(dragX, dragY);
      } else {
        this.blockSet.moveFlow(dragX, dragY);
      }
    });

    this.input.on("drop", (pointer, object, dropzone) => {
      if (dropzone.type === "remove") {
        // remove object
        this.blockSet.removeChild(object);
        object.remove();
      }
      if (dropzone.type === "arrow") {
        // insert block to flow
        const arrowIndex = this.blockSet.getFlowIndex(dropzone.parent);
        this.blockSet.insertToFlow(object, arrowIndex);
        this.blockSet.flowReposition();
      }
      object.setDepth(2);
      object.text.setDepth(2);
    });

    this.input.on("dragend", (pointer, object, dropped) => {
      // move flowdata to storage
      storage.flow = this.blockSet.getFlowData()

      if (!dropped) {
      }
      this.removeZone.setDepth(-1);
      // console.log(["current flow", this.blockSet.flow]);
    });
  }
}
