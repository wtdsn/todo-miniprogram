import { Task } from "../../apis/task/model";
import { compareDate } from "../../utils/date";
export type SortType = "createTime" | "priority" | "deadline";

function sortByCreateTime(list: Task[]) {
	return list.sort((a, b) => {
		return compareDate(b.createTime, a.createTime);
	});
}

function sortByPriority(list: Task[]) {
	return list.sort((a, b) => {
		return b.priority - a.priority;
	});
}

function sortByDeadline(list: Task[]) {
	return list.sort((a, b) => {
		return compareDate(a.deadline, b.deadline);
	});
}

export function sortTyType(tyep: SortType, taskList: Task[]) {
	let sortFn = sortByCreateTime;
	switch (tyep) {
		case "deadline":
			sortFn = sortByDeadline;
			break;
		case "priority":
			sortFn = sortByPriority;
			break;
	}
	return sortFn(taskList);
}

Component({
	data: {
		visible: false,
	},
	properties: {
		sortType: String,
	},
	methods: {
		handlePopup() {
			this.setData({ visible: true });
		},
		onVisibleChange(e: any) {
			this.setData({
				visible: e.detail.visible,
			});
		},
		handleChanleSortType(e: any) {
			this.triggerEvent("changeSortType", e.target.dataset.value);
			this.setData({
				visible: false,
			});
		},
	},
});
