<template>
	<view class="getIfno">

		<uni-section title="补充基本信息" type="line">
			<button style="margin-top: 30px; margin-bottom: 30px;" class="avatar-wrapper" open-type="chooseAvatar"
				@chooseavatar="onChooseAvatar">
				<view class="tip" v-if="!avatar">
					添加个人头像
				</view>
				<image class="avatar" mode="scaleToFill" :src="avatar"></image>
			</button>
			<view class="form-info">
				<!-- 基础表单校验 -->
				<uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
					<uni-forms-item label="姓名" required name="usernam">
						<uni-easyinput v-model="valiFormData.username" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label="年龄" required name="age">
						<uni-easyinput v-model="valiFormData.age" placeholder="请输入年龄" />
					</uni-forms-item>
					<uni-forms-item label="性别" name="sex">
						<uni-data-checkbox v-model="valiFormData.sex" :localdata="sexs" />
					</uni-forms-item>
				</uni-forms>
				<button type="primary" @click="submit('valiForm')">提交</button>
			</view>
		</uni-section>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		computed
	} from 'vue'
	import {
		putUserInfo
	} from '../../utils/api.js'
	import {
		onReady,
		onShow,
		onLoad
	} from '@dcloudio/uni-app'
	const sexs = [{
		text: '男',
		value: 0
	}, {
		text: '女',
		value: 1
	}, {
		text: '母鸡啦',
		value: 2
	}]
	const avatar = ref('')
	const valiForm = ref('')
	const avatarValue = computed(() => {
		return avatar.value
	})
	let valiFormData = reactive({
		username: '',
		age: '',
		avatar: avatarValue,
		sex: 2
	})
	onLoad((option) => {
		valiFormData.username = JSON.parse(decodeURIComponent(option.dataItem)).username
		avatar.value = JSON.parse(decodeURIComponent(option.dataItem)).avatar
		valiFormData.age = JSON.parse(decodeURIComponent(option.dataItem)).age
		valiFormData.sex = JSON.parse(decodeURIComponent(option.dataItem)).sex * 1
	})
	// 校验规则
	const rules = reactive({
		username: {
			rules: [{
				required: true,
				errorMessage: '姓名不能为空'
			}]
		},
		age: {
			rules: [{
				format: 'number',
				errorMessage: '年龄只能输入数字'
			}]
		}
	})
	const submit = (ref) => {
		if (!avatar.value) {
			uni.showToast({
				title: `请选择图片`
			})
		} else {
			valiForm.value.validate().then(res => {
				putUserInfo({
					_id: uni.getStorageSync('id'),
					...valiFormData
				}).then((r) => {
					if (r.code === 11000) {
						uni.showToast({
							title: r.data.keyValue
						})
					} else {
						uni.switchTab({
							url: '/pages/my/my'
						})
					}

				})

			}).catch(err => {
				console.log('err', err);
			})
		}
	}

	//压缩
	/* const compressEvent = (img, callback) => {
		let canvasWidth = img.width; //图片原始宽高
		let canvasHeight = img.height;
		//图片宽高比
		let base = canvasWidth / canvasHeight;
		//宽度最大设为1024
		if (canvasWidth > 1024) {
			canvasWidth = 1024;
			canvasHeight = Math.floor(canvasWidth / base);
		}
		//绘制图像到画布
		let canvas = document.createElement("canvas");
		let ctx = canvas.getContext("2d");
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		//将画布转为base64，mimeType类型为image/jpeg，图片质量为0.3
		let dataURL = canvas.toDataURL("image/jpeg", 0.3);
		// console.log("压缩中", dataURL);
		callback ? callback(dataURL) : null; //调用回调函数
	}
	 */
	const onChooseAvatar = (e) => {
		const {
			avatarUrl
		} = e.detail

		const uploadTask = uni.uploadFile({
			url: 'http://192.168.1.118:50/upload/qiniu_upload',
			filePath: avatarUrl,
			name: 'file',
			timeout: 60000,
			header: {
				'Content-type': 'multipart/form-data',
				'Authorization': 'bearer ' + wx.getStorageSync('token')
				// "token": this.token
			},
			formData: {
				method: 'POST' //请求方式
			},
			success: (uploadFileRes) => {

				avatar.value = JSON.parse(uploadFileRes.data).data.url
				console.log(JSON.parse(uploadFileRes.data).data.url, avatarUrl)
			},
			fail: (err) => {
				console.log(err, 'fali')
			},
			complete: (a) => {
				console.log(a, 'a')
			}
		});
		// uploadTask.abort()
		uploadTask.onProgressUpdate((res) => {
			console.log('上传进度' + res.progress);
			console.log('已经上传的数据长度' + res.totalBytesSent);
			console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);

			// 测试条件，取消上传任务。
			if (res.progress > 5000) {
				uploadTask.abort();
			}
		});
	}
</script>

<style lang="scss" scoped>
	.getIfno {

		.avatar-wrapper {
			// width:auto;
			// height: auto;
			width: 300upx;
			height: 300upx;

			image {
				width: 100%;
				height: 100%;
			}


		}

		.uni-section-content {}

		.form-info {

			margin: 0 auto;

			width: 90vw;

			button {
				width: 90vw;
			}
		}


	}
</style>