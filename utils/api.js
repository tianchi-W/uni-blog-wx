import {
	httpGet,
	httpPost,
	httpPut,
	httpDel
} from "./request.js"

//获取文章信息全部
export const getArticleList = (params = {}) => {
	return httpGet({
		url: '/article',
		data:params
	})
}
export const getArticleById = (params = {}) => httpPost({
	url: '/article/info',
	data:params
})


//登录
export const wxlogin = (params = {}) => {
	return httpGet({
		url: '/users/wxlogin',
		data:params
	})
}
export const putUserInfo = (params = {}) => httpPut({
	url: '/users',
	data:params
})
export const getUserInfo = (params = {}) => httpGet({
	url: '/users',
	data:params
})


//获取分类信息
export const getClassifyInfo = (params = {}) => httpGet({
	url: '/classify',
	data:params
})