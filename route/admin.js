// 引用express框架
const express = require('express');

// 创建博客管理页面路由
const admin = express.Router();

// 创建登录路由
admin.get('/login',require('./admin/loginPage.js'));

// 创建注册路由
admin.get('/register',require('./admin/registerPage.js'))

// 实现注册用户功能路由
admin.post('/register',require('./admin/register.js'))

// 实现登录功能
admin.post('/login',require('./admin/login.js'));

// 创建用户列表路由
admin.get('/user',require('./admin/userPage.js'));

// 创建新增用户列表路由
admin.get('/userEdit',require('./admin/userEditPage.js'));

// 实现新增用户列表功能路由
admin.post('/userEdit',require('./admin/userEdit.js'));

// 实现修改用户信息功能路由
admin.post('/user-modify',require('./admin/userModify.js'));

// 实现修改文章信息功能路由
admin.post('/article-update',require('./admin/articleUpdate.js'));

// 实现删除用户信息功能路由
admin.get('/deleteuser',require('./admin/deleteuser.js'));

// 实现删除文章功能路由
admin.get('/deletearticle',require('./admin/deletearticle.js'));

// 实现文章列表页面路由
admin.get('/article',require('./admin/articlePage.js'));

// 实现文章编辑页面路由
admin.get('/article-edit',require('./admin/article-editPage.js'));

// 实现文章编辑页面功能路由
admin.post('/article-edit',require('./admin/article-edit.js'));

// 实现退出功能
admin.get('/logout',require('./admin/logout.js'));

// 将路由对象作为模块成员进行导出
module.exports=admin;