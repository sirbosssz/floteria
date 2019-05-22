// import phaser class(es)
import { Scene } from "phaser";
// import scenes
import Editor from "./Editor";
import LabOutput from "./LabOutput";
import LessonOutput from "./LessonOutput";
import Instruction from "./Instruction";
// import storage state
import storage from "../storage";

// for Main: Contains all Sub Scenes
export default class Main extends Scene {
  constructor() {
    super({ key: "Main" });
    console.log("load scene: Main");
  }
  create() {
    let resolution = this.game.config.width / this.game.config.height;
    let outputSize =
      resolution > 1.7
        ? this.game.config.width / 4
        : this.game.config.width / 3;

    // output zone
    if (storage.type == "lab") {
      // editor zone
      // landscape
      this.loadScene(
        {
          key: "editor",
          x: outputSize,
          y: 0,
          width: outputSize + this.game.config.width,
          height: this.game.config.height
        },
        Editor
      );
      // protrait
      // landscape
      this.loadScene(
        {
          key: "lab",
          x: 0,
          y: 0,
          width: outputSize,
          height: this.game.config.height
        },
        LabOutput
      );
      // protrait
    } else {
      // editor zone
      // landscape
      this.loadScene(
        {
          key: "editor",
          x: outputSize,
          y: 60,
          width: outputSize + this.game.config.width,
          height: this.game.config.height
        },
        Editor
      );
      // protrait
      // instruction
      this.loadScene(
        {
          key: "instruction",
          x: outputSize,
          y: 0,
          width: this.game.config.width - outputSize,
          height: 60
        },
        Instruction
      );
      // landscape
      this.loadScene(
        {
          key: "lesson",
          x: 0,
          y: 0,
          width: outputSize,
          height: this.game.config.height
        },
        LessonOutput
      );
      // protrait
    }
    var scenes = {
      editor: this.scene.get("editor"),
      output: this.scene.get(storage.type)
    };
    // console.log(this.scene.get('editor'))
  }

  loadScene(config, sceneClass) {
    const handle = {
      key: config.key
    };
    const area = this.add
      .zone(config.x, config.y, config.width, config.height)
      .setOrigin(0);
    const window = new sceneClass(handle, area);
    this.scene.add(config.key, window, true);
  }
}
