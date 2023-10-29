Component({
	data: {
		searchText: "",
		isShowBtn: false,
	},
	methods: {
		handleInput(event: WechatMiniprogram.Input) {
			this.setData({
				searchText: event.detail.value,
				isShowBtn: true,
			});
		},
		handleSearch() {
			this.triggerEvent("search", this.data.searchText);
		},
		handleBlur() {
			if (this.data.searchText === "") {
				this.triggerEvent("search", this.data.searchText);
				this.setData({
					isShowBtn: false,
				});
			}
		},
	},
});
