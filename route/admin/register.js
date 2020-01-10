// 引用用户集合的构造函数和验证表单
const {User,validataUser} = require('../../model/user')

// 引入加密模块
const bcrypt = require('bcrypt')

module.exports = async(req,res,next)=>{
	//res.send(req.body)
	let user = await User.findOne({email:req.body.email})
	// 捕获异常
	// try{
	// 	await validataUser(req.body)
	// }catch(e){
	// 	return next(JSON.stringify({path:'admin/registr',massage:e.massage}))
	// }
	// 如果邮箱已经注册过
	if(user){
		return res.status(600).render('admin/error',{msg:'用户已经注册过了',link:'/admin/register'})
	}else{
		// 邮箱没有注册过
		//对面进行随机加密
		//生成随机字符串
		const salt = await bcrypt.genSalt(10)
		// 加密
		const password = await bcrypt.hash(req.body.password,salt);
		// 添加到数据库中
		// 添加到数据库中
		await User.create({
			username:req.body.username,
			email:req.body.email,
			password:password,
			role:'normal',
			state:1
		})
		
		// 重定向到用户列表中
		res.redirect(`/admin/login`)
	}
	
}