import { Task, IsDone } from "../../apis/task/model";
import { compareDate, formatTime } from "../../utils/date";
import { SortType, sortTyType } from "../../components/Sort/Sort";
import { EventHandler } from "../../utils/event";

const app = getApp();
let refreshListHandler: EventHandler;

Page({
	data: {
		list: [] as Task[],
		showList: [] as Task[],
		sortType: "createTime" as SortType,
		loading: false,
	},

	// 加载数据
	async onShow() {
		// 订阅事件，更新列表
		refreshListHandler = this.filterOutPageList.bind(this);
		app.globalData.eventEmitter.on("refreshList", refreshListHandler);

		// 为空时，刷新列表
		if (app.globalData.taskList.length === 0) {
			this.setData({
				loading: true,
			});
			try {
				await app.fetchAllTask();
			} finally {
				this.setData({
					loading: false,
				});
			}
		}
		this.filterOutPageList();
	},

	onHide() {
		// 取消订阅，
		app.globalData.eventEmitter.off("refreshList", refreshListHandler);
	},

	// 过滤出可页面可展示数据
	filterOutPageList() {
		const allTask = app.globalData.taskList as Task[];
		const curDate = formatTime(new Date(), false, "-");
		const list = allTask.filter((task) => {
			// 如果已完成
			if (task.isDone === IsDone.YES) return false;
			// 过期
			if (compareDate(curDate, task.deadline) < 1) return false;

			return true;
		});
		this.setData({
			list,
			showList: [...list],
		});
		this.handleChangeSortType({ detail: this.data.sortType });
	},

	// 排序
	handleChangeSortType(e: { detail: SortType }) {
		const sortType = e.detail;
		const sortedList = sortTyType(e.detail, this.data.list);
		const sortedShowList = sortTyType(e.detail, this.data.showList);
		this.setData({
			sortType,
			list: [...sortedList],
			showList: [...sortedShowList],
		});
	},

	// 查询过滤
	filterOutSearchList({ detail }: { detail: string }) {
		detail = detail.trim();

		if (detail === "") {
			this.setData({
				showList: [...this.data.list],
			});
			return;
		}

		const reg = new RegExp(detail, "i");
		const newShowList = this.data.showList.filter((task) => {
			return reg.test(task.task) || reg.test(task.deadline);
		});

		this.setData({
			showList: newShowList,
		});
	},
});
