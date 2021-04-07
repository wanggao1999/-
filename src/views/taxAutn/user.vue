<template>
  <div>
    <el-card
    class="box-card"
    id="card"
    >
      <!-- header -->
      <div slot="header">
         <el-button icon="el-icon-circle-plus" type="primary" @click="AddUser"> 添加用户 </el-button> 
      </div>
      <!-- table -->
      <el-table
      :data="tableObj"
      :border="true"
      style="width: 100%"
      tooltip-effect="dark"
      >
        <el-table-column label="用户名称" align="center" prop="name"  width="100px">
        </el-table-column>
         <el-table-column label="用户账号" align="center" prop="username"  width="150px">
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createDate">
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="">
          <template slot-scope="{row}">
            <el-button size="mini" type="primary" icon="el-icon-share" @click="handAllocatedRole(row)">分配权限</el-button>
            <el-button size="mini" type="warning" icon="el-icon-edit" @click="handEdit(row)">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
      <!-- 添加用户 -->
      <el-dialog
        title="添加用户"
        :visible.sync="AdduserVisible"
        width="30%">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="AdduserVisible = false">取 消</el-button>
          <el-button type="primary" @click="AdduserVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <!--用户权限-->
      <el-dialog
        title="分配权限"
        :visible.sync="userVisible"
        width="50%">
      <div style="text-align: center">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]">
        </el-tree>
      </div>
       <span slot="footer" class="dialog-footer">
          <el-button @click="userVisible = false">取 消</el-button>
          <el-button type="primary" @click="userVisible = false">确 定</el-button>
        </span>
    </el-dialog>
      <!-- 编辑 -->
      <el-dialog
          title="编辑"
          :visible.sync="updateVisible"
          width="30%">
        <div style="text-align: center">
          <el-form :model="rule1Form" status-icon :rules="rules1" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名称" prop="name">
            <el-input type="text" v-model="rule1Form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="重置密码" prop="resetPass">
            <el-input type="password" v-model="rule1Form.resetPass" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="updateVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateVisible = false">确 定</el-button>
          </span>
      </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      dataPatams:{},
      tableObj:[ //表格
        {
          name:'张三',
          username:'xwz',
          createDate:'2021-02-24'
        },
        {
          name:'测试',
          username:'test',
          createDate:'2021-02-24'
        },
      ],
      ruleForm:{//表单数据
        username:'',
        password:'',
        checkPass:''
      },
      rule1Form:{
        name:'',
        resetPass:''
      },
      rules:{ //校验规则
      username:[
         { required: true, message: '请输入用户名', trigger: 'blur' },
         { min: 6, max: 12, message: '用户名长度在 4 到 8 个字符', trigger: 'blur' }
      ],
      password:[
        { required: true, message: '请输入密码', trigger: 'blur' },
         { min: 6, max: 12, message: '密码长度在 6 到 12 个字符', trigger: 'blur' }
      ],
      checkPass:[
        { required: true,validator:validatePass, trigger: 'blur' },
      ]
      },

      rules1:{ //校验规则
      name:[
         { required: true, message: '请输入用户名称', trigger: 'blur' },
         { min: 3, max: 5, message: '用户名长度在 3 到 5 个字符', trigger: 'blur' }
      ],
      resetPass:[
        { required: true, message: '请输入密码', trigger: 'blur' },
         { min: 6, max: 12, message: '密码长度在 6 到 12 个字符', trigger: 'blur' }
      ]
      },
      data: [{//菜单权限
          id: 1,
          label: '一级 2',
          children: [{
            id: 3,
            label: '二级 2-1',
            children: [{
              id: 4,
              label: '三级 3-1-1'
            }, {
              id: 5,
              label: '三级 3-1-2',
              disabled: true
            }]
          }, {
            id: 2,
            label: '二级 2-2',
            disabled: true,
            children: [{
              id: 6,
              label: '三级 3-2-1'
            }, {
              id: 7,
              label: '三级 3-2-2',
              disabled: true
            }]
          }]
        }],
      AdduserVisible:false,
      userVisible:false,
      updateVisible:false
    }
  },
  methods:{
    // 添加用户
    AddUser(){
      this.AdduserVisible = true
    },
    //分配角色
    handAllocatedRole(row){
      this.userVisible = true
      console.log(this.$store.state)
    },
    //编辑角色
    handEdit(row){
      this.updateVisible = true
    },
    // 删除角色
    handDelete(row){},
    handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
      }
  },
 mounted(){
   document.getElementById('card').style.width = document.documentElement.offsetWidth-220 + 'px'
 }
}
</script>