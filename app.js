//  引用 express
const express = require('express');

// 引用body-parser模块
const bodyParser = require('body-parser')

// 引用express-session模块
const session = require('express-session')

// 创建网站服务器
const app = express();

// 导入dateformate模块 时间
const dateFormat = require('dateformat')

// 导入morgan 这个第三方模块
const morgan = require('morgan')

// 导入config 模块
const config = require('config')

// 导入art-template 模块
const template = require('art-template')

// 数据库连接
require('./model/connect')

// 处理post请求的参数
app.use(bodyParser.urlencoded({extended:false}))

app.use(session({
	secret:'secret key',
	// true:不管登不登录给个初始化cookie
	saveUninitialized:false,
	// 过期时间
	cookie:{
		maxAge:24*60*60*1000
	}
	}))

// require('./model/user.js')

// 处理路径
const path = require('path');

// 开放静态资源文件
// 接受静态目录
app.use(express.static(path.join(__dirname,'public')));

console.log(config.get('title'))
// 获取系统环境变量,返回值
//console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV=='development'){
	// 当前是开发环境
	console.log("当前是开发环境")
	// 在开发环境中  将客户端发送到服务器端的请求信息打印到控制台中
	app.use(morgan('dev'))
}else{
	// 当前是生产环境
	console.log("当前是生产环境")
}

// 告诉express框架模板所在位置
// 参数一固定,模板的绝对路径
app.set('views',path.join(__dirname,'views'))

// 告诉express框架的默认后缀,后缀为art
app.set('view engine','art')

// 当渲染模板后缀为art的模板时,所使用的模板引擎是什么
app.engine('art',require('express-art-template'));

// 模板内部导入方法
template.defaults.imports.dateFormat = dateFormat

 // 引入路由模块
 const home =  require('./route/home.js');
 const admin =  require('./route/admin.js');
 
// 拦截请求,判断用户的登录状态
app.use('/admin',require('./middleware/loginGuard.js'))

// 为路由匹配请求路径
app.use('/home',home);
app.use('/admin',admin);

app.use((err,req,res,next)=>{
	// 将字符串类型转换为对象类型
	// JSON.parse()
	const result = JSON.parse(err);
	let str = [];
	for(let attr in result){
		if(attr != path){
			str.push(attr+'='+result[attr])	
		}
	}
	 res.redirect(`${result.path}?${str.join('&')}`)
})

// 监听端口
app.listen(8888);
console.log('网站服务器启动成功,请访问localhost:8888');