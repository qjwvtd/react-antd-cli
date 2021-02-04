'use strict';

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const os = require('os');
const HappyPack = require('happypack');
const happThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const base = require('./base.config.js');
const __rules = require('./loaders');

const env = require('./env');

function chunkCssPath() {
    let fileName = '', chunkFileName = '';
    switch (env.current) {
        case 'development':
            fileName = 'static/css/[name].css';
            chunkFileName = 'static/css/[name]_chunk.css';
            break;
        case 'production':
            fileName = '/static/css/[name]_[hash:8].css';
            chunkFileName = '/static/css/[name]_chunk_[hash:8].css';
            break;
    }
    return { filename: fileName, chunkFilename: chunkFileName };
}

const webpackConfig = {
    entry: { 'index': path.resolve(__dirname, base.entry) },
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
        //eslint
        new ESLintPlugin(),
        //处理.css文件
        new MiniCssExtractPlugin({
            filename: chunkCssPath().filename,
            chunkFilename: chunkCssPath().chunkFilename,
            ignoreOrder: true //移除样式文件引用顺序不对导致的警告
        }),
        //构建html
        new HtmlWebpackPlugin({
            title: base.name + base.version,
            minify: {
                // 移除HTML中的注释
                removeComments: true,
                // 压缩内联css
                minifyCSS: true
            },
            //HtmlWebpackPlugin插件的路径要从项目根目录开始
            favicon: base.dev.path + '/favicon.ico',
            template: base.dev.path + '/index.html'
        }),
        //加快构建速度
        new HappyPack({
            id: 'happyBabel',
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happThreadPool,
            //允许 HappyPack 输出日志
            verbose: true
        })
        //监控进度
        // new webpack.ProgressPlugin((percentage, message, ...args) => {
        // console.log(parseFloat(percentage.toFixed(2)) * 100 + '%', message);
        // })

    ],
    stats: { children: false }
};

module.exports = webpackConfig;
