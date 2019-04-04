import { Graphics } from "pixi.js";
import Scrollbox from "pixi-scrollbox";

import Block from '@/flowchart-app/Block'

export default function workspaceMap(options) {
  const map = new Scrollbox(options)
  let mapSize = 3000
  // temp: workspace map -> generate + expand map
  map.background = map.content.addChild(new Graphics())
  map.background.beginFill(0xEDEDED).drawRect(0, 0, mapSize, mapSize).endFill()
  // console.log(map)

  map.focus = null

  map.drag = function (setting) {
    map.dragScroll = setting
  }

  map.closeAllClickMode = () => {
    if (map.focus) {
      map.focus.closeClickMode()
    }
  }

  return map
}