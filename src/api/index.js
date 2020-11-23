
import ajax from './ajax';
import jsonp from 'jsonp'
import {message} from 'antd'

export const reqLogin = (username, password) => ajax('/login',{username,password},'POST')

/**
 * 获取商品一级分类/二级分类列表
 */
export const reqCategorys = (parentId) =>ajax('/manage/category/list',{parentId})

// 修改商品分类
export const reqUpdateCategory = (categoryId,categoryName) => ajax('/manage/category/update',{categoryId,categoryName},'POST')

// 添加商品分类
export const reqAddCategory = (parentId,categoryName)=> ajax('/manage/category/add',{parentId,categoryName},'POST')
// 获取商品管理信息
export const reqProducts = (pageNum,pageSize)=>ajax('/manage/product/list',{pageNum,pageSize})

// 获取商品的搜索结果, searchType：搜索的类型，productName/ProductDesc
// export const reqSearchProducts = ({pageNum,pageSize,searchName,searchType})=>ajax("/manage/product/search",
//     {
//         pageNum,
//         pageSize,
//         [searchType]:searchName,
//     })
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax('/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: searchName,
    })

// 获取一个分类
export const reqCategory = (categoryId) => ajax('/manage/category/info', {categoryId})

// 更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId, status) => ajax('/manage/product/updateStatus', {productId, status}, 'POST')

// 删除图片
export const reqDeleteImg = (name)=>ajax('/manage/img/delete',{name},'POST')
// 添加或者更新product信息,一定要加上（）,否则会报错
export const reqAddOrUpdateProduct = (product) => ajax('/manage/product/' + ( product._id?'update':'add'), product, 'POST')

// 获取用户角色列表
export const reqRoles = ()=>ajax('/manage/role/list')

// 添加用户角色列表
export const reqAddRole = (roleName)=>ajax('/manage/role/add',{roleName},'POST')

// 更新用户角色列表
export const reqUpdateRole = (role)=>ajax('/manage/role/update',role,'POST')
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