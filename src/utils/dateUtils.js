// 时间格式化函数
export function formateTime(time){
    // 如果没有初始化值，返回空串
    if(!time){
        return ''
    }
    let date = new Date(time)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' +
        date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}