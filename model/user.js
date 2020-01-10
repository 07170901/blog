// 创建用户集合
// 引用mongoose第三方模块
const mongoose = require('mongoose')

// 导入bcrypt
 const bcrypt = require('bcrypt')
 
 // 引入joi模块
 const Joi = require('joi');

// 创建用户集合规则
const userSchema = new mongoose.Schema({
	// 昵称
	username:{
		type:String,
		required:true,
		minlength:2,
		maxlength:20
	},
	// 邮箱
	email:{
		type:String,
		// 保证邮箱地址在插入数据库时不重复
		unique:true,
		required:true
	},
	// 密码
	password:{
		type:String,
		required:true
	},
	// 角色
	// admin 超级管理员
	// normal 普通成员
	role:{
		type:String,
		required:true
	},
	// 0=>启用状态,1=>禁用
	state:{
		type:Number,
		default:0
	}
})

// 创建集合
const User = mongoose.model('User',userSchema);

// async function createUser(){
// 	const salt = await bcrypt.genSalt(10);
// 	const pass = await bcrypt.hash('123456',salt);
// 	const user = await User.create({
// 		username:'weige',
// 		email:'321801@qq.com',
// 		password:pass,
// 		role:'admin',
// 		state:0
// 	})
// }
// createUser()

// 验证用户信息
const validataUser = user=>{
	// 定义对象的验证规则
	const schema = {
		username:Joi.string().required().min(2).max(12).error(new Error('用户名不符合验证规则')),
		email:Joi.string().required().email().error(new Error('邮箱格式不符合要求')),
		password:Joi.string().required().regex(/^[a-zA-Z0-9]{3,30}$/).error(new Error('密码格式不符合要求')),
		role:Joi.string().valid('normal','admin').required().error(new Error('角色值非法')),
		state:Joi.number().valid(0,1).required().error(new Error('状态值非法'))
	};
	// 实施验证
	return Joi.validate(user,schema)
}


// 将用户集合作为模块成员导出去
module.exports = {
	User,
	validataUser
}