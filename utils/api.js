import {
	httpGet,
	httpPost,
	httpPut
} from "./request.js"

//获取文章信息全部
export const getArticleList = (params = {}) => {
	return httpGet({
		url: '/article',
		params
	})
}
export const getArticleById = (params = {}) => httpPost({
	url: '/article/info',
	params
})


//登录
export const wxlogin = (params = {}) => {
	return httpGet({
		url: '/users/wxlogin',
		params
	})
}
export const putUserInfo = (params = {}) => httpPut({
	url: '/users',
	params
})
export const getUserInfo = (params = {}) => httpGet({
	url: '/users',
	params
})