import { request } from './request'

export function getHomeMultiadata () {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods (type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

// 函数调用 ->压入函数栈（保存函数调用过程中所有变量）
// 函数调用结束->弹出函数栈（释放函数的所有变量）
// function text () {
//   const name = ['why', '123', 'kobe']
// }
// text()