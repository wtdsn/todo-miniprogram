import { formatTime } from '../../utils/util'

Page({
  data: {
    taskItem: {
      task: "",
      deadline: "2022-01-11",
      priority: 0
    },
    options: [
      { label: '0', value: 0 },
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
    ],
    dateVisible: false,
    priorityVisible: false
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
      ['taskItem.deadline']: format(value),
    });
  },
  onPickerChange(e: WechatMiniprogram.Input) {
    this.setData({
      ['taskItem.priority']: e.detail.value[0]
    });
  }
});