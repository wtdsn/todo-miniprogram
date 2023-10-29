export const formatTime = (date: Date, withTime = false, dateJoin = "-") => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();

	return (
		[year, month, day].map(formatNumber).join(dateJoin) +
		(withTime ? " " + [hour, minute, second].map(formatNumber).join(":") : "")
	);
};

const formatNumber = (n: number) => {
	const s = n.toString();
	return s[1] ? s : "0" + s;
};

type DateCompareArg = Date | string | number;

export const compareDate = (d1: DateCompareArg, d2: DateCompareArg) => {
	let date1 = d1,
		date2 = d2;
	if (typeof date1 !== "object") {
		date1 = new Date(date1);
	}
	if (typeof date2 !== "object") {
		date2 = new Date(date2);
	}

	return date1.getTime() > date2.getTime()
		? 1
		: date1.getTime() === date2.getTime()
		? 0
		: -1;
};
