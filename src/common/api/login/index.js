import http from '@/common/http';
import { getUUid } from '@/common/utils';

//登录令牌
export const LOGINSECRET = {
    id: 'web',
    secret: 'sKuBjFlMsUiPsKlO',
    key: getUUid()
};

/**
 * 获取图形验证码,图片的参数
 * @param "height": 40,
 * @param "key": "string",
 * @param "lineSize": 0,
 * @param "stringNum": 4,
 * @param "width": 100
 * */

export const getImgCode64 = data => http.POST('/api/versatile/v1/verifyCode/base64', data);
//手机号和密码登录
export const loginWithMobilePassword = data => http.POST('/api/authentication/v1/authorize/mobile', data);
// 手机短信登录
export const loginWithMobileNote = data => http.POST('/api/authentication/v1/authorize/sms', data);
// 发送短信验证码(手机注册)
export const sendSMSVerificationCode = data => http.POST('/api/versatile/v1/sms/register', data);
// 发送短信验证码(已注册重置密码)
export const sendResetSMSVerificationCode = data => http.POST('/api/versatile/v1/sms/reset', data);
//登录界面的忘记密码,用于修改密码,传短信,密码,手机
export const updatePassword = data => http.PUT('/api/account/v1/user/fpw', data);
