<template>
  <div>
    <el-row>
      <el-button
          type="success"
          round="true"
          @click="addUserFormDialog=true"
      >添加用户
      </el-button>
      <!-- 添加用户对话框 start -->
      <el-dialog title="添加用户" :visible.sync="addUserFormDialog">
        <el-form :model="addUserForm">
          <el-col :span="12">
            <el-form-item label="用户" >
              <el-input autocomplete="off" v-model="addUserForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="密码" >
              <el-input autocomplete="off" v-model="addUserForm.password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="性别" >
              <el-select placeholder="请选择用户性别" v-model="addUserForm.sex">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="1">
            <el-form-item label="用户类型" >
              <el-select placeholder="请选择用户类型" v-model="addUserForm.usertype">
                <el-option label="普通用户" value="普通用户"></el-option>
                <el-option label="VIP用户" value="VIP用户"></el-option>
                <el-option label="超级VIP用户" value="超级VIP用户"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="邮箱地址" >
              <el-input autocomplete="off" v-model="addUserForm.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="个性签名" >
              <el-input autocomplete="off" v-model="addUserForm.personalSignature"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addUserFormDialog = false">取 消</el-button>
          <el-button type="success" @click="addUser">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加用户对话框 end -->
    </el-row>
    <!-- 显示所有用户数据 start -->
    <el-table
        class="margin-top-10px"
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        border
        style="width: 100%">
      <el-table-column
          prop="id"
          label="ID"
          width="100"
          header-align="center"
      ></el-table-column>
      <el-table-column
          prop="name"
          label="用户名"
          width="100"
          header-align="center"
      ></el-table-column>
      <el-table-column
          prop="sex"
          label="性别"
          header-align="center"
          align="center"
          width="100"
      ></el-table-column>
      <el-table-column
          prop="usertype"
          label="用户类型"
          header-align="center"
          width="100"
      ></el-table-column>
      <el-table-column
          prop="email"
          label="邮箱地址"
          header-align="center"
          width="180"
      ></el-table-column>
      <el-table-column
          prop="personalSignature"
          label="个性签名"
          header-align="center"
      ></el-table-column>
      <el-table-column
          label="操作"
          header-align="center"
          width="150"
      >
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button type="success" icon="el-icon-edit" @click="showEditUserFormDialog(scope.row)"></el-button>
          <!-- 编辑用户对话框 start -->
          <el-dialog title="编辑用户" :visible.sync="editUserFormDialog">
            <el-form :model="editUserForm">
              <el-col :span="12">
                <el-form-item label="用户" >
                  <el-input autocomplete="off" v-model="editUserForm.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item label="密码" >
                  <el-input autocomplete="off" v-model="editUserForm.password"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="性别">
                  <el-select placeholder="请选择用户性别" v-model="editUserForm.sex">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" :offset="1">
                <el-form-item label="用户类型">
                  <el-select placeholder="请选择用户类型" v-model="editUserForm.usertype">
                    <el-option label="普通用户" value="普通用户"></el-option>
                    <el-option label="VIP用户" value="VIP用户"></el-option>
                    <el-option label="超级VIP用户" value="超级VIP用户"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="邮箱地址">
                  <el-input autocomplete="off" v-model="editUserForm.email"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="个性签名">
                  <el-input autocomplete="off" v-model="editUserForm.personalSignature"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editUserFormDialog = false">取 消</el-button>
              <el-button type="success" @click="updateUserById">确 定</el-button>
            </div>
          </el-dialog>
          <!-- 添加用户对话框 end -->
          <!-- 删除用户 start -->
          <el-button
              class="margin-left-10px"
              type="success"
              icon="el-icon-delete"
              @click="deleteUserById(scope.row.id)"></el-button>
          <!-- 删除用户 end -->
        </template>

      </el-table-column>
    </el-table>
    <!-- 显示所有用户数据 end -->
    <!-- 分页 start -->
    <el-pagination
        class="margin-top-10px"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[7,10, 15, 30,50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
    <!-- 分页 end -->
  </div>
</template>

<script>
  export default {
    name: "User",
    data() {
      return {
        tableData: [],
        addUserFormDialog: false,
        editUserFormDialog: false,
        // 添加用户表单，此处为了添加用户方便，赋初始值
        addUserForm: {
          name: '测试',
          password: '123456',
          sex: '男',
          usertype: '普通用户',
          email: 'ceshi@qq.com',
          personalSignature: '测试！！！'
        },
        updateUserForm: {},
        editUserForm: {},
        // 当前页码
        currentPage:1,
        // 总条数
        total:0,
        // 默认每页显示条数
        pageSize:7
      }
    },
    created() {
      this.getAllUser()
    },
    methods: {
      /**
       * 获取所有用户
       */
      getAllUser() {
        this.$http.get('/users/')
            .then(response => {
              console.log(response)
              this.tableData = response.data
              // 将数据的长度赋值给分页总条数
              this.total = response.data.length
            })
      },

      /**
       * 添加新用户
       */
      addUser() {
        this.$http.post('/users/', {
          "name": this.addUserForm.name,
          "password": this.addUserForm.password,
          "sex": this.addUserForm.sex,
          "usertype": this.addUserForm.usertype,
          "email": this.addUserForm.email,
          "personalSignature": this.addUserForm.personalSignature
        })
            .then(response => {
              console.log(response)
              if (response != 200) {
                this.$message.error("添加用户失败！")
              }
              this.$message.success("添加用户成功！")
              this.addUserFormDialog = false;
              this.getAllUser()
            })
      },

      /**
       * 根据ID删除用户
       */
      deleteUserById(id) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(id)
          this.$http.delete('users/' + id)
              .then(response => {
                console.log(response)
                if (response.status != 200) {
                  this.$message.error("删除用户失败！")
                }
                this.$message.success("删除用户成功！")
                this.getAllUser()
              })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      /**
       * 当点击编辑按钮时，打开编辑对话框，并将一行数据赋值给editUserForm
       */
      showEditUserFormDialog(row) {
        this.editUserFormDialog = true
        this.editUserForm = row
      },

      /**
       * 更新用户信息
       */
      updateUserById() {
        this.$http.put('/users/' + this.editUserForm.id, {
          "name": this.editUserForm.name,
          "password": this.editUserForm.password,
          "sex": this.editUserForm.sex,
          "usertype": this.editUserForm.usertype,
          "email": this.editUserForm.email,
          "personalSignature": this.editUserForm.personalSignature
        }).then(response => {
          if (response.status != 200) {
            this.$message.error("更新用户信息失败！")
          }
          this.editUserFormDialog = false
          this.$message.success("更新用户信息成功！")
          this.getAllUser()
        })
      },

      /**
       * 每页显示的条数
       * @param newPageSize 新的每页显示条数
       */
      handleSizeChange(newPageSize) {
        console.log(`每页 ${newPageSize} 条`);
        // 改变每页显示的条数
        this.pageSize=newPageSize
      },

      /**
       * 当当前页改变时，改变默认显示页currentPage
       * @param val
       */
      handleCurrentChange(newCurrentPage) {
        console.log(`当前页: ${newCurrentPage}`);
        this.currentPage = newCurrentPage
      }
    }
  }
</script>

<style scoped>
  .margin-left-10px {
    margin-left: 10px;
  }

  .margin-top-10px{
    margin-top: 10px;
  }

  .el-pagination{
    text-align: center;
  }
</style>