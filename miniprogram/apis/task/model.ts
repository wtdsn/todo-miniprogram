export enum Priority {
	EMPTY = 0,
	Low = 1,
	Medium = 2,
	High = 3,
}

export enum IsDone {
	NO = 0,
	YES = 1,
}

export interface Task {
	id: number;
	task: string;
	priority: Priority;
	isDone: IsDone;
	deadline: string;
	updateTime: number;
}

export type TaskCreate = Pick<
	Task,
	"deadline" | "task" | "isDone" | "priority"
>;
