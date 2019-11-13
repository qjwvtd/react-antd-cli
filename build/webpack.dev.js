const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config.js');
const __base = require('./base.config.js');

//添加热插播
const hotUpdate = new webpack.HotModuleReplacementPlugin();
webpackConfig.plugins.push(hotUpdate);
module.exports = merge(webpackConfig, {
    mode: 'development',
    output: __base.dev,
    cache: true,
    devtool: 'cheap-module-eval-source-map',//'inline-source-map'
    devServer: {
        contentBase: path.join(__dirname, __base.sevices),//定位静态服务到index.html
        open: false, //是否自动打开浏览器
        host: 'localhost',//默认localhost
        port: 9000,
        compress: true,//虚拟服务代码压缩,加快开发流程和优化
        hot: true,//true,webpack4会自动添加HMR插件
        historyApiFallback: true, //保证BrowserRouter刷新不丢失
        //代理跨域,请求路径不能拼接root,axios/fetch/jquery，不能设置baseUrl地址
        proxy: {
            //接口根路径
            '/api': {
                target: 'http://192.168.10.3:5005',//请求root
                changeOrigin: true,
                //如果是https，会有安全校验，设置secure为false
                secure: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    }
});
