const {User} = require('../../model/user.js')

module.exports = async (req,res)=>{
	// 一般挂载在url地址中的(?以后)的都存储在req.query
	const {message,id} = req.query
	// 判断id是否存在值
	if(id){
		// 存在则是修改页面
		let user = await User.findOne({_id:id})
		res.render('admin/user-edit',{
			message:message,
			user:user,
			link:'/admin/user-modify?id='+id,
			button:'修改'
		})
	}else{
		// 不存在则是新增页面
		res.render('admin/user-edit',{
			message:message,
			link:'/admin/userEdit',
			button:'添加'
	})
	}
	
	
}