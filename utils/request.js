const baseUrl = 'http://192.168.1.118:50'
// get 请求
export function httpGet({
	url,
	params = {}
}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
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
					
					resolve(res.data)
				}

			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}
function transformRequest(option){
	let ret=''
	
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
		uni.request({
			url: baseUrl + url,
			method: 'POST',
			timeout:6000,
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
					console.log(res)
					resolve(res.data)
				}

			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}