const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
        })
    ]
};

module.exports = webpackConfig;
