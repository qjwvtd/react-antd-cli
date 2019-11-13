/**
 * 配置loaders
 */
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseConfig = require('./base.config');
//工作空间
const __include__dirname = path.resolve(__dirname, baseConfig.workPath);
const babelLoader = {
    test: /\.(js|jsx)$/,
    use: { loader: 'babel-loader', options: { presets: ['env', 'react', 'stage-0'] } },
    include: __include__dirname,
    exclude: /node_modules/
};
const esLintLoader = {
    test: /\.(js|jsx)$/,
    use: [{
        loader: 'eslint-loader',
        options: { // 这里的配置项参数将会被传递到 eslint的CLIEngine
            formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
        }
    }],
    enforce: "pre", // 编译前检查
    include: __include__dirname,
    exclude: /node_modules/
};
const cssLoader = {
    test: /\.css$/,
    use: ['style-loader', "css-loader"],
    include: __include__dirname,
    exclude: /node_modules/
};
const lessLoader = {
    test: /\.less$/,
    use: [
        MiniCssExtractPlugin.loader,
        { loader: 'css-loader' },
        { loader: 'less-loader' }
    ],
    include: __include__dirname,
    exclude: /node_modules/
};
const sassLoader = {
    test: /\.scss$/,
    use: ["css-loader", "sass-loader"],
    include: __include__dirname,
    exclude: /node_modules/
};
const urlLoader = {
    test: /\.(png|jpg|gif)$/,
    use: [{ loader: 'url-loader', options: { limit: 128, name: 'img/[name][hash:8].[ext]' } }],
    include: __include__dirname,
    exclude: /node_modules/
};
const fileLoader = {
    test: /\.(eot|svg|ttf|woff|woff2)/,
    use: [{ loader: 'file-loader', options: { limit: 128, name: 'fonts/[name][hash:8].[ext]' } }],
    include: __include__dirname,
    exclude: /node_modules/
};
module.exports = [
    babelLoader, esLintLoader, cssLoader, lessLoader, sassLoader, urlLoader, fileLoader
];