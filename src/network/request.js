import axios from 'axios'

export function request (config) {
  // instance(config).then({})可以执行then方法  因为instance(config)返回的是一个promise对象 所有外面不需要包裹promise对象
  // 将其return 可以直接request().then()调用then方法
  const instance = axios.create({
    baseURL: 'http://106.54.54.237:8000/api/hy',
    timeout: 5000
  })

  // 2.axios的拦截器 
  // axios全局 全局拦截
  //  axios.interceptors
  //  拦截请求。 将真正的网络请求用的config拦截下来。。后面得还回去return
  // 要不无法进行网络请求，请求失败
  //2.1 请求拦截的作用
  // instance.interceptors.request.use(config => {
  //   console.log(config)
  //   // 1.比如config中的一些信息不符合服务器的要求。。例如header（也可以在上面axios实例中添加）
  //   // 2.比如每次发送网络请求，都希望在界面加入一个请求图标（类似于一个动画）show()出来 响应中在消失
  //   // 3.某些网络请求（比如登录（token)）必须携带一些信息

  //   return config
  // }, err => {
  //   console.log(bbb)
  // })
  // 2.2响应拦截 做一些事情然后返回出去res.data
  instance.interceptors.response.use(res => {
    // console.log(res)
    return res.data
  }, err => {
    console.log(err)
  })

  // 3.发送真正的网络请求
  return instance(config)
}

