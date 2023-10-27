import { Task, IsDone, Priority } from "../../apis/task/model";
import { queryTask } from "../../apis/task/task";

const app = getApp();

Page({
	data: {
		addBtnInfo: {
			show: false,
			x: 0,
			y: 0,
		},
		list: [] as Task[],
		showList: [] as Task[],
	},
	onLoad() {
		const that = this;
		// 初始化增加标签按钮位置
		wx.getSystemInfo({
			success({ screenWidth, screenHeight }) {
				that.setData({
					addBtnInfo: {
						show: true,
						x: screenWidth,
						y: screenHeight - 200,
					},
				});
			},
			fail() {
				that.setData({
					addBtnInfo: {
						show: true,
						x: 375,
						y: 460,
					},
				});
			},
		});
	},
	async onShow() {
		let taskList = app.globalData.taskList as Task[];

		// 为空时，刷新列表
		if (taskList.length === 0) {
			this.fetchData();
		} else {
			this.processList(taskList);
		}
	},
	handleClickAdd() {
		console.log("@");
		wx.navigateTo({
			url: "../../../miniprogram/pages/detail/detail",
		});
	},

	async fetchData() {
		const {
			data: { list },
		} = await queryTask();
		this.processList(list);
	},

	async processList(allList: Task[]) {
		this.data.list = this.data.showList = allList.filter((task) => {
			// 如果已完成
			if (task.isDone === IsDone.YES) {
				return false;
			}
			console.log(task.deadline);

			return true;
		});
	},

	async searchFilterList() {},
});
