<template>
  <div class="labpage">
    <div class="outputArea">
      <div class="outputCanvas"></div>
      <div class="controller">controller</div>
    </div>
    <div class="editorArea">
      <div class="editor"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.labpage {
  display: flex;
  height: calc(100vh - 43px);
}
.outputArea {
  padding: 0.7em;
  width: 30%;
}
.editorArea {
  width: 70%;
  overflow: scroll;
}
.editor{
  background: #eaeaea;
  width: 2000px;
  height: 2000px;
}
.outputCanvas {
  // for test output
  height: 55%;
  width: 100%;
  background: #141414;
}
.controller {
  margin-top: 1.2em;
  width: 100%;
  padding: 1.2em 1em 1.2em 1em;
  min-height: 60px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .2);
}

@media (min-width: 1408px) {
  .labpage {
    height: calc(100vh - 60px);
  }
}
</style>
