import { Scene } from "phaser";

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
        this.textbox.y + 15 * this.monitorScale,
        text,
        {
          fontFamily: "Tahoma",
          fontSize: 14,
          color: "#383838"
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
