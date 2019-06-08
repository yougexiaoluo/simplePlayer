document.body.style['height'] = window.innerHeight + 'px';

// 动态改变根字体大小
function recalc(layoutSize) {
  // var layoutSize = layoutSize || 750; // 默认设计稿宽度为750px
  // 获取客户端宽度
  var clientWidth = document.documentElement.clientWidth;
  if (!clientWidth) return;
  document.documentElement.style['font-size'] = (clientWidth / 750) * 100 + 'px';
}

function initRecalc() {
  recalc();
  // 判断设备是处于横屏还是竖屏
  var resizeEvt = "osrientationchange" in window ? "orientationchange" : "resize";
  // if (!"addEventListener" in document) return;
  if (!document.addEventListener) return;
  window.addEventListener(resizeEvt, recalc, false);
  document.addEventListener('DOMContentLoaded', recalc, false);
}

initRecalc();