//api
export function initData(callback) {
    const arr = [
        { date: '2016/06/12', name: '张三', dept: '组织部', takenum: 2, takeTimenum: '36分钟', woffnum: '5次' },
        { date: '2016/06/12', name: '李四', dept: '经管部', takenum: 3, takeTimenum: '36分钟', woffnum: '5次' },
        { date: '2016/06/12', name: '陈五', dept: '经管部', takenum: 4, takeTimenum: '36分钟', woffnum: '5次' }
    ];
    callback(arr);
}
