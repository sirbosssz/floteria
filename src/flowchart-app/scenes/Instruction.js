import { Scene } from "phaser";

import storage from "../storage";

export default class Instruction extends Scene {
  constructor(config, parent) {
    super(config);
    this.parent = parent;
    console.log(["load scene: Instruction", this]);
  }

  create() {
    this.background = this.add
      .rectangle(
        this.parent.x,
        this.parent.y,
        this.parent.width,
        this.parent.height,
        0xf9f9f9
      )
      .setOrigin(0);

    this.textbackground = this.add
      .rectangle(
        this.parent.x,
        this.parent.y + 10,
        this.parent.width,
        this.parent.height - 20,
        0xededed
      )
      .setOrigin(0);

    this.text = this.add
      .text(
        this.background.x + 20,
        this.background.y + 18,
        "ทดลองเขียนโปรแกรมตามบล็อคคำสั่งที่กำหนดให้",
        {
          font: "bold 14pt Quark",
          color: "#121212",
          wordWrap: { width: this.parent.width - 40 }
        }
      )
      .setOrigin(0);

    if (storage.exerciseData) {
      this.text.text = "คำสั่ง: " + storage.exerciseData.description.content;
    }
  }
}
