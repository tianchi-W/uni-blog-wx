<template>
	<view class="my-card" @click="push(articleInfo._id)">
		<uni-card :title="articleInfo.title" :extra="articleInfo.introduction">
			<text class="uni-body">{{articleInfo.content}}</text>
		</uni-card>
	</view>
</template>

<script setup>
	import {
		reactive,
		toRefs
	} from "vue";
	const dataInfo = defineProps({
		articleInfo: {
			type: Object,
			default: () => {}
		}
	})
	const {
		articleInfo
	} = toRefs(dataInfo)
	const data = reactive({
		cover: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
		avatar: 'https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png',
		extraIcon: {
			color: '#4cd964',
			size: '22',
			type: 'gear-filled'
		}
	})

	const {
		extraIcon,
		cover,
		avatar


	} = toRefs(data)
	const push = (id) => {
		uni.navigateTo({
			url: `/pages/article/article?id=${id}`
		});
	}
	const methods = reactive({
		onClick(e) {
			console.log(e)
		},
		actionsClick(text) {
			uni.showToast({
				title: text,
				icon: 'none'
			})
		}
	})
	const {
		onClick,
		actionsClick
	} = toRefs(methods)
</script>


<style lang="scss" scoped>
	.my-card {
		width: 100%;

		.uni-body {
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}

		.card-actions {
			display: flex;
			justify-content: space-around;
		}

		image {
			width: 100%;
		}
	}
</style>