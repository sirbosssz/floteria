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
        0xeaeaea
      )
      .setOrigin(0);

    this.text = this.add.text(
      this.background.x + 20,
      this.background.y + 18,
      "คำสั่ง: ",
      {
        fontFamily: "Quark",
        fontSize: 20,
        color: "#121212"
      }
    ).setOrigin(0)
  }
}
