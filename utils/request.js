// const baseUrl = 'http://192.168.1.118:50'
// const baseUrl='https://express-blog-production.up.railway.app'
import {
	baseUrl
} from '../config/index.js'
// get 请求
export function request(
	url,
	data = {},
	method
) {
	return new Promise((resolve, reject) => {
		// if (method == "GET") {
		// 	data.t = new Date().getTime();
		// 	data.r = Math.floor(Math.random() * 10000);
		// }
		uni.request({
			url: baseUrl + url,
			header: {
				'Authorization': 'bearer ' + wx.getStorageSync('token')
			},
			method,
			data,
			timeout: 6000,
			success: (res) => {
				if (res.data.code !== 200) {
					if (res.data.status == '400' || res.data.status == '401') {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
						uni.switchTab({
							url: '../my/my'
						});
					} else {
						uni.showToast({
							title: '获取数据失败',
							icon: 'none'
						})
						uni.switchTab({
							url: '/pages/index/index'
						})
					}

				} else {
					resolve(res.data)
				}

			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}

export function httpGet({
	url,
	data
}) {
	return request(url, data, 'GET');
}
export function httpPost({
	url,
	data
}) {
	return request(url, data, 'POST');
}
export function httpPut({
	url,
	data
}) {
	return request(url, data, 'PUT');
}
export function httpDel(url, data = {}) {
	return request(url, data, 'DELETE');
}