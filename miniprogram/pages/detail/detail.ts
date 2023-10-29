import { Task, Priority, IsDone } from "../../apis/task/model";
import { createTask, modifyTask } from "../../apis/task/task";
import { formatTime } from "../../utils/date";

Page({
	data: {
		taskInfo: {
			id: 0,
			task: "",
			deadline: formatTime(new Date()),
			priority: Priority.EMPTY,
			isDone: IsDone.NO,
			createTime: 0,
		} as Task,
		options: [
			{ label: "0", value: 0 },
			{ label: "1", value: 1 },
			{ label: "2", value: 2 },
			{ label: "3", value: 3 },
		],
		dateVisible: false,
		dateVal: Date.now(),
		priorityVisible: false,
		isModify: false,
	},

	// 初始化数据
	onLoad() {
		const eventChannel = this.getOpenerEventChannel();
		const that = this;
		eventChannel.on("sendDetailData", function (data) {
			const dateTime = new Date(data.data.deadline).getTime();

			that.setData({
				isModify: true,
				taskInfo: data.data,
				dateVal: dateTime,
			});

			wx.setNavigationBarTitle({
				title: "修改任务",
			});
		});
	},

	// 打开日期选择
	handleCalendar() {
		this.setData({ dateVisible: true });
	},
	// 打开优先级选择
	handleCascader() {
		this.setData({ priorityVisible: true });
	},

	// 选择日期
	handleConfirmDate(e: { detail: { value: number } }) {
		const { value } = e.detail;
		this.setData({
			["taskInfo.deadline"]: formatTime(new Date(value)),
			dateVal: value,
		});
	},
	// 选择优先级
	onPickerChange(e: WechatMiniprogram.Input) {
		this.setData({
			["taskInfo.priority"]: e.detail.value[0],
		});
	},

	// 输入任务内容
	handleInputTask(e: WechatMiniprogram.Input) {
		this.data.taskInfo.task = e.detail.value;
	},

	// 提交任务
	async handleSubmit() {
		const taskInfo = this.data.taskInfo;
		if (taskInfo.task.length === 0 || taskInfo.task.trim() === "") {
			wx.showToast({
				title: "任务内容不能为空！",
				icon: "none",
				duration: 2000,
			});
			return;
		}
		if (this.data.isModify) {
			this.modify();
		} else {
			this.create();
		}
	},

	// 创建
	async create() {
		wx.showLoading({
			title: "提交中！",
			mask: true,
		});

		let res: Task;
		try {
			res = (await createTask(this.data.taskInfo)).data;
			res.deadline = formatTime(new Date(res.deadline));
			wx.hideLoading();
		} catch {
			wx.hideLoading();
			wx.showToast({
				title: "提交失败！",
				icon: "error",
				duration: 2000,
			});
			return;
		}

		// 处理
		const app = getApp();
		app.globalData.taskList.push(res);

		wx.showToast({
			title: "提交成功！",
			icon: "success",
			duration: 2000,
			complete: () => {
				setTimeout(() => {
					wx.navigateBack();
				}, 1800);
			},
		});
	},

	// 修改
	async modify() {
		wx.showLoading({
			title: "提交中！",
			mask: true,
		});
		const curTask = this.data.taskInfo;

		try {
			await modifyTask(curTask);
			wx.hideLoading();
		} catch {
			wx.hideLoading();
			wx.showToast({
				title: "修改失败！",
				icon: "error",
				duration: 2000,
			});
			return;
		}

		// 处理
		const app = getApp();
		const taskList = app.globalData.taskList as Task[];

		taskList.some((task, i) => {
			if (task.id === curTask.id) {
				taskList[i] = curTask;
				return true;
			}
			return false;
		});

		wx.showToast({
			title: "修改成功！",
			icon: "success",
			duration: 2000,
			complete: () => {
				setTimeout(() => {
					wx.navigateBack();
				}, 1800);
			},
		});
	},
});
