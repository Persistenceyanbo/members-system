<template>
  <div class="header">
    <a href="#/" class="header-left">
      <img class="logo" src="./../../../public/logo.png" alt="" width="25" height="25">
      <span class="company">会员管理系统</span>
    </a>
    <el-dropdown trigger="click" class="header-dropdown-menu" @command="handleCommand">
      <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit" command="revise-password">修改密码</el-dropdown-item>
        <el-dropdown-item icon="el-icon-document" command="logout">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  import {logout} from './../../api/login.js';

  export default {
    methods: {
      handleCommand (command) {
        if (command === 'revise-password') {
          this.$message({
            message: '修改密码',
            type: 'success'

          })
        } else if (command === 'logout'){
          let logoutToken = localStorage.getItem('mxg-msm-token')
          logout(logoutToken).then(response => {
            let data = response.data;
            if (data.flag) {
              localStorage.removeItem('mxg-msm-token')
              localStorage.removeItem('mxg-msm-user')
              this.$message({
                message: data.message,
                type: 'success'
              })
              this.$router.push({path: '/login'})
            } else {
              this.$message({
                message: '登出失败！',
                type: 'error',
                duration: '500'
              })
            }
          })

        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header-left {
    float: left;
    padding-left: 20px;
  }

  .logo {
    vertical-align: middle;
    /*padding: 0 10px 0 40px;*/
  }

  .company {
    color: #fff;
    vertical-align: middle;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #fff;
    vertical-align: middle;
  }
  .header-dropdown-menu {
    float: right;
    margin-right: 16px;
  }
</style>
