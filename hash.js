// 导入bcrypt
 const bcrypt = require('bcrypt')
 
 async function run(){
	//生成随机字符串
	// genSalt方法接收一个数值作为参数
	// 当数值越大,生成的随机字符复杂程度越大
	// 当数值越小,生成的随机字符复杂程度约小
	// 默认值是10
	let salt = await bcrypt.genSalt(10)
	// 对密码进行加密
	// 1.要进行加密的明文
	// 2.随机字符串
	// 返回值是加密后的密码
	let result = await bcrypt.hash('123456',salt)
 }
 run()
