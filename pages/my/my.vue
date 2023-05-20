<template>
	<view class="my">
		<uni-card @click="handlePerInfo" :title="userInfo?userInfo.username:'请设置昵称'" :sub-title="userInfo?sex:'性别'"
			:extra="userInfo?`${userInfo.age}岁`:'请设置年龄'" :thumbnail="userInfo?userInfo.avatar:avatar">
			<text class="uni-body">{{userInfo?formatDateTime(new Date(userInfo.updateTime)):'日期'}}</text>
		</uni-card>
	</view>

<!-- 	<view class="main">
		<uni-list>
			<uni-list-item v-for="index in 4" :key=index title="列表左侧带略缩图" note="列表描述信息" showArrow
				thumb="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" thumb-size="base" rightText="默认" />
		</uni-list>

	</view> -->
</template>

<script setup lang="ts">
	import { formatDateTime } from '../../utils/formate.js'
	import { onReady, onShow } from '@dcloudio/uni-app'
	import { getUserInfo } from "../../utils/api.js"
	import {
		computed,
		ref
	} from 'vue'
	const userInfo = ref()
	const getInfo = async () => {
		let info = await getUserInfo({ _id: uni.getStorageSync('id') })
		console.log(info,'info')
		userInfo.value = info.data[0]
	}
	onReady(() => {
		if (!uni.getStorageSync('token')) {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		}
	})
	onShow(async () => {
		await getInfo()
	})
	const avatar = ref<string>('https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png')
	const handlePerInfo = () => {
		uni.navigateTo({
			url: `/pages/getInfo/getInfo?dataItem=${encodeURIComponent(JSON.stringify(userInfo.value))}`
		})
	}
	const sex = computed(() => {
		switch (userInfo.value.sex) {
			case '0': return '男';
			case '1': return '女';
			default: return '木鸡啦'
		}
	})
</script>

<style lang="scss">

</style>