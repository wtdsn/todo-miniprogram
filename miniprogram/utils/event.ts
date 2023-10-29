export interface EventHandler {
	(...args: any[]): void;
}

class EventEmitter {
	public eventCenter: Record<string, EventHandler[]>;
	constructor() {
		this.eventCenter = {};
	}

	on(type: string, handler: EventHandler) {
		const eventList = this.eventCenter[type] || [];
		eventList.push(handler);
		this.eventCenter[type] = eventList;
	}

	emit(type: string, ...args: any[]) {
		const eventList = this.eventCenter[type];
		if (!eventList || eventList.length === 0) return;
		console.log("Emit", type, eventList.length);

		eventList.forEach((handler) => handler(...args));
	}

	off(type: string, handler: EventHandler) {
		const eventList = this.eventCenter[type];
		if (eventList) {
			const i = eventList.indexOf(handler);
			if (i !== -1) {
				eventList.splice(i, 1);
			}
		}
	}
}

export default EventEmitter;
