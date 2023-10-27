import { Task, Priority, IsDone, TaskCreate } from "../../apis/task/model";
import { createTask } from "../../apis/task/task";
import { formatTime } from "../../utils/util";

// export interface Task {
// 	id: number;
// 	task: string;
// 	priority: Priority;
// 	isDone: IsDone;
// 	deadline: string;
// 	updateTime: Date;
// }

Page({
	data: {
		taskItem: {
			id: 0,
			task: "",
			deadline: "2022-01-11",
			priority: Priority.EMPTY,
			isDone: IsDone.NO,
			updateTime: 0,
		} as Task,
		options: [
			{ label: "0", value: 0 },
			{ label: "1", value: 1 },
			{ label: "2", value: 2 },
			{ label: "3", value: 3 },
		],
		dateVisible: false,
		priorityVisible: false,
	},

	handleCalendar() {
		this.setData({ dateVisible: true });
	},
	handleCascader() {
		this.setData({ priorityVisible: true });
	},

	handleConfirmDate(e: WechatMiniprogram.Input) {
		const { value } = e.detail;
		const format = (val: any) => {
			const date = new Date(val);
			return formatTime(date);
		};

		this.setData({
			["taskItem.deadline"]: format(value),
		});
	},
	onPickerChange(e: WechatMiniprogram.Input) {
		this.setData({
			["taskItem.priority"]: e.detail.value[0],
		});
	},

	handleInputTask(e: WechatMiniprogram.Input) {
		this.data.taskItem.task = e.detail.value;
	},

	async handleSubmit() {
		const res = await createTask(this.data.taskItem);
		console.log("handleSubmit", res);
	},
});
