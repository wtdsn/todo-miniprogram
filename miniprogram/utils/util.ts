export const formatTime = (date: Date, withTime = false, dateJoin = '-') => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join(dateJoin) +
    (withTime ?
      (' ' + [hour, minute, second].map(formatNumber).join(':'))
      : '')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}
