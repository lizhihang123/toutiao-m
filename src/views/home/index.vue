<!--
 * @Date: 2022-01-12 09:52:23
 * @LastEditTime: 2022-08-05 16:12:54
-->
<template>
  <div class="home-container">
    <!-- 头部 NavBar -->
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

    <!-- tabs标签滚动 -->
    <van-tabs class="tab-list" v-model="active" animated swipeable>
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
        id="articleList"
      >
        <article-list :channel="channel"> </article-list>
      </van-tab>
      <div slot="nav-right" class="placeholder" id="test"></div>
      <div slot="nav-right" class="nav-right" id="test2" @click="PopFn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>

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
  },
  activated() {
    // console.log(document.querySelector("#articleList"));  // 能够打印出dom元素
  },
  deactivated() {},
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async loadUserChannel() {
      console.log(document.querySelector("#articleList"));
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
