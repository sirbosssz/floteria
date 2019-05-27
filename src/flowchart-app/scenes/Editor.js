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
    storage.flow = [];
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

    // dock command list
    let command = [
      {
        type: "input",
        text: "รับออร์เดอร์ของหวาน",
        var: "ของหวาน",
        graphic: "block_order_dessert"
      },
      {
        type: "input",
        text: "รับออร์เดอร์เครื่องดื่ม",
        var: "เครื่องดื่ม",
        graphic: "block_order_drink"
      },
      {
        type: "input",
        text: "ถามลูกค้าว่าจะรับออร์เดอร์อะไร",
        var: "ออร์เดอร์",
        graphic: "block_ask_order"
      },
      {
        type: "input",
        text: "ถามจำนวนลูกค้า",
        var: "จำนวนลูกค้า",
        graphic: "block_count_customer"
      },
      {
        type: "output",
        text: "เสิร์ฟของหวาน",
        var: "ของหวาน",
        graphic: "block_serve_dessert"
      },
      {
        type: "output",
        text: "เสิร์ฟเครื่องดื่ม",
        var: "เครื่องดื่ม",
        graphic: "block_serve_drink"
      },
      {
        type: "output",
        text: "บอกราคา",
        var: "ราคา",
        graphic: "block_tell_price"
      },
      {
        type: "operation",
        text: "กำหนดราคาของหวาน",
        var: "ราคาของหวาน",
        graphic: "block_dessert_price"
      },
      {
        type: "operation",
        text: "กำหนดราคาเครื่องดื่ม",
        var: "ราคาเครื่องดื่ม",
        graphic: "block_drink_price"
      },
      {
        type: "operation",
        text: "รวมราคาของหวาน + เครื่องดื่ม",
        var: "ราคา",
        graphic: "block_combine_price"
      }
    ];

    if (storage.exerciseData.command && storage.exerciseData.command !== undefined) {
      command = storage.exerciseData.command
    }

    // dock zone
    const dock = this.add.graphics();
    dock.fillStyle(0xd8d8d8, 1);
    dock.fillRect(this.parent.x, this.parent.y, 150, this.parent.height);

    let dockY = this.parent.y;
    let index = 0;
    command.forEach(block => {
      let block_menu = new Block(this, this.parent.x, dockY, block.graphic)
        .setOrigin(0.5)
        .setInteractive();
      block_menu.moveTo(this.parent.x + 75, dockY + 20 + block_menu.height / 2);
      block_menu.onDock = true;
      block_menu.index = index;
      block_menu.setFlowData(block);
      this.input.setDraggable(block_menu);
      dockY += block_menu.height + 20;
    });

    this.blockSet = new BlockSet(this);
    this.id = 0;
    let flow = [];
    let starter1 = new Block(
      this,
      this.parent.x + 400,
      this.parent.y + 100,
      "block_start"
    )
      .setOrigin(0.5)
      .setInteractive();
    starter1.flowData = {
      type: "start",
      graphic: "block_start"
    };
    starter1.addArrow(this);
    starter1.id = this.id++;
    starter1.type = "terminal";
    this.blockSet.addChild(starter1);
    this.blockSet.insertToFlow(starter1, 0);
    this.input.setDraggable(starter1);

    let starter2 = new Block(
      this,
      this.parent.x + 400,
      this.parent.y + 100 + starter1.height + starter1.arrow.height,
      "block_end"
    )
      .setOrigin(0.5)
      .setInteractive();
    starter2.flowData = {
      type: "end",
      graphic: "block_end"
    };
    starter2.id = this.id++;
    starter2.type = "terminal";
    this.blockSet.addChild(starter2);
    this.blockSet.insertToFlow(starter2, 1);
    this.blockSet.flowReposition();
    this.input.setDraggable(starter2);

    this.blockSet.getFlowData();

    // drag events
    this.input.on("dragstart", (pointer, object) => {
      // create new block from dock
      if (!object.background && object.type !== "terminal") {
        if (object.onDock) {
          let newBlockMenu = new Block(
            this,
            object.x,
            object.y,
            object.flowData.graphic
          )
            .setOrigin(0.5)
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
        this.children.bringToTop(object);
        this.children.bringToTop(object.text);
      }
      this.blockSet.removeChildHoverExcept(object);
    });

    this.input.on("drag", (pointer, object, dragX, dragY) => {
      if (!object.background && object.type !== "terminal") {
        object.moveTo(dragX, dragY);
        if (this.blockSet.getFlowIndex(object) !== -1) {
          this.blockSet.removeFromFlow(object);
          this.blockSet.flowReposition();
          object.removeArrow();
        }
      } else if (object.type === "terminal") {
        this.blockSet.moveFlow(dragX, dragY, object);
      } else if (object.background) {
      }
    });

    this.input.on("drop", (pointer, object, dropzone) => {
      if (dropzone.type === "remove") {
        if (object.type !== "terminal") {
          // remove object
          this.removeZone.setDepth(-1);
          this.blockSet.removeChild(object);
          object.remove();
        }
      }
      if (dropzone.type === "arrow") {
        // insert block to flow
        const arrowIndex = this.blockSet.getFlowIndex(dropzone.parent);
        this.blockSet.insertToFlow(object, arrowIndex);
        this.blockSet.flowReposition();
      }
      object.setDepth(2);
    });

    this.input.on("dragend", (pointer, object, dropped) => {
      // move flowdata to storage
      storage.flow = this.blockSet.getFlowData();

      if (!dropped) {
      }
      this.removeZone.setDepth(-1);
      // console.log(["current flow", this.blockSet.flow]);
    });
  }
}
