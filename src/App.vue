<template>
  <div>
    
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer';


export default {
  name: 'App',
  components: {
    Header,
    Footer
},
mounted(){
  //通知vuex发请求，获取数据，存储于仓库之中.放在这里是因为在typenav中，每次都会挂载一次。所以直接放app中，这样只会执行一次。直接找仓库要
    this.$store.dispatch('home/categoryList')
}
}
</script>

<style>
 
</style>
