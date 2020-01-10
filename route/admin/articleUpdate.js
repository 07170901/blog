const {Article} = require('../../model/article')
// 导入formidable第三方模块
const formidable = require('formidable')
// 导入path系统模块
const path = require('path')
module.exports = async (req,res)=>{
	const {id} = req.query	
	// 1.创建表单解析对象
	const form = new formidable.IncomingForm()
	// 2.配置上传文件的存放位置
	form.uploadDir = path.join(__dirname,'../','../','public','uploads')
	// 3.保留上传文件的后缀
	form.keepExtensions = true
	// 4.解析表单
	form.parse(req, async (err,fields,files)=>{
		// res.send(files.cover.path.split('public')[1])
		let article = await Article.findOne({_id:id})
		//
		if(files.cover.name==''){
			cover=article.cover			
		}else{
			cover=files.cover.path.split('public')[1]
		}
		//return res.send(article.publishDate)
		// 将用户信息更新到数据库
	await Article.updateOne({_id:id},{ 
			 title:fields.title,
			 author:fields.author,
			 publishDate:fields.publishDate, 
			 cover:cover,
			 content:fields.content
	})
		res.redirect('/admin/article')
	})

}
