
const doc = document
const cache = {}

export default {
  // 保存滚动条位置
  save(path) {
    //   document.documentElement是什么
    //   scrollTop是什么
    cache[path] = doc.documentElement.scrollTop || doc.body.scrollTop
  },
  // 重置滚动条位置
  get() {
    const path = this.$router.path
    // 为什么要用nextTick
    this.$nextTick(function() {
      doc.documentElement.scrollTop = doc.body.scrollTop = cache[path] || 0
    })
  },
  // 设置滚动条回到顶部
  goTop() {
    this.$nextTick(function () {
      doc.documentElement.scrollTop = doc.body.scrollTop = 0
    })
  }
}
