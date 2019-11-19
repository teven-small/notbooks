import axios from 'axios'
import api from './api'

const ajax = axios.create({
    baseURL: api.baseURL
})


//拦截器的处理


export const getTodos = () => {
    return ajax.get(api.todo)
}