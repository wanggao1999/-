<template>
  <div class="login">
    <!-- 登录表单 -->
    <div class="login_contnet">
      <el-form
        :model="ruleForm"
        label-width="10px"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            type="text"
            v-model="ruleForm.username"
            placeholder="用户名"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            type="password"
            placeholder="密码"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { login } from '../../api/login/index'
export default {
  data() {
    return {
      ruleForm: {// 表单数据
        username: "",
        password: "",
      },
      rules: {// 校验规则
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  mounted() {
    let input = document.querySelector(".el-input__inner");
    input.focus();
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.submitForm("ruleForm");
      }
    });
  },
  methods: {
    //登录方法
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.$store.dispatch("user/loginFn",this.ruleForm)
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$dark_gray: #3d4a52;
$light_gray: #eee;
.login {
  user-select: none;
  min-height: 100%;
  width: 100%;
  background: url("../../assets/bg.png") no-repeat;
  background-size: center;
  .login_contnet {
    position: absolute;
    width: 450px;
    max-width: 100%;
    left: 38%;
    top: 45%;
    margin: 0 auto;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.5);
    padding: 20px;
    padding-top: 50px;
    border-radius: 5px;
    border: 1px solid #ccc;
    .el-form-item__content {
      display: inline-block;
      .el-input {
        display: inline-block;
        width: 89%;
      }
      .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        width: 30px;
        line-height: 30px;
        display: inline-block;
        margin-right: 10px;
      }
    }
  }
  .el-button {
    width: 100%;
  }
}
</style>
