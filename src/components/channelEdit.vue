<!--
 * @Date: 2022-01-15 20:06:21
 * @LastEditTime: 2022-08-05 15:21:04
-->
<template>
  <div class="channel-edit">
    <van-cell class="channel_title">
      <div slot="title" class="channel_my">我的频道</div>
      <div slot="default">
        <van-button
          round
          type="danger"
          plain
          size="mini"
          class="channel_edit_button"
          style="flex-basis: unset; padding: 0"
          @click="isEdit = !isEdit"
          >{{ isEdit ? "完成" : "编辑" }}</van-button
        >
      </div>
    </van-cell>
    <van-grid square :gutter="23">
      <van-grid-item
        class="grid-item"
        v-for="(mychannel, index) in myChannels"
        :key="index"
        icon="clear"
        style="flex-basis: unset; padding-top: 0"
        @click="toggleChannel(mychannel, index)"
      >
        <!-- 删除 小图标的插槽 -->
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit && !fixedChannel.includes(mychannel.id)"
        ></van-icon>
        <!-- 宫格文字的插槽 -->
        <div slot="text" class="text" :class="{ active: index === Sactive }">
          {{ mychannel.name }}
        </div>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell class="channel_title channel_recommend">
      <div slot="title" class="channel_my">频道推荐</div>
      <div slot="default"></div>
    </van-cell>
    <van-grid square :gutter="23">
      <van-grid-item
        class="grid-item"
        v-for="(recommendChannel, index) in recommendChannels"
        :key="index"
        icon="plus"
        style="flex-basis: unset; padding-top: 0"
        @click="addChannel(recommendChannel)"
      >
        <div slot="text" class="text">
          {{ recommendChannel.name }}
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannelsAPI,
  storeUserChannelsAPI,
  deleteUserChannelsAPI,
} from "@/api";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage.js";
export default {
  name: "channelEdit",
  data() {
    return {
      allChannel: [], // 接受所有频道信息
      isEdit: false, // 控制 编辑按钮的显示状态
      fixedChannel: [0, 1], // 不能删除的频道
    };
  },
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    Sactive: {
      type: Number,
      required: true,
    },
  },
  computed: {
    // user监控 用户是否登录
    ...mapState(["user"]),
    recommendChannels() {
      /*
      从allChannel“所有频道”遍历时，去“我的频道”找，是否有id和所有频道里面一致的，如果找不到，就把这个数据放到recommendC，返回给recommendChannels频道推荐下面。
      因此，我们删除频道时，不需要额外的比如从“推荐频道”里面push一个数据，再从“我的频道里面”pop一个数据出来
      */
      const recommendC = [];
      this.allChannel.forEach((item) => {
        const results = this.myChannels.find((userItem) => {
          return userItem.id === item.id;
        });
        if (!results) {
          recommendC.push(item);
        }
      });
      return recommendC;
    },
  },
  created() {
    this.loadAllChannels();
  },
  methods: {
    // 获取所有的频道数据
    async loadAllChannels() {
      try {
        const { data } = await getAllChannelsAPI();
        this.allChannel = data.data.channels;
      } catch (err) {
        this.$toast.fail("获取所有频道数据失败");
      }
    },
    // 推荐频道 --> 我的频道 数据切换
    async addChannel(recommendChannel) {
      this.myChannels.push(recommendChannel);
      // 如果用户登录 数据存在后台
      this.clickAddChannel(recommendChannel);
    },

    async clickAddChannel(recommendChannel) {
      try {
        if (this.user) {
          await storeUserChannelsAPI({
            id: recommendChannel.id,
            seq: this.myChannels.length,
          });
        } else {
          // 如果用户没有登录,数据存储在本地存储
          setItem("TOUTIAO_Channel", this.myChannels);
        }
      } catch (err) {
        this.$toast("存储数据失败，请重新再试");
      }
    },
    // 点击切换 频道数据
    toggleChannel(mychannel, index) {
      // 2. 如果 点击的item  索引小于 高亮的item 就让Sactive--
      //
      if (this.isEdit === false) {
        console.log("mychannel, mychannel.id", mychannel, mychannel.id);
        console.log("index", index);
        /*
        这里用index而不是用id的原因是。
        假设有tab1 tab2 tab3 tab4 索引和id此时都是0 1 2 3
        删除tab3
        此时tab4的索引是2，但是id还是3
        如果点击tab4 请问 跳转的时候依据如果是id，就会跳转到“3“
        */
        this.$emit("upload_active", index, false);
      } else {
        // 1. 不能删除的数组 必须用id 因为索引会变化 id针对具体值 删除只有前后关系用index没事
        if (this.fixedChannel.includes(mychannel.id)) {
          return;
        }
        // Sactive 是 切换频道 以至于 高亮的值 索引小于高亮 就传递 索引值
        if (index < this.Sactive) {
          this.$emit("upload_active", this.Sactive - 1, true);
        }
        // [a,b,c,d] c是高亮，点击b删掉b 希望高亮还是c
        // 删掉索引就是点击获取的索引，下面依旧是index
        // this.$emit 传递的索引 因为删除了一个元素，所以高亮的索引就要 - 1
        // 删除语句必须写在下面
        this.myChannels.splice(index, 1);
        this.deleteChannel(mychannel);
      }
    },
    // 删除我的频道
    async deleteChannel(mychannel) {
      // 1. 登录状态 存储到后台

      try {
        if (this.user) {
          await deleteUserChannelsAPI(mychannel);
        } else {
          // 2. 如果没有登录 删除本地存储的数据
          setItem("TOUTIAO_Channel", this.myChannels);
        }
      } catch (err) {
        this.$toast("存储删除 - 频道 失败，稍后再试");
      }
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  .channel_title {
    display: flex;
    align-items: center;
    padding-top: 109px;
    padding-bottom: 48px;
    .channel_my {
      font-size: 33px;
      color: #333;
    }
    .channel_edit_button {
      width: 108px;
      height: 48px;
    }
    .van-button--danger {
      border: 1px solid #f85a5a;
    }
  }
  .van-grid {
    border: 0;
  }
  .grid-item {
    width: 170px;
    height: 86px;

    .text {
      font-size: 28px;
    }
    .active {
      color: red;
    }
    /deep/.van-grid-item__content {
      flex-direction: row;
      background-color: #f4f5f6;
      white-space: nowrap;
      .van-grid-item__icon-wrapper {
        position: unset;
      }
      .van-icon-clear {
        position: absolute;
        top: -6px;
        right: -15px;
        z-index: 2;
        color: #f85a5a;
      }
      .van-icon {
        font-size: 24px;
        margin-right: 6px;
      }
      .van-grid-item__text {
        margin-top: 0;
        /deep/div {
          font-size: 28px;
        }
      }
    }
  }
}
.channel_recommend {
  padding-top: 75px;
  padding-bottom: 48px;
}
</style>
