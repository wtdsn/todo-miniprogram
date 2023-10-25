import request from './request'

export function loginByCode(code = 123) {
  return request<{
    token: string
  }>({
    url: "/action/loginByCode",
    params: {
      code
    }
  })
}