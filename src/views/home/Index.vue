<template>
  <el-container class="index-container">
    <!-- 头部header start -->
    <el-header>
      <Header></Header>
    </el-header>
    <!-- 头部header end -->
    <el-container>
      <!-- 侧边栏 start -->
      <el-aside width="200px">
        <Aside></Aside>
      </el-aside>
      <!-- 侧边栏 end -->
      <el-container class="position">
        <!-- Main start -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- Main end -->
        <!-- 底部页脚 start -->
        <el-footer>
          <Footer></Footer>
        </el-footer>
        <!-- 底部页脚 end -->
      </el-container>
    </el-container>
  </el-container>

</template>

<script>
  import account from "../../api/service/account.js";

  export default {
    name: "Index",
    components: {
      Header: () => import("../home/components/Header.vue"),
      Aside: () => import("../home/components/Aside.vue"),
      Main: () => import("../home/components/Main.vue"),
      Footer: () => import("../home/components/Footer.vue")
    },
    mounted() {
      if (!account.isLoggedIn()) {
        console.log("Invalid user.");
        this.$router.push("/login");
      }
    },
  };
</script>

<style scoped>
  .index-container {
    height: 100%;
  }

  .el-header {
    position: relative;
    width: 100%;
    height: 60px;
  }

  .el-header, .el-footer {
    background-color: #333333;
    color: white;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    position: absolute;
    top: 60px;
    left: 0;
    bottom: 0;
    background-color: #545c64;
    color: #333;
    line-height: 200px;
  }

  .position{
    position: absolute;
    left: 200px;
    top: 60px;
    bottom: 0;
    right: 0;
  }

</style>