const path = require('path');

//项目根目录
const root = './../';

module.exports = {
    //入口文件
    entry: root + 'src/index.js',
    //开发环境目录
    sevices: root + 'public',
    //主工作目录
    workPath: root + 'src',
    //eslint
    eslintrc: root + '.eslintrc',
    //开发环境
    dev: {
        filename: '[name].js',
        //开发环境代码构建编译目录
        path: path.resolve(__dirname, root + 'public'),
        //开发环境热更新目录必须是输出路径的绝对路径
        publicPath: '/'
    },
    //生产环境,打包到根目录的bundle
    prod: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, root + 'bundle')
    }
};