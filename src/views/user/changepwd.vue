<template>
    <div class="checkPass">
      <el-card>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="原密码" prop="oldPassword">
                <el-input type="password" v-model="ruleForm.oldPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
         </el-form>
      </el-card>
    </div>
</template>

<script>
export default {
    data() {
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else if (value === this.ruleForm.oldPassword) {
          callback(new Error('新密码与旧密码不能一样!'));
        } else {
          callback();
        }
      };
        var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return {
            ruleForm:{
                oldPassword:'',
                newPassword:'',
                checkPass:''
            },
            rules:{
                oldPassword:[
                     { required: true, message: '请输入原密码', trigger: 'blur' },
                     { min: 6,max:12 , message: '密码长度必须在6到12位', }
                ],
                newPassword:[
                    { validator:validatePass,trigger:'blur' },
                    { min: 6,max:12 , message: '密码长度必须在6到12位', }
                ],
                checkPass:[
                    { validator:validatePass2,trigger:'blur' },
                    { min: 6,max:12 , message: '密码长度必须在6到12位', }
                ]
            }
        };
    },
    mounted() {

    },
    methods: {
        submitForm(form){
            this.$refs[form].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        },
        resetForm(form){
            this.$refs[form].resetFields();
        }
    },
    mounted(){
        document.querySelector('.checkPass').style.height = document.documentElement.clientHeight-200 + 'px'
    }
};
</script>

<style lang="scss" scoped>
.checkPass{
    display:flex;
    justify-content: center;
    align-items: center;
.el-card{
    width: 500px;
    height: 350px;
    .el-form{
        margin-top: 40px;
    }
}
}

</style>
