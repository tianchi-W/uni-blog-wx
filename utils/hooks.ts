import { computed, onMounted, ref, watch } from 'vue'
import { getClassifyInfo } from "@/utils/api.js"
import {
	onLoad, onReachBottom, onShow
} from "@dcloudio/uni-app";
import { getArticleList } from "@/utils/api.js"
export const useArticleList = () => {
	const route = ref()
	const size = ref(5)
	const list = ref([])
	const total = ref()
	const status = ref('more')
	const currentValue = ref(0)
	const classifyid = ref('')
	const handlerArticleClick = (item : any) => {

		uni.navigateTo({
			url: '/pages/article/article?_id=' + item._id
		});
	}
	onLoad(() => {
		route.value = getCurrentPages()[0].route;

	})

	onShow(() => {
		// getList({ classifyid: classifyid.value, currentValue: currentValue.value, size: size.value })
	})
	const getList = (params : { classifyid ?: string, currentValue : any, size : any }) => {
		const { classifyid, currentValue, size } = params
		status.value = 'loading'
		getArticleList({ classifyid: classifyid ? params.classifyid : '', limit: size, skip: (currentValue) * size }).then(r => {
			total.value = r.data.total
		
			list.value = [...list.value, ...r.data.article]
			if (list.value.length >= total.value) {
				status.value = 'noMore'
			}

		})
	}
	onReachBottom(() => {
		status.value = 'loading'
		if (list.value.length >= total.value) {
			status.value = 'noMore'
		}
		currentValue.value = currentValue.value + 1
		if (total.value > list.value.length) {
			getList({ classifyid: classifyid.value, currentValue: currentValue.value, size: size.value })
		}
	})
	watch(() => [classifyid.value, route.value], (to) => {

		currentValue.value = 0
		list.value = []
		getList({ classifyid: to[0], currentValue: currentValue.value, size: size.value })
	})


	return { list, handlerArticleClick, getList, classifyid, status }
}
export const useClassify = () => {
	const route = ref()
	onLoad(() => {
		route.value = getCurrentPages()[0].route;
	})
	const classify = ref()
	const getClassify = async () => {
		const res = await getClassifyInfo()
		if (route.value == 'pages/index/index') {
			classify.value = [{ title: '首页', _id: '' }, ...res.data.classify]
		} else {
			classify.value = res.data.classify
			currentInfo.value = classify.value[0]
		}
	}
	//分类列表
	const currentTab = ref(0)
	const currentInfo = ref<any>()
	const swichNav = (index : any, item ?: any) => {
		currentInfo.value = item
		currentTab.value = index
	}
	getClassify()
	return {
		classify, getClassify, currentTab, swichNav, currentInfo,
	}
}