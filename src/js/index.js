/**
 * dom          存放dom节点的对象
 * music_fn     多个方法的集合
 * 
 * 歌曲mv: ?mvid=5876105
 */

var dom, music_fn, keywors, limit, offset, size, local_record;

size = 10;
limit = size;
offset = 0;
local_record = {};

mObj = {
  // 获取单个节点
  getDom: elem => {
    return document.querySelector(elem);
  },
  // 获取多个节点的集合
  getDoms: elem => {
    return document.querySelectorAll(elem);
  },
  // 初始化
  init: () => {

  },
  reg: str => {
    // str 不为空
    if (/[^\s]+/.test(str)) {
      str = str.trim();
      str = str.replace(/</g, "&lt;");
      str = str.replace(/>/g, "&gt;");
      str = str.replace(/\"/g, "&quot;");
      str = str.replace(/\'/g, "&apos;");
      str = str.replace(/\//g, "/");
    } else {
      throw new Error('str undefined')
    }
    // console.log(/[^\s]+/.exec(str));
  },
  // 点击搜索发送请求
  searchSend: () => {
    keywords = dom.ipt.value;
    offset++;
    mObj.reg(keywords);
    ajax({
      url: API.search,
      data: {
        keywords,
        limit,
        offset: (offset - 1) * size
      },
      success(res) {
        let data = res.result;
        if (res.result.songCount == 0) {
          alert('没有找到相应的歌曲!');
          return;
        } else {
          let html = template('art-template', data);
          mObj.getDom('.songs').innerHTML = html;
          console.log(data.songs);
        }
      },
      error(e) {
        console.log(e);
      }
    })
  }
  // 拓展搜索建议, 替换搜索记录
}
dom = {
  search_btn: mObj.getDom('.search-w button'),
  ipt: mObj.getDom('.search-w input')
}
dom.search_btn.addEventListener('click', mObj.searchSend, false);