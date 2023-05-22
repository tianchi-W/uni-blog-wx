<template>
	<view class="classify">
		<view class="class-left">
			<view :class="index===currentTab?'active':''" @tap.stop='swichNav(index,item)'
				v-for="(item,index) in classify" class="classify-item">
				{{item.title}}
			</view>
		</view>
		<view class="class-right">
			<uni-section :title="currentInfo?.title" type="line">
				<view class="example-body">
					<uni-title color="#95a5a6" style="padding: 10rpx;" type="h3"
						:title="currentInfo?.introduction"></uni-title>
				</view>
			</uni-section>
			<view class="container">
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
							{{item?.introduction}}
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

				<uni-load-more iconType="circle" :status="status" />
			</view>

		</view>
	</view>
</template>

<script lang="ts" setup>
	import { formatDateTime } from '@/utils/formate.js'
	import { useArticleList, useClassify } from '@/utils/hooks'
	import { watch } from 'vue';

	const { classify, swichNav, currentInfo, currentTab } = useClassify()

	const { list, handlerArticleClick, classifyid, status } = useArticleList()

	watch(() => currentInfo.value?._id, (to) => {
		classifyid.value = to
	})
</script>

<style scoped lang="scss">
	.classify {
		height: 100%;
		align-items: start;

		.class-left {
			position: fixed;
			background-color: #f5f6fa;
			height: 100%;
			width: 200rpx;

			.classify-item {
				padding: 15px 0;
				background-color: #f5f6fa;
				display: flex;
				justify-content: center;
				align-items: center;

				&.active {
					background-color: #fff;
				}
			}
		}

		.class-right {
			background-color: #fff;
			position: relative;
			margin-left: 200rpx;

			.container {
				position: absolute;
				width: auto;
			}

			.news-block {
				display: grid;
				grid-template-columns: 150rpx 1fr;
				border-bottom: 1rpx solid #DDD;
				padding: 24rpx 0;

				.news-text {
					margin-left: 10rpx;
					display: flex;
					flex-direction: column;
					flex: 1;


					.news-title {
						font-size: 35rpx;
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
						width: 150rpx;
						height: 150rpx;
					}
				}

				&:last-child {
					border: none;
				}
			}



		}
	}
</style>