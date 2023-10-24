Component({
  data: {
    visible: false
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

  },
});