<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <!-- 声明式导航务必要有to属性，也就是往哪跳 -->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            v-model="keyword"
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
          />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
    name:'',
    data() {
        return {
            keyword:''
        }
    },
    methods:{
        // 搜索按钮的回调函数：需要向search路由进行跳转
        goSearch(){
            // 路由传递参数:
            // 第一种模板字符串形式
            // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
            // 第二种对象形式，params方式需要有名字才能用对象方式传参，且需要留位置
            // 如果已有query参数，需要一起带着，就要判断
            if(this.$route.query){
              let location = {
                name:'search',
                params:{keyword:this.keyword || undefined}
              }
              location.query = this.$route.query
              this.$router.push(location)
            }
            this.$router.push(
                // query:{
                //     k:this.keyword.toUpperCase()
                // }
                // 面试题1：路由传递参数（对象写法）path是否可以结合params参数一起使用呢？不能，因为他必须要name。而query可以
                // 面试题2：如何指定params参数可传可不传？如果路由要求传递params参数，但你没有传，url会出现问题。在配置路由的时候，在占位的后面加一个问号（params可以传递或者不传递）
                // 面试题3：params参数可传也可以不传，但是如果传递的是空串，如何解决？使用undefined解决。即在空串后面||undefined
                // 面试题4：路由组件能不能传递props数据？可以的：三种写法
                // 解耦传递
                // call||apply区别
                // 相同点，都可以调用函数一次，都可以篡改函数的上下文一次
                // 不同点，call与apply传递参数：call传递参数用逗号隔开，apply方法执行，则是传递数组
            )

          
        }
    },
    mounted(){
      //清除关键字
    this.$bus.$on("clearKeyword", () => {
      this.keyword = "";
    });
    }
};
</script>

<style scoped lang="less">
 .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>
