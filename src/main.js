import Vue from 'vue'
import App from './App.vue'
// 三级联动组件把它注册成全局组件
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
// 第一个参数：全局组件的名字，第二个参数哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Pagination.name,Pagination)

Vue.config.productionTip = false

// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'

// 引入mockserver.js数据
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'

new Vue({
  render: h => h(App),
  beforeCreate() {
    //配置全局事件总线
    Vue.prototype.$bus = this;
    //通过Vue.prototype原型对象,将全部请求函数挂载到原型对象身上[VC:就可以使用请求函数]
    // Vue.prototype.$http = http;
  },
  // 注册路由:kv一致省略v，r小写
  router,
  // 注册仓库：组件实例的身上会多个$store属性
  store
}).$mount('#app')
