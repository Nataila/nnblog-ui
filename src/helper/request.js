import Axios from "axios";
import { BASE_URL } from "../consts";
import { message } from 'antd';

const axios = Axios.create();

// 预请求拦截器
axios.interceptors.request.use(config => {
  // 相对地址，加上BASE_URL作为前缀
  if (
    !config.url.startsWith("https://") &&
    !config.url.startsWith("http://") &&
    !config.url.startsWith("//")
  ) {
    config.url = BASE_URL + config.url;
  }
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo) {
    config.headers.Token = `${userInfo.token}`;
  }
  return config;
});

// 响应拦截器（处理错误）
// axios.interceptors.response.use(response => {
//   endLoading()
//   return response;
// }, error => {
//   const nextUri = router.currentRoute.fullPath;
//   const status = error.response.status
//   if (status === 401) {
//     store.dispatch(ACTIONS_TYPES.CLEAN_USER)
//     router.replace({
//       path: 'login',
//       query: {redirect: nextUri}
//     })
//   } else {
//     const {data, result} = error.response.data
//     if (result === 'failed') {
//       Message({
//         message: data.error_msg,
//         type: 'error'
//       })
//     }
//   }
//   return Promise.reject(error)
// });

function handleResponse(response) {
  console.log(123123)
  return response.data;
}

export function httpPost(api, data = {}) {
  data = {
    ...data
  };
  return axios.post(api, data)
    .then(handleResponse)
    .catch(error => {
      console.log(error)
      error.response.data.errors.forEach(item => {
        message.error(item.msg);
      })
    })
}

export function httpDelete(api, data = {}) {
  data = {
    ...data
  };
  return axios.delete(
    api, data).then(handleResponse)
}


export function httpGet(api, data = {}) {
  data = {
    ...data
  };

  const request = () => axios.get(api, { params: data }).then(handleResponse);
  return request();
}
