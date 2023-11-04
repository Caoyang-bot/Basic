/**
 * 加载表格拖拽script的js
 * @param {*} url 加载js的地址
 * @param {*} callback 回调函数
 * @returns 返回Promise对象
 */
export const loadScript = (url, callback) => {
  return new Promise((resolve) => {
    let script = window.document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    window.document.getElementsByTagName("head")[0].appendChild(script);
    if (script.readyState) {
      // ie游览器
      script.onreadystatechange = function () {
        if (
          script.readyState === "loaded" ||
          script.readyState === "complete"
        ) {
          script.onreadystatechange = null;
          resolve(true);
          if (callback && typeof callback === "function") {
            callback();
          }
        }
      };
    } else {
      // 其他
      script.onload = function () {
        resolve(true);
        if (callback && typeof callback === "function") {
          callback();
        }
      };
    }
  });
};

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy(obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, (c) => c.original === obj);
  if (hit) {
    return hit.copy;
  }

  const copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy,
  });

  Object.keys(obj).forEach((key) => {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy;
}
