// 引用express框架
const express = require('express');

// 创建博客展示页面路由
const home = express.Router();

// 博客前台首页展示页面
home.get('/',require('./home/index.js'));

// 博客前台文章详情展示
home.get('/article',require('./home/article.js'));

// 博客评论
home.post('/comment',require('./home/comment.js'));


// 实现退出功能
home.get('/logout',require('./home/logout.js'));

// 将路由对象作为模块成员进行导出
module.exports=home;