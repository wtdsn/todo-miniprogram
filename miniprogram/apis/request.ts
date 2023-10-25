import Request from '../../miniprogram/utils/request'

const requestObj = new Request({
  baseUrl: 'http://localhost:4787',
  method: "GET",
  url: '',
  timeout: 5000
})

requestObj.useBefore((config) => {
  console.log('request before', config)
  if (config.headers)
    config.headers['Authorization'] = wx.getStorageSync('token') || ''
  return config
})

requestObj.useAfter((res => {
  console.log('request after', res)
  return res.data
}), (err) => {
  console.log("err", err);
  return err
})

export default requestObj.request.bind(requestObj)