<template>
  <div class="container-background-color">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="avatar-box">
        <img src="@/assets/logo.png" alt="avatar" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        status-icon
        label-width="70px"
        class="form-position"
        :model="form"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            autocomplete="off"
            prefix-icon="iconfont icon-3702mima"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" round @click="login">登录</el-button>
          <el-button type="info" round @click="clearAll">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getLoginData } from '@/api'
export default {
  name: 'LoginView',

  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      loginFormRules: {
        // 验证用户名
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 4,
            max: 16,
            message: '长度在 4 到 16 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度请至少为6位', trigger: 'blur' },
        ],
      },
    }
  },

  mounted() {},

  methods: {
    clearAll() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) {
          alert('请检查用户名或者密码！')
        } else {
          const result = await getLoginData(this.form)
          if (result.meta.status !== 200) {
            return this.$message.error(result.meta.msg)
          } else {
            this.$message.success(result.meta.msg)
            window.sessionStorage.setItem('token', result.data.token)
            this.$router.push({
              name: 'home',
            })
          }
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.container-background-color {
  background-color: #2b4b6b;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  width: 450px;
  height: 300px;
  background-color: white;
  border-radius: 20px;
  position: relative;

  .avatar-box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 15px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }

  .form-position {
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px 0 0;
  }
}
</style>
