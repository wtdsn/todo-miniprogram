Component({
  data: {
    searchText: ''
  },
  methods: {
    handleInput(event: WechatMiniprogram.Input) {
      this.setData({
        searchText: event.detail.value
      })
    }
  }
})