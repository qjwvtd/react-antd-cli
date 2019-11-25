'use strict';

const path = require('path');
const env = require('./env');

//项目根目录
const root = path.join(__dirname, './../');

/**
 *代理跨域
 *同webpack-dev-server的proxy设置一样,
 *axios, fetch, jquery中的请求路径不能拼接root, 不能设置baseUrl地址
 */
const __proxy = {
    //接口根路径
    '/api': {
        //被代理的请求地址
        target: 'http://192.168.10.3:5005',
        //跨域
        changeOrigin: true,
        //如果是https，会有安全校验，设置secure为false
        secure: true,
        //重写根路径
        pathRewrite: {
            '^/api': '/api'
        }
    }
};


module.exports = {
    //配置项目名称
    projectName: '智安汇平台',
    //版本
    version: '1.1.0',
    //入口文件
    entry: root + 'src/app.js',
    //主工作目录
    workPath: root + 'src',
    //开发环境
    dev: {
        //输出文件'[name].js'
        filename: env.dev ? 'static/js/[name].js' : env.prod && 'static/js/[name].[hash:8].js',
        //开发环境代码构建编译目录
        path: path.resolve(__dirname, root + 'public'),
        //开发环境热更新目录必须是输出路径的绝对路径
        publicPath: '/',
        //开发环境目录
        sevices: root + 'public',
        //开发环境host
        host: "localhost",
        //开发环境端口
        port: 9000,
        //开启代理
        proxy: __proxy
    },
    //生产环境,打包到根目录的bundle
    prod: {
        //输出文件'[name].[hash].js'
        filename: 'static/js/[name].[hash:8].js',
        //生产环境代码输出目录
        path: path.resolve(__dirname, root + 'bundle')
    }
};