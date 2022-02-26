<!--
 * @Date: 2022-01-12 09:54:43
 * @LastEditTime: 2022-01-26 19:54:52
-->
<template>
  <div class="my-container">
    <!-- 用户登录 -->
    <div v-if="user" class="header user-login">
      <!-- 用户登录 - 上部分 -->
      <!--  -->
      <div class="data-user">
        <div class="user-info">
          <!-- 头像和信息 -->
          <div class="left">
            <van-image class="avatar" fit="cover" round :src="userInfo.photo" />
            <span class="text">{{ userInfo.name }}</span>
          </div>
          <!-- 编辑资料 -->
          <div class="right">
            <van-button class="edit" type="default" mini to="/profile"
              >编辑资料</van-button
            >
          </div>
        </div>
        <!-- 用户登录下部分 -->
        <div class="data-stats">
          <!-- 用户的四条数据 -->
          <div class="data-item">
            <span class="num">{{ userInfo.art_count }}</span>
            <span class="bottom">头条</span>
          </div>
          <div class="data-item">
            <span class="num">{{ userInfo.follow_count }}</span>
            <span class="bottom">关注</span>
          </div>
          <div class="data-item">
            <span class="num">{{ userInfo.fans_count }}</span>
            <span class="bottom">粉丝</span>
          </div>
          <div class="data-item">
            <span class="num">{{ userInfo.like_count }}</span>
            <span class="bottom">获赞</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 用户 -- 未登录 -->
    <div v-else class="header not-login" @click="$router.push('/login')">
      <img class="mobile" src="~@/assets/mobile.png" alt="" />
      <span class="text">登录 / 注册</span>
    </div>

    <!-- 收藏和历史 -->
    <van-grid :column-num="2" class="grid-login">
      <van-grid-item clickable class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item clickable class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text">历史</span>
      </van-grid-item>
    </van-grid>

    <!-- 单元格 小智同学 消息通知 -->
    <van-cell-group>
      <van-cell title="消息通知 " center>
        <template #right-icon>
          <van-icon name="arrow" />
        </template>
      </van-cell>
      <van-cell title="小智同学 " center class="md9">
        <template #right-icon>
          <van-icon name="arrow" />
        </template>
      </van-cell>
      <!-- 退出登录 -->
      <van-cell v-if="user" title="退出登录 " class="logout" @click="logout">
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
// 没有登录 就显示 未登录 但是仍旧显示 登录部分
//    因为user有内容。 为什么第一次登录 user有token？？ 为什么既然有token，但是仍旧提示未登录，没有获取到数据渲染到页面
//    干脆希望 一登录页面就没有本地存储 token值
import { mapState } from "vuex";
import { getUserInfoAPI } from "@/api";
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  name: "MyIndex",
  computed: {
    ...mapState(["user"])
  },
  created() {
    this.loadUserInfo();
  },
  methods: {
    async loadUserInfo() {
      try {
        const { data } = await getUserInfoAPI();
        this.userInfo = data.data;
        console.log(this.userInfo);
      } catch (err) {
        this.$toast.fail("用户尚未登录");
      }
    },

    // 退出登录
    logout() {
      // 1. 跳转提示框
      this.$dialog
        .confirm({
          title: "标题",
          message: "弹窗内容"
        })
        .then(() => {
          // console.log("打印确认事件");
          // 2. 删除 vuex 容器 和 本地存储
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          console.log("打印取消事件");
        });
    }
  }
};
</script>

<style lang="less" scoped>
.my-container {
  background-color: #f5f7f9;
  .header {
    height: 361px;
    background: url("~@/assets/banner.png") no-repeat;
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-size: 28px;
    color: #fff;
    .mobile {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
  }
  .user-login {
    background-color: pink;
    padding: 0 32px 0;
    box-sizing: border-box;
    .data-user {
      .user-info {
        display: flex;
        justify-content: space-around;
        height: 231px;
        .left {
          display: flex;
          align-items: center;
          .avatar {
            width: 150px;
            height: 150px;
            margin-right: 22px;
            border: 4px solid #fff;
          }
          .text {
            font-size: 30px;
            color: #fff;
          }
        }
        .right {
          display: flex;
          align-items: center;
          .edit {
            width: 136px;
            height: 40px;
            border-radius: 16px;
            padding: 0;
            font-size: 23px;
            line-height: 40px;
            text-align: center;
          }
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        text-align: center;
        color: #fff;
        span.num {
          font-size: 36px;
        }
        span.bottom {
          font-size: 23px;
        }
      }
    }
  }

  .grid-login {
    margin-bottom: 9px;
    .grid-item {
      i.toutiao {
        font-size: 45px;
      }
      i.toutiao-shoucang {
        color: #eb5253;
      }
      i.toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  // 单元格
  .van-cell-group {
    .md9 {
      margin-bottom: 9px;
    }
    .logout {
      text-align: center;
      color: #d86262;
    }
  }
}
</style>
