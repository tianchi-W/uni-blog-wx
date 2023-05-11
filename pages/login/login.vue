<template>
	<view :style="{height:height-statusHeight-titleHeight+'px'}" class="login">
		<button type="primary" class="loginTrue" open-type="getPhoneNumber" @getphonenumber="getUserProfile">
			登录</button>
	</view>
</template>

<script setup lang="ts">
	import { onReady } from '@dcloudio/uni-app'
	import { wxlogin } from '../../utils/api.js'
	import {
		ref
	} from 'vue'
	const statusHeight = ref()
	const titleHeight = ref()
	const height = ref()
	onReady(() => {
		height.value = uni.getSystemInfoSync().windowHeight
		statusHeight.value = uni.getSystemInfoSync().statusBarHeight
		// #ifdef MP-WEIXIN
		titleHeight.value = (uni.getMenuButtonBoundingClientRect().top - statusHeight.value) * 2 +
			uni.getMenuButtonBoundingClientRect().height
		// #endif

		// #ifdef H5
		titleHeight.value = document.querySelector('.uni-page-head').clientHeight
		// #endif
	})
	// #ifdef MP-WEIXIN
	const getUserProfile = (val) => {
		uni.login({
			success(res) {
				if (res.errMsg == "login:ok") {
					wxlogin({ code: res.code }).then(r => {
						uni.setStorage({
							key: 'token',
							data: r.data.token,
							success: () => {
								uni.showToast({
									title: '登录成功',
									icon: 'none'
								})
								uni.navigateBack({
									delta:1
								});
								console.log(val, 'phone')
							}

						})
						uni.setStorage({
							key:'id',
							data:r.data._id,
							success:()=>{
								console.log('id已储存')
							},
							fail:(err)=>{
								console.log(err)
							}
						})
					})
					// console.log(r,'r')
				} else {

					uni.showToast({
						title: res.errMsg,
						icon: 'none'
					})
				}
			}
		})
		// uni.login({
		// 	// desc: '用于文章处理', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
		// 	success: async (res) => {
		// 		console.log(res, 'res')
		// 		if (res.errMsg == "login:ok") {
		// 			wxlogin({ code: res.code }).then(r => {
		// 				console.log(res.code, 'fdslfkdsl')
		// 				uni.setStorage({
		// 					key: 'token',
		// 					data: r.data.token,
		// 					success: () => {
		// 						uni.showToast({
		// 							title: '登录成功',
		// 							icon: 'none'
		// 						})
		// 						uni.navigateTo({
		// 							url: "/pages/index/index"
		// 						});
		// 						console.log(val, 'phone')
		// 					}

		// 				});
		// 			})
		// 			// console.log(r,'r')
		// 		} else {

		// 			uni.showToast({
		// 				title: res.errMsg,
		// 				icon: 'none'
		// 			})
		// 		}

		// 	}

		// })
		// wx.getUserProfile({
		// 	success: function (res) {
		// 		let code = res.code // 登录凭证code
		// 	}
		// })
	}

	// #endif
</script>

<style lang="scss" scoped>
	.login {

		margin: 20upx;
		margin-top: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;


		.loginTrue {
			margin: 0;
			margin-top: 30upx;
			width: 100%;
		}

		.loginFalse {
			margin-top: 30upx;
			width: 100%;
		}
	}
</style>