/**
 * 
 * @param  option     传入的参数
 * @param  data       提交的参数
 * @param  success    成功回调
 * @param  error      失败回调
 */
function ajax(option) {
  let xhr = null;
  option.type = option.type || 'get'; // 默认为 get请求
  // 兼容IE 写法
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Mycrosoft.XMLHTTP');
  } /* 兼容 IE 结束 */

  if (xhr != null) {
    // 如果没有向后台传输局，那么默认是get请求，请求数据
    if (option.data) {
      let data = option.data;
      // 设置post方式的请求头信息
      if (option.type.toLowerCase() == 'post') {
        // var tem_str = '';
        xhr.open(option.type, option.url);
        xhr.setRequestHeader('Content-type', 'application/json');
      } else {
        let firstStr = true; // 一开始假设为第一个字符
        // ?name=jack&age=18
        for (var key in data) {
          if (firstStr) {
            option.url += `?${key}=${data[key]}`;
            firstStr = false;
          } else {
            option.url += `&${key}=${data[key]}`;
          }
        }
        xhr.open(option.type, option.url);
      }
    } else {
      xhr.open(option.type, option.url);
    } /* if option.data 结束 */
    xhr.addEventListener('readystatechange', function (event) {
      let e = event || window.event;
      // 状态值 4 && 状态码 200 
      if (e.target.readyState == 4) {
        if (e.target.status == 200) {
          let data = JSON.parse(e.target.response);
          option.success && option.success(data);
        } else {
          option.error && option.error(e);
        }
      }
    });

    // 提交数据方式
    option.type.toLowerCase() == 'get' ? xhr.send(null) : xhr.send(JSON.stringify(option.data));
  } else {
    alert('您的浏览器不支持XMLHTTPREQUEST!');
  }
}