import axios from 'axios'
import qs from 'qs'
// 请求方式的配置
export default {
  post(url, data) { //  post
    return axios({
      method: 'post',
      baseURL: 'http://47.96.23.126/index.php/Api',
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
      baseURL: 'http://47.96.23.126/index.php/Api',
      url,
      params, // get 请求时带的参数
      timeout: 5000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
  }
}
