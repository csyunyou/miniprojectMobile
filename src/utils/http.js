import axios from 'axios'
import qs from 'qs'
axios.defaults.withCredentials = true
axios.interceptors.response.use(function(response){
  console.log(response)
  return response
})
// 请求方式的配置
export default {
  post(url, data) { //  post
    return axios({
      method: 'post',
      // baseURL: 'http://47.96.23.126/index.php/Api',
      baseURL:'http://hyh.bojiatouzi.com',
      url,
      data,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      transformRequest:[function(data){
        return qs.stringify(data)
      }]
    })
  },
  get(url, params) { // get
    return axios({
      method: 'get',
      baseURL:'http://hyh.bojiatouzi.com',
      url,
      params, // get 请求时带的参数
      timeout: 5000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
  }
}
