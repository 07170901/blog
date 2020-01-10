//导入用户集合构造函数
 const {User} = require('../../model/user.js')
 
// 导入bcrypt
 const bcrypt = require('bcrypt')
 
module.exports=async(req,res)=>{
	// 接收请求参数
	let {email,password} = req.body
	if(email.trim().length==0||password.trim().length==0){
		// return res.status(400).send('<h4>邮箱或者密码不能为空</h4>')
		return res.status(400).render('admin/error',{msg:'邮箱或者密码不能为空',link:'/admin/login'})
	}
	
	// 根据邮箱地址来查询用户是否存在
	// 如果查询用户,user变量的值是对象类型
	// 如果查询不到客户,则user变量为零
	let user = await User.findOne({email})
	
	// 用户存在
	if(user){
		if(user.state==1){
			return res.status(400).render('admin/error',{msg:'您的账号未开启后台访问权限',link:'/admin/login'})
		}
		// 将客户端传递过来的密码和用户信息进行比对
		// true 对比成功
		//false 对比失败
		let isValid = await bcrypt.compare(password,user.password)
	
		if(isValid){
			// 密码验证成功
			// 将用户名存储在请求对象中
			// 向session传入数据,方法内部为当前用户生成唯一的sessionId,
			
			// 存储在客户端的cookie中
			req.session.username = user.username
			req.session.role = user.role
			// res.send('登录成功')
			req.app.locals.userInfo = user
			// 对用户的角色进行判断
			if(user.role == 'admin'){
				// 重定向后台管理页面
				return res.redirect('/admin/user?page=1');
			}else{	
				// 重定向到用户列表页面
				return res.redirect('/home/');
				
			} 
			
		}else{
			// 密码验证失败
			return res.status(400).render('admin/error',{msg:'邮箱或者密码错误',link:'/admin/login'})
		}
	}else{
			// 用户不存在
		return res.status(400).render('admin/error',{msg:'邮箱未注册',link:'/admin/login'})
	}
	// res.send(req.body)
}
 