<!--
 * @Date: 2022-01-15 11:12:58
 * @LastEditTime: 2022-01-19 19:40:23
-->
<template>
  <!-- 写法1：:to="'article/' + channel.art_id"  -->
  <!-- 写法2: :to="`article/${channel.art_id}`" -->
  <!-- 写法3： :to="{
      name: 'article',
      params: {
        articleId: channel.art_id
      }
    }" -->
  <van-cell
    :to="{
      name: 'article',
      params: {
        articleId: channel.art_id
      }
    }"
  >
    <!-- 标题插槽 -->
    <div slot="title" class="title-wrap van-multi-ellipsis--l2">
      {{ channel.title }}
    </div>
    <!-- 下侧 label标签 -->
    <div slot="label">
      <!-- 三张图片情况 -->
      <div class="cover_wrap" v-if="channel.cover.type === 3">
        <div class="cover_item">
          <van-image
            v-for="(img, index) in channel.cover.images"
            :key="index"
            class="cover-item-img"
            :src="img"
            fit="cover"
          />
        </div>
      </div>
      <div class="label-text">
        <span class="top">置顶</span>
        <span>{{ channel.aut_name }}</span>
        <span>{{ channel.comm_count }}评论</span>
        <span>{{ channel.pubdate | relativeTime }}</span>
      </div>
    </div>
    <!-- 右侧 描述内容  -->
    <van-image
      class="img-item"
      v-if="channel.cover.type === 1"
      slot="default"
      fit="cover"
      :src="channel.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    channel: {
      type: Object,
      require: true
    }
  }
};
</script>

<style scoped lang="less">
.van-pull-refresh {
  .title-wrap {
    font-size: 32px;
    color: #3a3a3a;
  }
  .label-text {
    .top {
      font-size: 23px;
      color: #e22829;
    }
    span {
      font-size: 23px;
      color: #b4b4b4;
      &:not(:last-child) {
        margin-right: 30px;
      }
    }
  }

  .van-cell__title {
    font-size: 23px;
    color: #3a3a3a;
  }
  .cover_wrap {
    display: flex;
    padding: 30px 0;
    .cover_item {
      height: 146px;

      .cover-item-img {
        width: 225px;
        height: 146px;
        &:not(:last-child) {
          padding-right: 7px;
          box-sizing: border-box;
        }
      }
    }
  }
  .van-cell__value {
    flex: unset;
    padding-left: 25px;
  }
  .img-item {
    width: 232px;
    height: 146px;
    .van-image__img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
