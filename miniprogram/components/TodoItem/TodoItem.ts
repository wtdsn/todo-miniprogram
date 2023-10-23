Component({
  data: {
    todoItem: {
      id: 1,
      task: '开会开会开会开会开会开会开会开会开会开会开会开会开会开会开会开会',
      priority: 3,
      isDoen: false,
      deadline: '2020-12-12',
    },
    priorityKlass: '',
    priorityText: ''
  },
  lifetimes: {
    attached() {
      if (this.data.todoItem.priority !== 0) {
        this.setData({
          priorityKlass: 'priority-' + this.data.todoItem.priority,
          priorityText: '!'.repeat(this.data.todoItem.priority)
        })
      }
    }
  },
})