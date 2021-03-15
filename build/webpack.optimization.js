const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
module.exports = {
    usedExports: true, // true: 使用到的导出才使用
    minimize: true,
    runtimeChunk: {
        name: "manifest"
    },
    splitChunks: {
        chunks: 'all',
        minChunks: 2,
        cacheGroups: {
            //把node_modules目录下的代码提出为vendor.js
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendor",
                priority: 10, //设置处理的优先级，数值越大越优先处理
                enforce: true
            }
        }
    },
    minimizer: [
        // 自定义js优化配置，覆盖默认配置
        new UglifyJsPlugin({
            cache: true,
            parallel: 4, // 开启并行压缩，充分利用cpu
            sourceMap: true,
            extractComments: true, // 移除注释
            uglifyOptions: {
                compress: {
                    unused: true,
                    drop_debugger: true,
                    drop_console: true,//console
                    pure_funcs: ['console.log']//移除console
                },
                warnings: false,
                output: {
                    comments: false
                }
            }
        }),
        //优化css
        new CssMinimizerPlugin(),
        //压缩
        new TerserPlugin({
            parallel: true, //并行压缩
            sourceMap: true,
        })
    ]
};
