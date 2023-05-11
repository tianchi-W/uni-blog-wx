<template>
	<view class="content">
		<banner class="banner" />

		<view class="search">
			<uni-search-bar bgColor="#ffffff" @confirm="search" :focus="true" v-model="searchValue" @cancel="cancel">
			</uni-search-bar>
		</view>
		<section class="section">
			<uni-section class="stci" title="最新文章" type="line"></uni-section>
			<div class="mycard">
				<div v-for="(item,index) in list" :key="index">
					<my-card :articleInfo='item' class="card"></my-card>
				</div>
			</div>
		</section>
	</view>
</template>
<script setup lang="ts">
	import { getArticleList } from "../../utils/api.js"
	import { onReady, onReachBottom } from '@dcloudio/uni-app'
	import { ref } from "vue"
	const search = () => {
		console.log(123)
	}
	const cancel = () => {
		console.log(123)
	}
	const size = ref(5)
	const list = ref([])
	const current = ref(1)
	const total = ref()
	const getList = () => {
		getArticleList({ limit: size.value, skip: (current.value - 1) * size.value }).then(r => {
			total.value = r.data.total
			list.value = [...r.data.article, ...list.value]
		})
	}
	onReady(() => {
		getList()
	})
	onReachBottom(() => {
		current.value = current.value + 1
		if(total.value>list.value.length){
			getList()
		}
	})
	const searchValue = ref('')
</script>

<style lang="scss" scoped>
	.content {
		background-color: $uni-bg-color-grey;
	}

	.stci {
		position: sticky;
		top: 0rpx;
		z-index: 1;
		background-color: $uni-bg-color-grey;
	}

	.search {
		position: sticky;
		background-color: $uni-bg-color-grey;
		top: 80upx;
		z-index: 100;
	}

	.main {
		background-color: $uni-bg-color-grey;
	}

	.banner {}

	.section {
		width: 100%;

		::v-deep .uni-searchbar {
			background-color: #34495e;
		}
	}

	.mycard {}

	.card {
		width: 100%;

	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	section {
		width: 100%;

	}

	.content {
		background-color: #ecf0f1;
		width: 100%;

		.search {
			width: 100%;
		}

		.banner {
			width: 100%;
		}

		.uni-form-item {
			width: 100%;
		}

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>