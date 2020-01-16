import http from '@/common/http';
import { getUUid } from '@/common/utils';
const server = require('@/common/api');

//登录令牌
export const LOGINSECRET = {
    id: 'web',
    secret: 'sKuBjFlMsUiPsKlO',
    wxAppid: 'wx4a11ae335e843db1',
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
export const getImgCode64 = data => http.POST(server.versatile + '/verifyCode/base64', data);
//手机号和密码登录
export const loginWithMobilePassword = data => http.POST(server.authentication + '/authorize/mobile', data);