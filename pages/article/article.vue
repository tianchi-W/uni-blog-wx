<template>
	<view class="article">
		<view class="title">
			{{article.title}}
		</view>
		<br>
		<mp-html :selectable='true' :set-title='true' use-anchor :markdown='true' :content="article.content"></mp-html>
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
	 .article {
		.title {
			color: #2c3e50;
			font-weight: 800;
			font-size: 60upx;
			padding-bottom: 60upx;
			border-bottom: solid 1upx #2c3e50;
			margin-bottom: 60upx;
		}

		background-color: $uni-bg-color-grey;
		padding: 20upx;
		padding-top:40upx;

		.title {}
	}
		
	.image{
		max-width: 400rpx;
	}
</style>