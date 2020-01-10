// 1.引用mongoose
const  mongoose = require('mongoose')

// 2.创建文章集合规则
const articleSchema = new mongoose.Schema({
	 // 标题
	title:{
		type:String,
		maxlength:50,
		minlength:4,
		require:[true,'请填写文章标题']
	},
	 // 作者
	author:{
		type:String,
		required:[true,'请传递作者']
	},
	// 创建时间
	publishDate:{
		type:Date,
		default:Date.now
	},
	// 图片链接
	cover:{
		type:String,
		default:null
	},
	// 内容
	content:{
		type:String
	}
})

// 3.根据规则创建集合
const Article = mongoose.model('Article',articleSchema)

// 4.将集合规则作为模块成员进行导出
module.exports = {
	Article
}