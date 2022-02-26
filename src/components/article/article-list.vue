<!--
 * @Date: 2022-01-14 13:34:28
 * @LastEditTime: 2022-01-22 18:46:30
-->
<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      success-duration="1500"
      :success-text="loadSuccessText"
    >
      <!-- 列表内容 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <ArticleItem
          :channel="channel"
          v-for="(channel, index) in list"
          :key="index"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { GetNewsContentAPI } from "@/api";
import ArticleItem from "@/components/article/article-item.vue";
export default {
  data() {
    return {
      // 何时触发 load 页面初始化 第一屏数据 | 数据不足一个页面的时候
      list: [], // 存储列表的内容数据
      loading: false, // 1. 如果设置为false表示数据尚未加载 2. 内部自动设置为true 表示正在 异步加载 获取数据
      finished: false, // 1. 数据是否加载完成。加载完成，手动设置为true，2. 没有加载完成，状态必须是false
      timestamp: null,
      error: false, // error为false 没有错误提示 true 有
      refreshing: false, // 下来刷新功能
      loadSuccessText: "加载完成"
    };
  },
  name: "ArticleList",
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onLoad() {
      try {
        // 1. 请求数据
        const { data } = await GetNewsContentAPI({
          channel_id: this.channel.id, // 频道ID
          timestamp: this.timestamp || Date.now() // 请求新数据的时间戳
        });
        // 故意写bug  测试用
        // if (Math.random() > 0.2) {
        //   JSON.parse("aabcdefg");
        // }
        // 2. 异步更新数据
        const results = data.data.results;
        this.list.push(...results);
        // console.log(results);
        // console.log(this.channel); // 请求来的tab标签数据
        // console.log(data); // 请求来的新闻列表数据
        // console.log(this.list); // 当前页面的新闻数据内容 更新了的
        // 3. 加载状态结束
        this.loading = false;
        // 4. 判断 数据全部加载完成
        if (results.length) {
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.finished = false;
        }
      } catch (err) {
        this.loading = false; // 关闭加载效果
        this.error = true; // 开启错误提示
      }
    },
    async onRefresh() {
      try {
        // 1. 请求数据
        const { data } = await GetNewsContentAPI({
          channel_id: this.channel.id, // 频道ID
          timestamp: Date.now() // 请求新数据的时间戳 就是当前时间
        });
        // if (Math.random() > 0.2) {
        //   JSON.parse("aabcdefg");
        // }
        // 2. 异步更新数据
        const results = data.data.results;
        this.list.unshift(...results);

        // 3. 刷新下拉 加载完成
        this.refreshing = false;
        this.loadSuccessText = `加载成功，本次加载共${results.length}条数据`;
      } catch (err) {
        this.refreshing = false; // 关闭刷新加载效果
        this.loadSuccessText = "本次加载失败";
      }
    }
  }
  // onLoad() {
  //   // 1. 请求数据
  //   //
  //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  //   // 2. 异步更新数据
  //   setTimeout(() => {
  //     for (let i = 0; i < 10; i++) {
  //       this.list.push(this.list.length + 1);
  //     }

  //     // 3. 加载状态结束
  //     this.loading = false;
  //     // 4. 数据全部加载完成
  //     if (this.list.length >= 40) {
  //       this.finished = true;
  //     }
  //   }, 1000);
  // }
};
</script>

<style scoped lang="less">
.van-pull-refresh {
    overflow-y: scroll !important;
  // padding-top: 100px;
  // 为什么稍微下拉就能够刷新？
  // 为什么overflow: scroll能够解决这个问题 这两个有什么关系？
  // overflow: scroll =》 添加滚动条

  // overflow给谁设置？ =》 给父亲设置
  // 为什么vant组件库的list没有自带的滚动机制？=》从另一种情况解释这个问题 =》当给html,body 设置 overflow-x:hidden =》导致浏览器会把元素的 overflow-y: auto => 浏览器无法正确判断 容器的高度 =》造成无法滚动 =》
  // 但是我并没有一开始设置overflow-x:hidden => 造成错误的结果类似 =》我的问题是可以往下翻，但是往上翻，稍微翻一点点就刷新 =》而它解释的情况的结果是根本无法下拉

  // 有没有其它的解决方案？ 查看了文档的属性和方法是否遗漏。 没有 尝试设置高度 发现根本滚不动。 =》van-pull-refresh刷新 和 van-list 只有给父亲van-pull-refresh添加是管用的 尽管 van-list也是一个div盒子，内容在van-cell里面
  // 这个解决方案是否是完善的？ 完善 可以解决问题

  // 为什么设置overflow:hidden 能够清除浮动的影响？
  // 因为设置overflow:hidden 能够触发BFC 而 触发BFC的一个特性就是计算 浮动元素高度的时候 浮动元素的高度也包括在内
  // https://www.jianshu.com/p/7e04ed3f4bea
  .van-list {
    // height: 100%;
    height: 79vh;
    // overflow-y: auto;

  }
}
</style>
