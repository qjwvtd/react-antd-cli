'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackConfig = require('./webpack.config.js');
const optimization = require('./optimization.js');
const base = require('./../config.js');

//定义环境变量
const defineMyEnv = new webpack.DefinePlugin({
    //使用代理,在http.js中使用这个变量
    'process.env.NODE_PROXY': false,
    'process.env.NODE_ENV': JSON.stringify('production')
});
//清除已经build过的文件
const clearFiles = new CleanWebpackPlugin();

webpackConfig.plugins.push(defineMyEnv);
webpackConfig.plugins.push(clearFiles);

webpackConfig.optimization = optimization;
module.exports = merge(webpackConfig, {
    mode: 'production',
    output: {
        path: base.dist,
        filename: 'static/js/[name]_[hash:8].js'
    }
});
