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
      }
}
