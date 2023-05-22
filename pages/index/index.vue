<template>
	<view class="header--circle">
		<view class="container-top-bg">
			<!-- <banner class="banner" /> -->
			<uni-nav-bar :fixed="true" :statusBar="true" backgroundColor="$uni-bg-color">
				<template slot="left">
					<view class="container-logo">
					</view>
				</template>
				<view class="container-btn-search" @click="handlerSearchClick">
					<uni-icons class="input-uni-icon" type="search" size="18" color="$uni-text-color" />
					<text>点我搜索</text>
				</view>
			</uni-nav-bar>
		</view>
		<scroll-view scroll-x scroll-with-animation class="tab-view" scroll-left="">
			<view v-for="(item, index) in classify" :key="index"
				:class="'tab-bar-item ' + (currentTab==index ? 'active' : '')" :data-current="index"
				@tap.stop="swichNav(item,index)">
				<text class="tab-bar-title">{{item.title}}</text>
			</view>
			<view class="tab-bar-item">
				<text class="tab-bar-title" style="opacity: 0;">.</text>
			</view>
		</scroll-view>
	</view>

	<view class="tab-more" @tap.stop="handlerTabMoreClick">
		<uni-icons color="white" type="bars" size="30"></uni-icons>
	</view>
	<view class="tab-content" style="padding-top: 100rpx;">
		<template v-if="currentTab==0">
			<view class="banner" style="background-color: $uni-bg-color;">
				<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
					<swiper circular :autoplay="true" :interval="6000" class="swiper-box" @change="change">
						<swiper-item v-for="(item ,index) in info" :key="index">
							<view class="swiper-item"
								:class=" current === index ? 'slide-image active' : 'slide-image quiet'">
								<image mode="widthFix" width="100%" :src='item.imgUrl'></image>
							</view>
						</swiper-item>
					</swiper>
				</uni-swiper-dot>
			</view>
			<view class="news-view">
				<view v-if="list && list.length>0" class="news-type">
					最新文章
				</view>
				<view v-for="(item, index) in list" :key="index" class="news-block image-wide" :data-id="item._id"
					@tap.stop="handlerArticleClick(item)">
					<view class="news-image">
						<image :src="item.pic" mode="aspectFit" />
					</view>

					<view class="news-text">
						<text class="news-title">

							{{item.title}}
						</text>
						<view class="news-intro">
							{{item.introduction}}
						</view>
						<view class="news-tag">
							<uni-tag v-for="i in item.tags" size="small" :text="i.title" :key="i._id"
								:type="i.type"></uni-tag>
						</view>
						<view class="news-bottom">
							<view class="news-date">
								{{formatDateTime(item.date)}}
							</view>
							<view class="news-author">
								{{item.author}}
							</view>
						</view>



					</view>
				</view>
			</view>

		</template>

	</view>



	<!-- <view class="search">
			<uni-search-bar bgColor="#ffffff" @confirm="search" :focus="true" v-model="searchValue" @cancel="cancel">
			</uni-search-bar>
		</view> -->
	<!-- <section class="section">
			<uni-section class="stci" title="最新文章" type="line"></uni-section>
			<div class="mycard">
				<div v-for="(item,index) in list" :key="index">
					<my-card :articleInfo='item' class="card"></my-card>
				</div>
			</div>
		</section> -->

</template>
<script setup lang="ts">
	import { formatDateTime } from '@/utils/formate.js'
	import { getArticleList, getClassifyInfo } from "@/utils/api.js"
	import { onReady, onReachBottom } from '@dcloudio/uni-app'
	import { ref, reactive } from "vue"
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
	const size = ref(5)
	const list = ref([])
	const total = ref()
	const getList = () => {

		getArticleList({ limit: size.value, skip: (current.value) * size.value }).then(r => {
			total.value = r.data.total
			list.value = [...list.value,...r.data.article]
		})
	}
	getList()
	const handlerSearchClick = (e : Event) => {
		console.log(e)
		uni.navigateTo({
			url: '/pages/search/search'
		});
	}
	onReady(() => {
		// getList()
		getClassify()
	})
	onReachBottom(() => {
		current.value = current.value + 1
		console.log(current.value)
		if (total.value > list.value.length) {
			getList()
		}
	})
	// const searchValue = ref('')

	//分类列表
	const classify = ref()
	const currentTab = ref(0)
	const getClassify = async () => {
		const res = await getClassifyInfo()
		classify.value = [{ title: '首页', _id: '0' }, ...res.data.classify]
	}
	const swichNav = (item : any, index : any) => {
		currentTab.value = index
	}
	const handlerArticleClick = (item : any) => {

		uni.navigateTo({
			url: '/pages/article/article?_id=' + item._id
		});
	}
