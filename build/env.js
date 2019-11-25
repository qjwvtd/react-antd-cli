console.log('current environment ' + process.env.NODE_ENV);
module.exports = {
    dev: process.env.NODE_ENV === 'development',
    prod: process.env.NODE_ENV === 'production'
};