import request from '../tool/request.js'

// 1.登录
export function userLogin (data,method="post") {
  return request( {
    url: '/userLogin',
    method,
    data
  } )
}

// 2.0.渠道总量
export function businessCount (data,headers) {
  return request( {
    url: '/businessCount ',
    method: "post",
    data: data,
    headers:headers,
  })
}

// 2.渠道列表
export function getBusiness (data,headers) {
  return request( {
    url: '/getBusiness ',
    method: "post",
    data: data,
    headers:headers,
  })
}

// 3.新增渠道
export function insertBusiness (data,headers) {
  return request( {
    url: '/insertBusiness ',
    method: "post",
    data: data,
    headers:headers,
  })
}

// 4.编辑渠道
export function changeBusiness (data,headers) {
  return request( {
    url: '/changeBusiness ',
    method: "post",
    data: data,
    headers:headers,
  })
}

//5.删除渠道
export function removeBusiness (data,headers) {
  return request( {
    url: '/removeBusiness ',
    method: "post",
    data: data,
    headers:headers,
  })
}

//6.0 商品总量
export function bsGoodsCount (data,headers) {
  return request( {
    url: '/bsGoodsCount ',
    method: "post",
    data: data,
    headers:headers,
  })
}


//6.商品链接
export function getBsGoods (data,headers) {
  return request( {
    url: '/getBsGoods ',
    method: "post",
    data: data,
    headers:headers,
  })
}

//7.0 获取所有渠道名
export function getBusinessAll (data,headers) {
  return request( {
    url: '/getBusinessAll ',
    method: "post",
    data: data,
    headers:headers,
  })
}

//7.1 获取所有商品名
export function getGoods (data,headers) {
  return request( {
    url: '/getGoods ',
    method: "post",
    data: data,
    headers:headers,
  })
}

//7.增加商品链接
export function insertBsGoods (data,headers) {
  return request( {
    url: '/insertBsGoods ',
    method: "post",
    data: data,
    headers:headers,
  })
}

//8.删除商品链接
export function deleteBsGoods (data,headers) {
  return request( {
    url: '/deleteBsGoods ',
    method: "post",
    data: data,
    headers:headers,
  })
}

//9.渠道分析
export function getManageLog (data,headers) {
  return request( {
    url: '/getManageLog ',
    method: "post",
    data: data,
    headers:headers,
  })
}

//10. 下级渠道
export function getBsByBusiness (data,headers) {
  return request( {
    url: '/getBsByBusiness ',
    method: "post",
    data: data,
    headers:headers,
  })
}

//10.1 下级渠道商-新增
export function insertBs (data,headers) {
  return request( {
    url: '/insertBs ',
    method: "post",
    data: data,
    headers:headers,
  })
}

//10.2 下级渠道商-新增
export function changeBs (data,headers) {
  return request( {
    url: '/changeBs ',
    method: "post",
    data: data,
    headers:headers,
  })
}

//10.3 下级渠道商-删除
export function removeBs (data,headers) {
  return request( {
    url: '/removeBs ',
    method: "post",
    data: data,
    headers:headers,
  })
}

//10.4 下级渠道商-总量
export function bsCount (data,headers) {
  return request( {
    url: '/bsCount ',
    method: "post",
    data: data,
    headers:headers,
  })
}

//11.修改密码
export function changePassword (data,headers) {
  return request( {
    url: '/changePassword ',
    method: "post",
    data: data,
    headers:headers,
  })
}

//12.订单详情
export function queryOderDetails (data,headers) {
  return request( {
    url: '/queryOderDetails ',
    method: "post",
    data: data,
    headers:headers,
  })
}

//13.代理管理-获取所有渠道名
export function selectBusinessSearch (data,headers) {
  return request( {
    url: '/selectBusinessSearch ',
    method: "post",
    data: data,
    headers:headers,
  })
}

//14.代理管理-搜索
export function selectBusinessSearchs (data,headers) {
  return request( {
    url: '/selectBusinessSearchs ',
    method: "post",
    data: data,
    headers:headers,
  })
}

//15.渠道管理-获取所有渠道名
export function selectByBusinessSearch (data,headers) {
  return request( {
    url: '/selectByBusinessSearch ',
    method: "post",
    data: data,
    headers:headers,
  })
}

//16.渠道管理-搜索
export function selectByBusinessSearchs (data,headers) {
  return request( {
    url: '/selectByBusinessSearchs ',
    method: "post",
    data: data,
    headers:headers,
  })
}

//17.商品推荐列表
export function goodsSys2(data,headers){
  return request({
    url: '/searchAll2 ',
    method: "post",
    data: data,
    headers:headers,
  })
}

//17.商品推荐列表
export function goodsSys(data,headers){
  return request({
    url: '/searchAll ',
    method: "post",
    data: data,
    headers:headers,
  })
}

//19.推荐的商品
export function goodsSet(data,headers){
  return request({
    url: '/addUpdate ',
    method: "post",
    data: data,
    headers:headers,
  })
}






