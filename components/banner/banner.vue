<template>
	<view class="banner">
		<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
			<swiper circular  :autoplay="true" :interval="6000" class="swiper-box"
				@change="change">
				<swiper-item v-for="(item ,index) in info" :key="index">
					<view class="swiper-item" :class=" current === index ? 'slide-image active' : 'slide-image quiet'">
						<image mode="widthFix" width="100%" :src='item.imgUrl'></image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
	</view>
</template>

<script lang="ts" setup>
	import {
		reactive,
		ref
	} from "vue"
	const info = reactive([{
		content: '内容 A',
		imgUrl: 'https://cdn.cdnjson.com/tvax3.sinaimg.cn//large/0072Vf1pgy1fodqofmtxkj31kw0w04qv.jpg'
	}, {
		content: '内容 B',
		imgUrl: 'https://cdn.cdnjson.com/tvax3.sinaimg.cn//large/0072Vf1pgy1foxkd2j5m5j31hc0u07pr.jpg'
	}, {
		content: '内容 C',
		imgUrl: 'https://cdn.cdnjson.com/tvax3.sinaimg.cn//large/a15b4afely1fnt9605xzwj21hc0u07ld.jpg'
	}])
	const dotStyle = reactive([{
		backgroundColor: 'rgba(0, 0, 0, .3)',
		border: '1px rgba(0, 0, 0, .3) solid',
		color: '#fff',
		selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
		selectedBorder: '1px rgba(0, 0, 0, .9) solid'
	},
	{
		backgroundColor: 'rgba(255, 90, 95,0.3)',
		border: '1px rgba(255, 90, 95,0.3) solid',
		color: '#fff',
		selectedBackgroundColor: 'rgba(255, 90, 95,0.9)',
		selectedBorder: '1px rgba(255, 90, 95,0.9) solid'
	},
	{
		backgroundColor: 'rgba(83, 200, 249,0.3)',
		border: '1px rgba(83, 200, 249,0.3) solid',
		color: '#fff',
		selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
		selectedBorder: '1px rgba(83, 200, 249,0.9) solid'
	}
	])
	const dotStyles = ref({})
	const current = ref(0)
	const mode = ref('round')
	const change = (event : any) => {
		current.value = event.detail.current
		dotStyles.value = dotStyle[current.value]
	}
</script>
<style lang="scss" scoped>
	.swiper-box {
		height: 422upx;

		image {
			width: 100%;
		}

		swiper-item {
			.swiper-item {
				height: auto;
			}

			height:auto
		}

		.active {
			// 中间放大动画
			transform: none;
			transition: all 0.5s ease-in 0s;
		}

		.quiet {
			// 两边缩小动画
			transform: scale(0.5);
			opacity: 0.4;
			transition: all 0.5s ease-in 0s;
		}

	}
</style>