<template>
  <div class="layout">
    <app-header></app-header>
    <app-navbar></app-navbar>
    <app-main></app-main>
  </div>
</template>

<script>
  import AppHeader from './AppHeader/AppHeader'
  import AppNavbar from './AppNavbar/AppNavbar'
  import AppMain from './AppMain/AppMain'
  export default {
    name: 'Layout',
    components: {
      AppHeader,
      AppNavbar,
      AppMain
    }
  }
</script>

<style scoped>
/*头部区域*/
  .header {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    line-height: 50px;
    background-color: #2d3a4b;
  }
  /*侧边栏区域*/
  .navbar {
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 0;
    width: 230px;
    overflow-y: auto;
    background-color: #545c64;
  }
  /*主要内容区域*/
  .main {
    position: absolute;
    left: 230px;
    top: 50px;
    bottom: 0;
    right: 0;
    padding: 10px;
    overflow-y: auto;
    background-color: #fff;
  }
</style>
