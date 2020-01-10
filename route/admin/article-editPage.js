
const {Article} = require('../../model/article.js')
module.exports = async (req,res)=>{
	
	const {id} = req.query	
	
	// 标识 标识当前访问的是文章管理页面
	req.app.locals.currentLink = 'article'
	
	if(id){
		// 存在则是修改页面
		//res.send(req.body)
		let article = await Article.findOne({_id:id})
		res.render('admin/article-edit',{
			article:article,
			link:'/admin/article-update?id='+id,
			button:'修改'
		})
	}else{

		res.render('admin/article-edit',{
			// message:message,
			link:'/admin/article-edit',
			button:'添加'
		})
	}

}