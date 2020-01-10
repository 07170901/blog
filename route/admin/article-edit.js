// 导入文章构造函数
const {Article} = require('../../model/article.js') 
// 导入formidable第三方模块
const formidable = require('formidable')
// 导入path系统模块
const path = require('path')

module.exports = (req,res)=>{
	// 1.创建表单解析对象
	const form = new formidable.IncomingForm()
	// 2.配置上传文件的存放位置
	form.uploadDir = path.join(__dirname,'../','../','public','uploads')
	// 3.保留上传文件的后缀
	form.keepExtensions = true
	//return res.send(req.body)
	// 4.解析表单
	form.parse(req, async (err,fields,files)=>{
		// res.send(files.cover.path.split('public')[1])
		await Article.create({
			 title:fields.title,
			 author:fields.author,
			 publishDate:fields.publishDate, 
			 cover:files.cover.path.split('public')[1],
			 content:fields.content
		 })
		 res.redirect('/admin/article')
	})
	
}