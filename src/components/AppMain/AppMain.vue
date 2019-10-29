<template>
  <div class="main">
    <!--将v-show放到组件上使用-->
    <breadcrumb  v-show="$route.path != '/home/'"></breadcrumb>
    <router-view></router-view>
  </div>
</template>

<script>
  import Breadcrumb from "../../views/Breadcrumb/breadcrumb";
  export default {
    data() {
      return {

      }
    },
    components: {
      Breadcrumb
    }
  }
</script>

