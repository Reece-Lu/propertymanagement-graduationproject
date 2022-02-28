import $axios from 'axios'
import {Message} from "element-ui"


// 请求拦截部分
const axios = $axios.create({
    // 请求超时时间
    timeout: 10000, // 跨域是否携带 cookies 信息
    widthCredentials: true, // 请求头 一般是 json 格式 如果某些单独的接口需要别的格式的话 例如 formData 格式的 单独处理
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
})
//axios请求拦截
axios.interceptors.response.use(response => {
    //统一处理返回信息
    const res = response.data
    /*接口规则 code为0代表成功，失败则展示失败原因*/
    if (res.code === '200') {
        return Promise.resolve(res.data)
    } else {
        Message.error(res.msg)
        return Promise.reject(res.msg)
    }
}, error => {
    Message.error(error)
    return Promise.reject(error)
})

export default {
    get(url, data = {}) {
        return axios({
            url: url, method: 'get', params: data,
        })
    },

    post(url, data = {}) {
        return axios({
            url: url, method: 'post', data: data,
        })
    },

    put(url, data = {}) {
        return axios({
            url: url, method: 'put', data: data,
        })
    },

    delete(url, data = {}) {
        return axios({
            url: url, method: 'delete', data: data,
        })
    }
}
