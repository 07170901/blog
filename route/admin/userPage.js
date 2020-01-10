//  导入用户集合构造函数
const {User} = require('../../model/user')
module.exports = async (req,res)=>{
	
	// 标识 标识当前访问的是用户管理页面
	req.app.locals.currentLink = 'user'

	// 接收客户端传递过来的当前页
	let page = req.query.page;
	
	// 每一页显示的数据条数
	let pagesize =5;
	//查询用户数据的总数
	let count= await User.countDocuments({});
	//总页数
	let total = Math.ceil(count/pagesize);
	
	//  页码开始的位置
	let start = (page-1)*pagesize;
	
	let users = await User.find({}).limit(pagesize).skip(start)
	// res.send('欢迎来到博客管理页面')
	// 重新渲染模板
	res.render('admin/user',{
		users:users,
		page:page,
		total:total
	})
}