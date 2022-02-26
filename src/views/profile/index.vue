<!--
 * @Date: 2022-01-23 21:39:29
 * @LastEditTime: 2022-01-25 18:36:07
-->
<template>
  <div class="user-profile">
    <van-nav-bar
      class="nav-tab-btn"
      title="个人信息"
      fixed
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>

    <!-- 用户信息部分 -->

    <!-- 头像表单 隐藏 -->
    <!-- 2. 绑定change事件 上传文件就触发 -->
    <input type="file" hidden ref="file" @change="onChange" />
    <!-- 头像 -->
    <!-- 1. ref => 为了获取dom 模拟点击事件 -->
    <van-cell title="头像" value="内容" is-link @click="$refs.file.click()">
      <van-image fixed="contain" round :src="user.photo" />
    </van-cell>
    <!-- /头像 -->

    <!-- 昵称 -->
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isPopNameShow = true"
    ></van-cell>
    <!-- /昵称 -->

    <!-- 性别 -->
    <van-cell
      title="性别"
      :value="user.gender === 1 ? '女' : '男'"
      is-link
      @click="isPopGenderShow = true"
    ></van-cell>
    <!-- / 性别 -->

    <!-- 生日 -->
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isPopBirthShow = true"
    ></van-cell>
    <!-- /生日 -->

    <!-- 修改昵称 -->
    <van-popup
      v-if="isPopNameShow"
      v-model.trim="isPopNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <changeName
        :name="user.name"
        @close="isPopNameShow = false"
        @upload-name="user.name = $event"
      ></changeName>
    </van-popup>

    <!-- 修改性别 -->
    <van-popup
      v-if="isPopGenderShow"
      v-model.trim="isPopGenderShow"
      position="bottom"
    >
      <changeGender
        @close="isPopGenderShow = false"
        v-model="user.gender"
        @upload-gender="user.gender = $event"
      ></changeGender>
    </van-popup>

    <!-- 修改生日 -->
    <van-popup
      v-if="isPopBirthShow"
      v-model.trim="isPopBirthShow"
      position="bottom"
    >
      <!-- v-model绑定的数据是字符串 和 时间组件初始值不同 别搞混了 -->
      <changeBirth
        @close="isPopBirthShow = false"
        v-model="user.birthday"
        @upload-birth="user.birth = $event"
      ></changeBirth>
    </van-popup>

    <!-- 修改头像 -->
    <van-popup
      v-if="isPopPhotoShow"
      v-model.trim="isPopPhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <changePhoto
        :img="img"
        @close="isPopPhotoShow = false"
        @upload-photo="user.photo = $event"
      ></changePhoto>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfileAPI } from "@/api";
// 导入改变昵称组件
import changeName from "./component/changeName.vue";
import changeGender from "./component/changeGender.vue";
import changeBirth from "./component/changeBirth.vue";
import changePhoto from "./component/changePhoto.vue";

export default {
  name: "UserProfile",
  data() {
    return {
      user: {}, // 用户的信息
      isPopNameShow: false, // 昵称弹框显示
      isPopGenderShow: false, // 性别弹框显示
      isPopBirthShow: false, // 生日弹框显示
      isPopPhotoShow: false, // 头像弹框显示
      img: null // 头像信息
    };
  },
  components: {
    changeName,
    changeGender,
    changeBirth,
    changePhoto
  },
  created() {
    this.loadUserProfile();
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfileAPI();
        this.user = data.data;
        console.log(this.user.gender);
        console.log(this.user);
      } catch (err) {
        this.$toast.fail("获取用户的资料失败");
      }
    },
    onChange() {
      this.isPopPhotoShow = true; // 显示弹框
      // 获取文件信息里面的files对象里面里面有 name size type字段
      const file = this.$refs.file.files[0];
      // window.URL.createObjectURL干嘛用的 创建url地址 表示file对象或者是blob对象
      // blob对象是什么？本质是js对象 =》里面存储大量的二进制的编码格式
      // toBlob 干嘛用的
      console.log(file);
      this.img = window.URL.createObjectURL(file);
      console.log(this.img); // 字符串 // =》地址 =》但是这个地址打开来是本地服务 =》
      // console.log(blob); // 给src的数据
    },
  }
};
</script>

<style lang="less" scoped>
.user-profile {
  padding-top: 92px;
  /deep/.van-nav-bar {
    .van-icon {
      color: #fff;
    }
  }

  /deep/.van-cell {
    .van-image__img {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
