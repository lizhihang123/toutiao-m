<!--
 * @Date: 2022-01-25 14:39:22
 * @LastEditTime: 2022-01-25 19:00:15
-->
<template>
  <div class="Photo-container">
    <img :src="img" alt="" class="update_photo" ref="image" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="modify" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
// 导入使用cropper包
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
// 修改用户头像
import { changePhotoAPI } from "@/api";
export default {
  name: "changePhoto",
  data() {
    return {
      cropper: null
    };
  },
  mounted() {
    const image = this.$refs.image;

    // cropper.js 第三方包的使用
    this.cropper = new Cropper(image, {
      viewMode: 1, // 如果为0 可以跑到外面去
      dragMode: "move", // 可否拖动
      aspectRatio: 16 / 9, // 裁剪比例
      autoCropArea: 1, // 裁剪区域大小
      cropBoxMovable: false, // 裁剪区域是否可以移动
      cropBoxResizable: false, // 裁剪区域 是否可以放大缩小
      background: false, // 要不要背景的网格
      movable: true,
      crop(event) {}
    });
    console.log(this.cropper);
  },
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  methods: {
    onConfirm() {
      // 1. 知道图像裁切两种方式
      //    服务端裁切：客户端上传头像 =》后端接受 =》客户端提交裁切的参数 =》后端接受参数 =》进行裁切 =》裁切后的图片保留到后端 =》地址响应给前端

      //   基于 服务端的裁切 使用 getData 方法 获取裁切参数
      //   console.log(this.cropper.getData());
      //   基于纯客户端的裁切 使用getCroppedCanvas获取裁切的文件对象
      //   toBlob方法是干嘛用的 用于创建Blob对象
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        console.log(blob);

        // blob数据图片裁切的例子
        // const blob1 = blob.slice(0, 3, 'application/json')
        // const blob2 = blob.slice(3, 514954, 'application/json')
        // console.log(blob1);
        // console.log(blob2);

        // Pass the image file name as the third parameter if necessary.
        // const res = await changePhotoAPI({
        //   photo: blob
        // });
        this.loadPhotoChange(blob);
      });
    },
    async loadPhotoChange(blob) {
      this.$toast.loading({
        message: "加载中",
        duration: 0, // 表示没有加载好 不会停止
        forbidClick: true // 是否禁止背景点击
      });
      const formData = new FormData();
      formData.append("photo", blob);
      // 发请求时 =》 携带的参数格式content-type 是multipart/formdata()格式的数据 方便XHR请求的发送 =》 如何转化 声明 new 一个FormData对象 =》 数据append进去 =》再提交
      try {
        const { data } = await changePhotoAPI(formData);
        // 关闭弹层
        this.$emit("close");
        // 关闭加载中
        // 更新视图
        this.$emit("upload-photo", data.data.photo);
        // 更新成功
        this.$toast.success('更新成功')
      } catch (error) {
        // 更新失败
        this.$toast.fail("更新失败")
      }
    }
  }
};
</script>

<style lang="less" scoped>
.Photo-container {
  background-color: #000;
  height: 100%;
  .update_photo {
    max-width: 100%;
  }
  .toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
  }
  .cancel,
  .modify {
    width: 90px;
    height: 90px;
    font-size: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
}
</style>
