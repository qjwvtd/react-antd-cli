'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const webpackConfig = require('./webpack.common.js');
const base = require('./../config.js');

//定义环境变量
const defineMyEnv = new webpack.DefinePlugin({
    //使用代理,在http.js中使用这个变量
    'process.env.NODE_PROXY': true,
    'process.env.NODE_ENV': JSON.stringify('development')
});
//输出控制台美化
const friendConsolePlugin = new FriendlyErrorsWebpackPlugin();

//添加热插播
const hotUpdate = new webpack.HotModuleReplacementPlugin();

webpackConfig.plugins.push(defineMyEnv);
webpackConfig.plugins.push(hotUpdate);
webpackConfig.plugins.push(friendConsolePlugin);

if (!base.dev || Object.keys(base.dev).length === 0) {
    throw '致命错误,开发环境没有配置';
}
module.exports = merge(webpackConfig, {
    mode: 'development',
    output: {
        //输出文件
        filename: 'static/js/[name].js',
        //开发环境代码构建编译目录
        path: base.dev.path,
        //开发环境热更新目录必须是输出路径的绝对路径
        publicPath: base.dev.publicPath
    },
    cache: true,
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, base.dev.path), //定位静态服务到index.html
        open: false, //是否自动打开浏览器
        host: base.dev.host || 'localhost', //默认localhost
        port: base.dev.port || '3000', //默认3000
        compress: true, //虚拟服务代码压缩,加快开发流程和优化
        hot: true, //true,webpack4会自动添加HMR插件
        historyApiFallback: true, //保证Router刷新不丢失
        headers: { 'Access-Control-Allow-Origin': '*' },// 允许开发服务器访问本地服务器的包JSON文件，防止跨域
        proxy: base.dev.proxy || {}
    }
});
