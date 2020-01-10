// 定义对象的验证规则
const schema = {
	username:Joi.string().required().min(2).max(5).error(new Error('username没有通过验证')),
	
};

// 异步函数
async function run(){
	try{
		// 实施验证
		await Joi.validate({username:'2'},schema);
	}catch(e){
		console.log(e.message)
		return
	}
	console.log('验证通过')
}
run()