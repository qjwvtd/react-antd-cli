//接口白名单,不需要传token的接口
module.exports = [
    '/api/versatile/v1/verifyCode/base64',
    '/api/authentication/v1/authorize/mobile',
    '/api/authentication/v1/authorize/sms',
    '/api/versatile/v1/sms/register',
    '/api/versatile/v1/sms/reset',
    '/api/account/v1/user/fpw'
];