<template>
  <el-row :span="5" id="margin-top">
    <!-- 登录表单 start -->
    <el-form
      :model="loginForm"
      :rules="loginFormRules"
      ref="loginFormRef"
      label-width="80px"
    >
      <el-col :span="5" :offset="9">
        <h1>登录</h1>
        <el-form-item prop="username" label="账号：">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码：">
          <el-input
            prefix-icon="el-icon-unlock"
            v-model="loginForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="userLogin">登录</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-col>
    </el-form>
    <!-- 登录表单 end -->
  </el-row>
</template>

<script>
import account from "../../api/service/account.js";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      // 登录表单验证
      loginFormRules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    /**
     * 登录表单重置
     */
    resetForm() {
      this.$refs.loginFormRef.resetFields();
    },

    userLogin() {
      // // 对整个表单预验证
      // this.$refs.loginFormRef.validate((a) => {
      //   console.log(a);
      // });
      // if (a == true) {
      account
        .login(this.loginForm.username, this.loginForm.password)
        .then((user) => {
          console.log("登录成功！");
          this.$router.push("/");
        })
        .catch((err) => {
          console.log("登录失败", err);
          this.errorInfo = err;
          this.dialog = true;
        });
      // } else {
      //   console.log("表单预验证失败！");
      // }
    },
  },
};
</script>

<style>
#margin-top {
  margin-top: 200px;
}
</style>



