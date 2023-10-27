import { checkLogin } from "./miniprogram/apis/login";

// app.ts
App({
	globalData: {
		taskList: [],
	},
	async onLaunch() {
		wx.removeStorageSync("nolyVisited");
		try {
			// 本地没有 token
			if (!wx.getStorageSync("token")) {
				wx.navigateTo({
					url: "/miniprogram/pages/login/login",
				});
				return;
			}
			// 有 token ，校验是否过期，没有过期则更新
			const {
				data: { token },
			} = await checkLogin();
			wx.setStorageSync("token", token);
		} catch (err) {
			return;
		}
	},
});
