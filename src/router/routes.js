import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
// 配置路由信息
export default [
    {
      path:'/detail/:skuId?',
      component:Detail,
      meta:{show:true}
     },
     {
      // path后面的路径是切换路由组件时网址里显示的路径
      path:'/home',
      component:Home,
      meta:{show:true}
     },
     {
      path:'/search/:keyword?',
      name:'search',
      component:Search,
      meta:{show:true},
       // 面试题4：路由组件能不能传递props数据？可以的：三种写法
      //  1.布尔值写法 props：true，可以把params参数作为路由组件身上的属性 props:true,
      // 2.对象写法：额外给路由组件传递一些props参数 props：{a:1,b:2}
      // 3.函数写法：可以拿到params参数，query参数，通过props传递给路由组件
      // props:($route) =>({keyword:$route.params.keyword,k:$route.query.k})
      // 
     },
     {
      path:'/login',
      component:Login,
      meta:{show:false}
     },
     {
      path:'/register',
      component:Register,
      meta:{show:false}
     },
  //    重定向，在项目跑起来的时候，访问/，里面让他定向到首页
  {
      path:'*',
      redirect:'/home'
  }
  ]