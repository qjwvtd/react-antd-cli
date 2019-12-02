'use strict';

const path = require('path');
const env = require('./env');
const baseUrl = require('./../package.json').baseUrl;

/**
 *代理跨域
 *同webpack-dev-server的proxy设置一样,
 *axios, fetch, jquery中的请求路径不能拼接root, 不能设置baseUrl地址
 */
const __proxy = {
    //接口根路径
    '/api': {
        //被代理的请求地址
        // target: 'http://192.168.10.3:5005',
        // target: 'http://www-test.dhwork.cn',
        target: baseUrl,
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
function joinName(pathString) {
    return path.join(__dirname.replace('build', pathString)).replace(/\\/g, '/');
}
//src,工作目录
const _src = joinName('src');
//public,开发环境热更新目录
const _public = joinName('public');
//bundle,生产环境构建目录
const _bundle = joinName('bundle');

module.exports = {
    //项目名称
    projectName: '智安汇平台',
    //版本
    version: '1.0.0',
    //入口文件
    entry: _src + '/app.js',
    //主工作目录
    workPath: _src,
    //开发环境
    dev: {
        //输出文件'
        filename: env.dev ? 'static/js/[name].js' : env.prod && 'static/js/[name].[hash:8].js',
        //开发环境代码构建编译目录
        path: path.resolve(__dirname, _public),
        //开发环境热更新目录必须是输出路径的绝对路径
        publicPath: '/',
        //开发环境目录
        sevices: _public,
        //开发环境host
        host: "localhost",
        //开发环境端口
        port: 9000,
        //开启代理
        proxy: __proxy
    },
    //生产环境,打包到根目录的bundle
    prod: {
        //输出文件'
        filename: 'static/js/[name].[hash:8].js',
        //生产环境代码输出目录
        path: path.resolve(__dirname, _bundle)
    }
};