
interface RequestOptions {
  url: string
  baseUrl?: string;
  method?: WechatMiniprogram.RequestOption['method'];
  headers?: Record<string, string | number>;
  body?: Record<string, any>;
  params?: Record<string, any>;
  timeout?: number;
}

const defaultConfig: RequestOptions = {
  method: 'GET',
  timeout: 50000,
  url: '',
  headers: {
    'content-type': 'application/json'
  },
  baseUrl: ''
}

interface RequestRes<T = any> {
  code: number,
  msg: string,
  data: T
}

type BeforeRequestFn = (config: RequestOptions) => Promise<RequestOptions> | RequestOptions


type AfterRequestSucFn = (res: WechatMiniprogram.RequestSuccessCallbackResult<RequestRes<any>> | RequestRes<any>) => Promise<WechatMiniprogram.RequestSuccessCallbackResult<RequestRes<any>> | RequestRes<any>> | WechatMiniprogram.RequestSuccessCallbackResult<RequestRes<any>> | RequestRes<any>
type AfterRequestFailFn = (err: WechatMiniprogram.RequestVirtualPaymentFailCallbackErr) => WechatMiniprogram.RequestVirtualPaymentFailCallbackErr

class Request {
  public beforeRequest: BeforeRequestFn[]
  public afterRequest: Array<[AfterRequestSucFn, AfterRequestFailFn]>
  constructor(public baseConfig: RequestOptions = defaultConfig) {
    this.beforeRequest = []
    this.afterRequest = []
  }

  useBefore(fn: BeforeRequestFn) {
    this.beforeRequest.push(fn)
  }

  useAfter(suc: AfterRequestSucFn, fail: AfterRequestFailFn) {
    this.afterRequest.push([suc, fail])
  }

  async request<T>(config: RequestOptions) {
    config = mergeConfig(this.baseConfig, config)
    config.url = config.baseUrl + config.url

    for (let i = 0; i < this.beforeRequest.length; i++) {
      config = await this.beforeRequest[i](config)
    }

    const wxRequestConfig: WechatMiniprogram.RequestOption = {
      url: config.url,
      method: config.method,
      header: config.headers,
      data: config.body || config.params,
    }

    try {
      let res: WechatMiniprogram.RequestSuccessCallbackResult<RequestRes<T>> | RequestRes<T> = await wxRequest<T>(wxRequestConfig)
      for (let i = 0; i < this.afterRequest.length; i++) {
        res = (await this.afterRequest[i][0](res))
      }
      return res as RequestRes<T>
    } catch (err: any) {
      for (let i = 0; i < this.afterRequest.length; i++) {
        err = await this.afterRequest[i][1](err)
      }

      return Promise.reject(err)
    }
  }

}

function mergeConfig(baseConfig: RequestOptions, config: RequestOptions) {
  config.headers = Object.assign(baseConfig.headers || {}, config.headers || {})
  return Object.assign(baseConfig, config)
}


function wxRequest<T>(config: WechatMiniprogram.RequestOption<RequestRes<T>>) {
  return new Promise((resolve, reject) => {
    config.success = resolve
    config.fail = reject
    wx.request(config)
  }) as Promise<WechatMiniprogram.RequestSuccessCallbackResult<RequestRes<T>>>
}


export default Request