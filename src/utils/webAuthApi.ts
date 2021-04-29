import axios from 'axios'
import NProgress from 'nprogress'

const webAuthApi = axios.create({ baseURL: 'http://localhost:4444' })

webAuthApi.interceptors.request.use(async (config: any) => {
  NProgress.start()
  return config
}, (error: any) => {
  NProgress.done()
  return Promise.reject(error);
})

webAuthApi.interceptors.response.use((response: any) => {
  NProgress.done()
  return response
}, (error: any) => {
  NProgress.done()

  return Promise.reject(error);
})

export default webAuthApi