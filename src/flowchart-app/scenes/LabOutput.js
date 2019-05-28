import { Scene } from "phaser";

import Controller from "./Controller";
import storage from "../storage";

export default class LabOutput extends Scene {
  constructor(config, parent) {
    super(config);
    this.parent = parent;
    console.log(["load scene: LabOutput", this]);
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

    this.monitor = this.add
      .sprite(this.parent.x, this.parent.y, "output_lab")
      .setOrigin(0);
    let scale = this.parent.width / this.monitor.width;
    this.monitor.setScale(scale);

    let placholderText = this.add.text(
      this.monitor.x + 22,
      this.monitor.y + 14,
      "ผลลัพธ์",
      {
        fontFamily: "Tahoma",
        fontSize: 14,
        fontWeight: "Bold",
        color: "#383838"
      }
    );
    let horizontal_line = this.add
      .rectangle(
        placholderText.x,
        placholderText.y + 20,
        this.monitor.width - 80,
        1,
        0x383838
      )
      .setOrigin(0);

    //output show here
    this.outputText = this.add.text(
      horizontal_line.x,
      horizontal_line.y + 8,
      "แสดงข้อมูลผลลัพธ์ที่นี่",
      {
        fontFamily: "Tahoma",
        fontSize: 14,
        color: "#383838"
      }
    );

    // run button
    const run_button = this.add
      .sprite(this.monitor.x+15, this.monitor.y + this.monitor.height * scale+15, "c_run")
      .setOrigin(0)
      .setInteractive()
      .setScale(0.8);

    run_button.on("pointerdown", pointer => {
      console.log(["run program", storage.flow]);
      let index = 0;
      let run = setInterval(() => {
        if (index < storage.flow.length) {
          console.log(storage.flow[index]);
          if (storage.flow[index].type === "start") {
            this.outputText.text = "เริ่มต้น";
          }
          else if (storage.flow[index].type === "output") {
            this.outputText.text = ">>> " + storage.flow[index].message;
          } else if (storage.flow[index].type === "end") {
            this.outputText.text = "---- จบ ----";
          }
          index++;
        } else {
          clearInterval(run);
        }
      }, 1000);
    });
  }
}
