'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackConfig = require('./webpack.config.js');
const optimization = require('./webpack.prod.optimization.js');

//定义环境变量
const defineMyEnv = new webpack.DefinePlugin({
    //使用代理,在http.js中使用这个变量
    'process.env.NODE_PROXY': false,
    'process.env.NODE_ENV': JSON.stringify('production')
});
//清除已经build过的文件
const clearFiles = new CleanWebpackPlugin();
//打包环节,配置polyfill
const buildPolyfill = {
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    util: require.resolve("util"),
    os: require.resolve("os-browserify/browser"),
    tty: require.resolve("tty-browserify"),
    buffer: require.resolve("buffer"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    zlib: require.resolve("browserify-zlib")
};
webpackConfig.resolve.fallback = buildPolyfill;
webpackConfig.plugins.push(defineMyEnv);
webpackConfig.plugins.push(clearFiles);

webpackConfig.optimization = optimization;
module.exports = merge(webpackConfig, {
    mode: 'production',
    target: ['web', 'es5'],
    output: {
        // path: path.resolve(__dirname,'./../dist),//default,不需要配置
        filename: 'static/js/[name]_[hash:8].js'
    }
});
