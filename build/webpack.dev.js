const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config.js');
const __base = require('./base.config.js');

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
    output: __base.dev,
    cache: true,
    devtool: 'cheap-module-eval-source-map', //'inline-source-map'
    devServer: {
        contentBase: path.join(__dirname, __base.sevices), //定位静态服务到index.html
        open: false, //是否自动打开浏览器
        host: __base.host, //默认localhost
        port: __base.port,
        compress: true, //虚拟服务代码压缩,加快开发流程和优化
        hot: true, //true,webpack4会自动添加HMR插件
        historyApiFallback: true, //保证BrowserRouter刷新不丢失
        proxy: __base.proxy
    }
});
