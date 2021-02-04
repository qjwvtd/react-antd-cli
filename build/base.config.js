'use strict';

const config = require('./../config.js');

if (!config.prod) {
    config.prod = {};
}
//静态资源都打包到static
config.dev.filename = 'static/js/[name].js';
config.prod.path = config.dist;
config.prod.filename = 'static/js/[name]_[hash:8].js';

module.exports = { ...config };
