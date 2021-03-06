import axios from "axios"


const service = axios.create({
  //baseURL: "http://www.luckyjz.com:8080/lksc",  //正式服
  baseURL: "http://192.168.1.103/lksc",    //后台本地IP
  //baseURL: "http://47.112.117.37/lksc",    //测试服

  time: 5000
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers['Content-Type' ] = 'application/json'
  return config;
}, 
function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, 
function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export default service