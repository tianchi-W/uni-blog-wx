const baseUrl = 'http://192.168.1.118:50'
// get 请求
export function httpGet({
	url,
	params = {}
}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			header: {
				'Authorization': 'bearer ' + wx.getStorageSync('token')
			},
			method: 'GET',
			data: params,
			success: (res) => {
				// 返回的数据（不固定，看后端接口，这里是做了一个判断，如果不为true，用uni.showToast方法提示获取数据失败)
				// if (res.data.code != 200) {
				// 	return uni.showToast({
				// 		title: '获取数据失败',
				// 		icon: 'none'
				// 	})

				if (res.data.code !== 200) {

					uni.showToast({
						title: '获取数据失败',
						icon: 'none'
					})
				} else {
					// uni.setStorage({
					// 	​
					// 	key: "token",
					// 	​data: res.data.token​
					// })
					console.log(res.data)
					// if(res.data.code=='400'){
					// 	uni.showToast({
					// 		title: '登录失败',
					// 		icon: 'none'
					// 	})
					// 	uni.navigateTo({
					// 		url: '/pages/login/login'
					// 	});
					// }
					resolve(res.data)
					// console.log(res,'res')
				}

			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}

function transformRequest(option) {
	let ret = ''

	for (let it in option) {
		ret += encodeURIComponent(it) + '=' + encodeURIComponent(option[it]) + '&'
	}
	return ret
}

export function httpPost({
	url,
	params = {}
}) {

	return new Promise((resolve, reject) => {
		console.log(234)
		uni.request({
			url: baseUrl + url,
			method: 'POST',
			header: {
				'Authorization': 'bearer ' + uni.getStorageSync('token')
			},
			timeout: 6000,
			data: params,
			success: (res) => {
				console.log(res.data, 'fdkls')
				if (res.data.code !== 200) {
					if (res.data.status == '400' || res.data.status == '401') {
						uni.showToast({
							title: '登录失败',
							icon: 'none'
						})
						uni.navigateTo({
							url: '/pages/login/login'
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
					console.log(res, 'res')
					resolve(res.data)
				}

			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}
export function httpPut({
	url,
	params = {}
}) {

	return new Promise((resolve, reject) => {
		console.log(234)
		uni.request({
			url: baseUrl + url,
			method: 'PUT',
			header: {
				'Authorization': 'bearer ' + uni.getStorageSync('token')
			},
			timeout: 6000,
			data: params,
			success: (res) => {
				console.log(res.data, 'fdkls')
				if (res.data.code !== 200) {
					if (res.data.code === 11000) {
						resolve(res.data)
					} else {
						if (res.data.status == '400' || res.data.status == '401') {
							uni.showToast({
								title: '登录失败',
								icon: 'none'
							})
							uni.navigateTo({
								url: '/pages/login/login'
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
					}


				} else {
					console.log(res, 'res')
					resolve(res.data)
				}

			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}