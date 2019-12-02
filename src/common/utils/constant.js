//项目所有常量
export default {
    //正则
    reg: {
        //用户名
        name: /^\w{1,20}|[\u4e00-\u9fa5]+$/,
        //手机
        mobile: /^1(3|4|5|6|7|8|9)\d{9}$/,
        //密码
        password: /^\w{8,12}$/,
        //图形验证码
        verfiyCode: /^\w{4}$/,
        //短信码
        note: /^\d{4}$/,
        //正整数和负整数
        altitude: /^(-([1-9]|[1-9][0-9])*)|([1-9]|[1-9][0-9]*)$/
    },
    //storage
    storage: {
        currentProjectId: 'currentProjectId'
    }
};