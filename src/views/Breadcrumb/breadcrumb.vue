<template>
  <div class="breadcrumb">
    <el-breadcrumb class="el-breadcrumb">
      <el-breadcrumb-item class="el-breadcrumb-item" :to="{path: $route.path}">{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: 'breadcrumb'
  }
</script>


<style scoped>
  .el-breadcrumb {
    height: 10px;
    line-height: 10px;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, .1);
  }
  .el-breadcrumb-item {
    border-left: 2px solid blue;
    padding-left: 10px;
  }
</style>
