// 防抖函数的使用
export const debounce = function (func, delay) {
  let timer;
  // console.log(this); // 这里指向的是window 为什么给button绑定的事件 this指向的是window呢
  return function () {
    clearTimeout(timer);
    const context = this;
    const args = arguments;
    timer = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}
