import { Task } from "./miniprogram/apis/task/model";
import { queryTask } from "./miniprogram/apis/task/task";

import { checkLogin } from "./miniprogram/apis/login";

import EventEmitter from "./miniprogram/utils/event";

// app.ts
App({
	globalData: {
		taskList: [] as Task[],
		eventEmitter: new EventEmitter(),
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
	async fetchAllTask() {
		const {
			data: { list },
		} = await queryTask();
		this.globalData.taskList = list;
	},
});
