import { Task } from "../../../apis/task/model";
import { delTask, modifyTask } from "../../../apis/task/task";

Component({
	data: {
		priorityKlass: "",
		priorityText: "",
	},
	properties: {
		taskInfo: {
			type: Object,
			value: {
				id: 1,
				task: "",
				priority: 0,
				isDone: 0,
				deadline: "2000-00-00",
			},
		},
	},
	lifetimes: {
		attached() {
			if (this.properties.taskInfo.priority !== 0) {
				this.setData({
					priorityKlass: "priority-" + this.properties.taskInfo.priority,
					priorityText: "!".repeat(this.properties.taskInfo.priority),
				});
			}
		},
	},
	methods: {
		// 点击打开详情
		handleOpenDetail() {
			const data = { ...this.properties.taskInfo };
			wx.navigateTo({
				url: "/miniprogram/pages/detail/detail",
				success: function (res) {
					// 通过eventChannel向被打开页面传送数据
					res.eventChannel.emit("sendDetailData", { data });
				},
			});
		},

		// 点击删除
		handleDelTask() {
			const that = this;
			wx.showModal({
				title: "",
				content: "是否确认删除？",
				confirmColor: "#11aaaa",
				success(res) {
					if (res.confirm) {
						console.log("用户点击确定");
						that.delete();
					}
				},
			});
		},

		async delete() {
			wx.showLoading({
				title: "删除中...",
				mask: true,
			});
			try {
				await delTask(this.properties.taskInfo.id);
				wx.hideLoading();
			} catch {
				wx.hideLoading();
				wx.showToast({
					title: "删除失败!",
					icon: "error",
					duration: 2000,
				});
				return;
			}

			wx.showToast({
				title: "删除成功!",
				icon: "error",
				duration: 1000,
			});

			const app = getApp();
			const delId = this.properties.taskInfo.id;
			const taskList = app.globalData.taskList as Task[];

			app.globalData.taskList = taskList.filter((task) => {
				if (task.id === delId) return false;
				return true;
			});

			app.globalData.eventEmitter.emit("refreshList");
		},

		// 点击取消完成
		async handleCancel() {
			this.modifyTaskIsDone(0);
		},

		// 点击完成
		async handleDone() {
			this.modifyTaskIsDone(1);
		},

		// 修改状态
		async modifyTaskIsDone(isDone: 0 | 1) {
			wx.showLoading({
				title: "处理中！",
				mask: true,
			});

			const task = this.properties.taskInfo as Task;
			task.isDone = isDone;

			try {
				await modifyTask(task);
				wx.hideLoading();
			} catch {
				wx.hideLoading();
				wx.showToast({
					title: "操作失败！",
					icon: "error",
					duration: 2000,
				});
				return;
			}

			const app = getApp();
			const modifyId = this.properties.taskInfo.id;
			const taskList = app.globalData.taskList as Task[];

			taskList.some((task) => {
				if (task.id === modifyId) {
					task.isDone = isDone;
					return true;
				}
				return false;
			});

			app.globalData.eventEmitter.emit("refreshList");
		},
	},
});
