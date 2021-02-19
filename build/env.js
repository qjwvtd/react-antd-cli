console.log(process.env.NODE_ENV + ' starting...,更多内容请到 https://github.com/qjwvtd 查看');
module.exports = {
    dev: process.env.NODE_ENV === 'development',
    prod: process.env.NODE_ENV === 'production',
    current: process.env.NODE_ENV
};
