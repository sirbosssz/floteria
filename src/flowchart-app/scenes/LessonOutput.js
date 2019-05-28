import { Scene } from "phaser";
import storage from "../storage";

export default class LessonOutput extends Scene {
  constructor(config, parent) {
    super(config);
    this.parent = parent;
    console.log(["load scene: LessonOutput", this]);
  }
  create() {
    let background = this.add
      .rectangle(
        this.parent.x,
        this.parent.y,
        this.parent.width,
        this.parent.height,
        0xf9f9f9
      )
      .setOrigin(0);

    // output area
    this.monitor = this.add
      .sprite(this.parent.x + 10, this.parent.y + 10, "output_lesson")
      .setOrigin(0);
    this.monitorScale = this.parent.width / (this.monitor.width + 20);
    this.monitor.setScale(this.monitorScale);

    // button area
    this.run = this.add
      .sprite(
        this.parent.x + 15,
        this.parent.y + 15 + this.monitor.height * this.monitorScale + 10,
        "c_run"
      )
      .setOrigin(0)
      .setInteractive();
    // this.step = this.add
    //   .sprite(
    //     this.parent.x + 30 + this.run.width,
    //     this.parent.y + 15 + this.monitor.height * this.monitorScale + 10,
    //     "c_step"
    //   )
    //   .setOrigin(0)
    //   .setInteractive();

    this.currentCommand = this.add
    .text(
      this.parent.x + 15,
      this.parent.y + 15 + this.monitor.height * this.monitorScale + 10 + this.run.height,
      'current command:',
      {
        font: "bold 12pt Quark",
        color: "#383838",
      }
    )
    .setOrigin(0);

    this.flowIndex = 0;
    this.caseIndex = 0;
    this.var = {
      ออร์เดอร์: null,
      ของหวาน: null,
      เครื่องดื่ม: null,
      จำนวนลูกค้า: null,
      ราคา: null,
      ราคาของหวาน: null,
      ราคาเครื่องดื่ม: null
    };
    this.choices = [];

    this.run.on("pointerdown", pointer => {
      console.log(["run lesson", storage.flow]);
      if (this.flowIndex < storage.flow.length) {
        if (this.textbox) {
          this.deleteTextBox();
        }
        if (this.item) {
          this.deleteSpawnItem();
        }
        const block = storage.flow[this.flowIndex];
        console.log(["on command block..", block]);
        this.runCommand(block);
        this.flowIndex++;
      } else {
        this.resetCommand();
      }
      const block = storage.flow[this.flowIndex];
    });
    
  }

  runCommand(block) {
    const testCase = storage.testcase[0].case[this.caseIndex];
    console.log(testCase);
    if (block.type === "start") {
      console.log("start");
      this.commandStart(block);
      this.currentCommand.text = 'current command: start'
    } else if (block.type === "end") {
      console.log("end");
      this.commandEnd(block);
      this.currentCommand.text = 'current command: end'
    } else if (block.type === "input") {
      console.log("input");
      this.currentCommand.text = 'current command: input'
      if (block.var === testCase.input) {
        this.commandInput(block);
      } else {
        this.showTextbox("คำสั่งไม่ถูกต้อง ยกเลิกการทำงานของโปรแกรม");
        this.resetCommand();
      }
    } else if (block.type === "output") {
      console.log("output");
      this.currentCommand.text = 'current command: output'
      if (block.var === testCase.output) {
        this.commandOutput(block);
      } else {
        this.showTextbox("คำสั่งไม่ถูกต้อง ยกเลิกการทำงานของโปรแกรม");
        this.resetCommand();
      }
    } else if (block.type === "operation") {
      this.currentCommand.text = 'current command: operation'
      console.log("operation");
      this.commandOperation(block);
    } else if (block.type === "condition") {
      console.log("condition");
      this.currentCommand.text = 'current command: condition'
      if (block.var === testCase.condition) {
        this.commandCondition(block);
      } else {
        this.showTextbox("คำสั่งไม่ถูกต้อง ยกเลิกการทำงานของโปรแกรม");
        this.resetCommand();
      }
    }
  }

  commandCondition(block) {
    if (block.var === "ออร์เดอร์") {
      if (this.var.ออร์เดอร์ === null) {
        this.showTextbox(
          "ยังไม่ได้ถามลูกค้าว่าต้องการรับออร์เดอร์อะไร ยกเลิกการทำงานของโปรแกรม"
        );
        this.resetCommand();
      } else if (this.var.ออร์เดอร์ === "ของหวาน") {
        this.commandInput(block.yes[0]);
        this.currentCommand.text = 'current command: condition > input'
      } else {
        this.commandInput(block.no[0]);
        this.currentCommand.text = 'current command: condition > input'
      }
    }
  }

  commandOperation(block) {
    if (block.var === "ราคาของหวาน") {
      this.showTextbox("ได้กำหนดราคาของหวานชิ้นละ 35 บาท");
      this.var.ราคาของหวาน = 35;
    } else if (block.var === "ราคาเครื่องดื่ม") {
      this.showTextbox("ได้กำหนดราคาของเครื่องดื่มแก้วละ 40 บาท");
      this.var.ราคาเครื่องดื่ม = 40;
    } else if (block.var === "ราคา") {
      if (this.var.ราคาของหวาน === null || this.var.ราคาเครื่องดื่ม === null) {
        this.showTextbox("กำหนดราคาไม่ครบ ยกเลิกการทำงานของโปรแกรม");
        this.resetCommand();
      } else {
        this.showTextbox("คำนวณราคาเรียบร้อย");
        this.var.ราคา = 35 + 40;
      }
    }
  }

