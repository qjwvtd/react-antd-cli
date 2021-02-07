##### React + mobx + antd + less预处理器脚手架
<h1><a id="user-content-react-----" class="anchor" aria-hidden="true" href="#react-----"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a><a href="https://github.com/qjwvtd/react-antd-cli" rel="nofollow">React-Antd-Cli</a> · <a href="https://github.com/facebook/react/blob/master/LICENSE"><img src="https://camo.githubusercontent.com/890acbdcb87868b382af9a4b1fac507b9659d9bf/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d626c75652e737667" alt="GitHub license" data-canonical-src="https://img.shields.io/badge/license-MIT-blue.svg" style="max-width:100%;"></a> <a href="https://www.npmjs.com/package/react" rel="nofollow"><img src="https://camo.githubusercontent.com/ecb8a503e646dc22ccb59b73ba287c5229580f49/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f72656163742e7376673f7374796c653d666c6174" alt="npm version" data-canonical-src="https://img.shields.io/npm/v/react.svg?style=flat" style="max-width:100%;"></a> <a href="https://circleci.com/gh/facebook/react" rel="nofollow"><img src="https://camo.githubusercontent.com/bfd84ed5d0e5c8d97aea6d7a83aed84ba1a0b191/68747470733a2f2f636972636c6563692e636f6d2f67682f66616365626f6f6b2f72656163742e7376673f7374796c653d736869656c6426636972636c652d746f6b656e3d3a636972636c652d746f6b656e" alt="CircleCI Status" data-canonical-src="https://circleci.com/gh/facebook/react.svg?style=shield&amp;circle-token=:circle-token" style="max-width:100%;"></a> <a href="https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request" rel="nofollow"><img src="https://camo.githubusercontent.com/d4e0f63e9613ee474a7dfdc23c240b9795712c96/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5052732d77656c636f6d652d627269676874677265656e2e737667" alt="PRs Welcome" data-canonical-src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" style="max-width:100%;"></a></h1>

###脚手架使用了webpack5,不支持node10以下版本

###项目结构：

```
+build : webpack 配置目录

+public : 热更新目录

+src : 工作目录

    +common : 公共库,JS,接口, 工具类,store等

    +assets : 静态资源,图片,CSS,字体文件等,使用less作为CSS预处理语言

    +view : 源文件目录
```

##--------------华丽的分界线--------------

##脚手架演示：

###安装
```
*npm install
```

###开发环境开启本地服务
```
*npm start
```

###开发过程中手动一键修复错误
```
*npm run lint
```

###生产环境打包构建
```
*npm run build
```

###访问
```
*http://localhost:2333
```

###部署,测试
```

#1,修改package.json文件中的baseUrl的接口请求地址

#2,npm install

#3,npm run build

#4,将构建产生的bundle目录发布

```
