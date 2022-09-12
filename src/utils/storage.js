/*
 * @Date: 2022-01-10 20:57:47
 * @LastEditTime: 2022-08-13 19:21:33
 */

/*
存储值
*/
export const setItem = (key, value) => {
  if (typeof value === "object") {
    return window.localStorage.setItem(key, JSON.stringify(value));
  }
  return window.localStorage.setItem(key, value);
};

/*
取值
*/

export const getItem = (key) => {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (err) {
    return window.localStorage.getItem(key);
  }
};

/*
删除值
*/
export const removeItem = (key) => {
  window.localStorage.removeItem(key);
};
