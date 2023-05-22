<template>
	<view class="zong">
		<view class="user_box" style="width: 80%; margin: 40rpx auto;">
			<view class="user_for" v-for="(list,id) in userList" :key="id">
				<view class="line_box">
					<!-- 圆球 -->
					<view class="line_radio"
						:style="{ 'background' : list.istrue ? '#ef6f16' : '#8e8b8d' , 'border' : list.istrue ? 'solid 6rpx #fbc293' : 'solid 6rpx #b9b7b6'}">
					</view>
					<!-- 线 -->
					<view class="line_for" v-for="item in 3"
						:style="{ 'background' : list.istrue ? '#ef6f16' : '#8e8b8d'}">
					</view>
				</view>

				<view class="right_box" :style="{ 'color' : list.istrue ? '#ef6f16' : '#8e8b8d'}">
					<view class="title">{{list.title}} <text style="margin-left: 20rpx;" v-if="list.title1"
							@click="Jump(list)">({{list.title1}})</text></view>
					<view class="desc">
						<image src="../../static/logo.png" mode=""></image>
						{{list.desc}}
					</view>
				</view>
			</view>
		</view>
	</view>


</template>
<script>
	export default {
		name: '',
		props: {

		},
		data() {
			return {
				userList: [{
						id: 0,
						title: "blog文章增删改查",
						title1: "后端、后台，uniapp完成",
						desc: '2023-5-01',
						istrue: true,
						url: 'http://www.xixihaha.com',
					}, {
						id: 1,
						title: "blog用户登录",
						title1: "后端、后台，uniapp完成",
						desc: '2023-05-04',
						istrue: true,
						url: ''
					},
					{
						id: 2,
						title: "blog分类",
						title1: "后端、后台，uniapp完成",
						desc: '2023-05-05',
						istrue: true,
						url: ''
					}, {
						id: 3,
						title: "blog标签",
						title1: "后端、后台，uniapp完成",
						desc: '2023-05-05',
						istrue: true,
						url: 'http://www.taobao.com'
					}, {
						id: 4,
						title: "blog排序、精选页",
						title1: "后台完成",
						desc: '2023 - 05 - 06',
						istrue: false,
						url: 'http://www.meirenzheng.com'
					}, {
						id: 5,
						title: "博客网页端",
						title1: "文件夹已建好",
						desc: '2023 - 05 - 06',
						istrue: false,
						url: 'http://www.meiheding.com'
					}

				]
			}
		},
		methods: {
			Jump(item) {
				if (!item.url) {
					console.log('没有要跳转的路径')
					return
				}
				console.log(item.url)
			}
		},
	}
</script>
<style>
	.user_for {
		display: flex;
	}

	.item_year {
		font-size: 34rpx;
		height: 50rpx;
	}

	.line_for {
		width: 4rpx;
		height: 24rpx;
		margin: 0 20rpx 10rpx;
		background-color: #559DFF;
	}

	.line_radio {
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
		top: 0;
	}

	.right_box {
		padding: 0rpx 20rpx 20rpx 20rpx;
	}

	.desc {
		font-size: 30rpx;
		color: #8e8b8d;
		display: flex;
		margin-top: 20rpx;
		align-items: center;

	}

	image {
		margin-right: 20rpx;
		width: 34rpx;
		height: 34rpx;
		border-radius: 50%;
	}
</style>