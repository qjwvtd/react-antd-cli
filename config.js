const path = require('path');
const packJson = require('./package.json');
//接口请求地址
const baseUrl = "https://saas-dev.dhwork.cn";
module.exports = {
    name: '智安汇运营后台',
    version: packJson.version,
    baseUrl: baseUrl,
    src: path.resolve(__dirname, 'src'),
    //开发环境配置,同webpack配置一样
    dev: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
        host: "localhost",
        port: 2333,
        proxy: {
            /*代理跨域,*同webpack-dev-server的proxy设置一样,axios, fetch, jquery中的请求路径不能拼接root, 不能设置baseUrl地址*/
            '/api': {
                target: baseUrl, //被代理的请求地址
                changeOrigin: true, //跨域
                secure: true, //如果是https，会有安全校验，设置secure为false
                pathRewrite: { '^/api': '/api' }//重写根路径
            }
        }
    },
    //同webpack
    alias: {
        '@': path.join(__dirname, 'src')
    }
};
