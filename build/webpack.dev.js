'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config.js');
const base = require('./base.config.js');

//定义环境变量
const defineMyEnv = new webpack.DefinePlugin({
    //使用代理,在http.js中使用这个变量
    'process.env.NODE_PROXY': true,
    'process.env.NODE_ENV': JSON.stringify('development')
});

//添加热插播
const hotUpdate = new webpack.HotModuleReplacementPlugin();

webpackConfig.plugins.push(defineMyEnv);
webpackConfig.plugins.push(hotUpdate);
module.exports = merge(webpackConfig, {
    mode: 'development',
    output: {
        //输出文件
        filename: base.dev.filename,
        //开发环境代码构建编译目录
        path: base.dev.path,
        //开发环境热更新目录必须是输出路径的绝对路径
        publicPath: base.dev.publicPath
    },
    cache: true,
    devtool: 'cheap-module-eval-source-map', //'inline-source-map'
    devServer: {
        contentBase: path.join(__dirname, base.dev.sevices), //定位静态服务到index.html
        open: false, //是否自动打开浏览器
        host: base.dev.host || 'localhost', //默认localhost
        port: base.dev.port || '3000', //默认3000
        compress: true, //虚拟服务代码压缩,加快开发流程和优化
        hot: true, //true,webpack4会自动添加HMR插件
        historyApiFallback: true, //保证Router刷新不丢失
        proxy: base.dev.proxy
    }
});
