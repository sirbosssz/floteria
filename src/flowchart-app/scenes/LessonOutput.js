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
        this.parent.y + this.monitor.height * this.monitorScale + 10,
        "c_run"
      )
      .setOrigin(0)
      .setInteractive();

    this.run.on("pointerdown", pointer => {
      console.log(["run lesson", storage.flow]);
      if (this.flowIndex < storage.flow.length) {
        if (this.textbox) {
          this.deleteTextBox();
        }
        if (this.choices.length > 0) {
          this.choices.forEach(child => {
            child.destroy();
          });
        }
        if (this.item) {
          this.deleteSpawnItem();
        }
        const block = storage.flow[this.flowIndex];
        console.log(["on command block..", block]);
        this.runCommand(block);
        this.flowIndex++;
      } else {
        clearInterval(this.flowRun);
        this.caseIndex = 0;
        this.var = [];
      }
    });

    // var zones
    this.var = [];
    this.caseIndex = 0;
    this.flowIndex = 0;
    this.choices = [];
  }

  runCommand(block) {
    const testCase = storage.testcase[0].case[this.caseIndex];
    if (block.type === "start") {
      this.showTextbox("เริ่มต้น");
    } else if (block.type === "end") {
      console.log(storage.testcase[0].case.length);
      if (storage.testcase[0].case.length !== this.caseIndex) {
        this.showTextbox("จบการทำงาน แต่โปรแกรมยังไม่ผ่านการทดสอบ");
        this.flowIndex = 0;
        this.caseIndex = 0;
        this.var = [];
      } else {
        this.showTextbox("จบการทำงาน โปรแกรมที่เขียนได้ผ่านการทดสอบ");
        this.flowIndex = 0;
        this.caseIndex = 0;
        this.var = [];
      }
    } else if (block.type === "input") {
      if (block.var === testCase.input) {
        //pass
        // open selector
        this.showChoicesBox(block.var);
        console.log("case " + this.caseIndex + ": passed");
        this.caseIndex++;
      } else {
        // not pass
        console.log("case " + this.caseIndex + ": not passed");
        this.showTextbox("คำสั่งไม่ถูกต้อง ยกเลิกการทำงานของโปรแกรม");
        this.flowIndex = 0;
        this.caseIndex = 0;
        this.var = [];
      }
      // save input to var
      this.var[block.var] = "";
      console.log(this.var);
    } else if (block.type === "output") {
      if (block.var === testCase.output) {
        // spawn item
        console.log(this.var[block.var]);
        switch (this.var[block.var]) {
          case "ขนมปัง":
            this.spawnItem("o_bread");
            break;
          case "ครัวซองค์":
            this.spawnItem("o_croissant");
            break;
          case "คุ๊กกี้":
            this.spawnItem("o_cookies");
            break;
          case "กาแฟ":
            this.spawnItem("o_coffee");
            break;
          case "โกโก้":
            this.spawnItem("o_cocoa");
            break;
          case "ชา":
            this.spawnItem("o_tea");
            break;
          case "ราคา":
            if (this.var["ราคา_ของหวาน"] && this.var["ราคา_เครื่องดื่ม"]) {
            }
            break;
          case "ราคา_ของหวาน":
            if (this.var[block.var]) {
              switch (this.var["ของหวาน"]) {
                case "ขนมปัง":
                  this.showTextbox(`ราคาทั้งหมด ${this.var[block.var].bread}`);
                  break;
                case "ครัวซองค์":
                  this.showTextbox(
                    `ราคาทั้งหมด ${this.var[block.var].croissant}`
                  );
                  break;
                case "คุ๊กกี้":
                  this.showTextbox(
                    `ราคาทั้งหมด ${this.var[block.var].cookies}`
                  );
                  break;
                default:
                  break;
              }
            } else {
              this.showTextbox("คำสั่งไม่ถูกต้อง ยกเลิกการทำงานของโปรแกรม");
              this.flowIndex = 0;
              this.caseIndex = 0;
              this.var = [];
            }
            break;
          default:
            this.howTextbox("เมนูนี้ไม่ได้สั่งไว้");
            break;
        }
        console.log("case " + this.caseIndex + ": passed");
        this.caseIndex++;
      } else if (block.type === "operation") {
        this.var[block.var] = "";
        this.showTextbox("กำหนดตัวแปร " + block.var);
        if (block.var === "ราคา") {
          this.var[block.var] = {
            bread: 40,
            croissant: 45,
            cookies: 50,
            coffee: 75,
            cocoa: 65,
            tea: 70
          };
        } else if (block.var === "ราคา_ของหวาน") {
          this.var[block.var] = {
            bread: 40,
            croissant: 45,
            cookies: 50
          };
        } else if (block.var === "ราคา_เครื่องดื่ม") {
          this.var[block.var] = {
            coffee: 75,
            cocoa: 65,
            tea: 70
          };
        }
      } else {
        console.log("case " + this.caseIndex + ": not passed");
        this.showTextbox("คำสั่งไม่ถูกต้อง ยกเลิกการทำงานของโปรแกรม");
        this.flowIndex = 0;
        this.caseIndex = 0;
        this.var = [];
      }
    }
  }

  showChoicesBox(varname) {
    let question = "";
    let choices = [];
    if (varname === "เครื่องดื่ม") {
      question = "รับเครื่องดื่มอะไรดี";
      choices = ["กาแฟ", "โกโก้", "ชา"];
    } else if (varname === "ของหวาน") {
      question = "รับของหวานอะไรดี";
      choices = ["ขนมปัง", "ครัวซองค์", "คุ๊กกี้"];
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
        this.var[varname] = text.text;
        console.log(this.var[varname]);

        text.setColor("#3ef7e1");
      });
      x += 50;
      this.choices.push(text);
    });
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
