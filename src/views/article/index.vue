<!--
 * @Date: 2022-01-19 19:25:17
 * @LastEditTime: 2022-09-11 14:47:21
-->
<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="nav-tab-btn"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap markdown-body">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loadingState">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <!-- 关注按钮 -->
          <user-button
            v-model="article.is_followed"
            :isAutId="article.aut_id"
          />
          <!-- <van-button
            class="follow-btn"
            round
            size="small"
            v-if="article.is_followed"
            @click="Follow"
            :loading="loadingFollow"
            >已关注</van-button
          >
          <van-button
            v-else
            @click="Follow"
            class="follow-btn"
            type="badge"
            color="#3296fa"
            round
            size="small"
            :loading="loadingFollow"
            icon="plus"
            >关注</van-button
          > -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content"
          v-html="article.content"
          ref="articleContent"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 评论部分 -->
        <comment-list
          :source="this.article.art_id"
          @load-success="CommentData = $event.total_count"
          :list="commentList"
          @upload-popT="popShowFnT"
        />

        <!-- 底部区域 -->
        <div class="article-bottom">
          <!-- 写评论按钮 -->
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPopShow = true"
            >写评论</van-button
          >
          <!-- 评论标签 -->
          <van-icon name="comment-o" :badge="CommentData" color="#777" />

          <!-- <van-icon color="#777" name="star-o" /> -->
          <!-- 收藏图标 -->
          <article-collect
            v-model="article.is_collected"
            :ArtId="article.art_id"
            class="van-icon"
          />
          <!-- 点赞 -->
          <article-like
            v-model="article.like_count"
            :ArtId="article.art_id"
            class="van-icon"
          />
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <!-- 转发 -->
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- 评论文章 -->
        <van-popup v-model="isPopShow" position="bottom">
          <comment-post :ArtId="article.art_id" @success-publish="closePop" />
        </van-popup>

        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errState === 1">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 给评论增加评论 -->
    <van-popup
      v-model="isReplyShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!--comment是评论的内容 -->
      <!-- uploadPop是自定义事件的监听 点击这个关闭弹出层 -->
      <comment-reply
        v-if="isReplyShow"
        :comment="currentComment"
        @uploadPop="isReplyShow = $event"
      />
    </van-popup>
  </div>
</template>

<script>
// 获取文章id  添加用户关注 取消用户关注
import { getArticleByIdAPI } from "@/api";
// 引入markdown css文件
import "./github-markdown.css";
// 图片预览 必须引入 作为函数使用
import { ImagePreview } from "vant";
// 添加关注用户 取消关注用户
import UserButton from "@/components/user-button";
// 引入 收藏组件
import ArticleCollect from "@/components/article/article-collect";
// 引入 点赞组件
import ArticleLike from "@/components/article/article-like";
// 引入评论组件
import CommentList from "@/components/comment/comment-list";
// 弹出层组件
import CommentPost from "@/components/comment/comment-post";
// 回复评论组件
import CommentReply from "@/components/comment/comment-reply";
// 引入滚动条记忆包
// import ScrollPosition from '@/utils/scroll-position'
// ImagePreview({
//   images: [
//     "https://img01.yzcdn.cn/vant/apple-1.jpg",
//     "https://img01.yzcdn.cn/vant/apple-2.jpg"
//   ],
//   startPosition: 1
// });
export default {
  // 1. 设置第一个变量 loadingState 为true表示加载中 为false 表示加载完成，加载部分不显示
  // 2. 随便获取一个article里面的数据 表示加载到了文章内容 记得把加载中改为false
  // 3. 加载错误 起初用v-else 但是发现加载错误 原因1确实没有数据【被作者|管理员删掉】 原因2 网速不行 ==> 设置 errState 如果 errState.response.status === 404 确实没有数据 作if判断
  // 4. v-else 网速问题 - 用Math.random() 来模拟错误
  name: "ArticleIndex",
  data() {
    return {
      article: {}, // 文章详情的数据
      loadingState: true, // 文章加载显示状态
      errState: 0,
      loadingFollow: false, // 关注按钮 显示状态
      CommentData: 0, // 评论组件传来的数据 默认为0
      isPopShow: false, // 弹出层 是否显示
      commentList: [], // 评论列表
      isReplyShow: false, // 评论回复
      currentComment: null, // 当前评论对象
    };
  },
  provide: function () {
    return {
      articleId: this.articleId, // 通过provide传递文章id
    };
  },
  props: {
    articleId: {
      type: [Number, String], // url点击进去获取 与 文章item点击进去获取的 id可能是字符串 可能是数组 所以要定义双类型
      required: false,
    },
  },
  components: {
    UserButton,
    ArticleCollect,
    ArticleLike,
    CommentList,
    CommentPost,
    CommentReply,
  },

  created() {
    this.loadArticle();
  },
  methods: {
    async loadArticle() {
      try {
        // 一开头就把loadingState 改为true 为点击按钮 重新加载做准备
        this.loadingState = true;
        // if (Math.random() > 0.3) {
        //   JSON.parse("123sdfafafa");
        // }
        const { data } = await getArticleByIdAPI(
          this.articleId || this.$route.query.articleId
        );
        this.article = data.data;
        // console.log(this.article);
        setTimeout(() => {
          this.loadImage();
        }, 0);
        // this.loadingState = false; // 文章有数据 加载中 loading设置为false
      } catch (err) {
        // 报错404 后台没数据
        if (err.response && err.response.status === 404) {
          this.errState = 1;
        }
        // this.loadingState = false; // 获取数据失败 loading设置也要为false
        this.$toast.fail("获取文章详情失败");
      }
      this.loadingState = false;
    },
    loadImage() {
      // 拿到文章内容
      const articleContent = this.$refs.articleContent;
      // 拿到所有的图片节点
      const imgs = articleContent.querySelectorAll("img");
      // 数组存储所有的图片节点 这个数组里面的节点 绑定了点击事件 附带图片预览函数
      const images = [];

      // 没有找到 有图片的文章
      imgs.forEach((item, index) => {
        // 小图片节点的src属性放到images里面
        images.push(item.src);
        item.onclick = () => {
          // 图片预览函数
          ImagePreview({
            // 哪些图片
            images: images,
            // 是否有关闭按钮
            closeable: true,
            // 点击图片 起始值是什么
            startPosition: index,
          });
        };
      });
    },
    closePop(data) {
      this.isPopShow = false;
      // 值放到最开始
      this.commentList.unshift(data.new_obj);
      console.log(this.commentList);
      // 评论数量+1
      this.CommentData++;
    },
    // 回复评论弹出层弹出
    popShowFnT(comment) {
      this.currentComment = comment;
      this.isReplyShow = true;
    },
  },
};
</script>

<style scoped lang="less">
.article-container {
  /deep/.van-nav-bar {
    .van-icon {
      color: #fff;
    }
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/.van-icon {
      font-size: 40px !important;
      padding: 0 !important;
      border: none;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
