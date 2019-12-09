#####新版本智安汇Web
[![react version](https://img.shields.io/npm/v/react.svg?style=flat)]
[![react-dom version](https://img.shields.io/npm/v/react-dom.svg?style=flat)]

###项目结构：

```
+build : webpack 配置目录

+public : 编译，构建，热更新

+src : 工作目录

    +common : 公共库,JS,接口, 工具类,store等

    +static : 静态资源,图片,CSS,字体文件等

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
*http://localhost:9000
```

###部署,测试
```

#1,修改package.json文件中的baseUrl的接口请求地址

#2,npm install

#3,npm run build

#4,将构建产生的bundle目录发布

```