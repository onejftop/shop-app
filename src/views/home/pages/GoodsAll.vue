<template>
  <div>
    <el-row>
      <el-col :span="3">
        <el-input placeholder="请输入商品ID"></el-input>
      </el-col>
      <el-col :span="3" class="margin-left-10px">
        <el-input placeholder="请输入商品名称"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="success" icon="el-icon-search" class="margin-left-10px">搜索</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="success" icon="el-icon-upload" @click="dialogFormVisible = true">添加</el-button>
        <!-- 添加商品自定义对话框 start -->
        <el-dialog title="添加商品" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-col :span="10">
              <el-form-item label="商品名称">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-form-item label="商品价格">
                <el-input v-model="form.price" autocomplete="off" type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-form-item label="商品数量">
                <el-input v-model="form.number" autocomplete="off" type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品分类">
                <el-select v-model="form.categories" placeholder="请选择商品分类">
                  <el-option label="数码" value="数码"></el-option>
                  <el-option label="图书" value="图书"></el-option>
                  <el-option label="家电" value="家电"></el-option>
                  <el-option label="食品" value="食品"></el-option>
                  <el-option label="家具" value="家具"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
              >
                <el-button size="small" type="success">上传商品图片</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <el-input type="textarea" placeholder="请输入商品介绍内容" :rows="5"
                          v-model="form.description"></el-input>
              </el-form-item>
            </el-col>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="success" @click="saveGoods">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 添加商品自定义对话框 end -->
      </el-col>
    </el-row>

    <el-row class="margin-top-10px">
      <!-- 显示所有商品数据表格 start -->
      <el-table
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          border
          style="width: 100%"
      >
        <el-table-column
            prop="id"
            label="商品ID"
            width="220"
            header-align="center">
        </el-table-column>
        <el-table-column
            prop="name"
            label="商品名称"
            width="180"
            header-align="center">
        </el-table-column>
        <el-table-column
            prop="categories"
            label="商品分类"
            width="150"
            header-align="center">
        </el-table-column>
        <el-table-column
            prop="description"
            label="商品详情"
            show-overflow-tooltip="true"
            header-align="center"
        ></el-table-column>
        <el-table-column
            prop="number"
            label="商品数量"
            width="150"
            header-align="center"
        ></el-table-column>
        <el-table-column
            prop="price"
            label="商品价格"
            width="100"
            header-align="center"
        ></el-table-column>
        <el-table-column
            prop="caozuo"
            label="操作"
            width="145"
            header-align="center">
          <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button
              type="info"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row)"
          ></el-button>
          <!-- 更新商品自定义对话框 start -->
          <el-dialog title="更新商品" :visible.sync="dialogUpdateGoodsFormVisible">
            <el-form :model="editForm">
              <el-col :span="10">
                <el-form-item label="商品名称">
                  <el-input autocomplete="off" v-model="editForm.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="1">
                <el-form-item label="商品价格">
                  <el-input autocomplete="off" type="number" v-model="editForm.price"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="1">
                <el-form-item label="商品数量">
                  <el-input autocomplete="off" type="number" v-model="editForm.number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品分类">
                  <el-select placeholder="请选择商品分类" v-model="editForm.categories">
                    <el-option label="数码" value="数码"></el-option>
                    <el-option label="图书" value="图书"></el-option>
                    <el-option label="家电" value="家电"></el-option>
                    <el-option label="食品" value="食品"></el-option>
                    <el-option label="家具" value="家具"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                >
                  <el-button size="small" type="success">上传商品图片</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-col>
              <el-col :span="24">
                <el-form-item>
                  <el-input
                      type="textarea"
                      placeholder="请输入商品介绍内容"
                      :rows="5"
                      v-model="editForm.description"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button
                  @click="dialogUpdateGoodsFormVisible = false"
              >取 消
              </el-button>
              <el-button
                  type="success"
                  @click="updateGoodsById"
              >确 定
              </el-button>
            </div>
          </el-dialog>
          <!-- 更新商品自定义对话框 end -->
          <!-- 删除商品 start -->
            <el-button
                type="danger"
                icon="el-icon-delete"
                slot="reference"
                @click="deleteGoodsById(scope.row.id)"
                class="margin-left-10px"
            ></el-button>
          </template>
          <!-- 删除商品 end -->
        </el-table-column>
      </el-table>
      <!-- 显示所有商品数据表格 end -->
    </el-row>
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
  import GoodsDataService from "../../../api/service/GoodsDataService.js";

  export default {
    name: "GoodsAll",
    data() {
      return {
        dialogFormVisible: false,
        dialogUpdateGoodsFormVisible: false,
        // 表格数据
        tableData: [],
        // 添加数据的form表单，为测试方便，赋初始值
        form: {
          name: '商品添加测试',
          price: '8888',
          number: '5555',
          categories: '',
          description: '商品添加测试！！！',
        },
        // 编辑商品表单
        editForm:{},
        // 当前页码
        currentPage:1,
        // 总条数
        total:0,
        // 默认每页显示条数
        pageSize:7
      }
    },
    methods: {
      /**
       * 保存添加商品
       */
      saveGoods() {
        var data = {
          name: this.$data.form.name,              // 商品名称
          price: this.$data.form.price,            // 商品价格
          number: this.$data.form.number,           // 商品数量
          categories: this.$data.form.categories,     // 商品分类
          description: this.$data.form.description, // 商品描述
          published: false,             // 状态
        };
        GoodsDataService.create(data)
            .then((response) => {
              this.goods.id = response.id;  // 获取由leancloud 返回的id值
            })
            .catch((e) => {
              console.log(e);
            });
        this.dialogFormVisible = false;
        this.$message({
          message: "添加商品成功！",
          type: 'success'
        });
        this.retrieveGoods()
      },


      /**
       * 显示所有商品数据
       */
      retrieveGoods() {
        this.tableData = []; // 每次要先清空数据
        GoodsDataService.getAll()
            .then((response) => {
              // 遍历获取的数据，并提取需要的字段
              response.forEach((item) => {
                this.tableData.push({
                  id: item.id, // leancloud中的id值直接获取
                  name: item.get("name"), // 自定义字段要使用 get() 获取值
                  number: item.get("number"),
                  categories: item.get("categories"),
                  description: item.get("description"),
                  price: item.get("price"),
                  // 此处将 published 以  status 进行显示
                  status: item.get("published") ? "Published" : "Pending",
                });
              });
              // 数据总条数
              this.total = response.length
            })
            .catch((e) => {
              console.log(e);
            });

      },

      getGoods(id) {
        GoodsDataService.get(id)
            .then((item) => {
              this.currentGoods = {
                id: item.id,
                name: item.get("name"),
                price: item.get("price"),
                description: item.get("description"),
                published: item.get("published"),
              };
              console.log(this.currentGoods);
            })
            .catch((e) => {
              console.log(e);
            });
      },

      /**
       * 根据ID删除一行表格数据
       */
      deleteGoodsById(id) {
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          GoodsDataService.delete(id)
              .then((response) => {
                console.log(response.data);
                this.retrieveGoods()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              })
              .catch((e) => {
                console.log(e);
              });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      /**
       * 根据ID更新一行数据
       */
      updateGoodsById(){
        GoodsDataService.update(this.editForm.id,this.editForm)
            .then((response) => {
              console.log(this.editForm.id)
              console.log(response);
              // 将更新的数据赋值给editForm
              this.editForm=response
              this.$message.success("更新商品成功！")
              // 关闭对话框
              this.dialogUpdateGoodsFormVisible=false
            })
            .catch((e) => {
              console.log(e);
            });
      },

      /**
       * 当点击编辑按钮时，弹出修改对话框
       * @param row 修改的一行数据
       */
      showEditDialog(row){
        this.dialogUpdateGoodsFormVisible=true
        this.editForm = row
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

    },

    mounted() {
      this.retrieveGoods();
    },
  }
</script>

<style scoped>
  .margin-top-10px {
    margin-top: 10px;
  }

  .margin-left-10px {
    margin-left: 10px;
  }

  .el-pagination{
    text-align: center;
  }
</style>