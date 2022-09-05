import { reqCategory, reqGetBannerList ,reqFloorList} from "@/api";
// home模块小仓库
// state:仓库存储数据的地方
const state = {
  // state中数据默认初始值别瞎写，服务器返回的是什么类型，起始值就得是什么类型，(根据接口的返回值初始化)
  categoryList: [],
//   轮播图的数据
  bannerList:[],
  floorList:[],
};
// ?mutations:修改state的唯一手段
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GETBANNERLIST(state,bannerList){
    state.bannerList = bannerList
  },
  GETFLOORLIST(state,floorList){
      state.floorList = floorList
  }
};
// action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
  // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
  async categoryList({ commit }) {
    let result = await reqCategory();
    if (result.code === 200) {
      commit("CATEGORYLIST", result.data);
    }
  },
  async getBannerList({commit}) {
    let result = await reqGetBannerList();
    if(result.code === 200){
        commit('GETBANNERLIST',result.data)
    }
  },
  async getFloorList({commit}) {
    let result = await reqFloorList();
    if(result.code === 200){
        commit('GETFLOORLIST',result.data)
    }
  },
};
// getters : 理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
