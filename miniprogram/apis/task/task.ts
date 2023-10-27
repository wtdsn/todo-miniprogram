import request from "../request";
import { Task, TaskCreate } from "./model";

export function queryTask() {
	return request<{
		list: Task[];
	}>({
		url: "/action/task/list",
		method: "POST",
	});
}

export function createTask(task: TaskCreate) {
	return request<Task>({
		url: "/action/task/create",
		method: "POST",
		data: task,
	});
}
