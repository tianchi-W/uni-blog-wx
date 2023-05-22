<template>
	<view class="article">
		<view class="title">
			{{article.title}}
		</view>

		<br>
		<mp-html class="rich" :selectable='true' :set-title='true' use-anchor :markdown='true'
			:content="article.content"></mp-html>
		<view class="news-tag">
			标签：<uni-tag v-for="i in article.tags" size="small" :text="i.title" :key="i._id" :type="i.type"></uni-tag>
		</view>
		<!-- <image :src="article.pic" mode="aspectFit" class='image' scaleToFill width="100%"/> -->
	</view>
</template>
<script setup>
	import {
		ref,
		getCurrentInstance
	} from "vue";
	import {
		onReady,
		onShow
	} from '@dcloudio/uni-app'
	import {
		getArticleById
	} from "../../utils/api.js"
	// #ifdef MP
	const page = getCurrentPages()

	const article = ref([])
	const getArticle = async () => {
		return getArticleById({
			_id: page[1].options._id
		}).then(r => {
			console.log(r, 'f')
			article.value = r.data[0]
		})
	}
	onReady(async () => {
		await getArticle()
	})
	onShow(async () => {
		await getArticle()
	})
	// #endif
	// #ifdef H5
	const page = getCurrentInstance()
	console.log(page.attrs.id)
	const article = ref([])
	const getArticle = async () => {
		return getArticleById({
			_id: page.attrs.id
		}).then(r => {
			console.log(r, 'f')
			article.value = r.data[0]
		})
	}
	onReady(async () => {
		await getArticle()
	})
	// #endif
</script>

<style lang="scss">
	.rich {
		padding: 5px;
		/* 设置内边距 */
		font-size: 18px;
		/* 设置默认的字体大小 */
		overflow: hidden;
		/* 禁用横向滚动 */
		display: inline;
		/* 行内显示 */
		white-space: pre-wrap;
		/* 保留空格和换行符 */
		white-space: pre-line;
		/* 保留换行符 */
	}

	.article {
		.title {
			color: #2c3e50;
			font-weight: 800;
			font-size: 60upx;
			padding-bottom: 60upx;
			border-bottom: solid 1upx #2c3e50;
			margin-bottom: 60upx;
		}

		// background-color: $uni-bg-color-grey;
		min-height: 100%;


		.title {}
	}

	.image {
		max-width: 400rpx;
	}
</style>