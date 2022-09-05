// 对于axios进行二次封装
import axios from "axios"
// 引入进度条
import nprogress from "nprogress";
// 引入进度条的样式
import "nprogress/nprogress.css"
// start :进度条开始  done：进度条结束
// 1.利用axios对象的方法create，去创建一个axios实例
// 2.request就是axios，只不过稍微配置了一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求时，路径当中会出现api
    baseURL: "/mock",
    // 代表请求超时的时间5s
    timeout: 5000
});
// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    // 进度开始
    nprogress.start();
// config:配置对象，对象里面有个属性很重要，header请求头
return config;
})
// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 进度条结束
    nprogress.done()
    // 成功的回调函数，服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    return res.data;
},(err)=>{
    // 服务器响应失败的回调函数
    // 下面是终止promise链
    //温馨提示:某一天发请求,请求失败,请求失败的信息打印出来
    alert(err.message);
    //终止Promise链
    return new Promise();
})
export default requests