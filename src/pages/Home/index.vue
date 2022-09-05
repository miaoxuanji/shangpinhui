<template>
  <div>
    <!-- 三级联动全局组件：三级联动已经注册为全局组件，因此不需要再引入 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <!-- floor组件，自己在组件内部是没有发请求的，数据是父组件给的，所以不需要放在后面floor组件中不需要再通过监听和nextTick获取数据 -->
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
// 引入其余的组件
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like/index.vue'
import Floor from '@/pages/Home/Floor/index.vue'
import Brand from '@/pages/Home/Brand/index.vue'
import { mapState } from 'vuex'

export default {
    name: "",
    components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
    },
    mounted(){
      // 派发action，获取floor组件的数据,因为是两组，所以要分别传递，不能在floor里面action
      this.$store.dispatch('home/getFloorList')
    },
    computed:{
        ...mapState('home',['floorList'])
    }
   
}
</script>

<style>

</style>