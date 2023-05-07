## 引入uni-scss
```html
<style lang="scss" scoped>
	@import './uni.scss';
	/*每个页面公共css */
</style>
```
>注意：在uni.scss文件中的scss样式，在打包微信小程序时会给每个vue页面的css文件都加上这些样式，如果样式过多会造成项目体积过大无法编译二维码。

## 微信小程序中 <banner class="banner" /> 是一个单独的标签
## 沉浸式导航栏
### 全局沉浸式导航栏
 ```json
"globalStyle": {
    "navigationStyle": "custom",
},
 ```
### 单页面沉浸式导航栏
```json
{  
    "path" : "pages/index/index",  
    "style" : {  
        "navigationStyle":"custom"  
    }  
}  
```

## uniapp项目代码提交的时候忽略文件
1、git bash here
2、输入命令 touch .gitignore 生成 .gitignore文件
3、在.gitignore输入
```
node_modules/
.project
unpackage/
.DS_Store
```
4、如果以前提交过unpackage文件,执行
```
git rm -r --cached unpackage

```

## uniapp路由
路由参数的获取
```vue
<script setup>
	var pages = getCurrentPages();
</script>
```
可在pages中查看路由信息
## uniapp解析markdown语法
 参见链接  [mp-html](https://jin-yufeng.gitee.io/mp-html/#/overview/quickstart 'mp-html的markdown插件')