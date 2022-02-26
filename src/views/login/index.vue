<!--
 * @Date: 2022-01-09 13:49:10
 * @LastEditTime: 2022-01-17 15:02:14
-->
<template>
  <div class="login-container">
    <!-- 头部 NavBar -->
    <van-nav-bar class="nav-tab-btn" title="登录">
      <van-icon slot="left" name="cross" class="icon" @click="$router.back()" />
    </van-nav-bar>
    <!-- /头部 NavBar -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        type="number"
        maxlength="11"
        :rules="formatRules.mobile"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        type="number"
        placeholder="请输入验证码"
        maxlength="6"
        :rules="formatRules.code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="1000 * 5"
            format="ss秒"
            v-if="isCountDown"
            @finish="isCountDown = false"
          />
          <van-button
            v-else
            round
            class="btn-send"
            size="small"
            native-type="button"
            @click="onSendsms"
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
import { loginAPI, sendSmsAPI } from "@/api";
// 3.2 验证码校验
// 总的过程：
// 1. 校验手机号是否有效，无效不发送。
// 2. 发送验证码 后台有接口
// 3. 倒计时效果
// 4. 验证码校验通过

export default {
  // 1. 绑定数据
  data() {
    return {
      user: {
        mobile: "",
        code: ""
      },
      // 2. 表单验证 (13911111111 246810) 万能账号
      formatRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空"
          },
          {
            pattern: /^1[3|5|8|7]\d{9}$/,
            message: "手机号的格式错误"
          }
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空"
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码的格式不对"
          }
        ]
      },
      // 3. 倒计时显示
      isCountDown: false
    };
  },

  //
  // 3. 提交数据
  methods: {
    // 登录提交
    async onSubmit() {
      // 轻提示 配置
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        duration: 5000
      });
      try {
        const { data } = await loginAPI(this.user);
        console.log("请求成功", data.data); // token refresh_token
        this.$store.commit("setUser", data.data);
        this.$toast.success("请求成功");

        // 登录成功跳转
        this.$router.back();
      } catch (err) {
        if (err.response.status === 404) {
          console.log("账号和密码输入错误请重试", err);
          this.$toast.fail("请求失败");
        } else {
          console.log("未知错误，请稍后再试", err);
          this.$toast.fail("请求失败");
        }
      }
    },
    // 发送验证码
    async onSendsms() {
      // 轻提示 配置
      this.$toast.loading({
        message: "加载中",
        forbidClick: true,
        duration: 5000
      });
      try {
        await this.$refs.loginForm.validate("mobile");
        console.log("验证通过");
      } catch (err) {
        return console.log("验证失败", err);
      }

      // 验证通过的代码写下面
      // 手机号验证通过 倒计时显示
      this.isCountDown = true;

      // 真的发送验证码
      try {
        const res = await sendSmsAPI(this.user.mobile);
        console.log(res);
        // this.$toast.success("发送成功");
        // this.$store.setUser();
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast.fail("发送请求过于频繁，请稍后再试");
        } else {
          this.$toast.fail("发送请求失败，请稍后再试");
        }
        this.isCountDonwn = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
body {
  background-color: #f5f7f9;
}
.nav-tab-btn {
  .icon {
    font-size: 20px;
    color: #fff;
  }
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
