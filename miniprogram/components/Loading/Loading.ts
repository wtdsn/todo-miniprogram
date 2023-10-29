let timer: number;
const defaultText = "loading ";
Component({
	data: {
		loadingText: "loading",
	},

	lifetimes: {
		attached() {
			this.start();
		},
		detached() {
			clearInterval(timer);
		},
	},
	pageLifetimes: {
		hide() {
			clearInterval(timer);
		},
	},
	methods: {
		start() {
			timer = setInterval(() => {
				let curLen = this.data.loadingText.length + 1;
				curLen %= defaultText.length + 1;

				this.setData({
					loadingText: defaultText.slice(0, curLen),
				});
			}, 250);
		},
	},
});
