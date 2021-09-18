## react + react hooks + express + mongoDB

> 一个简洁的个人博客系统、即插即用，如果你想使用这个博客、动动手改改配置即可使用！！

- 前后台分离式开发（项目中也包含博客的后台管理系统），为了方便记录后端开发过程，笔者将后端也一起放在同个项目文件夹中。
- 博客样式几乎借助于 `antd` 这个优秀的 UI 框架，主打简约风格。
- 具备了代码高亮、权限管理、第三方 `github` 登录、点赞评论转发、文章管理、用户管理功能的个人博客...
- 用户权限分离,对游客,注册用户,管理员授予不同权限


* 我的博客地址: [Cola639的博客](http://www.gzgxh.top)



### 实现功能

- [x] 前台：主页 + 列表页 + 搜索页 + 分类页 + 标签页
- [x] 后台：文章管理 + 用户管理
- [x] 用户：站内用户、`github` 第三方授权登录的用户
- [x] 用户可以评论与回复,支持嵌套回复


### 技术栈

- 前端 （基于 `create-react-app eject` 后的配置）

  - `react ^17.0.2` `hooks` + `redux` + `react-router4`
  - `marked highlight.js`
  - `webpack` 打包优化
  - `axios` 封装

- 后端 （自构建后台项目）
  - `express` + `cors`
  - `mongoose` + `mongoDB`
  - `jwt` + `bcrypt`
  - `joi`
  - `axios` + `multer`


## 项目结构

### 目录结构

```js

│                            
├─config                // 构建配置
├─public                // html 入口
├─scripts               // 项目脚本
└─server                // 后端
    ├─config            // 项目配置 port、database、github参数 等等
    ├─middlewares       // 中间件
    ├─models            // 数据库模型
    ├─public             //存放静态图片
    ├─routes            // 路由
    ├─uploads            // 缓存静态数据
    ├─utils             // 工具包
    ├─index.js          // 后端主入口文件
    └─...
│
└─src                   // 前端项目源码
   ├─assets             // 静态文件
   ├─components         // 页面组件
   ├─context            // hooks Context全局数据
   ├─hoc            	// 高阶组件
   ├─reducer            // hooks reducer数据管理
   ├─route	        // 路由懒加载,路由守卫
   ├─services           // http网络服务
   ├─utils              // 工具包
   ├─  App.js           // 路由配置
   ├─  index.js         // 主入口文件
   └─...

```


