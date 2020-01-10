const {Article} = require('../../model/article.js')
// 分页模块
const pagination = require("mongoose-sex-page")


module.exports = async (req,res)=>{
	const page = req.query.page
	// 从数据库中查询数据,并实现分页
	let result = await pagination(Article).page(page).size(4).display(5).find().exec();
	// 渲染并且传值
	// res.send(result)
	// return
	const user = req.session.username
	
	res.render('home/default.art',{
		result:result,
		user:user
	})
}