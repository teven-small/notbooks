import Axios from 'axios'
import { message } from 'antd'

//webpack中default的
const isDev = process.env.NODE_ENV === 'development'
// console.log(isDev)

const axios = Axios.create({
   baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/230922/' : ''
})

const notAxios = Axios.create({
   baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/230922/' : ''
})

axios.interceptors.request.use(config => {
   config.data = Object.assign({}, config.data, {
      //token: window.loaclStorage.getItem("token")
      token: '74108520'
   })
   return config
})

axios.interceptors.response.use(res => {
   if (res.data.code === 200) {
      return res.data.data
   }
   else {
      //全局处理错误
      message.error("数据获取错误")
   }
})

//获取文章列表
export const getArticles = (offset = 0, limited = 10) => {
   return axios.post('api/v1/articleList', {
      offset,
      limited
   })
}

//通过id文章删除
export const deleteArticle = (id) => {
   return axios.post(`api/v1/articleDelete/${id}`)
}

//通过id获取文章
export const getOneArticle = (id) => {
   return axios.post(`api/v1/getOneArticle/${id}`)
}

//文章修改
export const updateArticle = (id, data) => {
   return axios.post(`/api/v1/update/${id}`, data)
}

//获取文章阅读量
export const getReadArticleAmount = () => {
   return axios.post('api/v1/getAmount')
}

//获取通知列表
export const getNoticeList = () => {
   return axios.post('api/v1/notice')
}

//用户登录
export const usersLogin = (userInfo) => {
   return notAxios.post('api/v1/login', userInfo)
}