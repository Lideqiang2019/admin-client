
import ajax from './ajax';
import jsonp from 'jsonp'
import {message} from 'antd'

export const reqLogin = (username, password) => ajax('/login',{username,password},'POST')

/**
 * json请求的接口函数
 */
export const reqWeather = (city)=>{
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    return new Promise((resolve,reject)=>{
        jsonp(url,{},(err,data)=>{
            // console.log("data",data)
            if(!err && data.status==='success'){
                // 如果请求成功，则取出所需要的天气信息
                const {dayPictureUrl,weather} = data.results[0].weather_data[0]
                resolve({dayPictureUrl,weather})
            }else{
                // 提示错误信息
                message.error("天气获取失败！")
            }
        })
    })
    
}

// reqWeather('北京')