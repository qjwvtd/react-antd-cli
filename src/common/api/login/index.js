import http from '@/common/http';

/**
 * 获取图形验证码,图片的参数
 * @param "height": 40,
 * @param "key": "string",
 * @param "lineSize": 0,
 * @param "stringNum": 4,
 * @param "width": 100
 * */

export const getImgCode64 = data => http.POST('/api/versatile/v1/verifyCode/base64', data);