const path = require('path');

//项目根目录
const root = './../';

module.exports = {
    //入口文件
    entry: root + 'src/index.js',
    //开发环境目录
    sevices: root + 'public',
    //开发环境host
    host: "localhost",
    //开发环境端口
    port: 9000,
    //主工作目录
    workPath: root + 'src',
    //开发环境
    dev: {
        //输出文件
        filename: '[name].js',
        //开发环境代码构建编译目录
        path: path.resolve(__dirname, root + 'public'),
        //开发环境热更新目录必须是输出路径的绝对路径
        publicPath: '/'
    },
    //生产环境,打包到根目录的bundle
    prod: {
        //输出文件
        filename: '[name].[hash].js',
        //生产环境代码输出目录
        path: path.resolve(__dirname, root + 'bundle')
    },
    //代理跨域,同webpack-dev-server的proxy设置,
    //axios/fetch/jquery中的请求路径不能拼接root,不能设置baseUrl地址
    proxy: {
        //接口根路径
        '/api': {
            target: 'http://192.168.10.3:5005', //请求root
            changeOrigin: true,
            //如果是https，会有安全校验，设置secure为false
            secure: true,
            //重写根路径
            pathRewrite: {
                '^/api': '/api'
            }
        }
    }
};