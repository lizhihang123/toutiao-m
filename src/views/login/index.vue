<!--
 * @Date: 2022-01-09 13:49:10
 * @LastEditTime: 2022-01-09 16:01:29
-->
<template>
  <div class="login-container">
    <!-- 头部 NavBar -->
    <van-nav-bar class="nav-tab-btn" title="登录" />
    <!-- /头部 NavBar -->

    <!-- 登录表单 -->
    <van-form>
      <van-field
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        type="password"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-button round class="btn-send" size="small" type="default"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="btn-login-outer">
        <van-button class="btn-login" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <!-- / 登录表单 -->
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
body {
  background-color: #f5f7f9;
}
.toutiao {
  font-size: 26px;
}
.btn-send {
  width: 152px;
  height: 46px;
  background-color: #ededed;
  line-height: 46px;
  color: #666;
  font-size: 22px;
}

.btn-login-outer {
  padding: 26px;
  .btn-login {
    border: none;
    background-color: #6db4fb;
  }
}
</style>
