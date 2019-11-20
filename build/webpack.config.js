const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const __base = require('./base.config.js');
const __rules = require('./loaders');

const webpackConfig = {
    entry: { 'index': path.resolve(__dirname, __base.entry) },
    module: {
        rules: __rules
    },
    // externals: {
    //     "react": "react",
    //     "react-dom": "react-dom"
    // },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.less'],
        alias: {
            '@': path.join(__dirname, './../src')
        }
    },
    plugins: [
        //处理.css文件
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "version.[id].0.css"
        }),
        //构建html
        new HtmlWebpackPlugin({
            title: '运营后台',
            minify: {
                // 移除HTML中的注释
                removeComments: true,
                // 压缩内联css
                minifyCSS: true
            },
            //HtmlWebpackPlugin插件的路径要从项目根目录开始
            favicon: path.resolve(__dirname, './../public/favicon.ico'),
            template: path.resolve(__dirname, './../public/index.html')
        }),
        //监控进度
        new webpack.ProgressPlugin((percentage, message, ...args) => {
            console.log(parseFloat(percentage.toFixed(2)) * 100 + '%', message);
        })
    ]
};

module.exports = webpackConfig;
