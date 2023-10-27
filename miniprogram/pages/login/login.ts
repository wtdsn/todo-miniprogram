import { loginByCode } from "../../../miniprogram/apis/login";

Page({
	async handleLogin() {
		wx.login({
			success: async (res) => {
				try {
					const {
						data: { token },
					} = await loginByCode(res.code);

					wx.setStorageSync("token", token);

					wx.showToast({
						title: "登录成功",
						icon: "success",
						mask: true,
						duration: 2000,
					});
					setTimeout(() => {
						wx.navigateBack();
					}, 1800);
				} catch (err) {
					wx.showToast({
						title: "登录失败",
						icon: "error",
						duration: 2000,
					});
					console.log("err", err);
				}
			},
			fail: () => {
				wx.showToast({
					title: "登录失败",
					icon: "error",
					duration: 2000,
				});
			},
		});
	},
	handleNotLogin() {
		wx.setStorageSync("nolyVisited", true);
		wx.switchTab({
			url: "/miniprogram/pages/index/index",
		});
	},
});
