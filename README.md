#####新版本智安汇Web

[![react version](https://www.npmjs.com/package/react)]
[![react-dom version](https://www.npmjs.com/package/react-dom)]

###项目结构：

+build : webpack 配置目录

+public : 编译，构建，热更新

+src : 工作目录

    +common : 公共库,JS,接口, 工具类,store等

    +static : 静态资源,图片,CSS,字体文件等

    +view : 源文件目录


##--------------华丽的分界线--------------

##脚手架演示：

###安装
```javascript
*npm install
```

###开发环境开启本地服务
```javascript
*npm start
```

###开发过程中手动一键修复错误
```javascript
*npm run lint
```

###生产环境打包构建
```javascript
*npm run build
```

###访问
```javascript
*http://localhost:9000
```

###部署,测试
```javascript

##测试环境部署步骤

*1,修改package.json文件中的baseUrl为dev接口请求地址

*2,npm install

*3,npm run dev:test

*4,http:localhost:9000

##生产环境部署步骤

*1,修改package.json文件中的baseUrl为prod接口请求地址

*2,npm install

*3,npm run build

*4,npm run build:test

*5,http:localhost:3000

```