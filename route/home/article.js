// 导入文章集合构造函数
const {Article} = require('../../model/article')
// 导入评论集合构造函数
const {Comment} = require('../../model/comment')
module.exports = async (req,res)=>{
	// 接收客户端传递过来的文章Id值
	const id = req.query.id;
	// 联合查询通过author来联表查询
	// let article = await Article.findOne({_id:id}).populate('author');
	let article = await Article.findOne({_id:id})
	// 查询当前的文章所对应的评论信息
	let comments =  await Comment.find({aid:id}).populate('uid')
	
	//res.send(comments)
	
	// res.send(article)
	// return
	
	res.render('home/article',{
		article:article,
		comments:comments
	})
}