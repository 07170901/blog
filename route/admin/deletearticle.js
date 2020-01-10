const {Article} = require('../../model/article')
module.exports = async (req,res)=>{
	// 根据id删除用户
	await Article.findOneAndDelete({_id:req.query.id});
	// 将页面重定向到用户列表页面中
	res.redirect('/admin/article?page=1')
	//res.send(req.query.id)
}