import request from "./request";

export function loginByCode(code: string) {
	return request<{
		token: string;
	}>({
		url: "/action/login",
		method: "POST",
		data: {
			code,
		},
	});
}

export function checkLogin() {
	return request<{
		token: string;
	}>({
		url: "/action/checkLogin",
		method: "POST",
	});
}
