<!--
 * @Date: 2022-01-12 09:52:23
 * @LastEditTime: 2022-09-12 12:38:36
-->
<template>
  <div class="home-container">
    <!-- 头部 NavBar -->
    <div>
      <van-nav-bar class="nav-tab-btn" title="登录" fixed>
        <van-button
          slot="title"
          type="info"
          icon="search"
          round
          size="mini"
          class="search-nav"
          to="/search"
          >搜索</van-button
        >
      </van-nav-bar>
    </div>

    <!-- tabs标签滚动 -->
    <div class="main">
      <van-tabs
        class="tab-list"
        v-model="active"
        animated
        swipeable
        ref="tabList"
      >
        <van-tab
          :title="channel.name"
          v-for="channel in channels"
          :key="channel.id"
          ref="articleList"
        >
          <article-list id="demo" :channel="channel"> </article-list>
        </van-tab>
        <div slot="nav-right" class="placeholder" id="test"></div>
        <div slot="nav-right" class="nav-right" id="test2" @click="PopFn">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </van-tabs>
    </div>

    <!-- 弹出层 -->
    <van-popup
      v-model="isPopupShow"
      close-icon-position="top-left"
      position="bottom"
      closeable
      :style="{ height: '90%' }"
    >
      <ChannelEdit
        @upload_active="uploadActive"
        :myChannels="channels"
        :Sactive="active"
        id="channel"
      ></ChannelEdit>
    </van-popup>
    <!-- /弹出层 -->
  </div>
</template>

<script>
import { loadUserChannelAPI } from "@/api";
import ArticleList from "@/components/article/article-list.vue";
import ChannelEdit from "@/components/channelEdit.vue";
// 获取用户登录状态
import { mapState } from "vuex";
// 导入getItem
import { getItem } from "@/utils/storage.js";
// window.addEventListener("scroll", function () {
//   console.log(document.documentElement.scrollTop);
// });

export default {
  name: "HomeIndex",
  data() {
    return {
      active: 0,
      channels: [], // 标签的频道数据
      isPopupShow: false, // 控制 弹出层是否显示
      scrollTop: 0, // 记录列表页的滚动的位置
    };
  },
  components: {
    ArticleList,
    ChannelEdit,
  },
  created() {
    this.loadUserChannel();
  },
  mounted() {
    // 为什么外来的组件 这里打印出来是null 因为这个组件是引入来的
    // const demo = document.getElementById("demo");
    // demo.addEventListener("scroll", function () {
    //   console.log(1);
    // });
  },

  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async loadUserChannel() {
      // const { data } = await loadUserChannelAPI();
      // this.channels = data.data.channels;
      let channel = [];
      // 1. 如果用户登录了 数据直接给到后台
      if (this.user) {
        const { data } = await loadUserChannelAPI();
        channel = data.data.channels;
      } else {
        // 2. 如果用户没有登录 有本地存储 用本地存储的数据
        const localChannel = getItem("TOUTIAO_Channel");
        if (localChannel) {
          channel = localChannel;
        } else {
          // 3. 如果用户没有本地存储的数据 在"未登录"的情况下，去调用同一个接口 获取“默认推荐频道”
          const { data } = await loadUserChannelAPI();
          channel = data.data.channels;
        }
      }
      this.channels = channel;
    },
    PopFn() {
      this.isPopupShow = true;
    },
    // 更新active 为什么？ 因为active 控制 tabs栏的切换
    uploadActive(index, isPopupShow = true) {
      // 为什么用id 因为索引是有顺序 可是
      console.log(index);
      this.active = index;
      this.isPopupShow = isPopupShow;
    },
    /**
     * 记录，当前页面的滚动距离，存储给当前组件的route.meta元信息
     */
    scrollFn() {
      console.log(1);
      this.$route.meta.scrollT =
        document.documentElement.scrollTop || document.body.scrollTop;
    },
  },
  /*
  1.第一次进入页面activated是否会被触发 触发了
  2.监听滚动事件试试
  3.目标是 从首页 -> 我的 页面 这个activated应该写在哪个页面上?
    思考：从首页 -> 我的 页面 哪个组件会被创建 哪个组件会被销毁 就好了 -》home/index.vue
  4.组件一进来 就监听滚动事件 但是不是监听 window的滚动事件 而是其他组件
    (坑)第一次进入页面 -》进入activated -》获取不到dom元素 只有经历了一次组件销毁 -》再次进入创建 就能够获取到dom
    (问)为什么是这样？
    (问)this.$nextTick不会生效
    测试 如果是组件套组件 不会生效
  */
  activated() {
    // 切回来
    // console.log(this.$route);
    // window和document, 监听网页滚动的事件
    // html标签获取scrollTop, 滚动的距离, 和设置滚动的位置
    // 立刻设置, 滚动条位置
    window.addEventListener("scroll", this.scrollFn);
    document.documentElement.scrollTop = this.$route.meta.scrollT;
  },
  deactivated() {
    // 先切换 记录高度的
    window.removeEventListener("scroll", this.scrollFn);
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding-top: 172px;
  /deep/.van-icon {
    color: #fff;
  }
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-nav {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    .van-button__content {
      font-size: 28px;
      color: #fff;
      border: none;
      .van-icon {
        font-size: 32px;
        color: #fff;
      }
    }
  }
  /deep/.tab-list {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
      height: 80px;
    }

    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
    }
    .van-tabs__line {
      background-color: #3296fa;
      width: 31px;
      height: 6px;
      margin-bottom: 9px;
    }
    .nav-right {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      opacity: 0.902;
      .toutiao {
        font-size: 33px !important;
      }
      &:before {
        content: "";
        width: 1px;
        height: 58px;
        background: url("~@/assets/gradient-gray-line.png");
        background-size: contain;
        margin-right: 15px;
      }
    }

    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
  }
}
</style>
