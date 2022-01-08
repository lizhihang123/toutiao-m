/*
 * @Date: 2022-01-07 09:45:39
 * @LastEditTime: 2022-01-08 15:58:07
 */
module.exports = {
  // 当前目录就是根目录
  root: true,
  // 启用 ESLint 检测环境
  env: {
    // node环境下启动ESLint 检测环境
    node: true
  },
  // 在ESLint 中基础配置需要继承的配置
  extends: ["plugin:vue/essential", "@vue/standard"],
  // 解析器
  parserOptions: {
    parser: "babel-eslint"
  },
  // 需要修改的启动规则 及各自的错误级别
  /**
   * 错误级别分为三种
   * "off" 或 0 - 关闭规则
   * "warn" 或 1 - 开启规则，使用警告级别的错误: warn (不会导致程序退出)
   * "error" 或 2 - 开启规则，使用错误级别的错误: error (触发时，程序会退出)
   */
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-var": 0,
    // 使用单引号 不使用双引号 使用双引号不报错
    quotes: 0,
    // 结尾有无分号 总是无
    semi: 0,
    // 数组和对象末尾最后一个值 有无逗号 总是有
    "comma-dangle": 2,
    // 函数括号前必须有空格
    "space-before-function-paren": 0
  }
};
