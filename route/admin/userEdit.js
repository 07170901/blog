// 引用用户集合的构造函数
const {User,validataUser} = require('../../model/user')

// 引入加密模块
const bcrypt = require('bcrypt')

// 异步函数
module.exports = async (req,res,next)=>{
	
	// 标识 标识当前访问的是用户管理页面
	req.app.locals.currentLink = 'user'
	
	//查询用户数据的总数
	let count= await User.countDocuments({});
	//总页数
	let total = Math.ceil(count/5);
	// 捕获异常
	try{	
		await validataUser(req.body)
	}catch(e){
		//console.log(e.message)
		// 重定向到添加用户页面
		//return res.redirect(`/admin/userEdit?message=${e.message}`)
		return next(JSON.stringify({path:'/admin/userEdit',message:e.message})) 
	}
	// 根据邮箱地址来查询用户是否存在
	let user = await User.findOne({email:req.body.email})
	// 如果查询到已注册的邮箱,就重定向userEdit
	if(user){
	  // return res.redirect(`/admin/userEdit?message=用户邮箱已注册`)
	  return next(JSON.stringify({path:'/admin/userEdit',message:'用户邮箱已注册'})) 
	}else{
		//对面进行随机加密
		//生成随机字符串
		const salt = await bcrypt.genSalt(10)
		// 加密
		const password = await bcrypt.hash(req.body.password,salt);
		// 替换密码
		req.body.password = password
		// res.send(req.body)
		// 添加到数据库中
		await User.create(req.body)
		// 重定向到用户列表中
		res.redirect(`/admin/user?page=${total}`)
	}


}