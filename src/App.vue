<template>
  <div id="app">
    <div id="nav">
      <!-- navbar area -->
      <router-link to="/">หน้าแรก</router-link> |
      <router-link to="/lab">ห้องทดลอง</router-link> | 
      <router-link to="/lessons">บทเรียน</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
export default {
  name: 'App',
  data() {
    return {
      user: {},
    }
  }
}
</script>
