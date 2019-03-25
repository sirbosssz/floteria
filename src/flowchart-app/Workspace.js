import { Application } from "pixi.js";
import WorkspaceMap from '@/flowchart-app/WorkspaceMap'

export default function workspace (options) {
  const app =  new Application({
    view: options.view,
    backgroundColor: options.backgroundColor
  });
  const { width, height } = getCanvasSize(options.view);

  // workspace -> Viewport
  const map = new WorkspaceMap({
    boxWidth: width,
    boxHeight: height,
  });

  app.stage.addChild(map);

  function refreshCanvasSize(canvas, app, map) {
    const { width, height } = getCanvasSize(canvas);
    console.log(['resize', width, height])
    // resize renderer
    app.renderer.resize(width, height);
    //resize map
    map.resize({boxWidth: width, boxHeight:height})
  }

  this.refreshCanvasSize(options.view, app, map);
  window.addEventListener('resize', this.refreshCanvasSize(options.view, app, map))

  // Add Block Menu
  return app
}

function getCanvasSize(canvas) {
  return {
    width: canvas.offsetWidth,
    height: canvas.offsetHeight
  };
}