// 导入评论集合构造函数
const {Comment} = require('../../model/comment')
module.exports = (req,res)=>{
	// res.send(req.body)
	// 解构传过来的参数
	const {content,uid,aid} = req.body
	// 创建评论数据
	Comment.create({
		content:content,
		uid:uid,
		aid:aid,
		time:new Date()
	})
	res.redirect('/home/article?id='+aid)
}