import { loginByCode } from "../../../miniprogram/apis/login"

Page({
  async handleLogin() {
    console.log("@")
    try {
      const { data: { token } } = await loginByCode(123)
      console.log(token)
      wx.setStorageSync("token", token)
    } catch (err) {
      console.log("err", err)
    }
  }
})