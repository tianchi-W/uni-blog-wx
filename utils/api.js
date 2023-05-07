import {httpGet,httpPost} from "./request.js"

//获取文章信息全部
export const getArticleList=(params={})=>{
	return httpGet({url:'/article',params})
}
export const getArticleById = (params = {}) => httpPost({ url: '/article/info', params })