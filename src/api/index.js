// 当前这个模块：api进行统一管理
import requests from "./requests";   //以/api开头
import mockRequests from './mock'    //以/mock开头
//  http://gmall-h5-api.atguigu.cn
// 三级联动的接口
// /api/product/getBaseCategoryList get  请求无参数
// 对外暴露一个函数，只要外部调用这个函数，就向服务器发送ajax请求，获取咱们的三级菜单数据。当前咱们这个函数只需要把服务器返回结果返回即可
export const reqCategory = () => {
    //箭头函数可以在程序任意地方使用,箭头函数返回即为服务器的数据
    //下面箭头函数返回值：返回的是什么? promise,即为返回服务器的数据
    //return关键字，千万别忘记书写，如果忘记书写，你在任意地方获取的都是undeinfed
    return requests({url: '/product/getBaseCategoryList', method: 'get'});
 }
// 什么是跨域：协议，域名，端口号不同的请求，称之为跨域

// 获取banner（home首页轮播图接口）
export const reqGetBannerList = ()=> mockRequests.get('/banner')

// 获取floor数据
export const reqFloorList = ()=> mockRequests.get('/floor')

// 获取搜索模块数据  请求方式是post
// 当前这个接口（获取搜索模块的数据），给服务器传一个默认的参数（至少是一个空对象）
export const reqGetSearchInfo = (params)=>requests({url:'/list',method:'post',data:params})


// 获取商品详情的数据,这里需要吧skuId带着，让服务器获取ID，然后渲染详情页时
export const  reqDetailList = (skuId)=>requests({url:`/item/${skuId}`,method:'get'});
//加入购物车|将来修改商品个数的接口
export const reqAddOrUpdateCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'});