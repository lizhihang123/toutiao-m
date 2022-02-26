<!--
 * @Date: 2022-01-21 17:26:30
 * @LastEditTime: 2022-01-24 07:44:12
-->
<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error.sync="error"
    error-text="请求失败，请稍后重试"
  >
    <comment-item
      v-for="(obj, index) in list"
      :key="index"
      :comment="obj"
      @upload-pop="$emit('upload-popT', $event)"
    />
  </van-list>
</template>

<script>
import { getCommentAPI } from "@/api";
// 评论项组件
import commentItem from "@/components/comment/comment-item.vue";
export default {
  name: "CommentList",
  data() {
    return {
      loading: false, // 加载状态设置
      finished: false, // 数据加载完毕
      // list: [], // 列表数据
      limit: 10, // 每次获取多少个数据
      offset: null, // 获取评论数据偏移量
      error: false // 错误提示
    };
  },
  components: {
    commentItem
  },
  props: {
    source: {
      // 文章id或者评论id
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: function () {
        return [];
      } // 这样写的好处是 如果父组件传递值，我就用；父组件不传递值 我自己不受影响
    },
    type: {
      type: String,
      validator(value) {
        // 这里的意思：父传子传错了 还能够发送请求 避免这种情况 如果传来值是a或者c就返回true 是true才能发送后台请求
        return ["a", "c"].includes(value);
      },
      default: "a"
    }
  },
  created() {
    this.onLoad();
  },
  methods: {
    async onLoad() {
      try {
        // if (Math.random() > 0.5) {
        //   JSON.parse("sdgfag");
        // }
        // 1. 调用接口 获取数据
        // 文章评论和评论的回复 都使用这个接口
        // type评论类型
        // "a" 对文章的回复
        // "c" 对评论的回复
        // source源id
        // 文章的id或者评论的id
        // offset和limit不变化
        const { data } = await getCommentAPI({
          type: this.type,
          source: this.source.toString(), // 防止 【超出JS整数范围时】axios拼接字符串 拼上了引号导致出错
          offset: this.offset,
          limit: 10
        });
        // console.log(data);
        // 2. 拿到数据 赋值给list数组
        const { results } = data.data;
        this.$emit("load-success", data.data);
        this.list.push(...results);
        // console.log(this.list);
        // 3. 将loading设置为false
        this.loading = false;
        // 4. 判断是否还有数据
        if (results.length) {
          this.offset = data.data.last_id;
        } else {
          this.finished = true;
        }
        // 如果有 再次获取
        // 如果没有 finished设置为false
      } catch (err) {
        this.$toast.fail("获取数据失败,请稍后重试");
        this.loading = false; // 记得改为false
      }
    }
  }
};
</script>

<style></style>
