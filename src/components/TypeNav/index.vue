<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
     <h2 class="all">全部商品分类</h2>
     <!-- 过渡动画 -->
      <transition name="sort">
         <div class="sort" v-show="show">
        <!-- 用事件委派的方式，来跳转页面 -->
        <div class="all-sort-list2" @click="goSearch">
          <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex == index}">
            <h3 @mouseenter="changeIndex(index)">
              <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
              <!-- 三级联动：如果使用声明式导航router-link，可以实现路由的跳转和传递参数，但会出现卡顿。因为是一个组件，当服务器数据返回后，循环出很多的router-link组件（创建组件实例）100-+
              创建组件实例时，一瞬间创建了1000+很耗内存，因此出现卡顿 -->
              <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
            </h3>
            <!-- 二三级分类 -->
            <div class="item-list clearfix" :style="{display:currentIndex === index?'block':'none'}">
              <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                <dl class="fore">
                  <dt>
                    <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                    <!-- <router-link to="/search">{{c2.categoryName}}</router-link> -->
                  </dt>
                  <dd>
                    <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                      <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                      <!-- <router-link to="/search">{{c3.categoryName}}</router-link> -->
                    </em>
       
                  </dd>
                </dl>
              </div>
            </div>
          </div>
         
        </div>
      </div>
      </transition>
      </div>
    
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
     
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// 这种引入：是吧lodash全部功能函数全引入，但是我们按需引入比较好
// import _ from 'lodash';
import throttle from 'lodash/throttle';
export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移上哪一个一级分类，初始值设为-1表示一开始谁都没有加样式
        currentIndex:-1,
        show:true
    }
  },
  methods:{
    // 鼠标进入修改响应式数据currentIndex属性
    // changeIndex(index){
    //     // index:鼠标移上某一个一级分类的。这里需要使用节流
    //      this.currentIndex = index
    // },
    changeIndex:throttle(function(index){
         this.currentIndex = index
    },100),
    // 一级分类鼠标移除的事件回调
    leaveIndex(){
      if(this.$route.path !='/home'){
         this.show = false
      }
        this.currentIndex = -1
      
    },
    goSearch(event){
      // 最好的解法是编程式导航加事件委托
      // 利用事件委托存在一些问题：1：点击的一定得是a标签，2。参数如何获取【1,2,3级分类的产品名字，id等】
      // 把子节点当中a标签，加上自定义属性data-系列，其余子节点是没有的
      // 节点有个属性dataset，可以获取节点的自定义属性与属性值

      let element = event.target
      // 因为浏览器把驼峰变成了小写，所以这里解构也用小写
      let {categoryname,category1id,category2id,category3id} = element.dataset
      if(categoryname){
        // 整理路由跳转的参数
          let location = {name:'search'};
          let query ={categoryName:categoryname}
        // 一级分类二级分类三级分类的a标签
        if(category1id){
            query.category1Id = category1id
        }else if(category2id){
           query.category2Id = category2id
        }else if(category3id){
          query.category3Id = category3id
        }
        // 判断：如果路由跳转的时候，带有params参数，捎带过去
        if(this.$route.params){
          location.params = this.$route.params
        // 整理完参数合并到一起，再进行传参
        location.query =query
        // 路由跳转
        this.$router.push(location)
        }
       
      }
    },
    // 当鼠标移入时，让商品分类列表进行展示
    enterShow(){
      this.show = true
    }

  },
  // 当组件挂载完毕：可以向服务器发请求
 
  computed:{
    ...mapState({
      // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      // 注入一个参数state，其实即为大仓库中的数据
      categoryList:state => state.home.categoryList
    })
  },
   mounted(){
    // 当组件挂载完毕，让show属性变为false
    // 如果不是home路由组件，将typeNav进行隐藏
    if(this.$route.path!='/home'){
      this.show = false
    }
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;
  
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        height: 480px;
        overflow: hidden;
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur{
          background-color:skyblue;
        }
        a{
          cursor: pointer;
        }
      }
    }
    // 过渡动画的样式
    // 过渡动画开始状态（进入）
    .sort-enter{
      height: 0px; 
    }
    .sort-enter-to{
      height: 461px;
    }
    // 定义动画时间，速率
    .sort-enter-active{
      transition: all .5s linear;
    }
  }
}
</style>
