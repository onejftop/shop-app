<template>
  <el-row class="demo-avatar demo-basic">
    <el-col :span="23">商城后台管理</el-col>
    <el-col :span="1">
      <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
              icon="el-icon-plus"
              @click.native="github"
          >Github
          </el-dropdown-item>
          <el-dropdown-item
              icon="el-icon-circle-plus"
              @click.native="gitee"
          >Gitee
          </el-dropdown-item>
          <el-dropdown-item
              icon="el-icon-circle-plus-outline"
              @click.native="logout"
          >退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
  import account from "../../../api/service/account";

  export default {
    name: "Header",
    data() {
      return {
        squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      }
    },
    methods: {
      /**
       * 新窗口打开GitHub项目仓库页面
       */
      github() {
        window.open("https://github.com/onejftop/shop-app.git")
      },
      /**
       * 新窗口打开Gitee项目仓库页面
       */
      gitee() {
        window.open("https://gitee.com/onejftop/shop-app.git")
      },
      /**
       * 用户注销
       */
      logout() {
        account
            .logout()
            .then((resp) => {
              this.$router.push("/login");
            })
            .catch((err) => {
              console.log(err);
            });
      }
    }
  }
</script>

<style scoped>
  .el-avatar {
    margin-top: 4px;
  }
</style>
