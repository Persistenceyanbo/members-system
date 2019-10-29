import request from "./../utils/request";

export default {
  // 获取会员列表数据
  getList() {
    return request ({
      url: '/member/lists',
      method: 'get'
    })
  },

  //分页搜索方法
  // page当前页码, size每页查询的条数，searchMap条件查询的条件值
  search (page, size, searchMap) {
    return request({
      url: `/member/lists/search/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  }
}