  commandOutput(block) {
    if (block.var === "เครื่องดื่ม") {
      if (this.var.เครื่องดื่ม === null) {
        this.showTextbox(
          "ยังไม่ได้รับออร์เดอร์เครื่องดื่ม ยกเลิกการทำงานของโปรแกรม"
        );
        this.resetCommand();
      } else {
        // spawn item
        this.showTextbox("รายการเครื่องดื่มคือ " + this.var.เครื่องดื่ม);
        this.spawnItem(this.var.เครื่องดื่ม);
      }
    } else if (block.var === "ของหวาน") {
      if (this.var.เครื่องดื่ม === null) {
        this.showTextbox(
          "ยังไม่ได้รับออร์เดอร์ของหวาน ยกเลิกการทำงานของโปรแกรม"
        );
        this.resetCommand();
      } else {
        // spawn item
        this.showTextbox("รายการของหวานคือ " + this.var.ของหวาน);
        this.spawnItem(this.var.ของหวาน);
        this.item.setScale(1.5);
      }
    } else if (block.var === "ราคา") {
      if (this.var.ราคา === null) {
        this.showTextbox("ยังไม่ได้กำหนดราคา ยกเลิกการทำงานของโปรแกรม");
        this.resetCommand();
      } else {
        this.showTextbox("ราคาทั้งหมด " + this.var.ราคา + " บาท");
      }
    }
    this.caseIndex++;
  }

  commandInput(block) {
    let question = "";
    let choices = [];
    if (block.var === "เครื่องดื่ม") {
      question = "รับเครื่องดื่มอะไรดี";
      choices = ["กาแฟ", "โกโก้", "ชา"];
    } else if (block.var === "ของหวาน") {
      question = "รับของหวานอะไรดี";
      choices = ["ขนมปัง", "ครัวซองค์", "คุ๊กกี้"];
    } else if (block.var === "ออร์เดอร์") {
      question = "จะรับอะไรดี";
      choices = ["ของหวาน", "เครื่องดื่ม"];
    }
    this.textbox = this.add
      .sprite(
        this.monitor.x + (this.monitor.width * this.monitorScale) / 2.5,
        this.monitor.y + 20,
        "o_textbox"
      )
      .setOrigin(0)
      .setScale(this.monitorScale);

    this.outputText = this.add
      .text(
        this.textbox.x + 10 * this.monitorScale,
        this.textbox.y + 10 * this.monitorScale,
        question,
        {
          font: "bold 12pt Quark",
          color: "#383838",
          wordWrap: {
            width: this.textbox.width - 20 * this.monitorScale
          }
        }
      )
      .setOrigin(0);

    let x = 10;
    choices.forEach(child => {
      let text = this.add
        .text(
          this.textbox.x + x * this.monitorScale,
          this.textbox.y + 30 * this.monitorScale,
          child,
          {
            font: "bold 12pt Quark",
            color: "#07abd1"
          }
        )
        .setOrigin(0)
        .setInteractive();

      text.on("pointerdown", pointer => {
        if (block.var === "เครื่องดื่ม") {
          this.var.เครื่องดื่ม = text.text;
        } else if (block.var === "ของหวาน") {
          this.var.ของหวาน = text.text;
        } else if (block.var === "ออร์เดอร์") {
          this.var.ออร์เดอร์ = text.text;
        }

        text.setColor("#3ef7e1");
      });
      x += 50;
      this.choices.push(text);
    });
    this.caseIndex++;
  }

  commandEnd(block) {
    if (storage.testcase[0].case.length !== this.caseIndex) {
      this.showTextbox("จบการทำงาน แต่โปรแกรมยังไม่ผ่านการทดสอบ");
      this.resetCommand();
    } else {
      this.showTextbox("จบการทำงาน และผ่านการทดสอบ!!");
      this.resetCommand();
    }
  }

  commandStart(block) {
    this.showTextbox("เริ่มต้น");
  }

  resetCommand() {
    this.flowIndex = -1;
    this.caseIndex = 0;
    this.var = {
      ออร์เดอร์: null,
      ของหวาน: null,
      เครื่องดื่ม: null,
      จำนวนลูกค้า: null,
      ราคา: null,
      ราคาของหวาน: null,
      ราคาเครื่องดื่ม: null
    };
    console.log("reset command");
  }
  showTextbox(text) {
    this.textbox = this.add
      .sprite(
        this.monitor.x + (this.monitor.width * this.monitorScale) / 2.5,
        this.monitor.y + 20,
        "o_textbox"
      )
      .setOrigin(0)
      .setScale(this.monitorScale);
    this.outputText = this.add
      .text(
        this.textbox.x + 10 * this.monitorScale,
        this.textbox.y + 10 * this.monitorScale,
        text,
        {
          font: "bold 12pt Quark",
          color: "#383838",
          wordWrap: {
            width: this.textbox.width - 20 * this.monitorScale
          }
        }
      )
      .setOrigin(0);
  }
  spawnItem(item_name) {
    this.item = this.add
      .sprite(
        this.monitor.x + (this.parent.width / 3) * 2,
        this.monitor.y + (this.monitor.height * this.monitorScale) / 1.8,
        item_name
      )
      .setOrigin(0.5, 1);
  }
  deleteTextBox() {
    this.textbox.destroy();
    this.outputText.destroy();
  }
  deleteSpawnItem() {
    this.item.destroy();
  }
}