</script>

<style lang="scss" scoped>
	.container-top-bg {
		background-repeat: no-repeat;
		background-size: 100% auto;
		background-position-y: 50rpx;
		background-color: $uni-bg-color;
		padding-bottom: 20rpx;
		position: fixed;
		top: 0rpx;
		width: 100%;
		z-index: 99;

		.container-logo {
			display: flex;
			align-items: center;
			margin-right: 15rpx;
			height: 150rpx;
			width: 700rpx;
		}
	}

	.container-btn-search {
		display: flex;
		justify-content: center;
		margin-left: 10rpx;
		align-items: center;
		width: 80%;
		height: 32px;
		padding-left: 20rpx;
		background: #F3F3F3;
		border-radius: 16px;
		color: #555;
		font-size: 28rpx;
	}

	.tab-view {
		width: 100%;
		height: 100rpx;
		overflow: hidden;
		box-sizing: border-box;
		position: fixed;
		top: 230rpx;
		left: 0;
		z-index: 1;
		background: $uni-bg-color;
		white-space: nowrap;

		&::before {
			content: '';
			position: absolute;
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
			bottom: 0;
			right: 0;
			left: 0;
		}

		.tab-bar-item {
			padding: 0;
			height: 100rpx;
			min-width: 80rpx;
			line-height: 100rpx;
			margin: 0 28rpx;
			display: inline-block;
			text-align: center;
			box-sizing: border-box;
		}

		.tab-bar-title {
			height: 100rpx;
			line-height: 100rpx;
			font-size: 28rpx;
			color: #ffffff;
			font-weight: 400;
		}

		.active {
			border-bottom: 6rpx solid #FFF;
		}

		.active .tab-bar-title {
			color: #FFF !important;
			font-size: 32rpx;
			font-weight: bold;
		}
	}

	.tab-more {
		position: fixed;
		top: 230rpx;
		right: -50rpx;
		height: 100rpx;
		width: 120rpx;
		z-index: 99;
		display: flex;
		align-items: center;


	}




	.tab-content {
		position: absolute;
		top: 230rpx;
		width: 100%;

		//轮播图动销
		.swiper-box {
			height: 422upx;
			background-color: $uni-bg-color;

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


		.news-view {
			overflow: hidden;

			.news-type {
				font-size: 36rpx;
				font-weight: 500;
				color: #555;
				padding: 16rpx 0 0;

				.text {
					float: right;
					font-size: 24rpx;
					font-weight: 200;
					color: #999;
					margin-right: 30rpx;
				}
			}

			.news-block {
				display: grid;
				grid-template-columns: 270rpx 1fr;
				border-bottom: 1rpx solid #DDD;
				padding: 24rpx 0;

				.news-text {
					display: flex;
					flex-direction: column;
					flex: 1;


					.news-title {
						font-size: 40rpx;
						font-weight: 700;
					}

					.news-intro {
						margin-top: 10rpx;
						flex: 1;
						display: flex;
						align-items: center;
					}

					.news-tag {
						margin-bottom: 10rpx;
					}

					.news-bottom {
						display: flex;
						justify-content: space-between;
					}
				}

				.news-image {

					border-radius: 8rpx;

					image {
						width: 250rpx;
						height: 250rpx;
					}
				}

				&:last-child {
					border: none;
				}
			}



		}
	}
</style>