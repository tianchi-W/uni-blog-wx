<template>
	<view class="my">
		<uni-card title="基础卡片" sub-title="副标题" extra="额外信息" :thumbnail="avatar">
			<text class="uni-body">这是一个带头像和双标题的基础卡片，此示例展示了一个完整的卡片。</text>
		</uni-card>
	</view>

	<view class="main">
		<uni-list>


			<uni-list-item v-for="index in 4" :key=index title="列表左侧带略缩图" note="列表描述信息" showArrow
				thumb="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" thumb-size="base" rightText="默认" />

		</uni-list>

	</view>
</template>

<script setup lang="ts">
	import { onReady } from '@dcloudio/uni-app'
	import {
		ref
	} from 'vue'
	onReady(() => {
		console.log(uni.getStorageSync('token'),'token')
		if (!uni.getStorageSync('token')) {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		}

	})
	const avatar = ref<string>('https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png')
</script>

<style lang="scss">

</style>