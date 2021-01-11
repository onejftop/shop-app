<!-- 侧边导航栏 -->
<template>
  <el-row class="tac">
    <el-col>
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened="true"
          router="true">
        <!-- 一级菜单 -->
        <el-submenu v-for="item in items" :index="item.id">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item v-for="children in item.children" :index="children.id">
            {{children.title}}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "Aside",
    data() {
      return {
        items: {}
      }

    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

      /**
       * 获取侧边栏菜单列表
       */
      getItems() {
        this.$http.get('/items/').then(response => {
          console.log(response)
          this.items=response.data
        })
      }

    },

    created() {
      this.getItems()
    }
  };
</script>

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>