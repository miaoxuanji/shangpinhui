import { reqGetSearchInfo } from "@/api"
// search模块小仓库
// state:仓库存储数据的地方
const state ={
    searchList:{}
}
// ?mutations:修改state的唯一手段
const mutations ={
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
// action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions ={
    // 获取search模块数据.commit是解构上下文数据context
    // params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象。所以得={}。即如果没数据，就是空对象返回
   async getSearchList({commit},params={}){
         let result =   await reqGetSearchInfo(params)
         if(result.code === 200){
            commit('GETSEARCHLIST',result.data)
         }
    }
}
// getters : 理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
// 可以把我们将来在组件当中需要用的数据简化一下【讲啦组件再获取数据的时候就更方便了】
const getters = {
    goodsList(state){
        // 如果获得最初的空对象的话，返回会是undefined，会报错
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    },
    attrsList(state){
        return state.searchList.attrsList||[]
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}