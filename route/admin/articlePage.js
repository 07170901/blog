const {Article} = require('../../model/article')
// 导入 mongoose-sex-page
const pagination = require('mongoose-sex-page')
module.exports = async (req,res)=>{
	
	// 接收客户端传递过来的page;
	const page = req.query.page
	
	// 标识 标识当前访问的是文章管理页面
	req.app.locals.currentLink = 'article'
	// 联合查询
	// let articles =  await pagination(Article).find().page(page).size(2).display(2).populate('author').exec()
	let articles =  await pagination(Article).find().page(page).size(6).display(5).exec()
	//return  res.send(articles)
	
	res.render('admin/article.art',{
		articles:articles
	})
}