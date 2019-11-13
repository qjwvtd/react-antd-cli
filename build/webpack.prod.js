const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackConfig = require('./webpack.config.js');
const __base = require('./base.config.js');

//构建html
const buildHtml = new HtmlWebpackPlugin({
    title: 'Webpack App',
    hash: false,
    //HtmlWebpackPlugin插件的路径要从项目根目录开始
    favicon: 'public/favicon.ico',
    template: 'build/template.html'
});
//提供代码优化，如压缩、作用域提升等
const defineMyEnv = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
});
//清除已经build过的文件
const clearFiles = new CleanWebpackPlugin([__base.prod.path]);
//监控构建进度
const handler = (percentage, message, ...args) => {
    console.log(parseFloat(percentage.toFixed(2)) * 100 + '%', message);
};
const progress = new webpack.ProgressPlugin(handler);

webpackConfig.plugins.push(buildHtml);
webpackConfig.plugins.push(defineMyEnv);
webpackConfig.plugins.push(clearFiles);
webpackConfig.plugins.push(progress);

webpackConfig.optimization = {
    minimize: true,
    runtimeChunk: {
        name: "manifest"
    },
    splitChunks: {
        chunks: 'all',
        cacheGroups: {
            common: {
                // test: /[\\/]src[\\/]/,把src目录下的公共JS代码提出为common.js
                name: "common",
                minChunks: 2,
                maxInitialRequests: 5,
                minSize: 0
            },
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendor",
                priority: 10,//设置处理的优先级，数值越大越优先处理
                enforce: true
            }
        }
    },
    minimizer: [
        // 自定义js优化配置，将会覆盖默认配置
        new UglifyJsPlugin({
            cache: true,
            parallel: true, // 开启并行压缩，充分利用cpu
            sourceMap: false,
            extractComments: false, // 移除注释
            uglifyOptions: {
                compress: {
                    unused: true,
                    warnings: false,
                    drop_debugger: true
                },
                output: {
                    comments: false
                }
            }
        }),
        // 用于优化css文件
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessorOptions: {
                safe: true,
                autoprefixer: { disable: true }, //这里注意下!!!!!
                mergeLonghand: false,
                discardComments: {
                    removeAll: true // 移除注释
                }
            },
            canPrint: true
        })
    ]
};
module.exports = merge(webpackConfig, {
    mode: 'production',
    output: __base.prod
    // devtool: 'cheap-module-source-map'
});
