/*
 * @Date: 2022-01-09 09:36:28
 * @LastEditTime: 2022-01-20 14:18:24
 */
module.exports = {
  // 1. 自动给样式 加前缀 不在这里配置 去package.json配置
  //   autoprefixer: {
  //     browsers: ["Android >= 4.0", "iOS >= 8"],
  //   },
  plugins: {
    "postcss-pxtorem": {
      // 1. 含义：表示根据 根元素的字体大小 进行转换
      // 2. 大部分设计图默认是750二倍图设计图， 750 / 10 = 75 为什么要除10，rem把页面分为10份 为什么分为 10份 为了好计算
      // 3. 而 vant 的组件 尺寸是根据 375设计图设计的，所以下面写 37.5。 不然，写75，vant的标签的样式会特别小，小了一半
      // 4. 而 设计图如果按照37.5 会显得特别大
      // 5. 方案 vant组件 满足 37.5 自己写的样式的尺寸 满足 75
      rootValue({ file }) {
        return file.indexOf("vant") !== -1 ? 37.5 : 75;
      },
      //   表示给所有的标签涉及 单位的 都进行转换 也可以指定 ['height','width']
      propList: ["*"],
      exclude: "github-markdown", // 排除这个文件 -> 这个文件不设置 px转化为rem
    },
  },
};
