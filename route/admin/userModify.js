const {User} = require('../../model/user')
const bcrypt = require('bcrypt')
module.exports = async (req,res,next)=>{
	// 接收客户端传来的参数
	const {username,email,role,state,password} = req.body
	// 即将要修改的用户id
	const {id} = req.query
	let user = await User.findOne({_id:id});
    const isVaild=await bcrypt.compare(password,user.password)
	if(username==''&&username.length<2){
		let obj = {path:'/admin/userEdit',message:'用户名不能为空',id:id}
		return next(JSON.stringify(obj))
	}
	if(email==''){
		let obj = {path:'/admin/userEdit',message:'邮箱不能为空',id:id}
		return next(JSON.stringify(obj))
	}
	
	if(isVaild){
		//res.send('密码比对成功')
		// 将用户信息更新到数据库
		await User.updateOne({_id:id},{
			username:username,
			email:email,
			role:role,
			state:state
		})
		// 重定向到用户列表
		res.redirect('/admin/user?page=1')
	}else{
		// res.send('密码比对失败')
		let obj = {path:'/admin/userEdit',message:'密码比对失败,不能进行用户信息修改',id:id}
		next(JSON.stringify(obj))
	}
	// res.send(user)
}